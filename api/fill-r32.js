// api/fill-r32.js
// Pulls the Round of 32 matchups from football-data.org and writes them
// into the correct bracket slots in wc_knockout_matches in Supabase.
// Called manually by the commissioner after the group stage ends.

const FD_API_KEY = process.env.FD_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const SB_HEADERS = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Prefer": "resolution=merge-duplicates",
};

const TEAM_MAP = {
  "United States": "USA", "USA": "USA",
  "Korea Republic": "South Korea", "South Korea": "South Korea",
  "Türkiye": "Turkey", "Turkey": "Turkey",
  "Ivory Coast": "Ivory Coast", "Côte d'Ivoire": "Ivory Coast",
  "Bosnia and Herzegovina": "Bosnia-Herzegovina",
  "Bosnia & Herzegovina": "Bosnia-Herzegovina",
  "DR Congo": "DR Congo", "Congo DR": "DR Congo",
  "Democratic Republic of Congo": "DR Congo",
  "Curaçao": "Curaçao", "Curacao": "Curaçao",
  "Cape Verde": "Cape Verde", "Cabo Verde": "Cape Verde",
  "New Zealand": "New Zealand",
  "Saudi Arabia": "Saudi Arabia",
  "South Africa": "South Africa",
  "Mexico": "Mexico",
  "Scotland": "Scotland",
  "Haiti": "Haiti",
  "Czechia": "Czechia", "Czech Republic": "Czechia",
};
const norm = (name) => TEAM_MAP[name] || name;

async function sbGet(key) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/wc_state?key=eq.${encodeURIComponent(key)}&select=value`,
    { headers: SB_HEADERS }
  );
  const rows = await res.json();
  return rows?.[0]?.value ?? null;
}

async function sbSet(key, value) {
  await fetch(`${SUPABASE_URL}/rest/v1/wc_state`, {
    method: "POST",
    headers: SB_HEADERS,
    body: JSON.stringify({ key, value }),
  });
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    // 1. Fetch all WC 2026 matches from football-data.org
    const fdRes = await fetch(
      "https://api.football-data.org/v4/competitions/WC/matches?season=2026",
      { headers: { "X-Auth-Token": FD_API_KEY } }
    );
    if (!fdRes.ok) {
      const body = await fdRes.text();
      return res.status(502).json({ error: `football-data.org error: ${fdRes.status}`, body });
    }
    const { matches: apiMatches = [] } = await fdRes.json();

    // 2. Filter to R32 matches only, sorted by matchday/date so bracket order is preserved
    const r32Stages = ["ROUND_OF_32", "LAST_32"];
    const r32Matches = apiMatches
      .filter(a => r32Stages.includes(a.stage))
      .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

    if (r32Matches.length === 0) {
      return res.status(200).json({ success: false, error: "No R32 matches found yet — group stage may not be complete." });
    }

    // 3. Load current knockout matches from Supabase
    const knockoutMatches = await sbGet("wc_knockout_matches");
    if (!knockoutMatches) {
      return res.status(200).json({ success: false, error: "No knockout match data in Supabase yet." });
    }

    // 4. Map R32 API matches into bracket slots in order
    // The API returns them sorted by date which preserves FIFA's bracket order
    const updatedKO = [...knockoutMatches];
    let filled = 0;

    // Get existing R32 slots in order
    const r32Slots = updatedKO
      .filter(m => m.round === "R32")
      .sort((a, b) => {
        const aNum = parseInt(a.id.replace("R32-", ""));
        const bNum = parseInt(b.id.replace("R32-", ""));
        return aNum - bNum;
      });

    r32Matches.forEach((apiMatch, idx) => {
      const home = norm(apiMatch.homeTeam?.shortName || apiMatch.homeTeam?.name || "");
      const away = norm(apiMatch.awayTeam?.shortName || apiMatch.awayTeam?.name || "");

      // Skip TBD teams
      if (!home || !away || home === "TBD" || away === "TBD" ||
          apiMatch.homeTeam?.name === "TBD" || apiMatch.awayTeam?.name === "TBD") return;

      // First try to find a slot already containing these teams
      let slot = r32Slots.find(s =>
        (s.home === home && s.away === away) ||
        (s.home === away && s.away === home)
      );

      // Then map by index order to preserve bracket positioning
      if (!slot && idx < r32Slots.length) {
        slot = r32Slots[idx];
      }

      if (!slot) return;

      // Find and update in updatedKO
      const koIdx = updatedKO.findIndex(m => m.id === slot.id);
      if (koIdx !== -1) {
        if (updatedKO[koIdx].home !== home || updatedKO[koIdx].away !== away) {
          updatedKO[koIdx] = { ...updatedKO[koIdx], home, away };
          filled++;
        }
      }
    });

    if (filled > 0) {
      await sbSet("wc_knockout_matches", updatedKO);
    }

    return res.status(200).json({ success: true, filled, total: r32Matches.length });
  } catch (err) {
    console.error("fill-r32 error:", err);
    return res.status(500).json({ error: err.message });
  }
}

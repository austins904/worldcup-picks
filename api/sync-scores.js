// api/sync-scores.js
// Vercel serverless function — called by cron every 30 minutes.
// Fetches finished WC 2026 matches from football-data.org and updates
// wc_group_matches + wc_knockout_matches in Supabase.

const FD_API_KEY = process.env.FD_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

const SB_HEADERS = {
  "Content-Type": "application/json",
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Prefer": "resolution=merge-duplicates",
};

// ── Team name normalisation ────────────────────────────────────────────────
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

// ── Knockout round mapping ─────────────────────────────────────────────────
const ROUND_MAP = {
  "ROUND_OF_32": "R32", "LAST_32": "R32",
  "ROUND_OF_16": "R16", "LAST_16": "R16",
  "QUARTER_FINALS": "QF",
  "SEMI_FINALS": "SF",
  "FINAL": "F",
};

// ── Supabase helpers ───────────────────────────────────────────────────────
async function sbGet(key) {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/wc_state?key=eq.${key}&select=value`,
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

// ── Main handler ───────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // CORS headers so the app can call this from the browser
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  // Allow manual GET trigger too (useful for testing)
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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

    // 2. Load current state from Supabase
    const [groupMatches, knockoutMatches] = await Promise.all([
      sbGet("wc_group_matches"),
      sbGet("wc_knockout_matches"),
    ]);

    if (!groupMatches || !knockoutMatches) {
      return res.status(200).json({ message: "No match data in Supabase yet — skipping." });
    }

    let groupUpdated = 0;
    let knockoutResultsUpdated = 0;

    // ── 3. Update group stage results ──────────────────────────────────────
    const updatedGroupMatches = groupMatches.map((m) => {
      const apiMatch = apiMatches.find((a) => {
        if (a.stage !== "GROUP_STAGE") return false;
        // Try short name first, then full name
        const h = norm(a.homeTeam?.shortName || a.homeTeam?.name || "");
        const aw = norm(a.awayTeam?.shortName || a.awayTeam?.name || "");
        const hFull = norm(a.homeTeam?.name || "");
        const awFull = norm(a.awayTeam?.name || "");
        return (h === m.home && aw === m.away) || (h === m.away && aw === m.home) ||
               (hFull === m.home && awFull === m.away) || (hFull === m.away && awFull === m.home);
      });
      if (!apiMatch || apiMatch.status !== "FINISHED") return m;

      const hg = apiMatch.score?.fullTime?.home;
      const ag = apiMatch.score?.fullTime?.away;
      if (hg === null || hg === undefined) return m;

      const apiHome = norm(apiMatch.homeTeam?.shortName || apiMatch.homeTeam?.name || "");
      const apiHomeFull = norm(apiMatch.homeTeam?.name || "");
      const isHomeMatch = apiHome === m.home || apiHomeFull === m.home;
      let result;
      if (hg === ag) result = "draw";
      else if (hg > ag) result = isHomeMatch ? "home" : "away";
      else result = isHomeMatch ? "away" : "home";

      if (result !== m.result) {
        groupUpdated++;
        return { ...m, result };
      }
      return m;
    });

    // ── 4. Update knockout results only (never auto-set teams) ─────────────
    // Only update results for matches where commissioner has already set teams
    const koById = {};
    knockoutMatches.forEach((m) => { koById[m.id] = { ...m }; });

    apiMatches
      .filter((a) => ROUND_MAP[a.stage])
      .forEach((a) => {
        if (a.status !== "FINISHED") return;
        const round = ROUND_MAP[a.stage];
        const home = norm(a.homeTeam?.shortName || a.homeTeam?.name || "");
        const away = norm(a.awayTeam?.shortName || a.awayTeam?.name || "");
        if (!home || !away || home === "TBD" || away === "TBD") return;

        // Only match against slots that already have teams set by commissioner
        const slot = Object.values(koById).find(
          (s) => s.round === round && s.home && s.away &&
            ((s.home === home && s.away === away) ||
             (s.home === away && s.away === home))
        );
        if (!slot) return;

        // Set result
        const hg = a.score?.fullTime?.home;
        const ag = a.score?.fullTime?.away;
        const penH = a.score?.penalties?.home;
        const penA = a.score?.penalties?.away;
        let winner;
        if (penH != null && penA != null) {
          winner = penH > penA ? slot.home : slot.away;
        } else if (hg != null && ag != null && hg !== ag) {
          winner = hg > ag ? slot.home : slot.away;
        }
        if (winner) {
          const result = winner === slot.home ? "home" : "away";
          if (result !== slot.result) {
            slot.result = result;
            knockoutResultsUpdated++;
          }
        }
      });

    if (groupUpdated > 0) await sbSet("wc_group_matches", updatedGroupMatches);
    if (knockoutResultsUpdated > 0) await sbSet("wc_knockout_matches", Object.values(koById));

    const total = groupUpdated + knockoutResultsUpdated;
    console.log(`sync-scores: ${total} updates (group=${groupUpdated}, ko_results=${knockoutResultsUpdated})`);

    return res.status(200).json({
      success: true,
      groupUpdated,
      knockoutResultsUpdated,
      total,
    });
  } catch (err) {
    console.error("sync-scores error:", err);
    return res.status(500).json({ error: err.message });
  }
}

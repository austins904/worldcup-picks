import { useState, useEffect } from "react";

// ── Official 2026 World Cup Group Stage Schedule (chronological, ET times) ─
function generateGroupMatches() {
  const schedule = [
    // June 11
    { group:"A", home:"Mexico",       away:"South Africa",  date:"Jun 11", time:"3:00 PM ET" },
    { group:"A", home:"South Korea",  away:"Czechia",       date:"Jun 11", time:"10:00 PM ET" },
    // June 12
    { group:"B", home:"Canada",       away:"Bosnia-Herzegovina", date:"Jun 12", time:"3:00 PM ET" },
    { group:"D", home:"USA",          away:"Paraguay",      date:"Jun 12", time:"9:00 PM ET" },
    // June 13
    { group:"B", home:"Qatar",        away:"Switzerland",   date:"Jun 13", time:"3:00 PM ET" },
    { group:"C", home:"Brazil",       away:"Morocco",       date:"Jun 13", time:"6:00 PM ET" },
    { group:"C", home:"Haiti",        away:"Scotland",      date:"Jun 13", time:"9:00 PM ET" },
    { group:"D", home:"Australia",    away:"Turkey",        date:"Jun 13", time:"12:00 AM ET" },
    // June 14
    { group:"E", home:"Germany",      away:"Curaçao",       date:"Jun 14", time:"1:00 PM ET" },
    { group:"F", home:"Netherlands",  away:"Japan",         date:"Jun 14", time:"4:00 PM ET" },
    { group:"E", home:"Ivory Coast",  away:"Ecuador",       date:"Jun 14", time:"7:00 PM ET" },
    { group:"F", home:"Tunisia",      away:"Sweden",        date:"Jun 14", time:"10:00 PM ET" },
    // June 15
    { group:"H", home:"Spain",        away:"Cape Verde",    date:"Jun 15", time:"12:00 PM ET" },
    { group:"G", home:"Belgium",      away:"Egypt",         date:"Jun 15", time:"3:00 PM ET" },
    { group:"H", home:"Saudi Arabia", away:"Uruguay",       date:"Jun 15", time:"6:00 PM ET" },
    { group:"G", home:"Iran",         away:"New Zealand",   date:"Jun 15", time:"9:00 PM ET" },
    // June 16
    { group:"I", home:"France",       away:"Senegal",       date:"Jun 16", time:"3:00 PM ET" },
    { group:"I", home:"Iraq",         away:"Norway",        date:"Jun 16", time:"6:00 PM ET" },
    { group:"J", home:"Argentina",    away:"Algeria",       date:"Jun 16", time:"9:00 PM ET" },
    { group:"J", home:"Austria",      away:"Jordan",        date:"Jun 16", time:"12:00 AM ET" },
    // June 17
    { group:"K", home:"Portugal",     away:"DR Congo",      date:"Jun 17", time:"1:00 PM ET" },
    { group:"L", home:"England",      away:"Croatia",       date:"Jun 17", time:"4:00 PM ET" },
    { group:"L", home:"Ghana",        away:"Panama",        date:"Jun 17", time:"7:00 PM ET" },
    { group:"K", home:"Uzbekistan",   away:"Colombia",      date:"Jun 17", time:"10:00 PM ET" },
    // June 18
    { group:"A", home:"Czechia",      away:"South Africa",  date:"Jun 18", time:"12:00 PM ET" },
    { group:"B", home:"Switzerland",  away:"Bosnia-Herzegovina", date:"Jun 18", time:"3:00 PM ET" },
    { group:"B", home:"Canada",       away:"Qatar",         date:"Jun 18", time:"6:00 PM ET" },
    { group:"A", home:"Mexico",       away:"South Korea",   date:"Jun 18", time:"9:00 PM ET" },
    // June 19
    { group:"D", home:"USA",          away:"Australia",     date:"Jun 19", time:"3:00 PM ET" },
    { group:"C", home:"Scotland",     away:"Morocco",       date:"Jun 19", time:"3:00 PM ET" },
    { group:"C", home:"Brazil",       away:"Haiti",         date:"Jun 19", time:"9:00 PM ET" },
    { group:"D", home:"Turkey",       away:"Paraguay",      date:"Jun 19", time:"12:00 AM ET" },
    // June 20
    { group:"F", home:"Netherlands",  away:"Sweden",        date:"Jun 20", time:"1:00 PM ET" },
    { group:"E", home:"Germany",      away:"Ivory Coast",   date:"Jun 20", time:"4:00 PM ET" },
    { group:"E", home:"Ecuador",      away:"Curaçao",       date:"Jun 20", time:"8:00 PM ET" },
    { group:"F", home:"Tunisia",      away:"Japan",         date:"Jun 20", time:"12:00 AM ET" },
    // June 21
    { group:"H", home:"Spain",        away:"Saudi Arabia",  date:"Jun 21", time:"12:00 PM ET" },
    { group:"G", home:"Belgium",      away:"Iran",          date:"Jun 21", time:"3:00 PM ET" },
    { group:"H", home:"Uruguay",      away:"Cape Verde",    date:"Jun 21", time:"6:00 PM ET" },
    { group:"G", home:"New Zealand",  away:"Egypt",         date:"Jun 21", time:"9:00 PM ET" },
    // June 22
    { group:"J", home:"Argentina",    away:"Austria",       date:"Jun 22", time:"1:00 PM ET" },
    { group:"I", home:"France",       away:"Iraq",          date:"Jun 22", time:"5:00 PM ET" },
    { group:"I", home:"Norway",       away:"Senegal",       date:"Jun 22", time:"8:00 PM ET" },
    { group:"J", home:"Jordan",       away:"Algeria",       date:"Jun 22", time:"11:00 PM ET" },
    // June 23
    { group:"K", home:"Portugal",     away:"Uzbekistan",    date:"Jun 23", time:"1:00 PM ET" },
    { group:"L", home:"England",      away:"Ghana",         date:"Jun 23", time:"4:00 PM ET" },
    { group:"L", home:"Panama",       away:"Croatia",       date:"Jun 23", time:"7:00 PM ET" },
    { group:"K", home:"Colombia",     away:"DR Congo",      date:"Jun 23", time:"10:00 PM ET" },
    // June 24
    { group:"B", home:"Switzerland",  away:"Canada",        date:"Jun 24", time:"3:00 PM ET" },
    { group:"B", home:"Bosnia-Herzegovina", away:"Qatar",   date:"Jun 24", time:"3:00 PM ET" },
    { group:"C", home:"Brazil",       away:"Scotland",      date:"Jun 24", time:"6:00 PM ET" },
    { group:"C", home:"Morocco",      away:"Haiti",         date:"Jun 24", time:"6:00 PM ET" },
    { group:"A", home:"Mexico",       away:"Czechia",       date:"Jun 24", time:"9:00 PM ET" },
    { group:"A", home:"South Korea",  away:"South Africa",  date:"Jun 24", time:"9:00 PM ET" },
    // June 25
    { group:"E", home:"Ecuador",      away:"Germany",       date:"Jun 25", time:"4:00 PM ET" },
    { group:"E", home:"Curaçao",      away:"Ivory Coast",   date:"Jun 25", time:"4:00 PM ET" },
    { group:"F", home:"Tunisia",      away:"Netherlands",   date:"Jun 25", time:"7:00 PM ET" },
    { group:"F", home:"Japan",        away:"Sweden",        date:"Jun 25", time:"7:00 PM ET" },
    { group:"D", home:"USA",          away:"Turkey",        date:"Jun 25", time:"10:00 PM ET" },
    { group:"D", home:"Paraguay",     away:"Australia",     date:"Jun 25", time:"10:00 PM ET" },
    // June 26
    { group:"I", home:"Norway",       away:"France",        date:"Jun 26", time:"3:00 PM ET" },
    { group:"I", home:"Senegal",      away:"Iraq",          date:"Jun 26", time:"3:00 PM ET" },
    { group:"H", home:"Uruguay",      away:"Spain",         date:"Jun 26", time:"8:00 PM ET" },
    { group:"H", home:"Cape Verde",   away:"Saudi Arabia",  date:"Jun 26", time:"8:00 PM ET" },
    { group:"G", home:"New Zealand",  away:"Belgium",       date:"Jun 26", time:"11:00 PM ET" },
    { group:"G", home:"Egypt",        away:"Iran",          date:"Jun 26", time:"11:00 PM ET" },
    // June 27
    { group:"L", home:"Panama",       away:"England",       date:"Jun 27", time:"5:00 PM ET" },
    { group:"L", home:"Croatia",      away:"Ghana",         date:"Jun 27", time:"5:00 PM ET" },
    { group:"K", home:"Portugal",     away:"Colombia",      date:"Jun 27", time:"9:00 PM ET" },
    { group:"K", home:"DR Congo",     away:"Uzbekistan",    date:"Jun 27", time:"9:00 PM ET" },
    // June 28
    { group:"J", home:"Algeria",      away:"Austria",       date:"Jun 28", time:"3:00 PM ET" },
    { group:"J", home:"Jordan",       away:"Argentina",     date:"Jun 28", time:"3:00 PM ET" },
  ];

  return schedule.map((m, i) => ({
    id: `G${i + 1}`,
    stage: "group",
    group: m.group,
    home: m.home,
    away: m.away,
    date: m.date,
    time: m.time,
    result: null,
  }));
}

// Knockout rounds (teams TBD — filled in by commissioner)
const KNOCKOUT_ROUNDS = [
  { round: "R32", label: "Round of 32", matchCount: 16 },
  { round: "R16", label: "Round of 16", matchCount: 8 },
  { round: "QF",  label: "Quarterfinals", matchCount: 4 },
  { round: "SF",  label: "Semifinals", matchCount: 2 },
  { round: "F",   label: "Final", matchCount: 1 },
];

// Bracket pairing: which two matches feed into each subsequent match
// R32-1 + R32-2 → R16-1, R32-3 + R32-4 → R16-2, etc.
const BRACKET_FEEDS = {
  "R16-1": ["R32-1",  "R32-2"],
  "R16-2": ["R32-3",  "R32-4"],
  "R16-3": ["R32-5",  "R32-6"],
  "R16-4": ["R32-7",  "R32-8"],
  "R16-5": ["R32-9",  "R32-10"],
  "R16-6": ["R32-11", "R32-12"],
  "R16-7": ["R32-13", "R32-14"],
  "R16-8": ["R32-15", "R32-16"],
  "QF-1":  ["R16-1",  "R16-2"],
  "QF-2":  ["R16-3",  "R16-4"],
  "QF-3":  ["R16-5",  "R16-6"],
  "QF-4":  ["R16-7",  "R16-8"],
  "SF-1":  ["QF-1",   "QF-2"],
  "SF-2":  ["QF-3",   "QF-4"],
  "F-1":   ["SF-1",   "SF-2"],
};

// Get the team a player picked to win a given match (cascading through their picks)
function getPickedWinner(matchId, picks, knockoutMatches) {
  const match = knockoutMatches.find(m => m.id === matchId);
  if (!match) return null;
  const pick = picks[matchId];
  if (!pick) return null;
  // For R32, teams come from commissioner-set match data
  if (match.round === "R32") {
    return pick === "home" ? match.home : match.away;
  }
  // For later rounds, teams come from picked winners of feeder matches
  const [feedA, feedB] = BRACKET_FEEDS[matchId] || [];
  const teamA = getPickedWinner(feedA, picks, knockoutMatches);
  const teamB = getPickedWinner(feedB, picks, knockoutMatches);
  return pick === "home" ? teamA : teamB;
}

// Get the actual winner of a match
function getActualWinner(matchId, knockoutMatches) {
  const match = knockoutMatches.find(m => m.id === matchId);
  if (!match || !match.result) return null;
  return match.result === "home" ? match.home : match.away;
}

function generateKnockoutMatches() {
  const matches = [];
  KNOCKOUT_ROUNDS.forEach(({ round, matchCount }) => {
    for (let i = 1; i <= matchCount; i++) {
      matches.push({
        id: `${round}-${i}`,
        stage: "knockout",
        round,
        home: "",
        away: "",
        result: null,
      });
    }
  });
  return matches;
}

// ── Supabase config ────────────────────────────────────────────────────────
const SUPABASE_URL = "https://aqqwxklktxhcbidnmhwu.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcXd4a2xrdHhoY2JpZG5taHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NjUwMzUsImV4cCI6MjA5NjQ0MTAzNX0.y445KL8nMCObU4n_ExeMNNZgz484SqsXOeloaRAv3Y4";
const SB_HEADERS = { "Content-Type": "application/json", "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` };

async function loadState(key, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/wc_state?key=eq.${encodeURIComponent(key)}&select=value`, { headers: SB_HEADERS });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const rows = await res.json();
      return rows?.[0]?.value ?? null;
    } catch (e) {
      if (i === attempts - 1) {
        console.error(`loadState failed for ${key} after ${attempts} attempts:`, e);
        return null;
      }
      await new Promise(r => setTimeout(r, 400 * (i + 1)));
    }
  }
  return null;
}

// Save with retry — tries up to 3 times with exponential backoff
async function saveState(key, value, attempts = 3) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/wc_state`, {
        method: "POST",
        headers: { ...SB_HEADERS, "Prefer": "resolution=merge-duplicates" },
        body: JSON.stringify({ key, value }),
      });
      if (res.ok) return true;
    } catch (e) {
      if (i === attempts - 1) console.error("Supabase save failed after retries:", key, e);
    }
    // Wait before retry: 500ms, 1000ms
    if (i < attempts - 1) await new Promise(r => setTimeout(r, 500 * (i + 1)));
  }
  return false;
}

// Per-player picks key — isolates each player's picks into its own row
const playerPicksKey = (name) => `wc_picks_${name.toLowerCase().replace(/\s+/g, "_")}`;

// Load all players' picks into the combined picks object
async function loadAllPicks(players) {
  if (!players || players.length === 0) return {};
  const results = await Promise.all(players.map(async name => {
    // Try sanitized key first, then raw name as fallback
    let val = await loadState(playerPicksKey(name));
    if (!val || Object.keys(val).length === 0) {
      val = await loadState(`wc_picks_${name}`);
    }
    return [name, val || {}];
  }));
  return Object.fromEntries(results);
}

// Save a single player's picks
async function savePlayerPicks(name, playerPicks) {
  return saveState(playerPicksKey(name), playerPicks);
}

// ── Scoring ────────────────────────────────────────────────────────────────
const KNOCKOUT_PTS = { R32: 3, R16: 5, QF: 7, SF: 10, F: 15 };

function scorePlayer(playerPicks, allMatches) {
  let pts = 0;
  const knockoutMatches = allMatches.filter(m => m.stage === "knockout");

  allMatches.forEach((m) => {
    if (!m.result) return;
    const pick = playerPicks[m.id];
    if (!pick || pick !== m.result) return;
    if (m.stage === "group") {
      pts += 2;
    } else {
      // For knockout, verify the picked team actually got there via correct prior picks
      const actualWinner = getActualWinner(m.id, knockoutMatches);
      const pickedWinner = getPickedWinner(m.id, playerPicks, knockoutMatches);
      if (actualWinner && pickedWinner === actualWinner) {
        pts += KNOCKOUT_PTS[m.round] || 0;
      }
    }
  });
  return pts;
}

// ── Flags (emoji) ─────────────────────────────────────────────────────────
const FLAG = {
  USA: "🇺🇸", Argentina: "🇦🇷", Brazil: "🇧🇷", France: "🇫🇷", England: "🇬🇧",
  Germany: "🇩🇪", Spain: "🇪🇸", Mexico: "🇲🇽", Netherlands: "🇳🇱",
  Portugal: "🇵🇹", Belgium: "🇧🇪", Croatia: "🇭🇷", Uruguay: "🇺🇾", Colombia: "🇨🇴",
  Japan: "🇯🇵", "South Korea": "🇰🇷", Morocco: "🇲🇦", Senegal: "🇸🇳", Australia: "🇦🇺",
  Ecuador: "🇪🇨", Paraguay: "🇵🇾", Turkey: "🇹🇷", Iran: "🇮🇷",
  "Saudi Arabia": "🇸🇦", Egypt: "🇪🇬", Qatar: "🇶🇦", Panama: "🇵🇦",
  "South Africa": "🇿🇦", Czechia: "🇨🇿", Canada: "🇨🇦", Switzerland: "🇨🇭",
  "Bosnia-Herzegovina": "🇧🇦", Scotland: "🇮🇴", Haiti: "🇭🇹", "Ivory Coast": "🇨🇮",
  "Curaçao": "🇨🇼", Sweden: "🇸🇪", Tunisia: "🇹🇳", "Cape Verde": "🇨🇻",
  "New Zealand": "🇳🇿", Norway: "🇳🇴", Iraq: "🇮🇶", Algeria: "🇩🇿",
  Austria: "🇦🇹", Jordan: "🇯🇴", "DR Congo": "🇨🇩", Uzbekistan: "🇺🇿",
  Ghana: "🇬🇭", Serbia: "🇷🇸", Denmark: "🇩🇰",
};
const f = (t) => FLAG[t] || "🏳️";

// ── Color palette ──────────────────────────────────────────────────────────
const C = {
  bg: "#0a0e1a",
  surface: "#111827",
  card: "#1a2235",
  border: "#2a3a55",
  accent: "#22d3ee",
  accentDim: "#0e7490",
  gold: "#f59e0b",
  green: "#10b981",
  red: "#ef4444",
  muted: "#64748b",
  text: "#e2e8f0",
  textDim: "#94a3b8",
};

// ── Shared tiny components ─────────────────────────────────────────────────
const Btn = ({ onClick, children, variant = "primary", small, disabled, style = {} }) => {
  const base = {
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: small ? 12 : 14,
    padding: small ? "5px 12px" : "9px 20px",
    borderRadius: 8,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "none",
    transition: "all .15s",
    opacity: disabled ? 0.45 : 1,
    letterSpacing: ".04em",
    ...style,
  };
  const variants = {
    primary: { background: C.accent, color: "#000" },
    ghost: { background: "transparent", color: C.accent, border: `1px solid ${C.accentDim}` },
    danger: { background: C.red, color: "#fff" },
    gold: { background: C.gold, color: "#000" },
  };
  return (
    <button onClick={disabled ? undefined : onClick} style={{ ...base, ...variants[variant] }}>
      {children}
    </button>
  );
};

const Badge = ({ children, color }) => (
  <span style={{
    background: color || C.accentDim,
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    padding: "2px 8px",
    borderRadius: 99,
    letterSpacing: ".05em",
  }}>{children}</span>
);

// ── Main App ───────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("login"); // login | player | commissioner
  const [currentUser, setCurrentUser] = useState(null); // { name, isAdmin }

  // Group stage lock deadline: June 11 2026 3:00 PM ET = 19:00 UTC
  const GROUP_LOCK_TIME = new Date("2026-06-11T19:00:00Z");
  const isAutoLocked = () => new Date() >= GROUP_LOCK_TIME;

  // Shared game state (stored)
  const [players, setPlayersState] = useState([]);
  const [groupMatches, setGroupMatchesState] = useState(generateGroupMatches());
  const [knockoutMatches, setKnockoutMatchesState] = useState(generateKnockoutMatches());
  const [picks, setPicksState] = useState({}); // { playerName: { matchId: result } }
  const [pins, setPinsState] = useState({}); // { playerName: "1234" }
  const [paid, setPaidState] = useState({}); // { playerName: true }
  const [groupLocked, setGroupLockedState] = useState(false);
  const [knockoutOpen, setKnockoutOpenState] = useState(false);
  const [knockoutLocked, setKnockoutLockedState] = useState(false);
  const [lastUpdated, setLastUpdatedState] = useState(null);
  const [announcement, setAnnouncementState] = useState("");
  const [activeTab, setActiveTab] = useState("groups");

  // Load from storage
  useEffect(() => {
    (async () => {
      const [p, gm, km, ko, kl, pn, gl, pd, lu, an] = await Promise.all([
        loadState("wc_players"),
        loadState("wc_group_matches"),
        loadState("wc_knockout_matches"),
        loadState("wc_knockout_open"),
        loadState("wc_knockout_locked"),
        loadState("wc_pins"),
        loadState("wc_group_locked"),
        loadState("wc_paid"),
        loadState("wc_last_updated"),
        loadState("wc_announcement"),
      ]);
      const playerList = p || [];
      if (playerList.length) setPlayersState(playerList);
      if (gm) setGroupMatchesState(gm);
      if (km) setKnockoutMatchesState(km);
      if (ko !== null) setKnockoutOpenState(ko);
      if (kl !== null) setKnockoutLockedState(kl);
      if (pn) setPinsState(pn);
      if (gl !== null) setGroupLockedState(gl);
      if (pd) setPaidState(pd);
      if (lu) setLastUpdatedState(lu);
      if (an) setAnnouncementState(an);
      // Load picks — check both old combined key and new per-player keys
      if (playerList.length) {
        // Load per-player keys
        const perPlayerPicks = await loadAllPicks(playerList);
        // Also check old combined key as fallback
        const oldPicks = await loadState("wc_picks");
        const oldPicksValid = oldPicks && typeof oldPicks === "object" && Object.keys(oldPicks).length > 0;

        // Merge: per-player wins if it has data, otherwise fall back to old format
        const merged = {};
        playerList.forEach(name => {
          const perPlayer = perPlayerPicks[name];
          const old = oldPicksValid ? oldPicks[name] : null;
          // Use whichever has more picks
          const perPlayerCount = perPlayer ? Object.keys(perPlayer).length : 0;
          const oldCount = old ? Object.keys(old).length : 0;
          merged[name] = perPlayerCount >= oldCount ? (perPlayer || {}) : (old || {});
        });

        setPicksState(merged);

        // If old picks had data, migrate to per-player and clear old key
        if (oldPicksValid) {
          await Promise.all(playerList.map(name => {
            if (merged[name] && Object.keys(merged[name]).length > 0) {
              return savePlayerPicks(name, merged[name]);
            }
          }));
          await saveState("wc_picks", null);
        }
      }
      setLoading(false);
    })();
  }, []);

  // Persist helpers
  const setPlayers = async (v) => {
    setPlayersState(v);
    saveState("wc_players", v);
    // Reload picks for any new players
    const newNames = v.filter(name => !picks[name]);
    if (newNames.length > 0) {
      const newPicksData = await loadAllPicks(newNames);
      setPicksState(prev => ({ ...prev, ...newPicksData }));
    }
  };
  const setGroupMatches = (v) => { setGroupMatchesState(v); saveState("wc_group_matches", v); const ts = new Date().toISOString(); setLastUpdatedState(ts); saveState("wc_last_updated", ts); };
  const setKnockoutMatches = (v) => { setKnockoutMatchesState(v); saveState("wc_knockout_matches", v); const ts = new Date().toISOString(); setLastUpdatedState(ts); saveState("wc_last_updated", ts); };
  // setPicks now saves per player — pass playerName to only write that player's row
  const setPicks = (v, changedPlayer) => {
    setPicksState(v);
    if (changedPlayer && v[changedPlayer]) {
      savePlayerPicks(changedPlayer, v[changedPlayer]);
    } else {
      // Fallback: save all players
      Object.keys(v).forEach(name => savePlayerPicks(name, v[name]));
    }
  };
  const setGroupLocked = (v) => { setGroupLockedState(v); saveState("wc_group_locked", v); };
  const setKnockoutOpen = (v) => { setKnockoutOpenState(v); saveState("wc_knockout_open", v); };
  const setKnockoutLocked = (v) => { setKnockoutLockedState(v); saveState("wc_knockout_locked", v); };
  const setPins = (v) => { setPinsState(v); saveState("wc_pins", v); };
  const setPaid = (v) => { setPaidState(v); saveState("wc_paid", v); };
  const setAnnouncement = (v) => { setAnnouncementState(v); saveState("wc_announcement", v); };

  const groupPicksLocked = groupLocked || isAutoLocked();
  const allMatches = [...groupMatches, ...knockoutMatches];

  if (loading) return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: C.accent, fontFamily: "'Bebas Neue', cursive", fontSize: 32, letterSpacing: 4 }}>LOADING…</div>
    </div>
  );

  if (view === "login") return (
    <LoginScreen
      players={players}
      pins={pins}
      onLogin={(name, isAdmin) => {
        setCurrentUser({ name, isAdmin });
        setView(isAdmin ? "commissioner" : "player");
        setActiveTab("groups");
      }}
      onSetPin={(name, pin) => {
        const updated = { ...pins, [name]: pin };
        setPins(updated);
      }}
      onAddPlayer={(name) => {
        if (!players.includes(name)) setPlayers([...players, name]);
      }}
    />
  );

  if (view === "commissioner") return (
    <CommissionerView
      players={players}
      groupMatches={groupMatches}
      knockoutMatches={knockoutMatches}
      picks={picks}
      knockoutOpen={knockoutOpen}
      knockoutLocked={knockoutLocked}
      groupLocked={groupLocked}
      groupPicksLocked={groupPicksLocked}
      allMatches={allMatches}
      onSetGroupResult={(id, result) => {
        const updated = groupMatches.map(m => m.id === id ? { ...m, result } : m);
        setGroupMatches(updated);
      }}
      onSetKnockoutTeams={(id, home, away) => {
        const updated = knockoutMatches.map(m => m.id === id ? { ...m, home, away } : m);
        setKnockoutMatches(updated);
      }}
      onSetKnockoutResult={(id, result) => {
        const updated = knockoutMatches.map(m => m.id === id ? { ...m, result } : m);
        setKnockoutMatches(updated);
      }}
      onOpenKnockout={() => setKnockoutOpen(true)}
      onLockKnockout={() => setKnockoutLocked(true)}
      onUnlockKnockout={() => { setKnockoutLocked(false); }}
      onLockGroupPicks={() => setGroupLocked(true)}
      onRenamePlayer={(oldName, newName) => {
        // Update players list
        setPlayers(players.map(p => p === oldName ? newName : p));
        // Migrate picks — save under new name key
        const newPicks = { ...picks };
        if (newPicks[oldName]) { newPicks[newName] = newPicks[oldName]; delete newPicks[oldName]; }
        setPicks(newPicks, newName);
        // Migrate pins
        const newPins = { ...pins };
        if (newPins[oldName]) { newPins[newName] = newPins[oldName]; delete newPins[oldName]; }
        setPins(newPins);
      }}
      onLogout={() => { setCurrentUser(null); setView("login"); }}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      addPlayer={(name) => { if (!players.includes(name)) setPlayers([...players, name]); }}
      pins={pins}
      paid={paid}
      onTogglePaid={(name) => { const updated = { ...paid, [name]: !paid[name] }; setPaid(updated); }}
      onResetPin={(name) => { const updated = { ...pins }; delete updated[name]; setPins(updated); }}
      onRemovePlayer={(name) => {
        setPlayers(players.filter(p => p !== name));
        const newPicks = { ...picks }; delete newPicks[name]; setPicks(newPicks);
        const newPins = { ...pins }; delete newPins[name]; setPins(newPins);
        const newPaid = { ...paid }; delete newPaid[name]; setPaid(newPaid);
      }}
      lastUpdated={lastUpdated}
      announcement={announcement}
      onSetAnnouncement={setAnnouncement}
      onMatchesReloaded={(gm, km, lu) => {
        if (gm) setGroupMatchesState(gm);
        if (km) setKnockoutMatchesState(km);
        if (lu) setLastUpdatedState(lu);
      }}
    />
  );

  return (
    <PlayerView
      player={currentUser.name}
      groupMatches={groupMatches}
      knockoutMatches={knockoutMatches}
      picks={picks[currentUser.name] || {}}
      allPlayers={players}
      allPicks={picks}
      allMatches={allMatches}
      knockoutOpen={knockoutOpen}
      knockoutLocked={knockoutLocked}
      groupPicksLocked={groupPicksLocked}
      lastUpdated={lastUpdated}
      announcement={announcement}
      isPaid={!!paid[currentUser.name]}
      paid={paid}
      onPick={(matchId, result) => {
        const updated = { ...picks, [currentUser.name]: { ...(picks[currentUser.name] || {}), [matchId]: result } };
        setPicks(updated, currentUser.name);
      }}
      onRenamePlayer={(oldName, newName) => {
        setPlayers(players.map(p => p === oldName ? newName : p));
        const newPicks = { ...picks };
        if (newPicks[oldName]) { newPicks[newName] = newPicks[oldName]; delete newPicks[oldName]; }
        setPicks(newPicks);
        const newPins = { ...pins };
        if (newPins[oldName]) { newPins[newName] = newPins[oldName]; delete newPins[oldName]; }
        setPins(newPins);
        setCurrentUser({ ...currentUser, name: newName });
      }}
      onLogout={() => { setCurrentUser(null); setView("login"); }}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onMatchesReloaded={(gm, km, lu) => {
        if (gm) setGroupMatchesState(gm);
        if (km) setKnockoutMatchesState(km);
        if (lu) setLastUpdatedState(lu);
      }}
    />
  );
}

// ── LOGIN ──────────────────────────────────────────────────────────────────
function LoginScreen({ players, pins, onLogin, onSetPin, onAddPlayer }) {
  const [name, setName] = useState("");
  const [newPlayer, setNewPlayer] = useState("");
  const [adminPw, setAdminPw] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [err, setErr] = useState("");

  // PIN flow: null | "create" | "confirm" | "enter"
  const [pinStep, setPinStep] = useState(null);
  const [pinVal, setPinVal] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");

  const ADMIN_PW = "soccer2026";

  const handleSelectPlayer = (selectedName) => {
    setName(selectedName);
    setErr("");
    setPinVal("");
    setPinConfirm("");
    if (!selectedName) { setPinStep(null); return; }
    if (pins[selectedName]) {
      setPinStep("enter");
    } else {
      setPinStep("create");
    }
  };

  const handlePinInput = (val, setter) => {
    if (/^\d{0,4}$/.test(val)) setter(val);
  };

  const handlePinSubmit = () => {
    if (pinStep === "create") {
      if (pinVal.length !== 4) { setErr("PIN must be 4 digits."); return; }
      setPinStep("confirm");
      setErr("");
    } else if (pinStep === "confirm") {
      if (pinVal !== pinConfirm) { setErr("PINs don't match. Try again."); setPinConfirm(""); return; }
      onSetPin(name, pinVal);
      onLogin(name, false);
    } else if (pinStep === "enter") {
      if (pinVal === pins[name]) {
        onLogin(name, false);
      } else {
        setErr("Wrong PIN.");
        setPinVal("");
      }
    }
  };

  const handleLogin = () => {
    if (adminMode) {
      if (adminPw === ADMIN_PW) { onLogin("Commissioner", true); }
      else setErr("Wrong password.");
      return;
    }
    if (!name.trim()) { setErr("Select your name."); return; }
    handlePinSubmit();
  };

  const pinLabel = pinStep === "create" ? "Create a 4-digit PIN"
    : pinStep === "confirm" ? "Confirm your PIN"
    : "Enter your PIN";

  const pinValue = pinStep === "confirm" ? pinConfirm : pinVal;
  const pinSetter = pinStep === "confirm" ? setPinConfirm : setPinVal;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', 'Arial Black', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      <div style={{ width: "100%", maxWidth: 420, padding: 24 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 64, marginBottom: 8 }}>⚽</div>
          <div style={{ fontSize: 48, color: C.accent, letterSpacing: 6, lineHeight: 1 }}>WORLD CUP</div>
          <div style={{ fontSize: 28, color: C.gold, letterSpacing: 8, marginTop: 4 }}>2026 PICKS</div>
          <div style={{ width: 60, height: 3, background: C.accent, margin: "16px auto 0" }} />
        </div>

        <div style={{ background: C.card, borderRadius: 16, padding: 28, border: `1px solid ${C.border}` }}>
          {!adminMode ? (
            <>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.textDim, marginBottom: 16, fontWeight: 600, letterSpacing: 1 }}>PLAYER LOGIN</div>
              <select
                value={name}
                onChange={e => handleSelectPlayer(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", background: C.surface, color: name ? C.text : C.muted, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 15, fontFamily: "Inter, sans-serif", marginBottom: 12, boxSizing: "border-box" }}
              >
                <option value="">— Select your name —</option>
                {players.map(p => <option key={p} value={p}>{p}</option>)}
              </select>

              {pinStep && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.textDim, marginBottom: 8, fontWeight: 600 }}>
                    {pinStep === "create" && "🔐 First time? Create a 4-digit PIN to protect your picks."}
                    {pinStep === "confirm" && "✅ Confirm your PIN"}
                    {pinStep === "enter" && "🔐 Enter your PIN"}
                  </div>
                  <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 4 }}>
                    {[0,1,2,3].map(i => (
                      <div key={i} style={{
                        width: 48, height: 56, borderRadius: 10, background: C.surface,
                        border: `2px solid ${pinValue.length > i ? C.accent : C.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 24, color: C.text, fontWeight: 700,
                      }}>
                        {pinValue.length > i ? "●" : ""}
                      </div>
                    ))}
                  </div>
                  <input
                    type="number"
                    inputMode="numeric"
                    maxLength={4}
                    value={pinValue}
                    onChange={e => handlePinInput(e.target.value, pinSetter)}
                    onKeyDown={e => e.key === "Enter" && handleLogin()}
                    style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
                    autoFocus
                  />
                  {/* Tap-friendly number pad */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 12 }}>
                    {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((k, i) => (
                      <button key={i} onClick={() => {
                        if (k === "⌫") pinSetter(v => v.slice(0,-1));
                        else if (k !== "" && pinValue.length < 4) pinSetter(v => v + k);
                      }} style={{
                        padding: "14px 0", borderRadius: 10, fontSize: 20, fontWeight: 700,
                        background: k === "" ? "transparent" : C.surface,
                        border: `1px solid ${k === "" ? "transparent" : C.border}`,
                        color: C.text, cursor: k === "" ? "default" : "pointer",
                        fontFamily: "Inter, sans-serif",
                      }}>{k}</button>
                    ))}
                  </div>
                </div>
              )}

              {err && <div style={{ color: C.red, fontSize: 13, fontFamily: "Inter, sans-serif", marginBottom: 10 }}>{err}</div>}
              {pinStep && <Btn onClick={handleLogin} style={{ width: "100%", marginTop: 8 }}>
                {pinStep === "create" ? "SET PIN" : pinStep === "confirm" ? "CONFIRM PIN" : "ENTER"}
              </Btn>}
              {!pinStep && name && <Btn onClick={handleLogin} style={{ width: "100%" }}>ENTER</Btn>}
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <button onClick={() => setAdminMode(true)} style={{ background: "none", border: "none", color: C.muted, fontSize: 12, fontFamily: "Inter, sans-serif", cursor: "pointer", textDecoration: "underline" }}>
                  Commissioner Login
                </button>
              </div>
            </>
          ) : (
            <>
              <div style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: C.textDim, marginBottom: 16, fontWeight: 600, letterSpacing: 1 }}>COMMISSIONER LOGIN</div>
              <input
                type="password"
                placeholder="Password"
                value={adminPw}
                onChange={e => { setAdminPw(e.target.value); setErr(""); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                style={{ width: "100%", padding: "10px 12px", background: C.surface, color: C.text, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 15, fontFamily: "Inter, sans-serif", marginBottom: 12, boxSizing: "border-box" }}
              />
              {err && <div style={{ color: C.red, fontSize: 13, fontFamily: "Inter, sans-serif", marginBottom: 10 }}>{err}</div>}
              <Btn onClick={handleLogin} style={{ width: "100%" }}>LOGIN</Btn>
              <div style={{ textAlign: "center", marginTop: 12 }}>
                <button onClick={() => { setAdminMode(false); setErr(""); }} style={{ background: "none", border: "none", color: C.muted, fontSize: 12, fontFamily: "Inter, sans-serif", cursor: "pointer", textDecoration: "underline" }}>Back</button>
              </div>
            </>
          )}
        </div>

        {/* Add player (quick) — hidden after lock */}
        {new Date() < new Date("2026-06-11T19:00:00Z") && (
        <div style={{ marginTop: 20, background: C.surface, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 12, color: C.muted, marginBottom: 10, fontWeight: 600, letterSpacing: 1 }}>NEW PLAYER? ADD YOUR NAME</div>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              placeholder="Your name"
              value={newPlayer}
              onChange={e => setNewPlayer(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && newPlayer.trim()) { onAddPlayer(newPlayer.trim()); setNewPlayer(""); } }}
              style={{ flex: 1, padding: "8px 12px", background: C.card, color: C.text, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontFamily: "Inter, sans-serif" }}
            />
            <Btn small onClick={() => { if (newPlayer.trim()) { onAddPlayer(newPlayer.trim()); setNewPlayer(""); } }}>ADD</Btn>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

// ── PLAYER VIEW ────────────────────────────────────────────────────────────
function PlayerView({ player, groupMatches, knockoutMatches, picks, allPlayers, allPicks, allMatches, knockoutOpen, knockoutLocked, groupPicksLocked, lastUpdated, announcement, isPaid, paid, onPick, onRenamePlayer, onLogout, activeTab, setActiveTab, onMatchesReloaded }) {
  const myScore = scorePlayer(picks, allMatches);
  const [editingName, setEditingName] = useState(false);
  const [nameVal, setNameVal] = useState(player);
  const [nameErr, setNameErr] = useState("");

  // Pick completion stats
  const totalGroupMatches = groupMatches.length;
  const myGroupPicks = groupMatches.filter(m => picks[m.id]).length;
  const unpickedGroup = totalGroupMatches - myGroupPicks;
  const showPickWarning = !groupPicksLocked && unpickedGroup > 0;

  // Last updated display
  const lastUpdatedStr = lastUpdated ? (() => {
    const d = new Date(lastUpdated);
    const now = new Date();
    const diffMins = Math.floor((now - d) / 60000);
    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHrs = Math.floor(diffMins / 60);
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return d.toLocaleDateString();
  })() : null;

  const handleRename = () => {
    const trimmed = nameVal.trim();
    if (!trimmed) { setNameErr("Name can't be empty."); return; }
    if (trimmed === player) { setEditingName(false); return; }
    if (allPlayers.includes(trimmed)) { setNameErr("That name is already taken."); return; }
    onRenamePlayer(player, trimmed);
    setEditingName(false);
    setNameErr("");
  };

  // Compute rank with tie detection
  const myRank = (() => {
    const scores = allPlayers.map(p => scorePlayer(allPicks[p] || {}, allMatches)).sort((a, b) => b - a);
    const rank = scores.indexOf(myScore) + 1;
    const isTied = scores.filter(s => s === myScore).length > 1;
    const prefix = isTied ? "T-" : "";
    if (rank === 1) return `${prefix}🥇 ${isTied ? "1st" : "1st"}`;
    if (rank === 2) return `${prefix}🥈 ${isTied ? "2nd" : "2nd"}`;
    if (rank === 3) return `${prefix}🥉 ${isTied ? "3rd" : "3rd"}`;
    const suffix = rank % 10 === 1 && rank !== 11 ? "st" : rank % 10 === 2 && rank !== 12 ? "nd" : rank % 10 === 3 && rank !== 13 ? "rd" : "th";
    return `${prefix}${rank}${suffix}`;
  })();

  const tabs = [
    { id: "groups", label: "Group Stage" },
    { id: "knockout", label: "Knockout" },
    { id: "community", label: "Community" },
    { id: "compare", label: "Compare" },
    { id: "leaderboard", label: "Leaderboard" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "Inter, sans-serif", color: C.text }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      {/* Unpaid banner */}
      {!isPaid && (
        <div style={{ background: `${C.red}22`, borderBottom: `1px solid ${C.red}55`, padding: "8px 20px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>💰</span>
          <span style={{ fontSize: 13, color: C.red, fontWeight: 600 }}>Entry fee of $20 not yet paid. Please pay before the first kickoff on Thursday, June 11 at 3:00 PM ET.</span>
        </div>
      )}
      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 20px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>⚽</span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.accent, letterSpacing: 3 }}>WC 2026 PICKS</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {editingName ? (
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <input
                  value={nameVal}
                  onChange={e => { setNameVal(e.target.value); setNameErr(""); }}
                  onKeyDown={e => { if (e.key === "Enter") handleRename(); if (e.key === "Escape") setEditingName(false); }}
                  autoFocus
                  style={{ padding: "4px 8px", background: C.surface, color: C.text, border: `1px solid ${nameErr ? C.red : C.accent}`, borderRadius: 6, fontSize: 13, fontFamily: "Inter, sans-serif", width: 120 }}
                />
                <Btn small onClick={handleRename}>Save</Btn>
                <Btn small variant="ghost" onClick={() => { setEditingName(false); setNameVal(player); setNameErr(""); }}>✕</Btn>
              </div>
            ) : (
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{player}</div>
                  <button onClick={() => { setEditingName(true); setNameVal(player); }} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 12, padding: 0 }} title="Edit name">✏️</button>
                </div>
                <div style={{ fontSize: 12, color: C.gold, fontWeight: 700 }}>{myRank} · {myScore} pts</div>
              </div>
            )}
            <Btn small variant="ghost" onClick={onLogout}>Logout</Btn>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", gap: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "10px 20px", background: "none", border: "none", cursor: "pointer",
              color: activeTab === t.id ? C.accent : C.muted, fontWeight: 600, fontSize: 13,
              borderBottom: activeTab === t.id ? `2px solid ${C.accent}` : "2px solid transparent",
              fontFamily: "Inter, sans-serif", transition: "all .15s",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Commissioner announcement banner */}
      {announcement && announcement.trim() && (
        <div style={{ background: `${C.gold}25`, borderBottom: `1px solid ${C.gold}55`, padding: "10px 20px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>📢</span>
            <span style={{ fontSize: 13, color: C.gold, fontWeight: 600, lineHeight: 1.4 }}>{announcement}</span>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
        {/* Pick completion warning */}
        {showPickWarning && activeTab === "groups" && (
          <div style={{ background: `${C.gold}20`, border: `1px solid ${C.gold}55`, borderRadius: 10, padding: "10px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>⚠️</span>
            <div>
              <span style={{ fontSize: 13, color: C.gold, fontWeight: 700 }}>You have {unpickedGroup} unpicked match{unpickedGroup !== 1 ? "es" : ""}!</span>
              <span style={{ fontSize: 12, color: C.textDim, marginLeft: 8 }}>Picks lock at 3:00 PM ET on June 11.</span>
            </div>
          </div>
        )}
        {activeTab === "groups" && (
          <GroupPicksTab groupMatches={groupMatches} picks={picks} onPick={groupPicksLocked ? null : onPick} groupPicksLocked={groupPicksLocked} allPicks={allPicks} allPlayers={allPlayers} />
        )}
        {activeTab === "knockout" && (
          <KnockoutPicksTab knockoutMatches={knockoutMatches} picks={picks} onPick={onPick} knockoutOpen={knockoutOpen} knockoutLocked={knockoutLocked} allPicks={allPicks} allPlayers={allPlayers} />
        )}
        {activeTab === "community" && (
          <CommunityPicksTab groupMatches={groupMatches} knockoutMatches={knockoutMatches} allPicks={allPicks} allPlayers={allPlayers} groupPicksLocked={groupPicksLocked} knockoutLocked={knockoutLocked} />
        )}
        {activeTab === "compare" && (
          <CompareTab groupMatches={groupMatches} knockoutMatches={knockoutMatches} allPicks={allPicks} allPlayers={allPlayers} currentPlayer={player} groupPicksLocked={groupPicksLocked} knockoutLocked={knockoutLocked} />
        )}
        {activeTab === "leaderboard" && (
          <LeaderboardTab allPlayers={allPlayers} allPicks={allPicks} allMatches={allMatches} currentPlayer={player} lastUpdated={lastUpdatedStr} isCommissioner={false} groupPicksLocked={groupPicksLocked} paid={paid} onMatchesReloaded={onMatchesReloaded} />
        )}
      </div>
    </div>
  );
}

// ── Community picks helpers ────────────────────────────────────────────────
function getPickBreakdown(matchId, allPicks, allPlayers) {
  let home = 0, draw = 0, away = 0, total = 0;
  allPlayers.forEach(p => {
    const pick = allPicks[p]?.[matchId];
    if (!pick) return;
    total++;
    if (pick === "home") home++;
    else if (pick === "draw") draw++;
    else if (pick === "away") away++;
  });
  return { home, draw, away, total };
}

function PickBreakdownBar({ matchId, allPicks, allPlayers, homeLabel, awayLabel, allowDraw }) {
  const { home, draw, away, total } = getPickBreakdown(matchId, allPicks, allPlayers);
  if (total === 0) return <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>No picks yet</div>;
  const pct = v => Math.round((v / total) * 100);
  const segments = [
    { label: homeLabel, value: home, color: C.accent },
    ...(allowDraw ? [{ label: "Draw", value: draw, color: C.muted }] : []),
    { label: awayLabel, value: away, color: C.gold },
  ];
  return (
    <div style={{ marginTop: 8 }}>
      <div style={{ display: "flex", borderRadius: 4, overflow: "hidden", height: 6, gap: 1 }}>
        {segments.map(s => s.value > 0 && (
          <div key={s.label} style={{ width: `${pct(s.value)}%`, background: s.color, transition: "width .3s" }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
        {segments.map(s => (
          <span key={s.label} style={{ fontSize: 11, color: s.color, fontWeight: 600 }}>
            {s.label} {pct(s.value)}% <span style={{ color: C.muted, fontWeight: 400 }}>({s.value})</span>
          </span>
        ))}
        <span style={{ fontSize: 11, color: C.muted }}>{total} picks total</span>
      </div>
    </div>
  );
}

// Group picks tab
function GroupPicksTab({ groupMatches, picks, onPick, groupPicksLocked, allPicks, allPlayers }) {
  const byDate = {};
  groupMatches.forEach(m => {
    if (!byDate[m.date]) byDate[m.date] = [];
    byDate[m.date].push(m);
  });

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, color: C.accent }}>GROUP STAGE PICKS</div>
        {groupPicksLocked ? (
          <div style={{ marginTop: 8, background: `${C.red}22`, border: `1px solid ${C.red}55`, borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>🔒</span>
            <span style={{ fontSize: 13, color: C.red, fontWeight: 600 }}>Group stage picks are locked — tournament has started!</span>
          </div>
        ) : (
          <div style={{ fontSize: 13, color: C.textDim, marginTop: 4 }}>Pick the winner or draw for each match. <span style={{ color: C.green, fontWeight: 600 }}>+2 pts</span> for correct pick. Picks lock at <span style={{ color: C.gold, fontWeight: 600 }}>3:00 PM ET on June 11</span>.</div>
        )}
      </div>
      {Object.entries(byDate).map(([date, matches]) => (
        <div key={date} style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: C.gold, letterSpacing: 2, marginBottom: 10 }}>{date}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {matches.map(m => (
              <div key={m.id}>
                <MatchPickRow match={m} pick={picks[m.id]} onPick={onPick} allowDraw />
                {groupPicksLocked && (
                  <div style={{ padding: "0 4px", marginTop: 2 }}>
                    <PickBreakdownBar matchId={m.id} allPicks={allPicks} allPlayers={allPlayers} homeLabel={m.home.split(" ")[0]} awayLabel={m.away.split(" ")[0]} allowDraw />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Knockout picks tab
// ── KNOCKOUT BRACKET ───────────────────────────────────────────────────────
function KnockoutPicksTab({ knockoutMatches, picks, onPick, knockoutOpen, knockoutLocked, allPicks, allPlayers }) {
  if (!knockoutOpen) return (
    <div style={{ textAlign: "center", padding: 60 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.muted, letterSpacing: 3 }}>KNOCKOUT STAGE LOCKED</div>
      <div style={{ color: C.textDim, marginTop: 8, fontSize: 14 }}>The commissioner will open picks once the group stage is complete.</div>
    </div>
  );

  const totalPicks = ["R32","R16","QF","SF","F"].reduce((acc, r) => {
    const matches = knockoutMatches.filter(m => m.round === r);
    return acc + matches.filter(m => picks[m.id]).length;
  }, 0);
  const totalMatches = 31;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, color: C.accent }}>KNOCKOUT BRACKET</div>
        {knockoutLocked
          ? <div style={{ fontSize: 13, color: C.gold, marginTop: 4, fontWeight: 600 }}>🔒 Picks locked — bracket updating as results come in!</div>
          : <div style={{ fontSize: 13, color: C.textDim, marginTop: 4 }}>Pick winners round by round — your picks cascade through the bracket automatically. <span style={{ color: C.gold, fontWeight: 600 }}>{totalPicks}/{totalMatches} picks made.</span></div>
        }
        <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>R32=3pts · R16=5pts · QF=7pts · SF=10pts · Final=15pts</div>
      </div>
      <BracketView knockoutMatches={knockoutMatches} picks={picks} onPick={knockoutLocked ? null : onPick} />
    </div>
  );
}

function BracketView({ knockoutMatches, picks, onPick }) {
  // Split into left half (matches 1-8) and right half (matches 9-16)
  const r32 = knockoutMatches.filter(m => m.round === "R32");
  const leftR32  = r32.slice(0, 8);   // R32-1 to R32-8
  const rightR32 = r32.slice(8, 16);  // R32-9 to R32-16

  const leftR16  = knockoutMatches.filter(m => m.round === "R16").slice(0, 4);
  const rightR16 = knockoutMatches.filter(m => m.round === "R16").slice(4, 8);
  const leftQF   = knockoutMatches.filter(m => m.round === "QF").slice(0, 2);
  const rightQF  = knockoutMatches.filter(m => m.round === "QF").slice(2, 4);
  const leftSF   = knockoutMatches.filter(m => m.round === "SF").slice(0, 1);
  const rightSF  = knockoutMatches.filter(m => m.round === "SF").slice(1, 2);
  const final    = knockoutMatches.filter(m => m.round === "F");

  return (
    <div style={{ overflowX: "auto", paddingBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 0, minWidth: 900 }}>
        {/* Left side — rounds flow left to right toward center */}
        <BracketColumn matches={leftR32}  round="R32" side="left"  picks={picks} onPick={onPick} knockoutMatches={knockoutMatches} label="Round of 32" />
        <BracketConnectors count={4} />
        <BracketColumn matches={leftR16}  round="R16" side="left"  picks={picks} onPick={onPick} knockoutMatches={knockoutMatches} label="Round of 16" />
        <BracketConnectors count={2} />
        <BracketColumn matches={leftQF}   round="QF"  side="left"  picks={picks} onPick={onPick} knockoutMatches={knockoutMatches} label="Quarterfinals" />
        <BracketConnectors count={1} />
        <BracketColumn matches={leftSF}   round="SF"  side="left"  picks={picks} onPick={onPick} knockoutMatches={knockoutMatches} label="Semifinals" />
        <BracketConnectors count={0} half />

        {/* Final in center */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0, width: 120 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 13, color: C.gold, letterSpacing: 2, marginBottom: 4 }}>FINAL</div>
          {final.map(m => <BracketMatch key={m.id} match={m} picks={picks} onPick={onPick} knockoutMatches={knockoutMatches} isFinal />)}
        </div>

        {/* Right side — rounds flow right to left toward center */}
        <BracketConnectors count={0} half right />
        <BracketColumn matches={rightSF}  round="SF"  side="right" picks={picks} onPick={onPick} knockoutMatches={knockoutMatches} label="Semifinals" />
        <BracketConnectors count={1} right />
        <BracketColumn matches={rightQF}  round="QF"  side="right" picks={picks} onPick={onPick} knockoutMatches={knockoutMatches} label="Quarterfinals" />
        <BracketConnectors count={2} right />
        <BracketColumn matches={rightR16} round="R16" side="right" picks={picks} onPick={onPick} knockoutMatches={knockoutMatches} label="Round of 16" />
        <BracketConnectors count={4} right />
        <BracketColumn matches={rightR32} round="R32" side="right" picks={picks} onPick={onPick} knockoutMatches={knockoutMatches} label="Round of 32" />
      </div>
    </div>
  );
}

function BracketColumn({ matches, round, side, picks, onPick, knockoutMatches, label }) {
  const pts = KNOCKOUT_PTS[round];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 1, marginBottom: 6, whiteSpace: "nowrap", fontFamily: "Inter, sans-serif" }}>
        {label} <span style={{ color: C.accentDim }}>+{pts}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", height: matchColumnHeight(round) }}>
        {matches.map(m => (
          <BracketMatch key={m.id} match={m} picks={picks} onPick={onPick} knockoutMatches={knockoutMatches} />
        ))}
      </div>
    </div>
  );
}

function matchColumnHeight(round) {
  const heights = { R32: 720, R16: 720, QF: 720, SF: 720, F: 720 };
  return heights[round] || 720;
}

function BracketConnectors({ count, half, right }) {
  // Simple spacer — visual connectors via CSS borders
  return <div style={{ width: 16, flexShrink: 0 }} />;
}

function BracketMatch({ match, picks, onPick, knockoutMatches, isFinal }) {
  const feeds = BRACKET_FEEDS[match.id];

  // Derive the two teams from picks cascade or commissioner data
  let teamA, teamB;
  if (match.round === "R32") {
    teamA = match.home || null;
    teamB = match.away || null;
  } else if (feeds) {
    teamA = getPickedWinner(feeds[0], picks, knockoutMatches) || null;
    teamB = getPickedWinner(feeds[1], picks, knockoutMatches) || null;
  }

  const myPick = picks[match.id];
  const pickedTeam = myPick === "home" ? teamA : myPick === "away" ? teamB : null;
  const actualWinner = getActualWinner(match.id, knockoutMatches);
  const isCorrect = actualWinner && pickedTeam === actualWinner;
  const isWrong = actualWinner && pickedTeam && pickedTeam !== actualWinner;

  const handlePick = (team) => {
    if (!onPick || !team) return;
    const val = team === teamA ? "home" : "away";
    onPick(match.id, picks[match.id] === val ? null : val);
  };

  const TeamRow = ({ team, isHome }) => {
    if (!team) return (
      <div style={{ padding: "5px 8px", fontSize: 11, color: C.muted, fontStyle: "italic", borderRadius: 4 }}>TBD</div>
    );
    const isPicked = pickedTeam === team;
    const isActualWinner = actualWinner === team;
    const isActualLoser = actualWinner && actualWinner !== team;
    return (
      <button
        onClick={() => handlePick(team)}
        disabled={!onPick || !!actualWinner}
        style={{
          display: "flex", alignItems: "center", gap: 4,
          padding: "5px 7px", width: "100%", textAlign: "left",
          background: isActualWinner ? `${C.green}25` : isPicked && !actualWinner ? `${C.accent}20` : "transparent",
          border: "none",
          borderRadius: 4,
          cursor: onPick && !actualWinner && team ? "pointer" : "default",
          opacity: isActualLoser ? 0.4 : 1,
          transition: "all .12s",
        }}
      >
        <span style={{ fontSize: 13 }}>{f(team)}</span>
        <span style={{ fontSize: 11, fontWeight: isPicked || isActualWinner ? 700 : 400, color: isActualWinner ? C.green : isPicked ? C.accent : C.text, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {team.length > 10 ? team.split(" ").map(w => w[0]).join("") : team}
        </span>
        {isPicked && !actualWinner && <span style={{ fontSize: 9, color: C.accent }}>✓</span>}
        {isActualWinner && <span style={{ fontSize: 10 }}>{isCorrect ? "✅" : "❌"}</span>}
      </button>
    );
  };

  return (
    <div style={{
      width: isFinal ? 110 : 105,
      background: C.card,
      border: `1px solid ${isCorrect ? C.green : isWrong ? C.red + "88" : C.border}`,
      borderRadius: 6,
      overflow: "hidden",
      margin: "3px 0",
      flexShrink: 0,
    }}>
      <TeamRow team={teamA} isHome={true} />
      <div style={{ height: 1, background: C.border }} />
      <TeamRow team={teamB} isHome={false} />
    </div>
  );
}

// Single match pick row
function MatchPickRow({ match, pick, onPick, allowDraw, locked }) {
  const hasResult = !!match.result;
  const correct = hasResult && pick === match.result;
  const wrong = hasResult && pick && pick !== match.result;
  const isLocked = locked || hasResult;

  const winnerTeam = hasResult ? (match.result === "home" ? match.home : match.result === "away" ? match.away : "Draw") : null;

  const btn = (value, label) => {
    const active = pick === value;
    const isCorrect = hasResult && value === match.result;
    const isWrong = hasResult && active && value !== match.result;
    return (
      <button
        onClick={isLocked ? undefined : () => onPick && onPick(match.id, value)}
        style={{
          padding: "6px 14px",
          borderRadius: 6,
          border: `1.5px solid ${isCorrect ? C.green : isWrong ? C.red : active ? C.accent : C.border}`,
          background: isCorrect ? `${C.green}22` : isWrong ? `${C.red}22` : active ? `${C.accent}22` : "transparent",
          color: isCorrect ? C.green : isWrong ? C.red : active ? C.accent : C.muted,
          fontWeight: 700,
          fontSize: 12,
          cursor: isLocked ? "default" : "pointer",
          fontFamily: "Inter, sans-serif",
          transition: "all .12s",
          flexShrink: 0,
        }}
      >{label}</button>
    );
  };

  const noTeams = !match.home && !match.away;

  return (
    <div style={{
      background: C.card,
      borderRadius: 10,
      padding: "12px 16px",
      border: `1px solid ${correct ? C.green + "55" : wrong ? C.red + "33" : C.border}`,
      display: "flex",
      alignItems: "center",
      gap: 12,
      opacity: noTeams ? 0.4 : 1,
    }}>
      {/* Teams */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>{f(match.home)}</span>
          <span style={{ fontWeight: 600, fontSize: 13, color: match.result === "home" ? C.green : C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{match.home || "TBD"}</span>
          <span style={{ color: C.muted, fontSize: 12, margin: "0 4px" }}>vs</span>
          <span style={{ fontSize: 16 }}>{f(match.away)}</span>
          <span style={{ fontWeight: 600, fontSize: 13, color: match.result === "away" ? C.green : C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{match.away || "TBD"}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {match.time && <span style={{ fontSize: 11, color: C.muted }}>Group {match.group} · {match.time}</span>}
          {hasResult && (
            <span style={{ fontSize: 11, fontWeight: 700, color: C.green }}>
              ✓ {winnerTeam === "Draw" ? "Draw" : `${f(winnerTeam)} ${winnerTeam} wins`}
            </span>
          )}
        </div>
      </div>
      {/* Picks */}
      {!noTeams && (
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {btn("home", match.home.split(" ")[0] || "Home")}
          {allowDraw && btn("draw", "Draw")}
          {btn("away", match.away.split(" ")[0] || "Away")}
        </div>
      )}
      {hasResult && (
        <span style={{ marginLeft: 4, fontSize: 16 }}>{correct ? "✅" : wrong ? "❌" : ""}</span>
      )}
    </div>
  );
}

// ── COMMUNITY PICKS TAB ────────────────────────────────────────────────────
function CommunityPicksTab({ groupMatches, knockoutMatches, allPicks, allPlayers, groupPicksLocked, knockoutLocked }) {
  const [section, setSection] = useState("groups");

  if (!groupPicksLocked) return (
    <div style={{ textAlign: "center", padding: 60 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.muted, letterSpacing: 3 }}>AVAILABLE AFTER LOCK</div>
      <div style={{ color: C.textDim, marginTop: 8, fontSize: 14 }}>Community picks will be revealed once the group stage locks at 3:00 PM ET on June 11.</div>
    </div>
  );

  const byDate = {};
  groupMatches.forEach(m => {
    if (!byDate[m.date]) byDate[m.date] = [];
    byDate[m.date].push(m);
  });

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, color: C.accent }}>COMMUNITY PICKS</div>
        <div style={{ fontSize: 13, color: C.textDim, marginTop: 4 }}>See how everyone picked each match.</div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["groups", "knockout"].map(s => (
          <button key={s} onClick={() => setSection(s)} style={{ padding: "6px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer", background: section === s ? C.accent : "transparent", color: section === s ? "#000" : C.muted, border: `1px solid ${section === s ? C.accent : C.border}`, fontFamily: "Inter, sans-serif" }}>
            {s === "groups" ? "Group Stage" : "Knockout"}
          </button>
        ))}
      </div>

      {section === "groups" && Object.entries(byDate).map(([date, matches]) => (
        <div key={date} style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: C.gold, letterSpacing: 2, marginBottom: 10 }}>{date}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {matches.map(m => {
              const { home, draw, away, total } = getPickBreakdown(m.id, allPicks, allPlayers);
              const pct = v => total > 0 ? Math.round((v / total) * 100) : 0;
              const segs = [
                { label: m.home.split(" ")[0], count: home, color: C.accent },
                { label: "Draw", count: draw, color: C.muted },
                { label: m.away.split(" ")[0], count: away, color: C.gold },
              ];
              return (
                <div key={m.id} style={{ background: C.card, borderRadius: 10, padding: "14px 16px", border: `1px solid ${m.result ? C.green + "44" : C.border}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 16 }}>{f(m.home)}</span>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{m.home}</span>
                    <span style={{ color: C.muted, fontSize: 12 }}>vs</span>
                    <span style={{ fontSize: 16 }}>{f(m.away)}</span>
                    <span style={{ fontWeight: 600, fontSize: 13 }}>{m.away}</span>
                    {m.result && <Badge color={C.green}>✓ Result In</Badge>}
                    <span style={{ marginLeft: "auto", fontSize: 11, color: C.muted }}>{m.time}</span>
                  </div>
                  <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 24, gap: 1 }}>
                    {segs.map(seg => pct(seg.count) > 0 && (
                      <div key={seg.label} style={{ width: `${pct(seg.count)}%`, background: seg.color + "44", border: `1px solid ${seg.color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: seg.color, overflow: "hidden", whiteSpace: "nowrap", padding: "0 4px", transition: "width .3s" }}>
                        {pct(seg.count) > 10 ? `${pct(seg.count)}%` : ""}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 14, marginTop: 6, flexWrap: "wrap" }}>
                    {segs.map(seg => (
                      <span key={seg.label} style={{ fontSize: 12, color: seg.color, fontWeight: 600 }}>
                        {seg.label} {pct(seg.count)}% <span style={{ color: C.muted, fontWeight: 400 }}>({seg.count})</span>
                      </span>
                    ))}
                    <span style={{ fontSize: 11, color: C.muted, marginLeft: "auto" }}>{total} picks</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {section === "knockout" && !knockoutLocked && (
        <div style={{ textAlign: "center", padding: 40, color: C.muted, fontSize: 14 }}>Knockout picks haven't been locked yet.</div>
      )}

      {section === "knockout" && knockoutLocked && KNOCKOUT_ROUNDS.map(({ round, label, pts }) => {
        const rMatches = knockoutMatches.filter(m => m.round === round && m.home && m.away);
        if (rMatches.length === 0) return null;
        return (
          <div key={round} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: C.gold, letterSpacing: 2 }}>{label}</div>
              <Badge color={C.accentDim}>{pts} pts</Badge>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {rMatches.map(m => {
                const { home, away, total } = getPickBreakdown(m.id, allPicks, allPlayers);
                const pct = v => total > 0 ? Math.round((v / total) * 100) : 0;
                const segs = [
                  { label: m.home.split(" ")[0], count: home, color: C.accent },
                  { label: m.away.split(" ")[0], count: away, color: C.gold },
                ];
                return (
                  <div key={m.id} style={{ background: C.card, borderRadius: 10, padding: "14px 16px", border: `1px solid ${m.result ? C.green + "44" : C.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 16 }}>{f(m.home)}</span>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{m.home}</span>
                      <span style={{ color: C.muted, fontSize: 12 }}>vs</span>
                      <span style={{ fontSize: 16 }}>{f(m.away)}</span>
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{m.away}</span>
                      {m.result && <Badge color={C.green}>✓ Result In</Badge>}
                    </div>
                    <div style={{ display: "flex", borderRadius: 6, overflow: "hidden", height: 24, gap: 1 }}>
                      {segs.map(seg => pct(seg.count) > 0 && (
                        <div key={seg.label} style={{ width: `${pct(seg.count)}%`, background: seg.color + "44", border: `1px solid ${seg.color}66`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: seg.color, overflow: "hidden", whiteSpace: "nowrap", padding: "0 4px", transition: "width .3s" }}>
                          {pct(seg.count) > 10 ? `${pct(seg.count)}%` : ""}
                        </div>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 14, marginTop: 6 }}>
                      {segs.map(seg => (
                        <span key={seg.label} style={{ fontSize: 12, color: seg.color, fontWeight: 600 }}>
                          {seg.label} {pct(seg.count)}% <span style={{ color: C.muted, fontWeight: 400 }}>({seg.count})</span>
                        </span>
                      ))}
                      <span style={{ fontSize: 11, color: C.muted, marginLeft: "auto" }}>{total} picks</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── COMPARE TAB ────────────────────────────────────────────────────────────
function CompareTab({ groupMatches, knockoutMatches, allPicks, allPlayers, currentPlayer, groupPicksLocked, knockoutLocked }) {
  const [selected, setSelected] = useState([]);
  const [section, setSection] = useState("groups");

  if (!groupPicksLocked) return (
    <div style={{ textAlign: "center", padding: 60 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.muted, letterSpacing: 3 }}>AVAILABLE AFTER LOCK</div>
      <div style={{ color: C.textDim, marginTop: 8, fontSize: 14 }}>Pick comparisons are revealed after group stage locks at 3:00 PM ET on June 11.</div>
    </div>
  );

  const togglePlayer = (name) => {
    setSelected(prev => prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name]);
  };

  const comparePlayers = [currentPlayer, ...selected.filter(p => p !== currentPlayer)];
  const otherPlayers = allPlayers.filter(p => p !== currentPlayer);

  const byDate = {};
  groupMatches.forEach(m => {
    if (!byDate[m.date]) byDate[m.date] = [];
    byDate[m.date].push(m);
  });

  const pickLabel = (pick, match) => {
    if (!pick) return { label: "—", color: C.muted };
    if (pick === "home") return { label: match.home.split(" ")[0], color: C.accent };
    if (pick === "away") return { label: match.away.split(" ")[0], color: C.gold };
    return { label: "Draw", color: C.muted };
  };

  const pickResult = (pick, match) => {
    if (!match.result || !pick) return null;
    return pick === match.result ? "correct" : "wrong";
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, color: C.accent }}>COMPARE PICKS</div>
        <div style={{ fontSize: 13, color: C.textDim, marginTop: 4 }}>Select players to compare your picks side by side.</div>
      </div>

      {/* Player selector */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.muted, fontWeight: 600, marginBottom: 8, letterSpacing: 1 }}>SELECT PLAYERS TO COMPARE:</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {otherPlayers.map(p => (
            <button key={p} onClick={() => togglePlayer(p)} style={{
              padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer",
              background: selected.includes(p) ? `${C.accent}22` : "transparent",
              border: `1.5px solid ${selected.includes(p) ? C.accent : C.border}`,
              color: selected.includes(p) ? C.accent : C.muted,
              fontFamily: "Inter, sans-serif",
            }}>{p}</button>
          ))}
        </div>
      </div>

      {comparePlayers.length < 2 ? (
        <div style={{ color: C.muted, fontSize: 14, textAlign: "center", padding: 30 }}>Select at least one other player to compare.</div>
      ) : (
        <>
          {/* Section toggle */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {["groups", "knockout"].map(s => (
              <button key={s} onClick={() => setSection(s)} style={{
                padding: "6px 18px", borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: "pointer",
                background: section === s ? C.accent : "transparent",
                color: section === s ? "#000" : C.muted,
                border: `1px solid ${section === s ? C.accent : C.border}`,
                fontFamily: "Inter, sans-serif",
              }}>{s === "groups" ? "Group Stage" : "Knockout"}</button>
            ))}
          </div>

          {section === "groups" && (
            <div style={{ overflowX: "auto" }}>
              {Object.entries(byDate).map(([date, matches]) => (
                <div key={date} style={{ marginBottom: 24 }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: C.gold, letterSpacing: 2, marginBottom: 8 }}>{date}</div>
                  {/* Header row */}
                  <div style={{ display: "flex", gap: 4, marginBottom: 4, minWidth: 400 }}>
                    <div style={{ width: 160, flexShrink: 0, fontSize: 11, color: C.muted, fontWeight: 600 }}>MATCH</div>
                    {comparePlayers.map(p => (
                      <div key={p} style={{ flex: 1, minWidth: 70, fontSize: 11, color: p === currentPlayer ? C.accent : C.textDim, fontWeight: 700, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {p === currentPlayer ? "YOU" : p.split(" ")[0].toUpperCase()}
                      </div>
                    ))}
                  </div>
                  {matches.map(m => (
                    <div key={m.id} style={{ display: "flex", gap: 4, marginBottom: 4, minWidth: 400, alignItems: "center" }}>
                      <div style={{ width: 160, flexShrink: 0, fontSize: 12, color: C.textDim }}>
                        {f(m.home)} {m.home.split(" ")[0]} vs {f(m.away)} {m.away.split(" ")[0]}
                        {m.result && <span style={{ fontSize: 10, color: C.green, marginLeft: 4 }}>✓</span>}
                      </div>
                      {comparePlayers.map(p => {
                        const pick = allPicks[p]?.[m.id];
                        const { label, color } = pickLabel(pick, m);
                        const res = pickResult(pick, m);
                        return (
                          <div key={p} style={{
                            flex: 1, minWidth: 70, textAlign: "center", padding: "4px 4px",
                            background: res === "correct" ? `${C.green}20` : res === "wrong" ? `${C.red}15` : C.card,
                            borderRadius: 6, border: `1px solid ${res === "correct" ? C.green + "44" : res === "wrong" ? C.red + "33" : C.border}`,
                            fontSize: 11, fontWeight: 700, color: res ? (res === "correct" ? C.green : C.red) : color,
                          }}>
                            {label} {res === "correct" ? "✅" : res === "wrong" ? "❌" : ""}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {section === "knockout" && !knockoutLocked && (
            <div style={{ textAlign: "center", padding: 40, color: C.muted, fontSize: 14 }}>Knockout picks aren't locked yet.</div>
          )}

          {section === "knockout" && knockoutLocked && (
            <div style={{ overflowX: "auto" }}>
              {KNOCKOUT_ROUNDS.map(({ round, label }) => {
                const rMatches = knockoutMatches.filter(m => m.round === round && m.home && m.away);
                if (rMatches.length === 0) return null;
                return (
                  <div key={round} style={{ marginBottom: 24 }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: C.gold, letterSpacing: 2, marginBottom: 8 }}>{label}</div>
                    <div style={{ display: "flex", gap: 4, marginBottom: 4, minWidth: 400 }}>
                      <div style={{ width: 160, flexShrink: 0, fontSize: 11, color: C.muted, fontWeight: 600 }}>MATCH</div>
                      {comparePlayers.map(p => (
                        <div key={p} style={{ flex: 1, minWidth: 70, fontSize: 11, color: p === currentPlayer ? C.accent : C.textDim, fontWeight: 700, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {p === currentPlayer ? "YOU" : p.split(" ")[0].toUpperCase()}
                        </div>
                      ))}
                    </div>
                    {rMatches.map(m => (
                      <div key={m.id} style={{ display: "flex", gap: 4, marginBottom: 4, minWidth: 400, alignItems: "center" }}>
                        <div style={{ width: 160, flexShrink: 0, fontSize: 12, color: C.textDim }}>
                          {f(m.home)} {m.home.split(" ")[0]} vs {f(m.away)} {m.away.split(" ")[0]}
                          {m.result && <span style={{ fontSize: 10, color: C.green, marginLeft: 4 }}>✓</span>}
                        </div>
                        {comparePlayers.map(p => {
                          const pick = allPicks[p]?.[m.id];
                          const pickedTeam = pick ? getPickedWinner(m.id, allPicks[p] || {}, knockoutMatches) : null;
                          const actualWinner = getActualWinner(m.id, knockoutMatches);
                          const res = actualWinner && pickedTeam ? (pickedTeam === actualWinner ? "correct" : "wrong") : null;
                          const label = pickedTeam ? (pickedTeam.split(" ")[0]) : "—";
                          return (
                            <div key={p} style={{
                              flex: 1, minWidth: 70, textAlign: "center", padding: "4px 4px",
                              background: res === "correct" ? `${C.green}20` : res === "wrong" ? `${C.red}15` : C.card,
                              borderRadius: 6, border: `1px solid ${res === "correct" ? C.green + "44" : res === "wrong" ? C.red + "33" : C.border}`,
                              fontSize: 11, fontWeight: 700, color: res ? (res === "correct" ? C.green : C.red) : C.textDim,
                            }}>
                              {label} {res === "correct" ? "✅" : res === "wrong" ? "❌" : ""}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Max points still available to a player
function maxPossibleScore(playerPicks, allMatches) {
  const knockoutMatches = allMatches.filter(m => m.stage === "knockout");
  let pts = 0;
  allMatches.forEach(m => {
    if (m.stage === "group") {
      if (!m.result) pts += 2; // unpicked or unresolved
      else if (playerPicks[m.id] === m.result) pts += 2; // already correct
    } else {
      if (!m.result) pts += KNOCKOUT_PTS[m.round] || 0; // not resolved yet
      else {
        const actualWinner = getActualWinner(m.id, knockoutMatches);
        const pickedWinner = getPickedWinner(m.id, playerPicks, knockoutMatches);
        if (actualWinner && pickedWinner === actualWinner) pts += KNOCKOUT_PTS[m.round] || 0;
      }
    }
  });
  return pts;
}

// Score breakdown per player
function scoreBreakdown(playerPicks, allMatches) {
  const knockoutMatches = allMatches.filter(m => m.stage === "knockout");
  let groupPts = 0, groupCorrect = 0, groupTotal = 0;
  const koBreakdown = { R32: 0, R16: 0, QF: 0, SF: 0, F: 0 };

  allMatches.forEach(m => {
    if (!m.result) return;
    if (m.stage === "group") {
      groupTotal++;
      if (playerPicks[m.id] === m.result) { groupPts += 2; groupCorrect++; }
    } else {
      const actualWinner = getActualWinner(m.id, knockoutMatches);
      const pickedWinner = getPickedWinner(m.id, playerPicks, knockoutMatches);
      if (actualWinner && pickedWinner === actualWinner) koBreakdown[m.round] = (koBreakdown[m.round] || 0) + (KNOCKOUT_PTS[m.round] || 0);
    }
  });
  return { groupPts, groupCorrect, groupTotal, koBreakdown };
}

// Most popular wrong pick
function getMostPopularWrongPick(allMatches, allPicks, allPlayers) {
  const groupMatches = allMatches.filter(m => m.stage === "group" && m.result);
  let worst = null;
  let worstCount = 0;
  groupMatches.forEach(m => {
    let wrongCount = 0;
    allPlayers.forEach(p => {
      const pick = allPicks[p]?.[m.id];
      if (pick && pick !== m.result) wrongCount++;
    });
    if (wrongCount > worstCount) {
      worstCount = wrongCount;
      const wrongPick = allPlayers.map(p => allPicks[p]?.[m.id]).find(pk => pk && pk !== m.result);
      const wrongTeam = wrongPick === "home" ? m.home : wrongPick === "away" ? m.away : "Draw";
      worst = { match: `${m.home} vs ${m.away}`, wrongTeam, count: wrongCount, total: allPlayers.filter(p => allPicks[p]?.[m.id]).length };
    }
  });
  return worst;
}

// Leaderboard
function LeaderboardTab({ allPlayers, allPicks, allMatches, currentPlayer, lastUpdated, isCommissioner, groupPicksLocked, paid, onMatchesReloaded }) {
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState(null);
  const knockoutMatches = allMatches.filter(m => m.stage === "knockout");
  const anyResults = allMatches.some(m => m.result);

  // Payout calc
  const paidCount = paid ? allPlayers.filter(p => paid[p]).length : 0;
  const totalPot = paidCount * 20;
  const roundTo5 = v => Math.round(v / 5) * 5;
  const payout1 = roundTo5(totalPot * 0.65);
  const payout2 = roundTo5(totalPot * 0.25);
  const payout3 = totalPot - payout1 - payout2;

  const handleRefresh = async () => {
    setRefreshing(true);
    setRefreshMsg(null);
    try {
      const res = await fetch("/api/sync-scores");
      const data = await res.json();
      if (data.success || data.message) {
        // Reload match data from Supabase so UI reflects any updates
        const [gm, km, lu] = await Promise.all([
          loadState("wc_group_matches"),
          loadState("wc_knockout_matches"),
          loadState("wc_last_updated"),
        ]);
        if (onMatchesReloaded) onMatchesReloaded(gm, km, lu);
        if (data.success) {
          setRefreshMsg(data.total > 0 ? `✓ Updated ${data.total} result${data.total !== 1 ? "s" : ""}` : "✓ Already up to date");
        } else {
          setRefreshMsg("✓ No new results yet");
        }
      } else {
        setRefreshMsg(`✗ ${data.error || "Sync failed"}`);
      }
    } catch (e) {
      setRefreshMsg(`✗ ${e.message || "Could not reach sync server"}`);
    }
    setRefreshing(false);
    setTimeout(() => setRefreshMsg(null), 5000);
  };

  const scored = allPlayers
    .map(p => ({
      name: p,
      pts: scorePlayer(allPicks[p] || {}, allMatches),
      maxPts: maxPossibleScore(allPicks[p] || {}, allMatches),
      breakdown: scoreBreakdown(allPicks[p] || {}, allMatches),
    }))
    .sort((a, b) => b.pts - a.pts);

  // Calculate tied ranks
  const getRank = (idx) => {
    const pts = scored[idx].pts;
    const rank = scored.findIndex(p => p.pts === pts) + 1;
    const isTied = scored.filter(p => p.pts === pts).length > 1;
    const suffix = rank === 1 ? "st" : rank === 2 ? "nd" : rank === 3 ? "rd" : "th";
    return { rank, isTied, label: `${isTied ? "T-" : ""}${rank}${isTied ? "" : suffix}` };
  };

  const medalFor = (rank) => rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;
  const wrongPick = anyResults ? getMostPopularWrongPick(allMatches, allPicks, allPlayers) : null;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, color: C.accent }}>LEADERBOARD</div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {lastUpdated && (
            <span style={{ fontSize: 11, color: C.muted, fontFamily: "Inter, sans-serif" }}>🕐 Updated {lastUpdated}</span>
          )}
          {refreshMsg && (
            <span style={{ fontSize: 12, fontWeight: 600, color: refreshMsg.startsWith("✓") ? C.green : C.red, fontFamily: "Inter, sans-serif" }}>{refreshMsg}</span>
          )}
          {isCommissioner && (
            <Btn small variant="ghost" onClick={handleRefresh} disabled={refreshing}>
              {refreshing ? "⟳ Syncing…" : "⟳ Refresh Scores"}
            </Btn>
          )}
        </div>
      </div>

      {/* Pot + payouts banner — visible after group stage locks */}
      {groupPicksLocked && totalPot > 0 && (
        <div style={{ background: `${C.gold}15`, border: `1px solid ${C.gold}44`, borderRadius: 12, padding: "14px 20px", marginBottom: 20, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: 1 }}>TOTAL POT</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.gold }}>${totalPot}</div>
          </div>
          <div style={{ width: 1, height: 36, background: C.border, flexShrink: 0 }} />
          {[
            { icon: "🥇", label: "1st", amount: payout1 },
            { icon: "🥈", label: "2nd", amount: payout2 },
            { icon: "🥉", label: "3rd", amount: payout3 },
          ].map(row => (
            <div key={row.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13 }}>{row.icon} {row.label}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.gold }}>${row.amount}</div>
            </div>
          ))}
        </div>
      )}

      {/* Most popular wrong pick */}
      {wrongPick && wrongPick.count > 0 && (
        <div style={{ background: `${C.red}15`, border: `1px solid ${C.red}44`, borderRadius: 10, padding: "10px 16px", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>😬</span>
          <div>
            <span style={{ fontSize: 13, color: C.red, fontWeight: 700 }}>Most popular wrong pick:</span>
            <span style={{ fontSize: 13, color: C.textDim, marginLeft: 6 }}>{wrongPick.wrongTeam} in {wrongPick.match} — {wrongPick.count}/{wrongPick.total} players got it wrong</span>
          </div>
        </div>
      )}

      {scored.length === 0 && <div style={{ color: C.muted, fontSize: 14 }}>No players yet.</div>}
      {scored.map((p, i) => {
        const { rank, isTied, label } = getRank(i);
        const medal = medalFor(rank);
        return (
        <div key={p.name} style={{ marginBottom: 8 }}>
          <div
            onClick={() => setExpandedPlayer(expandedPlayer === p.name ? null : p.name)}
            style={{
              background: p.name === currentPlayer ? `${C.accent}15` : C.card,
              border: `1px solid ${p.name === currentPlayer ? C.accent : C.border}`,
              borderRadius: expandedPlayer === p.name ? "10px 10px 0 0" : 10,
              padding: "14px 20px",
              display: "flex", alignItems: "center", gap: 16,
              cursor: "pointer",
            }}
          >
            <span style={{ fontSize: medal ? 20 : 14, width: 36, textAlign: "center", fontWeight: 700, color: rank <= 3 ? C.gold : C.muted, flexShrink: 0 }}>
              {medal || label}
            </span>
            {isTied && medal && (
              <span style={{ fontSize: 10, color: C.gold, fontWeight: 700, marginLeft: -12 }}>T</span>
            )}
            <span style={{ flex: 1, fontWeight: 600, fontSize: 15, color: p.name === currentPlayer ? C.accent : C.text }}>
              {p.name}{p.name === currentPlayer ? " (you)" : ""}
            </span>
            {anyResults && (
              <span style={{ fontSize: 11, color: C.muted }}>max {p.maxPts}</span>
            )}
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.gold, letterSpacing: 1 }}>{p.pts}</span>
            <span style={{ fontSize: 12, color: C.muted }}>pts</span>
            <span style={{ fontSize: 12, color: C.muted }}>{expandedPlayer === p.name ? "▲" : "▼"}</span>
          </div>

          {/* Breakdown popup */}
          {expandedPlayer === p.name && (
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderTop: "none", borderRadius: "0 0 10px 10px", padding: "12px 20px" }}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <div style={{ background: C.card, borderRadius: 8, padding: "8px 14px", flex: 1, minWidth: 100 }}>
                  <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 2 }}>GROUP STAGE</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.accent }}>{p.breakdown.groupPts} pts</div>
                  <div style={{ fontSize: 11, color: C.textDim }}>{p.breakdown.groupCorrect}/{p.breakdown.groupTotal} correct</div>
                </div>
                {Object.entries(p.breakdown.koBreakdown).filter(([, v]) => v > 0).map(([round, pts]) => (
                  <div key={round} style={{ background: C.card, borderRadius: 8, padding: "8px 14px", flex: 1, minWidth: 80 }}>
                    <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 2 }}>{round === "F" ? "FINAL" : round}</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.gold }}>{pts} pts</div>
                  </div>
                ))}
                {Object.values(p.breakdown.koBreakdown).every(v => v === 0) && (
                  <div style={{ fontSize: 12, color: C.muted, alignSelf: "center" }}>No knockout points yet</div>
                )}
              </div>
            </div>
          )}
        </div>
        );
      })}
    </div>
  );
}

// ── COMMISSIONER VIEW ──────────────────────────────────────────────────────
function CommissionerView({ players, groupMatches, knockoutMatches, picks, knockoutOpen, knockoutLocked, groupLocked, groupPicksLocked, allMatches, onSetGroupResult, onSetKnockoutTeams, onSetKnockoutResult, onOpenKnockout, onLockKnockout, onUnlockKnockout, onLockGroupPicks, onRenamePlayer, onRemovePlayer, onLogout, activeTab, setActiveTab, addPlayer, pins, paid, onTogglePaid, onResetPin, lastUpdated, announcement, onSetAnnouncement, onMatchesReloaded }) {

  const tabs = [
    { id: "groups", label: "Group Results" },
    { id: "knockout", label: "Knockout" },
    { id: "leaderboard", label: "Leaderboard" },
    { id: "players", label: "Players" },
    { id: "announcement", label: "Announcement" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "Inter, sans-serif", color: C.text }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 24 }}>⚽</span>
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.accent, letterSpacing: 3 }}>WC 2026</span>
            <Badge color={C.gold}>COMMISSIONER</Badge>
          </div>
          <Btn small variant="ghost" onClick={onLogout}>Logout</Btn>
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", gap: 0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "10px 20px", background: "none", border: "none", cursor: "pointer",
              color: activeTab === t.id ? C.accent : C.muted, fontWeight: 600, fontSize: 13,
              borderBottom: activeTab === t.id ? `2px solid ${C.accent}` : "2px solid transparent",
              fontFamily: "Inter, sans-serif",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Commissioner announcement banner — visible to commissioner too for confirmation */}
      {announcement && announcement.trim() && (
        <div style={{ background: `${C.gold}25`, borderBottom: `1px solid ${C.gold}55`, padding: "10px 20px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>📢</span>
            <span style={{ fontSize: 13, color: C.gold, fontWeight: 600, lineHeight: 1.4 }}>{announcement}</span>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>
        {activeTab === "groups" && (
          <CommGroupResults groupMatches={groupMatches} onSetResult={onSetGroupResult} groupLocked={groupLocked} groupPicksLocked={groupPicksLocked} onLockGroupPicks={onLockGroupPicks} />
        )}
        {activeTab === "knockout" && (
          <CommKnockout
            knockoutMatches={knockoutMatches}
            knockoutOpen={knockoutOpen}
            knockoutLocked={knockoutLocked}
            onSetTeams={onSetKnockoutTeams}
            onSetResult={onSetKnockoutResult}
            onOpen={onOpenKnockout}
            onLock={onLockKnockout}
            onUnlock={onUnlockKnockout}
            onMatchesFilled={async () => {
              const km = await loadState("wc_knockout_matches");
              if (km) onMatchesReloaded(null, km, null);
            }}
          />
        )}
        {activeTab === "leaderboard" && (
          <LeaderboardTab allPlayers={players} allPicks={picks} allMatches={allMatches} currentPlayer="" isCommissioner={true} groupPicksLocked={groupPicksLocked} paid={paid} onMatchesReloaded={onMatchesReloaded} lastUpdated={lastUpdated ? (() => { const d = new Date(lastUpdated); const now = new Date(); const diffMins = Math.floor((now - d) / 60000); if (diffMins < 1) return "just now"; if (diffMins < 60) return `${diffMins}m ago`; const diffHrs = Math.floor(diffMins / 60); return diffHrs < 24 ? `${diffHrs}h ago` : d.toLocaleDateString(); })() : null} />
        )}
        {activeTab === "players" && (
          <CommPlayers players={players} picks={picks} addPlayer={addPlayer} pins={pins} paid={paid} onTogglePaid={onTogglePaid} onResetPin={onResetPin} onRenamePlayer={onRenamePlayer} onRemovePlayer={onRemovePlayer} />
        )}
        {activeTab === "announcement" && (
          <CommAnnouncement announcement={announcement} onSetAnnouncement={onSetAnnouncement} />
        )}
      </div>
    </div>
  );
}

function CommGroupResults({ groupMatches, onSetResult, groupLocked, groupPicksLocked, onLockGroupPicks }) {
  const byDate = {};
  groupMatches.forEach(m => {
    if (!byDate[m.date]) byDate[m.date] = [];
    byDate[m.date].push(m);
  });

  return (
    <div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.accent, letterSpacing: 2, marginBottom: 12 }}>ENTER GROUP STAGE RESULTS</div>

      {/* Lock controls */}
      <div style={{ marginBottom: 24, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        {groupPicksLocked ? (
          <Badge color={C.red}>🔒 GROUP PICKS LOCKED</Badge>
        ) : (
          <>
            <Btn variant="danger" onClick={onLockGroupPicks}>Lock Group Picks Now</Btn>
            <span style={{ fontSize: 12, color: C.muted, fontFamily: "Inter, sans-serif" }}>Auto-locks at 3:00 PM ET on June 11 regardless.</span>
          </>
        )}
      </div>
      {Object.entries(byDate).map(([date, matches]) => (
        <div key={date} style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: C.gold, letterSpacing: 2, marginBottom: 10 }}>{date}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {matches.map(m => <CommMatchResultRow key={m.id} match={m} onSetResult={onSetResult} allowDraw />)}
          </div>
        </div>
      ))}
    </div>
  );
}

function CommMatchResultRow({ match, onSetResult, allowDraw }) {
  const opts = [
    { val: "home", label: match.home },
    ...(allowDraw ? [{ val: "draw", label: "Draw" }] : []),
    { val: "away", label: match.away },
  ];
  return (
    <div style={{ background: C.card, borderRadius: 10, padding: "12px 16px", border: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
        <span style={{ fontWeight: 600, fontSize: 13, flex: 1 }}>
          {f(match.home)} {match.home} <span style={{ color: C.muted }}>vs</span> {f(match.away)} {match.away}
        </span>
        <span style={{ fontSize: 11, color: C.muted }}>Group {match.group} · {match.time}</span>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {opts.map(o => (
          <button key={o.val} onClick={() => onSetResult(match.id, match.result === o.val ? null : o.val)} style={{
            padding: "5px 12px", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer",
            border: `1.5px solid ${match.result === o.val ? C.green : C.border}`,
            background: match.result === o.val ? `${C.green}22` : "transparent",
            color: match.result === o.val ? C.green : C.muted,
            fontFamily: "Inter, sans-serif",
          }}>{o.label}</button>
        ))}
      </div>
      {match.result && <Badge color={C.green}>✓ Set</Badge>}
    </div>
  );
}

function CommKnockout({ knockoutMatches, knockoutOpen, knockoutLocked, onSetTeams, onSetResult, onOpen, onLock, onUnlock, onMatchesFilled }) {
  const [filling, setFilling] = useState(false);
  const [fillMsg, setFillMsg] = useState(null);

  const handleAutoFill = async () => {
    setFilling(true);
    setFillMsg(null);
    try {
      const res = await fetch("/api/fill-r32");
      const data = await res.json();
      if (data.success) {
        setFillMsg(`✓ Filled ${data.filled} R32 matchup${data.filled !== 1 ? "s" : ""}`);
        if (onMatchesFilled) onMatchesFilled();
      } else {
        setFillMsg(`✗ ${data.error || "Could not fill matchups"}`);
      }
    } catch (e) {
      setFillMsg("✗ Could not reach server");
    }
    setFilling(false);
    setTimeout(() => setFillMsg(null), 6000);
  };

  return (
    <div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.accent, letterSpacing: 2, marginBottom: 8 }}>KNOCKOUT STAGE</div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
        {!knockoutOpen && (
          <div>
            <Btn onClick={onOpen} variant="gold">Open Knockout Picks</Btn>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Players can submit picks after you click this.</div>
          </div>
        )}
        {knockoutOpen && !knockoutLocked && (
          <div>
            <Btn onClick={onLock} variant="danger">Lock All Knockout Picks</Btn>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Lock before Round of 32 kicks off.</div>
          </div>
        )}
        {knockoutLocked && (
          <div>
            <Badge color={C.red}>PICKS LOCKED</Badge>
            <div style={{ marginTop: 8 }}>
              <Btn variant="ghost" small onClick={onUnlock}>Unlock Knockout Picks</Btn>
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Unlocks picks so players can edit their bracket.</div>
          </div>
        )}
        {knockoutOpen && !knockoutLocked && <Badge color={C.green}>PICKS OPEN</Badge>}

        {/* Auto-fill button */}
        <div>
          <Btn onClick={handleAutoFill} disabled={filling} variant="ghost">
            {filling ? "⟳ Fetching…" : "⟳ Auto-Fill R32 Matchups"}
          </Btn>
          <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Pulls matchups from FIFA API once group stage ends.</div>
          {fillMsg && (
            <div style={{ fontSize: 12, fontWeight: 600, color: fillMsg.startsWith("✓") ? C.green : C.red, marginTop: 4 }}>{fillMsg}</div>
          )}
        </div>
      </div>

      {/* Set Teams panel — always visible for commissioner */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: C.gold, letterSpacing: 2, marginBottom: 10 }}>SET MATCHUPS</div>
        {KNOCKOUT_ROUNDS.filter(r => r.round === "R32").map(({ round, label }) => (
          <CommSetTeamsSection key={round} round={round} label={label} knockoutMatches={knockoutMatches} onSetTeams={onSetTeams} onSetResult={onSetResult} />
        ))}
      </div>

      {/* Bracket view */}
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: C.gold, letterSpacing: 2, marginBottom: 10 }}>BRACKET VIEW</div>
      <BracketView knockoutMatches={knockoutMatches} picks={{}} onPick={null} isCommissioner onSetTeams={onSetTeams} onSetResult={onSetResult} />
    </div>
  );
}

function CommSetTeamsSection({ round, label, knockoutMatches, onSetTeams, onSetResult }) {
  const [editId, setEditId] = useState(null);
  const [homeVal, setHomeVal] = useState("");
  const [awayVal, setAwayVal] = useState("");
  const rMatches = knockoutMatches.filter(m => m.round === round);
  const save = (id) => { onSetTeams(id, homeVal, awayVal); setEditId(null); };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
      {rMatches.map(m => (
        <div key={m.id} style={{ background: C.card, borderRadius: 10, padding: "10px 14px", border: `1px solid ${C.border}` }}>
          {editId === m.id ? (
            <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
              <input value={homeVal} onChange={e => setHomeVal(e.target.value)} placeholder="Home team"
                style={{ padding: "6px 10px", background: C.surface, color: C.text, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, fontFamily: "Inter, sans-serif", width: 140 }} />
              <span style={{ color: C.muted }}>vs</span>
              <input value={awayVal} onChange={e => setAwayVal(e.target.value)} placeholder="Away team"
                style={{ padding: "6px 10px", background: C.surface, color: C.text, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, fontFamily: "Inter, sans-serif", width: 140 }} />
              <Btn small onClick={() => save(m.id)}>Save</Btn>
              <Btn small variant="ghost" onClick={() => setEditId(null)}>Cancel</Btn>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: m.home ? C.text : C.muted }}>
                {m.home ? `${f(m.home)} ${m.home}` : "TBD"} <span style={{ color: C.muted, fontWeight: 400 }}>vs</span> {m.away ? `${f(m.away)} ${m.away}` : "TBD"}
              </span>
              <Btn small variant="ghost" onClick={() => { setEditId(m.id); setHomeVal(m.home || ""); setAwayVal(m.away || ""); }}>Set Teams</Btn>
              {m.home && m.away && (
                <div style={{ display: "flex", gap: 6 }}>
                  {[{ val: "home", label: m.home.split(" ")[0] }, { val: "away", label: m.away.split(" ")[0] }].map(o => (
                    <button key={o.val} onClick={() => onSetResult(m.id, m.result === o.val ? null : o.val)} style={{
                      padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer",
                      border: `1.5px solid ${m.result === o.val ? C.green : C.border}`,
                      background: m.result === o.val ? `${C.green}22` : "transparent",
                      color: m.result === o.val ? C.green : C.muted, fontFamily: "Inter, sans-serif",
                    }}>{o.label} wins</button>
                  ))}
                </div>
              )}
              {m.result && <Badge color={C.green}>✓ Set</Badge>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── COMMISSIONER ANNOUNCEMENT ──────────────────────────────────────────────
function CommAnnouncement({ announcement, onSetAnnouncement }) {
  const [text, setText] = useState(announcement || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSetAnnouncement(text.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleClear = () => {
    setText("");
    onSetAnnouncement("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.accent, letterSpacing: 2, marginBottom: 8 }}>ANNOUNCEMENT BANNER</div>
      <div style={{ fontSize: 13, color: C.textDim, marginBottom: 16 }}>
        Type a message and it'll show as a gold banner at the top of every player's screen, on every tab, until you change or clear it.
      </div>

      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="e.g. Knockout matchups are set — go make your picks before Saturday's kickoff!"
        rows={3}
        style={{
          width: "100%", padding: "12px 14px", background: C.card, color: C.text,
          border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 14,
          fontFamily: "Inter, sans-serif", resize: "vertical", boxSizing: "border-box",
        }}
      />

      <div style={{ display: "flex", gap: 10, marginTop: 12, alignItems: "center" }}>
        <Btn onClick={handleSave}>Save & Show Banner</Btn>
        <Btn variant="danger" onClick={handleClear}>Clear Banner</Btn>
        {saved && <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>✓ Saved</span>}
      </div>

      {/* Live preview */}
      {text.trim() && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: 1, marginBottom: 8 }}>PREVIEW</div>
          <div style={{ background: `${C.gold}25`, border: `1px solid ${C.gold}55`, borderRadius: 8, padding: "10px 16px", display: "flex", alignItems: "flex-start", gap: 8 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>📢</span>
            <span style={{ fontSize: 13, color: C.gold, fontWeight: 600, lineHeight: 1.4 }}>{text}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function CommPlayers({ players, picks, addPlayer, pins, paid, onTogglePaid, onResetPin, onRenamePlayer, onRemovePlayer }) {
  const [newName, setNewName] = useState("");
  const [editingName, setEditingName] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [editErr, setEditErr] = useState("");
  const [confirmRemove, setConfirmRemove] = useState(null);
  const locked = new Date() >= new Date("2026-06-11T19:00:00Z");

  const handleRename = (oldName) => {
    const trimmed = editVal.trim();
    if (!trimmed) { setEditErr("Name can't be empty."); return; }
    if (trimmed === oldName) { setEditingName(null); return; }
    if (players.includes(trimmed)) { setEditErr("Name already taken."); return; }
    onRenamePlayer(oldName, trimmed);
    setEditingName(null);
    setEditErr("");
  };

  const paidCount = players.filter(p => paid[p]).length;
  const totalPot = paidCount * 20;
  const roundTo5 = v => Math.round(v / 5) * 5;
  const raw1 = Math.floor(totalPot * 0.65);
  const raw2 = Math.floor(totalPot * 0.25);
  const raw3 = totalPot - raw1 - raw2;
  const payout1 = roundTo5(raw1);
  const payout2 = roundTo5(raw2);
  const payout3 = roundTo5(raw3);

  return (
    <div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.accent, letterSpacing: 2, marginBottom: 8 }}>MANAGE PLAYERS</div>

      {/* Dues + payout summary */}
      <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 16, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: paidCount > 0 ? 14 : 0, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: 1, fontFamily: "Inter, sans-serif" }}>DUES COLLECTED</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: paidCount === players.length && players.length > 0 ? C.green : C.gold, lineHeight: 1.1 }}>
              {paidCount} / {players.length}
            </div>
          </div>
          <div style={{ width: 1, height: 36, background: C.border }} />
          <div>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: 1, fontFamily: "Inter, sans-serif" }}>TOTAL POT</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.accent, lineHeight: 1.1 }}>${totalPot}</div>
          </div>
          {paidCount < players.length && players.length > 0 && (
            <>
              <div style={{ width: 1, height: 36, background: C.border }} />
              <div>
                <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: 1, fontFamily: "Inter, sans-serif" }}>OUTSTANDING</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.red, lineHeight: 1.1 }}>${(players.length - paidCount) * 20}</div>
              </div>
            </>
          )}
        </div>

        {/* Payout breakdown */}
        {paidCount > 0 && (
          <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, letterSpacing: 1, fontFamily: "Inter, sans-serif", marginBottom: 8 }}>PROJECTED PAYOUTS (65% / 25% / 10%)</div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { place: "🥇 1st", pct: "65%", amount: payout1, color: C.gold },
                { place: "🥈 2nd", pct: "25%", amount: payout2, color: "#94a3b8" },
                { place: "🥉 3rd", pct: "10%", amount: payout3, color: "#cd7f32" },
              ].map(row => (
                <div key={row.place} style={{ background: C.surface, borderRadius: 8, padding: "8px 14px", border: `1px solid ${C.border}`, flex: 1, minWidth: 80, textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: row.color, fontFamily: "Inter, sans-serif" }}>{row.place}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: row.color }}>${row.amount}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{row.pct}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 8, fontFamily: "Inter, sans-serif" }}>
              Based on {paidCount} paid × $20. {players.length - paidCount > 0 ? `${players.length - paidCount} still unpaid — payouts will increase.` : "All players paid!"}
            </div>
          </div>
        )}
      </div>

      {!locked && (
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input
          placeholder="Add player name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && newName.trim()) { addPlayer(newName.trim()); setNewName(""); } }}
          style={{ padding: "8px 14px", background: C.card, color: C.text, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 14, fontFamily: "Inter, sans-serif", width: 220 }}
        />
        <Btn onClick={() => { if (newName.trim()) { addPlayer(newName.trim()); setNewName(""); } }}>Add Player</Btn>
      </div>
      )}
      {locked && <div style={{ fontSize: 12, color: C.muted, fontFamily: "Inter, sans-serif", marginBottom: 16 }}>🔒 Registration closed — tournament has started.</div>}

      {players.length === 0 && <div style={{ color: C.muted, fontSize: 14 }}>No players yet.</div>}
      {players.map(p => (
        <div key={p} style={{ background: C.card, borderRadius: 8, padding: "10px 16px", marginBottom: 8, border: `1px solid ${paid[p] ? C.green + "55" : C.border}` }}>
          {editingName === p ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <input
                value={editVal}
                onChange={e => { setEditVal(e.target.value); setEditErr(""); }}
                onKeyDown={e => { if (e.key === "Enter") handleRename(p); if (e.key === "Escape") setEditingName(null); }}
                autoFocus
                style={{ padding: "6px 10px", background: C.surface, color: C.text, border: `1px solid ${editErr ? C.red : C.accent}`, borderRadius: 6, fontSize: 14, fontFamily: "Inter, sans-serif", width: 160 }}
              />
              {editErr && <span style={{ fontSize: 11, color: C.red }}>{editErr}</span>}
              <Btn small onClick={() => handleRename(p)}>Save</Btn>
              <Btn small variant="ghost" onClick={() => { setEditingName(null); setEditErr(""); }}>Cancel</Btn>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={!!paid[p]}
                    onChange={() => onTogglePaid(p)}
                    style={{ width: 16, height: 16, cursor: "pointer", accentColor: C.green }}
                  />
                  <span style={{ fontSize: 11, color: paid[p] ? C.green : C.muted, fontWeight: 600 }}>{paid[p] ? "PAID" : "UNPAID"}</span>
                </label>
                <span style={{ fontWeight: 600, fontSize: 14, color: C.text }}>{p}</span>
                <button onClick={() => { setEditingName(p); setEditVal(p); setEditErr(""); }} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 13, padding: 0 }} title="Rename">✏️</button>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, color: C.muted }}>{Object.keys(picks[p] || {}).length} picks</span>
                {pins[p] ? <span style={{ fontSize: 11, color: C.green, fontWeight: 600 }}>🔐 PIN set</span> : <span style={{ fontSize: 11, color: C.muted }}>No PIN</span>}
                {pins[p] && <Btn small variant="danger" onClick={() => onResetPin(p)}>Reset PIN</Btn>}
                {confirmRemove === p ? (
                  <>
                    <span style={{ fontSize: 12, color: C.red, fontWeight: 600 }}>Remove?</span>
                    <Btn small variant="danger" onClick={() => { onRemovePlayer(p); setConfirmRemove(null); }}>Yes</Btn>
                    <Btn small variant="ghost" onClick={() => setConfirmRemove(null)}>No</Btn>
                  </>
                ) : (
                  <Btn small variant="danger" onClick={() => setConfirmRemove(p)}>Remove</Btn>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

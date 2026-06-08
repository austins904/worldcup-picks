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
  { round: "QF", label: "Quarterfinals", matchCount: 4 },
  { round: "SF", label: "Semifinals", matchCount: 2 },
  { round: "F", label: "Final", matchCount: 1 },
];

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

async function loadState(key) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/wc_state?key=eq.${key}&select=value`, { headers: SB_HEADERS });
    const rows = await res.json();
    return rows?.[0]?.value ?? null;
  } catch { return null; }
}

async function saveState(key, value) {
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/wc_state`, {
      method: "POST",
      headers: { ...SB_HEADERS, "Prefer": "resolution=merge-duplicates" },
      body: JSON.stringify({ key, value }),
    });
  } catch (e) { console.error("Supabase save error", e); }
}

// ── Scoring ────────────────────────────────────────────────────────────────
const KNOCKOUT_PTS = { R32: 3, R16: 5, QF: 7, SF: 10, F: 15 };

function scorePlayer(playerPicks, allMatches) {
  let pts = 0;
  allMatches.forEach((m) => {
    if (!m.result) return;
    const pick = playerPicks[m.id];
    if (!pick || pick !== m.result) return;
    if (m.stage === "group") {
      pts += 2;
    } else {
      pts += KNOCKOUT_PTS[m.round] || 0;
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
  const [activeTab, setActiveTab] = useState("groups");

  // Load from storage
  useEffect(() => {
    (async () => {
      const [p, gm, km, pk, ko, kl, pn, gl, pd] = await Promise.all([
        loadState("wc_players"),
        loadState("wc_group_matches"),
        loadState("wc_knockout_matches"),
        loadState("wc_picks"),
        loadState("wc_knockout_open"),
        loadState("wc_knockout_locked"),
        loadState("wc_pins"),
        loadState("wc_group_locked"),
        loadState("wc_paid"),
      ]);
      if (p) setPlayersState(p);
      if (gm) setGroupMatchesState(gm);
      if (km) setKnockoutMatchesState(km);
      if (pk) setPicksState(pk);
      if (ko !== null) setKnockoutOpenState(ko);
      if (kl !== null) setKnockoutLockedState(kl);
      if (pn) setPinsState(pn);
      if (gl !== null) setGroupLockedState(gl);
      if (pd) setPaidState(pd);
      setLoading(false);
    })();
  }, []);

  // Persist helpers — Supabase stores jsonb so no JSON.stringify needed
  const setPlayers = (v) => { setPlayersState(v); saveState("wc_players", v); };
  const setGroupMatches = (v) => { setGroupMatchesState(v); saveState("wc_group_matches", v); };
  const setKnockoutMatches = (v) => { setKnockoutMatchesState(v); saveState("wc_knockout_matches", v); };
  const setPicks = (v) => { setPicksState(v); saveState("wc_picks", v); };
  const setGroupLocked = (v) => { setGroupLockedState(v); saveState("wc_group_locked", v); };
  const setKnockoutOpen = (v) => { setKnockoutOpenState(v); saveState("wc_knockout_open", v); };
  const setKnockoutLocked = (v) => { setKnockoutLockedState(v); saveState("wc_knockout_locked", v); };
  const setPins = (v) => { setPinsState(v); saveState("wc_pins", v); };
  const setPaid = (v) => { setPaidState(v); saveState("wc_paid", v); };

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
      onLockGroupPicks={() => setGroupLocked(true)}
      onRenamePlayer={(oldName, newName) => {
        // Update players list
        setPlayers(players.map(p => p === oldName ? newName : p));
        // Migrate picks
        const newPicks = { ...picks };
        if (newPicks[oldName]) { newPicks[newName] = newPicks[oldName]; delete newPicks[oldName]; }
        setPicks(newPicks);
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
      onPick={(matchId, result) => {
        const updated = { ...picks, [currentUser.name]: { ...(picks[currentUser.name] || {}), [matchId]: result } };
        setPicks(updated);
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

        {/* Add player (quick) */}
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
      </div>
    </div>
  );
}

// ── PLAYER VIEW ────────────────────────────────────────────────────────────
function PlayerView({ player, groupMatches, knockoutMatches, picks, allPlayers, allPicks, allMatches, knockoutOpen, knockoutLocked, groupPicksLocked, onPick, onRenamePlayer, onLogout, activeTab, setActiveTab }) {
  const myScore = scorePlayer(picks, allMatches);
  const [editingName, setEditingName] = useState(false);
  const [nameVal, setNameVal] = useState(player);
  const [nameErr, setNameErr] = useState("");

  const handleRename = () => {
    const trimmed = nameVal.trim();
    if (!trimmed) { setNameErr("Name can't be empty."); return; }
    if (trimmed === player) { setEditingName(false); return; }
    if (allPlayers.includes(trimmed)) { setNameErr("That name is already taken."); return; }
    onRenamePlayer(player, trimmed);
    setEditingName(false);
    setNameErr("");
  };

  const tabs = [
    { id: "groups", label: "Group Stage" },
    { id: "knockout", label: "Knockout" },
    { id: "community", label: "Community Picks" },
    { id: "leaderboard", label: "Leaderboard" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "Inter, sans-serif", color: C.text }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&display=swap');`}</style>
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
                <div style={{ fontSize: 12, color: C.gold, fontWeight: 700 }}>{myScore} pts</div>
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

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
        {activeTab === "groups" && (
          <GroupPicksTab groupMatches={groupMatches} picks={picks} onPick={groupPicksLocked ? null : onPick} groupPicksLocked={groupPicksLocked} allPicks={allPicks} allPlayers={allPlayers} />
        )}
        {activeTab === "knockout" && (
          <KnockoutPicksTab knockoutMatches={knockoutMatches} picks={picks} onPick={onPick} knockoutOpen={knockoutOpen} knockoutLocked={knockoutLocked} allPicks={allPicks} allPlayers={allPlayers} knockoutLocked={knockoutLocked} />
        )}
        {activeTab === "community" && (
          <CommunityPicksTab groupMatches={groupMatches} knockoutMatches={knockoutMatches} allPicks={allPicks} allPlayers={allPlayers} groupPicksLocked={groupPicksLocked} knockoutLocked={knockoutLocked} />
        )}
        {activeTab === "leaderboard" && (
          <LeaderboardTab allPlayers={allPlayers} allPicks={allPicks} allMatches={allMatches} currentPlayer={player} />
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
function KnockoutPicksTab({ knockoutMatches, picks, onPick, knockoutOpen, knockoutLocked, allPicks, allPlayers }) {
  if (!knockoutOpen) return (
    <div style={{ textAlign: "center", padding: 60 }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: C.muted, letterSpacing: 3 }}>KNOCKOUT STAGE LOCKED</div>
      <div style={{ color: C.textDim, marginTop: 8, fontSize: 14 }}>The commissioner will open picks once the group stage is complete.</div>
    </div>
  );

  if (knockoutLocked) return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, color: C.accent }}>KNOCKOUT PICKS</div>
        <div style={{ fontSize: 13, color: C.gold, marginTop: 4, fontWeight: 600 }}>Picks are locked — results incoming!</div>
      </div>
      {KNOCKOUT_ROUNDS.map(({ round, label }) => {
        const rMatches = knockoutMatches.filter(m => m.round === round);
        return (
          <div key={round} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: C.gold, letterSpacing: 2 }}>{label}</div>
              <Badge color={C.accentDim}>{KNOCKOUT_PTS[round]} pts</Badge>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {rMatches.map(m => (
                <div key={m.id}>
                  <MatchPickRow match={m} pick={picks[m.id]} onPick={null} locked />
                  {knockoutLocked && m.home && m.away && (
                    <div style={{ padding: "0 4px", marginTop: 2 }}>
                      <PickBreakdownBar matchId={m.id} allPicks={allPicks} allPlayers={allPlayers} homeLabel={m.home.split(" ")[0]} awayLabel={m.away.split(" ")[0]} allowDraw={false} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, color: C.accent }}>KNOCKOUT PICKS</div>
        <div style={{ fontSize: 13, color: C.textDim, marginTop: 4 }}>Pick a winner for every match. Points increase each round: <span style={{ color: C.green, fontWeight: 600 }}>R32=3 · R16=5 · QF=7 · SF=10 · Final=15</span>. Submit before the commissioner locks them.</div>
      </div>
      {KNOCKOUT_ROUNDS.map(({ round, label }) => {
        const rMatches = knockoutMatches.filter(m => m.round === round);
        return (
          <div key={round} style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: C.gold, letterSpacing: 2 }}>{label}</div>
              <Badge color={C.accentDim}>{KNOCKOUT_PTS[round]} pts</Badge>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {rMatches.map(m => <MatchPickRow key={m.id} match={m} pick={picks[m.id]} onPick={onPick} allowDraw={false} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Single match pick row
function MatchPickRow({ match, pick, onPick, allowDraw, locked }) {
  const hasResult = !!match.result;
  const correct = hasResult && pick === match.result;
  const wrong = hasResult && pick && pick !== match.result;
  const isLocked = locked || hasResult;

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
          <span style={{ fontWeight: 600, fontSize: 13, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{match.home || "TBD"}</span>
          <span style={{ color: C.muted, fontSize: 12, margin: "0 4px" }}>vs</span>
          <span style={{ fontSize: 16 }}>{f(match.away)}</span>
          <span style={{ fontWeight: 600, fontSize: 13, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{match.away || "TBD"}</span>
        </div>
        {match.time && <span style={{ fontSize: 11, color: C.muted }}>Group {match.group} · {match.time}</span>}
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

// Leaderboard
function LeaderboardTab({ allPlayers, allPicks, allMatches, currentPlayer }) {
  const scored = allPlayers
    .map(p => ({ name: p, pts: scorePlayer(allPicks[p] || {}, allMatches) }))
    .sort((a, b) => b.pts - a.pts);

  const medals = ["🥇", "🥈", "🥉"];

  return (
    <div>
      <div style={{ fontSize: 20, fontFamily: "'Bebas Neue', sans-serif", letterSpacing: 2, color: C.accent, marginBottom: 20 }}>LEADERBOARD</div>
      {scored.length === 0 && <div style={{ color: C.muted, fontSize: 14 }}>No players yet.</div>}
      {scored.map((p, i) => (
        <div key={p.name} style={{
          background: p.name === currentPlayer ? `${C.accent}15` : C.card,
          border: `1px solid ${p.name === currentPlayer ? C.accent : C.border}`,
          borderRadius: 10,
          padding: "14px 20px",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}>
          <span style={{ fontSize: 20, width: 28, textAlign: "center" }}>{medals[i] || `${i + 1}`}</span>
          <span style={{ flex: 1, fontWeight: 600, fontSize: 15, color: p.name === currentPlayer ? C.accent : C.text }}>{p.name} {p.name === currentPlayer ? "(you)" : ""}</span>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: C.gold, letterSpacing: 1 }}>{p.pts}</span>
          <span style={{ fontSize: 12, color: C.muted }}>pts</span>
        </div>
      ))}
    </div>
  );
}

// ── COMMISSIONER VIEW ──────────────────────────────────────────────────────
function CommissionerView({ players, groupMatches, knockoutMatches, picks, knockoutOpen, knockoutLocked, groupLocked, groupPicksLocked, allMatches, onSetGroupResult, onSetKnockoutTeams, onSetKnockoutResult, onOpenKnockout, onLockKnockout, onLockGroupPicks, onRenamePlayer, onLogout, activeTab, setActiveTab, addPlayer, pins, paid, onTogglePaid, onResetPin }) {

  const tabs = [
    { id: "groups", label: "Group Results" },
    { id: "knockout", label: "Knockout" },
    { id: "leaderboard", label: "Leaderboard" },
    { id: "players", label: "Players" },
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
          />
        )}
        {activeTab === "leaderboard" && (
          <LeaderboardTab allPlayers={players} allPicks={picks} allMatches={allMatches} currentPlayer="" />
        )}
        {activeTab === "players" && (
          <CommPlayers players={players} picks={picks} addPlayer={addPlayer} pins={pins} paid={paid} onTogglePaid={onTogglePaid} onResetPin={onResetPin} onRenamePlayer={onRenamePlayer} />
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

function CommKnockout({ knockoutMatches, knockoutOpen, knockoutLocked, onSetTeams, onSetResult, onOpen, onLock }) {
  const [editId, setEditId] = useState(null);
  const [homeVal, setHomeVal] = useState("");
  const [awayVal, setAwayVal] = useState("");

  const save = (id) => {
    onSetTeams(id, homeVal, awayVal);
    setEditId(null);
  };

  return (
    <div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: C.accent, letterSpacing: 2, marginBottom: 8 }}>KNOCKOUT STAGE</div>

      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        {!knockoutOpen && (
          <div>
            <Btn onClick={onOpen} variant="gold">Open Knockout Picks</Btn>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Players can submit picks after you click this.</div>
          </div>
        )}
        {knockoutOpen && !knockoutLocked && (
          <div>
            <Btn onClick={onLock} variant="danger">Lock All Knockout Picks</Btn>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>Locks picks — do this before Round of 32 kicks off.</div>
          </div>
        )}
        {knockoutLocked && <Badge color={C.red}>PICKS LOCKED</Badge>}
        {knockoutOpen && !knockoutLocked && <Badge color={C.green}>PICKS OPEN</Badge>}
      </div>

      {KNOCKOUT_ROUNDS.map(({ round, label }) => {
        const rMatches = knockoutMatches.filter(m => m.round === round);
        return (
          <div key={round} style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: C.gold, letterSpacing: 2, marginBottom: 10 }}>{label}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {rMatches.map(m => (
                <div key={m.id} style={{ background: C.card, borderRadius: 10, padding: "12px 16px", border: `1px solid ${C.border}` }}>
                  {editId === m.id ? (
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <input value={homeVal} onChange={e => setHomeVal(e.target.value)} placeholder="Home team" style={{ padding: "6px 10px", background: C.surface, color: C.text, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, fontFamily: "Inter, sans-serif", width: 140 }} />
                      <span style={{ color: C.muted }}>vs</span>
                      <input value={awayVal} onChange={e => setAwayVal(e.target.value)} placeholder="Away team" style={{ padding: "6px 10px", background: C.surface, color: C.text, border: `1px solid ${C.border}`, borderRadius: 6, fontSize: 13, fontFamily: "Inter, sans-serif", width: 140 }} />
                      <Btn small onClick={() => save(m.id)}>Save</Btn>
                      <Btn small variant="ghost" onClick={() => setEditId(null)}>Cancel</Btn>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                      <span style={{ flex: 1, fontWeight: 600, fontSize: 13, color: m.home ? C.text : C.muted }}>
                        {m.home ? `${f(m.home)} ${m.home}` : "TBD"} <span style={{ color: C.muted, fontWeight: 400 }}>vs</span> {m.away ? `${f(m.away)} ${m.away}` : "TBD"}
                      </span>
                      <Btn small variant="ghost" onClick={() => { setEditId(m.id); setHomeVal(m.home); setAwayVal(m.away); }}>Set Teams</Btn>
                      {m.home && m.away && (
                        <div style={{ display: "flex", gap: 6 }}>
                          {[{ val: "home", label: m.home.split(" ")[0] }, { val: "away", label: m.away.split(" ")[0] }].map(o => (
                            <button key={o.val} onClick={() => onSetResult(m.id, m.result === o.val ? null : o.val)} style={{
                              padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: "pointer",
                              border: `1.5px solid ${m.result === o.val ? C.green : C.border}`,
                              background: m.result === o.val ? `${C.green}22` : "transparent",
                              color: m.result === o.val ? C.green : C.muted,
                              fontFamily: "Inter, sans-serif",
                            }}>{o.label} wins</button>
                          ))}
                        </div>
                      )}
                      {m.result && <Badge color={C.green}>✓ Result Set</Badge>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CommPlayers({ players, picks, addPlayer, pins, paid, onTogglePaid, onResetPin, onRenamePlayer }) {
  const [newName, setNewName] = useState("");
  const [editingName, setEditingName] = useState(null);
  const [editVal, setEditVal] = useState("");
  const [editErr, setEditErr] = useState("");

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
  const payout1 = Math.floor(totalPot * 0.65);
  const payout2 = Math.floor(totalPot * 0.25);
  const payout3 = totalPot - payout1 - payout2;

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
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}


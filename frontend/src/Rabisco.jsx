import { useState } from "react";
import logoImg from "./assets/logo.jpeg";

// ── Paleta e estilos globais ──────────────────────────────────────────────────
const GLOBAL_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&family=Lato:wght@400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    width: 100%;
    min-height: 100vh;
  }

  body {
    font-family: 'Lato', sans-serif;
    background: #0f1c3f;
  }

  :root {
    --blue-dark: #0f1c3f;
    --blue-mid: #1a3575;
    --blue-accent: #2f54b0;
    --blue-btn: #2f54b0;
    --blue-btn-hover: #1e3f96;
    --blue-link: #3b6fd4;
    --white: #ffffff;
    --card-bg: #ffffff;
    --input-bg: #e8ecf4;
    --text-main: #1a1a2e;
    --text-sub: #555e80;
    --text-placeholder: #8a93b2;
    --border: #d5dae8;
    --shadow: 0 8px 40px rgba(0,0,0,0.25);
    --radius: 16px;
    --radius-sm: 10px;
    --note-yellow: #fef9c3;
    --note-blue: #dbeafe;
    --note-green: #dcfce7;
    --note-pink: #fce7f3;
    --note-yellow-border: #fde047;
    --note-blue-border: #93c5fd;
    --note-green-border: #86efac;
    --note-pink-border: #f9a8d4;
  }

  .app-bg {
    min-height: 100vh;
    width: 100vw;
    background: linear-gradient(180deg, #294F9C 0%, #172C57 70%, #070D1A 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  /* Auth Card */
  .auth-card {
    background: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    padding: 48px 44px 40px;
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    animation: fadeUp .45s ease;
  }

  @keyframes fadeUp {
    from { opacity:0; transform: translateY(24px); }
    to   { opacity:1; transform: translateY(0); }
  }

  .logo-wrap { display:flex; flex-direction:column; align-items:center; gap:4px; margin-bottom:28px; }
  .logo-icon { font-size: 42px; }
  .logo-text { font-family:'Nunito',sans-serif; font-weight:800; font-size:22px; color:var(--blue-accent); letter-spacing:-.5px; }

  .auth-title { font-family:'Nunito',sans-serif; font-size:28px; font-weight:800; color:var(--text-main); margin-bottom:6px; }
  .auth-sub { font-size:14px; color:var(--text-sub); margin-bottom:28px; text-align:center; }

  .field-group { width:100%; display:flex; flex-direction:column; gap:16px; }
  .field { display:flex; flex-direction:column; gap:6px; }
  .field label { font-size:14px; font-weight:700; color:var(--text-main); }
  .field input {
    background: var(--input-bg);
    border: 1.5px solid transparent;
    border-radius: var(--radius-sm);
    padding: 13px 16px;
    font-size: 15px;
    color: var(--text-main);
    outline: none;
    transition: border-color .2s;
    font-family: 'Lato', sans-serif;
  }
  .field input::placeholder { color: var(--text-placeholder); }
  .field input:focus { border-color: var(--blue-accent); background: #f0f4ff; }

  .auth-link { font-size:14px; color:var(--blue-link); cursor:pointer; text-align:center; margin-top:4px; text-decoration:none; }
  .auth-link:hover { text-decoration:underline; }

  .btn-primary {
    width:100%; background:var(--blue-btn); color:#fff;
    border:none; border-radius: var(--radius-sm);
    padding:15px; font-size:16px; font-weight:700;
    font-family:'Nunito',sans-serif;
    cursor:pointer; margin-top:8px;
    transition: background .2s, transform .1s;
  }
  .btn-primary:hover { background: var(--blue-btn-hover); }
  .btn-primary:active { transform: scale(.98); }

  .help-btn {
    position:fixed; bottom:20px; right:20px;
    width:36px; height:36px; border-radius:50%;
    background:rgba(255,255,255,.15); border:1.5px solid rgba(255,255,255,.3);
    color:#fff; font-size:16px; cursor:pointer;
    display:flex; align-items:center; justify-content:center;
  }

  /* ── Dashboard ── */
  .dash-wrap {
    min-height:100vh; background:#f0f2f8;
    display:flex; flex-direction:column;
    animation: fadeUp .35s ease;
  }

  .topbar {
    background:#fff; border-bottom:1.5px solid var(--border);
    display:flex; align-items:center; justify-content:space-between;
    padding:0 32px; height:80px;
  }
  .topbar-brand { display:flex; align-items:center; gap:10px; }
  .topbar-brand span { font-family:'Nunito',sans-serif; font-weight:800; font-size:18px; color:var(--blue-accent); }
  .topbar-title { font-family:'Nunito',sans-serif; font-weight:700; font-size:17px; color:var(--text-main); }
  .btn-logout {
    display:flex; align-items:center; gap:6px;
    background:none; border:none; color:var(--text-sub);
    font-size:14px; font-weight:700; cursor:pointer;
    font-family:'Lato',sans-serif;
  }
  .btn-logout:hover { color:var(--text-main); }

  .dash-content { flex:1; padding:36px 32px; max-width:1200px; margin:0 auto; width:100%; }

  .dash-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:32px; }
  .dash-header h1 { font-family:'Nunito',sans-serif; font-size:28px; font-weight:800; color:var(--text-main); }
  .dash-header p { font-size:14px; color:var(--text-sub); margin-top:2px; }

  .btn-new {
    background:var(--blue-btn); color:#fff;
    border:none; border-radius:10px;
    padding:12px 22px; font-size:15px; font-weight:700;
    font-family:'Nunito',sans-serif; cursor:pointer;
    display:flex; align-items:center; gap:8px;
    transition: background .2s, transform .1s;
    white-space:nowrap;
  }
  .btn-new:hover { background:var(--blue-btn-hover); }
  .btn-new:active { transform:scale(.97); }

  .dash-grid { display:grid; grid-template-columns:1fr 1fr 360px; gap:20px; align-items:start; }

  /* Note Cards */
  .note-card {
    border-radius:14px; padding:20px 20px 22px;
    border:1.5px solid transparent;
    position:relative; transition: box-shadow .2s, transform .15s;
    animation: fadeUp .3s ease;
  }
  .note-card:hover { box-shadow:0 6px 24px rgba(0,0,0,.1); transform:translateY(-2px); }

  .note-card.yellow { background:var(--note-yellow); border-color:var(--note-yellow-border); }
  .note-card.blue   { background:var(--note-blue);   border-color:var(--note-blue-border); }
  .note-card.green  { background:var(--note-green);  border-color:var(--note-green-border); }
  .note-card.pink   { background:var(--note-pink);   border-color:var(--note-pink-border); }

  .note-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:4px; }
  .note-title { font-family:'Nunito',sans-serif; font-weight:800; font-size:16px; color:var(--text-main); }
  .note-actions { display:flex; gap:8px; }
  .note-actions button {
    background:none; border:none; cursor:pointer;
    font-size:16px; padding:2px; opacity:.7; transition:opacity .15s;
  }
  .note-actions button:hover { opacity:1; }
  .note-type { font-size:12px; color:var(--text-sub); margin-bottom:14px; font-weight:600; text-transform:uppercase; letter-spacing:.5px; }
  .note-body { font-size:14px; color:var(--text-main); line-height:1.6; }

  /* Checklist */
  .checklist-item { display:flex; align-items:center; gap:8px; margin-bottom:6px; font-size:14px; color:var(--text-main); }
  .checklist-item input[type=checkbox] { width:15px; height:15px; accent-color:var(--blue-accent); cursor:pointer; }
  .checklist-item.checked span { text-decoration:line-through; color:var(--text-sub); }

  /* List */
  .list-item { display:flex; align-items:flex-start; gap:8px; margin-bottom:6px; font-size:14px; color:var(--text-main); }
  .list-bullet { width:5px; height:5px; border-radius:50%; background:var(--blue-accent); margin-top:6px; flex-shrink:0; }

  /* Calendar Widget */
  .calendar-card { background:#fff; border-radius:14px; padding:24px; border:1.5px solid var(--border); }
  .cal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
  .cal-title { display:flex; align-items:center; gap:8px; font-family:'Nunito',sans-serif; font-weight:800; font-size:15px; color:var(--text-main); }
  .cal-nav { display:flex; gap:4px; }
  .cal-nav button { background:none; border:none; cursor:pointer; font-size:16px; color:var(--text-sub); padding:2px 6px; border-radius:6px; }
  .cal-nav button:hover { background:#f0f2f8; }

  .cal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; }
  .cal-day-name { font-size:11px; font-weight:700; color:var(--text-sub); text-align:center; padding:4px 0 8px; text-transform:uppercase; }
  .cal-day {
    aspect-ratio:1; display:flex; align-items:center; justify-content:center;
    font-size:13px; border-radius:50%; cursor:pointer; transition:background .15s;
    color:var(--text-main);
  }
  .cal-day:hover { background:#f0f2f8; }
  .cal-day.today { background:var(--blue-accent); color:#fff; font-weight:700; }
  .cal-day.has-reminder { position:relative; }
  .cal-day.has-reminder::after { content:''; position:absolute; bottom:2px; left:50%; transform:translateX(-50%); width:4px; height:4px; border-radius:50%; background:var(--blue-accent); }
  .cal-day.today.has-reminder::after { background:#fff; }
  .cal-day.empty { pointer-events:none; }

  .cal-legend { display:flex; gap:16px; align-items:center; margin-top:14px; padding-top:12px; border-top:1.5px solid var(--border); }
  .legend-item { display:flex; align-items:center; gap:5px; font-size:12px; color:var(--text-sub); }
  .legend-dot { width:10px; height:10px; border-radius:50%; }

  .reminders-section { margin-top:16px; }
  .reminders-label { font-size:13px; font-weight:700; color:var(--blue-accent); margin-bottom:12px; display:flex; align-items:center; gap:6px; }
  .empty-reminder { display:flex; flex-direction:column; align-items:center; gap:8px; padding:20px 0; }
  .empty-reminder span { font-size:32px; }
  .empty-reminder p { font-size:13px; color:var(--text-sub); }
  .reminder-item { display:flex; align-items:flex-start; gap:10px; padding:10px; background:#f8f9fc; border-radius:10px; margin-bottom:8px; }
  .reminder-item-icon { font-size:18px; }
  .reminder-item-info p { font-size:13px; font-weight:700; color:var(--text-main); }
  .reminder-item-info span { font-size:12px; color:var(--text-sub); }

  /* ── Modal ── */
  .modal-overlay {
    position:fixed; inset:0; background:rgba(15,28,63,.55);
    display:flex; align-items:center; justify-content:center;
    z-index:100; animation: fadeIn .2s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }

  .modal-card {
    background:#fff; border-radius:var(--radius);
    padding:32px 32px 28px; width:100%; max-width:460px;
    max-height:90vh; overflow-y:auto;
    box-shadow: 0 20px 60px rgba(0,0,0,.3);
    animation: fadeUp .25s ease;
    position:relative;
  }
  .modal-close {
    position:absolute; top:18px; right:18px;
    background:none; border:none; font-size:20px;
    cursor:pointer; color:var(--text-sub); line-height:1;
  }
  .modal-close:hover { color:var(--text-main); }
  .modal-title { font-family:'Nunito',sans-serif; font-weight:800; font-size:20px; color:var(--text-main); margin-bottom:4px; }
  .modal-sub { font-size:13px; color:var(--text-sub); margin-bottom:24px; }

  .modal-field { margin-bottom:18px; }
  .modal-field label { display:block; font-size:13px; font-weight:700; color:var(--text-main); margin-bottom:6px; }
  .modal-field input, .modal-field textarea, .modal-field select {
    width:100%; background:var(--input-bg); border:1.5px solid transparent;
    border-radius:var(--radius-sm); padding:11px 14px;
    font-size:14px; color:var(--text-main); outline:none;
    font-family:'Lato',sans-serif; transition:border-color .2s;
    resize:vertical;
  }
  .modal-field input:focus, .modal-field textarea:focus, .modal-field select:focus { border-color:var(--blue-accent); background:#f0f4ff; }
  .modal-field textarea { min-height:90px; }
  .modal-field select { appearance:none; cursor:pointer; }

  .color-picker { display:flex; gap:10px; }
  .color-swatch {
    width:40px; height:40px; border-radius:10px; cursor:pointer;
    border:2.5px solid transparent; transition:border-color .15s, transform .15s;
  }
  .color-swatch:hover { transform:scale(1.08); }
  .color-swatch.selected { border-color: var(--blue-accent); }

  .toggle-row { display:flex; align-items:center; gap:10px; }
  .toggle-label { font-size:14px; color:var(--text-main); }
  .toggle {
    width:44px; height:24px; border-radius:12px;
    background:#d0d5e8; border:none; cursor:pointer;
    position:relative; transition:background .2s;
  }
  .toggle.on { background:var(--blue-accent); }
  .toggle::after {
    content:''; position:absolute; top:3px; left:3px;
    width:18px; height:18px; border-radius:50%; background:#fff;
    transition:transform .2s;
  }
  .toggle.on::after { transform:translateX(20px); }

  .reminder-fields { margin-top:14px; animation:fadeUp .2s ease; }
  .reminder-fields input[type=datetime-local] { width:100%; }

  /* Reminder Calendar */
  .reminder-calendar {
    border:1.5px solid var(--border); border-radius:12px;
    padding:16px; margin-top:12px; background:#fafbfe;
  }
  .rcal-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
  .rcal-month { font-family:'Nunito',sans-serif; font-weight:800; font-size:14px; color:var(--text-main); }
  .rcal-nav { display:flex; gap:4px; }
  .rcal-nav button { background:none; border:none; cursor:pointer; font-size:15px; color:var(--text-sub); padding:2px 6px; border-radius:6px; }
  .rcal-nav button:hover { background:#f0f2f8; }
  .rcal-grid { display:grid; grid-template-columns:repeat(7,1fr); gap:2px; }
  .rcal-day-name { font-size:10px; font-weight:700; color:var(--text-sub); text-align:center; padding:3px 0 6px; text-transform:uppercase; }
  .rcal-day {
    aspect-ratio:1; display:flex; align-items:center; justify-content:center;
    font-size:12px; border-radius:50%; cursor:pointer; transition:background .15s;
    color:var(--text-main);
  }
  .rcal-day:hover { background:#e8ecf4; }
  .rcal-day.today { font-weight:700; color:var(--blue-accent); }
  .rcal-day.selected { background:var(--blue-accent); color:#fff; font-weight:700; }
  .rcal-day.empty { pointer-events:none; }
  .rcal-time { margin-top:10px; display:flex; align-items:center; gap:8px; }
  .rcal-time label { font-size:13px; font-weight:700; color:var(--text-main); white-space:nowrap; }
  .rcal-time input { flex:1; background:var(--input-bg); border:1.5px solid transparent; border-radius:8px; padding:8px 12px; font-size:13px; color:var(--text-main); outline:none; font-family:'Lato',sans-serif; }
  .rcal-time input:focus { border-color:var(--blue-accent); }

  /* Dynamic items list in modal */
  .items-list { display:flex; flex-direction:column; gap:8px; margin-bottom:8px; }
  .item-row { display:flex; align-items:center; gap:8px; }
  .item-row input {
    flex:1; background:var(--input-bg); border:1.5px solid transparent;
    border-radius:var(--radius-sm); padding:9px 12px;
    font-size:14px; color:var(--text-main); outline:none;
    font-family:'Lato',sans-serif; transition:border-color .2s;
  }
  .item-row input:focus { border-color:var(--blue-accent); background:#f0f4ff; }
  .btn-remove-item {
    background:none; border:none; cursor:pointer;
    font-size:16px; color:#ef4444; padding:4px;
    border-radius:6px; transition:background .15s;
    flex-shrink:0;
  }
  .btn-remove-item:hover { background:#fee2e2; }
  .btn-add-item {
    width:100%; background:none; border:1.5px dashed var(--border);
    border-radius:var(--radius-sm); padding:9px;
    font-size:14px; color:var(--blue-accent); cursor:pointer;
    font-family:'Lato',sans-serif; font-weight:700;
    transition:background .15s, border-color .15s;
    display:flex; align-items:center; justify-content:center; gap:6px;
  }
  .btn-add-item:hover { background:#f0f4ff; border-color:var(--blue-accent); }

  .notes-empty { grid-column:1/3; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:var(--text-sub); gap:12px; }
  .notes-empty span { font-size:48px; }
  .notes-empty p { font-size:15px; }

  .notes-grid {
    grid-column: 1 / 3;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* ── Responsivo ── */
  @media (max-width: 900px) {
    .dash-grid {
      grid-template-columns: 1fr;
    }
    .notes-grid {
      grid-column: 1 / 2;
    }
    .notes-empty { grid-column: 1 / 3; }
  }

  @media (max-width: 640px) {
    .app-bg { padding: 16px; }

    .auth-card { padding: 32px 20px 28px; }

    .topbar { padding: 0 16px; height: 80px; }
    .topbar-brand span { font-size: 15px; }
    .topbar-title { display: none; }

    .dash-content { padding: 20px 16px; }

    .dash-header { flex-direction: column; gap: 14px; align-items: stretch; }
    .dash-header h1 { font-size: 22px; }
    .btn-new { justify-content: center; }

    .notes-grid {
      grid-template-columns: 1fr;
    }
    .notes-empty { grid-column: 1 / 2; }

    .modal-card { padding: 24px 18px 20px; margin: 12px; max-width: calc(100vw - 24px); }

    .cal-day { font-size: 12px; }

    .rcal-day { font-size: 11px; }
  }
`;

const INITIAL_NOTES = [
  {
    id: 1, title: "Lista de Compras", type: "checklist", color: "yellow",
    items: [
      { text: "Leite", done: false },
      { text: "Pão", done: true },
      { text: "Ovos", done: false },
    ],
    reminder: null,
  },
  {
    id: 2, title: "Ideias do Projeto", type: "text", color: "blue",
    content: "Desenvolver uma aplicação de notas intuitiva e fácil de usar. Incluir diferentes tipos de notas para diferentes necessidades.",
    reminder: null,
  },
  {
    id: 3, title: "Tarefas da Semana", type: "list", color: "green",
    items: ["Reunião com equipe", "Revisar código", "Estudar React", "Fazer exercícios"],
    reminder: null,
  },
];

const COLOR_OPTIONS = [
  { key: "yellow", bg: "#fef9c3", border: "#fde047" },
  { key: "blue",   bg: "#dbeafe", border: "#93c5fd" },
  { key: "green",  bg: "#dcfce7", border: "#86efac" },
  { key: "pink",   bg: "#fce7f3", border: "#f9a8d4" },
];

const TYPE_OPTIONS = [
  { value: "text", label: "📄  Texto" },
  { value: "checklist", label: "☑️  Checklist" },
  { value: "list", label: "≡  Lista" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}
const MONTH_NAMES = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
const DAY_NAMES = ["DOM","SEG","TER","QUA","QUI","SEX","SAB"];

// ── ReminderCalendar – calendário interativo no modal ─────────────────────────
function ReminderCalendar({ value, onChange }) {
  const today = new Date();
  const selected = value ? new Date(value) : null;
  const [cur, setCur] = useState({
    year: selected ? selected.getFullYear() : today.getFullYear(),
    month: selected ? selected.getMonth() : today.getMonth(),
  });

  const timeStr = selected
    ? `${String(selected.getHours()).padStart(2,"0")}:${String(selected.getMinutes()).padStart(2,"0")}`
    : "09:00";

  function selectDay(day) {
    const [h, m] = timeStr.split(":").map(Number);
    const d = new Date(cur.year, cur.month, day, h, m);
    onChange(d.toISOString());
  }

  function changeTime(t) {
    const [h, m] = t.split(":").map(Number);
    const base = selected || new Date(cur.year, cur.month, today.getDate());
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m);
    onChange(d.toISOString());
  }

  function prev() {
    setCur(c => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  }
  function next() {
    setCur(c => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });
  }

  const daysInMonth = getDaysInMonth(cur.year, cur.month);
  const firstDay = getFirstDay(cur.year, cur.month);
  const cells = [...Array(firstDay).fill(null), ...Array.from({length: daysInMonth}, (_,i) => i+1)];

  return (
    <div className="reminder-calendar">
      <div className="rcal-header">
        <span className="rcal-month">{MONTH_NAMES[cur.month]} {cur.year}</span>
        <div className="rcal-nav">
          <button onClick={prev}>‹</button>
          <button onClick={next}>›</button>
        </div>
      </div>
      <div className="rcal-grid">
        {DAY_NAMES.map(d => <div key={d} className="rcal-day-name">{d}</div>)}
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="rcal-day empty" />;
          const isToday = day === today.getDate() && cur.month === today.getMonth() && cur.year === today.getFullYear();
          const isSelected = selected && day === selected.getDate() && cur.month === selected.getMonth() && cur.year === selected.getFullYear();
          return (
            <div
              key={i}
              className={`rcal-day ${isToday && !isSelected ? "today" : ""} ${isSelected ? "selected" : ""}`}
              onClick={() => selectDay(day)}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="rcal-time">
        <label>Horário:</label>
        <input type="time" value={timeStr} onChange={e => changeTime(e.target.value)} />
      </div>
    </div>
  );
}

// ── ItemsEditor – editor dinâmico de itens ────────────────────────────────────
function ItemsEditor({ type, items, onChange }) {
  function updateItem(idx, val) {
    const next = items.map((it, i) => i === idx ? val : it);
    onChange(next);
  }
  function removeItem(idx) {
    onChange(items.filter((_, i) => i !== idx));
  }
  function addItem() {
    onChange([...items, ""]);
  }

  return (
    <div>
      <div className="items-list">
        {items.map((item, i) => (
          <div key={i} className="item-row">
            <input
              value={item}
              placeholder={`${type === "checklist" ? "Item do checklist" : "Item da lista"} ${i + 1}`}
              onChange={e => updateItem(i, e.target.value)}
            />
            <button className="btn-remove-item" onClick={() => removeItem(i)} title="Remover">🗑️</button>
          </div>
        ))}
      </div>
      <button className="btn-add-item" onClick={addItem}>
        + Adicionar Item
      </button>
    </div>
  );
}

// ── Componentes ───────────────────────────────────────────────────────────────

function Logo() {
  return (
    <div className="logo-wrap">
      <img src={logoImg} alt="Rabisco" style={{width: 150, height: 150, objectFit: "contain"}} />
    </div>
  );
}

function LoginPage({ onLogin, onGoRegister }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit() {
    if (email && senha) onLogin({ email });
  }

  return (
    <div className="app-bg">
      <style>{GLOBAL_STYLE}</style>
      <div className="auth-card">
        <Logo />
        <h2 className="auth-title">Bem vindo</h2>
        <p className="auth-sub">Entre com seu email e senha para acessar seus rabiscos</p>
        <div className="field-group">
          <div className="field">
            <label>Email</label>
            <input placeholder="seu@email.com" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="field">
            <label>Senha</label>
            <input placeholder="••••••••" type="password" value={senha} onChange={e=>setSenha(e.target.value)} />
          </div>
          <span className="auth-link" onClick={onGoRegister}>Criar conta</span>
          <button className="btn-primary" onClick={handleSubmit}>Entrar</button>
        </div>
      </div>
    </div>
  );
}

function RegisterPage({ onRegister, onGoLogin }) {
  const [form, setForm] = useState({ nome:"", sobrenome:"", email:"", senha:"", confirmar:"" });
  const set = (k) => (e) => setForm(f=>({...f,[k]:e.target.value}));

  function handleSubmit() {
    if (form.nome && form.email && form.senha) onRegister({ email: form.email });
  }

  return (
    <div className="app-bg">
      <style>{GLOBAL_STYLE}</style>
      <div className="auth-card">
        <Logo />
        <h2 className="auth-title">Criar Conta</h2>
        <p className="auth-sub">Crie sua conta para começar a organizar seus rabiscos</p>
        <div className="field-group">
          <div className="field"><label>Nome</label><input placeholder="Seu nome" value={form.nome} onChange={set("nome")} /></div>
          <div className="field"><label>Sobrenome</label><input placeholder="Seu sobrenome" value={form.sobrenome} onChange={set("sobrenome")} /></div>
          <div className="field"><label>Email</label><input placeholder="seu@email.com" type="email" value={form.email} onChange={set("email")} /></div>
          <div className="field"><label>Senha</label><input placeholder="••••••••" type="password" value={form.senha} onChange={set("senha")} /></div>
          <div className="field"><label>Confirmar Senha</label><input placeholder="••••••••" type="password" value={form.confirmar} onChange={set("confirmar")} /></div>
          <span className="auth-link" onClick={onGoLogin}>Já tem uma conta? Entrar</span>
          <button className="btn-primary" onClick={handleSubmit}>Criar Conta</button>
        </div>
      </div>
    </div>
  );
}

function NoteCard({ note, onDelete, onToggleCheck, onEdit }) {
  return (
    <div className={`note-card ${note.color}`}>
      <div className="note-header">
        <span className="note-title">{note.title}</span>
        <div className="note-actions">
          <button title="Editar" onClick={() => onEdit(note)}>✏️</button>
          <button title="Excluir" onClick={() => onDelete(note.id)}>🗑️</button>
        </div>
      </div>
      <div className="note-type">{note.type === "text" ? "Texto" : note.type === "checklist" ? "Checklist" : "Lista"}</div>
      <div className="note-body">
        {note.type === "text" && <p>{note.content}</p>}
        {note.type === "checklist" && note.items.map((item, i) => (
          <div key={i} className={`checklist-item ${item.done ? "checked" : ""}`}>
            <input type="checkbox" checked={item.done} onChange={() => onToggleCheck(note.id, i)} />
            <span>{item.text}</span>
          </div>
        ))}
        {note.type === "list" && note.items.map((item, i) => (
          <div key={i} className="list-item">
            <div className="list-bullet" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Calendar({ notes }) {
  const today = new Date();
  const [cur, setCur] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const reminderDays = new Set(
    notes
      .filter(n => n.reminder)
      .map(n => {
        const d = new Date(n.reminder);
        if (d.getFullYear() === cur.year && d.getMonth() === cur.month) return d.getDate();
        return null;
      })
      .filter(Boolean)
  );

  const upcomingReminders = notes
    .filter(n => n.reminder && new Date(n.reminder) >= today)
    .sort((a, b) => new Date(a.reminder) - new Date(b.reminder))
    .slice(0, 3);

  function prev() {
    setCur(c => {
      if (c.month === 0) return { year: c.year - 1, month: 11 };
      return { ...c, month: c.month - 1 };
    });
  }
  function next() {
    setCur(c => {
      if (c.month === 11) return { year: c.year + 1, month: 0 };
      return { ...c, month: c.month + 1 };
    });
  }

  const daysInMonth = getDaysInMonth(cur.year, cur.month);
  const firstDay = getFirstDay(cur.year, cur.month);
  const cells = [...Array(firstDay).fill(null), ...Array.from({length: daysInMonth}, (_,i) => i+1)];

  return (
    <div className="calendar-card">
      <div className="cal-header">
        <div className="cal-title">📅 Lembretes</div>
        <div className="cal-nav">
          <button onClick={prev}>‹</button>
          <button onClick={next}>›</button>
        </div>
      </div>
      <div style={{textAlign:"center", fontSize:14, fontWeight:700, color:"var(--text-main)", marginBottom:10, fontFamily:"'Nunito',sans-serif"}}>
        {MONTH_NAMES[cur.month]} {cur.year}
      </div>
      <div className="cal-grid">
        {DAY_NAMES.map(d => <div key={d} className="cal-day-name">{d}</div>)}
        {cells.map((day, i) => {
          if (!day) return <div key={i} className="cal-day empty" />;
          const isToday = day === today.getDate() && cur.month === today.getMonth() && cur.year === today.getFullYear();
          const hasReminder = reminderDays.has(day);
          return (
            <div key={i} className={`cal-day ${isToday ? "today" : ""} ${hasReminder ? "has-reminder" : ""}`}>
              {day}
            </div>
          );
        })}
      </div>
      <div className="cal-legend">
        <div className="legend-item"><div className="legend-dot" style={{background:"var(--blue-accent)"}} /> Com lembrete</div>
        <div className="legend-item"><div className="legend-dot" style={{background:"#94a3b8"}} /> Hoje</div>
      </div>
      <div className="reminders-section">
        <div className="reminders-label">• Próximos lembretes</div>
        {upcomingReminders.length === 0 ? (
          <div className="empty-reminder">
            <span>📅</span>
            <p>Nenhum lembrete agendado</p>
          </div>
        ) : upcomingReminders.map(n => (
          <div key={n.id} className="reminder-item">
            <div className="reminder-item-icon">🔔</div>
            <div className="reminder-item-info">
              <p>{n.title}</p>
              <span>{new Date(n.reminder).toLocaleString("pt-BR", {dateStyle:"short", timeStyle:"short"})}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Modal compartilhado (criar / editar) ──────────────────────────────────────
function NoteModal({ mode, initialNote, onClose, onSave }) {
  const isEdit = mode === "edit";

  // Estado inicial baseado na nota (editar) ou vazio (criar)
  const [title, setTitle] = useState(initialNote?.title ?? "");
  const [type, setType] = useState(initialNote?.type ?? "text");
  const [color, setColor] = useState(initialNote?.color ?? "yellow");
  const [content, setContent] = useState(initialNote?.content ?? "");
  const [hasReminder, setHasReminder] = useState(!!initialNote?.reminder);
  const [reminderDate, setReminderDate] = useState(initialNote?.reminder ?? null);

  // Itens para checklist/list – normalizado como array de strings
  const toStrings = (note) => {
    if (!note) return [""];
    if (note.type === "checklist") return note.items.map(it => it.text);
    if (note.type === "list") return note.items;
    return [""];
  };
  const [items, setItems] = useState(toStrings(initialNote));

  // Quando muda o tipo, reseta itens
  function handleTypeChange(newType) {
    setType(newType);
    if (newType !== "text" && items.length === 0) setItems([""]);
  }

  function handleSave() {
    if (!title.trim()) return;
    const base = {
      id: initialNote?.id ?? Date.now(),
      title,
      type,
      color,
      reminder: hasReminder && reminderDate ? reminderDate : null,
    };
    if (type === "text") {
      onSave({ ...base, content });
    } else if (type === "checklist") {
      const filtered = items.filter(t => t.trim());
      if (isEdit) {
        // Preserva o estado "done" para itens existentes pelo texto
        const oldMap = {};
        (initialNote?.items || []).forEach(it => { oldMap[it.text] = it.done; });
        onSave({ ...base, items: filtered.map(t => ({ text: t, done: oldMap[t] ?? false })) });
      } else {
        onSave({ ...base, items: filtered.map(t => ({ text: t, done: false })) });
      }
    } else {
      onSave({ ...base, items: items.filter(t => t.trim()) });
    }
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-card">
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-title">{isEdit ? "Editar Rabisco" : "Criar Novo Rabisco"}</div>
        <div className="modal-sub">
          {isEdit ? "Edite os campos abaixo para atualizar seu rabisco." : "Preencha os campos abaixo para criar um novo rabisco."}
        </div>

        <div className="modal-field">
          <label>Título</label>
          <input placeholder="Digite o título do rabisco..." value={title} onChange={e=>setTitle(e.target.value)} />
        </div>

        <div className="modal-field">
          <label>Tipo de Rabisco</label>
          <select value={type} onChange={e=>handleTypeChange(e.target.value)}>
            {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="modal-field">
          <label>Cor do Rabisco</label>
          <div className="color-picker">
            {COLOR_OPTIONS.map(c => (
              <div
                key={c.key}
                className={`color-swatch ${color === c.key ? "selected" : ""}`}
                style={{background: c.bg, borderColor: color === c.key ? "var(--blue-accent)" : c.border}}
                onClick={() => setColor(c.key)}
              />
            ))}
          </div>
        </div>

        {type === "text" ? (
          <div className="modal-field">
            <label>Conteúdo</label>
            <textarea
              placeholder="Digite o conteúdo do rabisco..."
              value={content}
              onChange={e=>setContent(e.target.value)}
            />
          </div>
        ) : (
          <div className="modal-field">
            <label>{type === "checklist" ? "Itens do Checklist" : "Itens da Lista"}</label>
            <ItemsEditor type={type} items={items} onChange={setItems} />
          </div>
        )}

        <div className="modal-field">
          <label>Lembrete</label>
          <div className="toggle-row">
            <button className={`toggle ${hasReminder ? "on" : ""}`} onClick={() => setHasReminder(v=>!v)} />
            <span className="toggle-label">Adicionar lembrete</span>
          </div>
          {hasReminder && (
            <ReminderCalendar value={reminderDate} onChange={setReminderDate} />
          )}
        </div>

        <button className="btn-primary" onClick={handleSave}>
          {isEdit ? "Salvar Alterações" : "Criar Rabisco"}
        </button>
      </div>
    </div>
  );
}

function Dashboard({ user, onLogout }) {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [showCreate, setShowCreate] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  function handleDelete(id) { setNotes(n => n.filter(x => x.id !== id)); }
  function handleToggle(id, idx) {
    setNotes(n => n.map(note => {
      if (note.id !== id || note.type !== "checklist") return note;
      const items = note.items.map((item, i) => i === idx ? {...item, done: !item.done} : item);
      return {...note, items};
    }));
  }
  function handleCreate(note) { setNotes(n => [...n, note]); }
  function handleEdit(note) { setEditingNote(note); }
  function handleSaveEdit(updated) {
    setNotes(n => n.map(note => note.id === updated.id ? updated : note));
  }

  const textNotes = notes.filter(n => n.type !== "calendar");

  return (
    <div className="dash-wrap">
      <style>{GLOBAL_STYLE}</style>

      <div className="topbar">
        <div className="topbar-brand">
      <img src={logoImg} alt="Rabisco" style={{width: 70, height: 70, objectFit: "contain"}} />
          <span style={{color:"var(--border)",margin:"0 8px"}}>|</span>
          <span className="topbar-title">Meus Rabiscos</span>
        </div>
        <button className="btn-logout" onClick={onLogout}>
          ↩ Sair
        </button>
      </div>

      <div className="dash-content">
        <div className="dash-header">
          <div>
            <h1>Meus Rabiscos</h1>
            <p>Organize suas ideias, listas e tarefas</p>
          </div>
          <button className="btn-new" onClick={() => setShowCreate(true)}>+ Novo Rabisco</button>
        </div>

        <div className="dash-grid">
          <div className="notes-grid">
            {textNotes.length === 0 ? (
              <div className="notes-empty">
                <span>📝</span>
                <p>Nenhum rabisco ainda. Crie o primeiro!</p>
              </div>
            ) : textNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                onDelete={handleDelete}
                onToggleCheck={handleToggle}
                onEdit={handleEdit}
              />
            ))}
          </div>
          <Calendar notes={notes} />
        </div>
      </div>

      {showCreate && (
        <NoteModal
          mode="create"
          initialNote={null}
          onClose={() => setShowCreate(false)}
          onSave={handleCreate}
        />
      )}

      {editingNote && (
        <NoteModal
          mode="edit"
          initialNote={editingNote}
          onClose={() => setEditingNote(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

// ── App root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState(null);

  function handleLogin(u) { setUser(u); setScreen("dashboard"); }
  function handleRegister(u) { setUser(u); setScreen("dashboard"); }
  function handleLogout() { setUser(null); setScreen("login"); }

  if (screen === "login") return <LoginPage onLogin={handleLogin} onGoRegister={() => setScreen("register")} />;
  if (screen === "register") return <RegisterPage onRegister={handleRegister} onGoLogin={() => setScreen("login")} />;
  return <Dashboard user={user} onLogout={handleLogout} />;
}
import React, { useState, useEffect } from 'react';
import { X, StickyNote, MousePointerClick } from 'lucide-react';
import './DentalChart.css';

/* ─── Tooth Layout (Universal 1-32) ─────── */
const UPPER_TEETH = [
  { num: 1, type: 'molar' }, { num: 2, type: 'molar' }, { num: 3, type: 'molar' },
  { num: 4, type: 'premolar' }, { num: 5, type: 'premolar' },
  { num: 6, type: 'canine' }, { num: 7, type: 'incisor' }, { num: 8, type: 'incisor' },
  null,
  { num: 9, type: 'incisor' }, { num: 10, type: 'incisor' }, { num: 11, type: 'canine' },
  { num: 12, type: 'premolar' }, { num: 13, type: 'premolar' },
  { num: 14, type: 'molar' }, { num: 15, type: 'molar' }, { num: 16, type: 'molar' },
];
const LOWER_TEETH = [
  { num: 32, type: 'molar' }, { num: 31, type: 'molar' }, { num: 30, type: 'molar' },
  { num: 29, type: 'premolar' }, { num: 28, type: 'premolar' },
  { num: 27, type: 'canine' }, { num: 26, type: 'incisor' }, { num: 25, type: 'incisor' },
  null,
  { num: 24, type: 'incisor' }, { num: 23, type: 'incisor' }, { num: 22, type: 'canine' },
  { num: 21, type: 'premolar' }, { num: 20, type: 'premolar' },
  { num: 19, type: 'molar' }, { num: 18, type: 'molar' }, { num: 17, type: 'molar' },
];

const CONDITIONS = {
  cavity: { label: 'Cavity', bg: '#f97316', color: '#f97316', textColor: '#fff', short: 'C' },
  filling: { label: 'Filling', bg: '#3b82f6', color: '#3b82f6', textColor: '#fff', short: 'F' },
  extraction: { label: 'Extraction', bg: '#ef4444', color: '#ef4444', textColor: '#fff', short: '✕' },
  rootcanal: { label: 'Root Canal', bg: '#8b5cf6', color: '#8b5cf6', textColor: '#fff', short: 'RC' },
  crown: { label: 'Crown', bg: '#f59e0b', color: '#f59e0b', textColor: '#fff', short: 'CR' },
  missing: { label: 'Missing', bg: '#94a3b8', color: '#94a3b8', textColor: '#fff', short: 'M' },
};

const TOOTH_WIDTHS = { molar: 42, premolar: 34, canine: 30, incisor: 26 };
const GAP = 5;

const getCondition = (teeth, num) => teeth[num]?.condition || null;
const getNote = (teeth, num) => teeth[num]?.note || '';

/* ─── Build arch layout ──────────────────── */
function buildArch(list) {
  const rows = []; let x = 0;
  list.forEach(t => {
    if (!t) { rows.push({ gap: true, x }); x += 16; return; }
    const w = TOOTH_WIDTHS[t.type] || 30;
    rows.push({ ...t, x, w });
    x += w + GAP;
  });
  return { rows, totalW: x - GAP, totalH: 56 };
}

/* ─── Single Tooth SVG element ───────────── */
function ToothEl({ tooth, jaw, conditionKey, hasNote, isSelected, onClick }) {
  const { num, type, w } = tooth;
  const crownH = 34, rootH = 22, totalH = crownH + rootH;
  const cond = conditionKey ? CONDITIONS[conditionKey] : null;

  const crownFill = isSelected ? '#ede9fe' : (cond ? cond.bg : '#f8fafc');
  const crownStroke = isSelected ? '#8b5cf6' : (cond ? cond.color : '#e2e8f0');
  const crownSW = isSelected ? 2.5 : 1.5;
  const crownY = jaw === 'upper' ? 0 : rootH;

  const rp = jaw === 'upper'
    ? `${w * 0.28},${crownH} ${w * 0.4},${totalH} ${w * 0.6},${totalH} ${w * 0.72},${crownH}`
    : `${w * 0.28},${rootH}  ${w * 0.4},0          ${w * 0.6},0          ${w * 0.72},${rootH}`;

  return (
    <g onClick={onClick} style={{ cursor: 'pointer' }} role="button" aria-label={`Tooth ${num}`}>
      <polygon points={rp} fill="#fde8d8" stroke="#f4c5a8" strokeWidth="1" />
      <rect x="1" y={crownY} width={w - 2} height={crownH} rx="7"
        fill={crownFill} stroke={crownStroke} strokeWidth={crownSW} />
      {cond && (
        <text x={w / 2} y={crownY + crownH / 2} textAnchor="middle" dominantBaseline="central"
          fontSize={type === 'molar' ? 10 : 9} fontWeight="800"
          fontFamily="Montserrat,sans-serif" fill={cond.textColor}>
          {cond.short}
        </text>
      )}
      {hasNote && (
        <circle cx={w - 6} cy={crownY + 6} r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
      )}
      <text x={w / 2} y={jaw === 'upper' ? totalH - 2 : 2}
        textAnchor="middle" dominantBaseline={jaw === 'upper' ? 'auto' : 'hanging'}
        fontSize="8" fontWeight="700" fontFamily="Montserrat,sans-serif" fill="#94a3b8">
        {num}
      </text>
    </g>
  );
}

/* ─── Arch SVG ───────────────────────────── */
function ArchSVG({ arch, jaw, teeth, selected, onToothClick }) {
  return (
    <svg
      viewBox={`0 0 ${arch.totalW} ${arch.totalH}`}
      preserveAspectRatio="xMidYMid meet"
      className="dc-arch-svg"
      style={{ overflow: 'visible' }}
    >
      {arch.rows.map((t, i) =>
        t.gap ? null : (
          <svg key={t.num} x={t.x} y={0} width={t.w} height={arch.totalH} overflow="visible">
            <ToothEl
              tooth={t} jaw={jaw}
              conditionKey={getCondition(teeth, t.num)}
              hasNote={!!getNote(teeth, t.num)}
              isSelected={selected?.num === t.num}
              onClick={() => onToothClick(t)}
            />
          </svg>
        )
      )}
    </svg>
  );
}

/* ─── Main Modal ─────────────────────────── */
/* ─── Main Modal ─────────────────────────── */
export default function DentalChartModal({ patient, onClose }) {
  const storageKey = `dentobees_chart_${patient.id}`;

  const [teeth, setTeeth] = useState(() => {
    const s = localStorage.getItem(storageKey);
    if (!s) return {};
    const parsed = JSON.parse(s);
    const normalized = {};
    Object.entries(parsed).forEach(([k, v]) => {
      if (typeof v === 'string') normalized[k] = { condition: v, history: [], images: { before: null, after: null } };
      else if (v && typeof v === 'object') {
        normalized[k] = {
          condition: v.condition || null,
          note: v.note || '',
          history: v.history || [],
          images: v.images || { before: null, after: null }
        };
      }
    });
    return normalized;
  });
  const [selected, setSelected] = useState(null);
  const [draftNote, setDraftNote] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(teeth));
  }, [teeth, storageKey]);

  const upper = buildArch(UPPER_TEETH);
  const lower = buildArch(LOWER_TEETH);

  const handleToothClick = (t) => {
    if (selected?.num === t.num) { setSelected(null); return; }
    setSelected(t);
    setDraftNote(getNote(teeth, t.num));
    setShowHistory(false);
  };

  const applyCondition = (k) => {
    const timestamp = new Date().toLocaleString();
    const oldCondition = teeth[selected.num]?.condition || 'Healthy';
    const newCondition = k === 'clear' ? 'Healthy' : CONDITIONS[k].label;

    setTeeth(prev => {
      const next = { ...prev };
      const existing = next[selected.num] || { history: [], images: { before: null, after: null } };
      
      const historyEntry = {
        date: timestamp,
        action: `Changed from ${oldCondition} to ${newCondition}`,
        type: 'condition'
      };

      if (k === 'clear') {
        next[selected.num] = { ...existing, condition: null, history: [historyEntry, ...existing.history] };
      } else {
        next[selected.num] = { 
          ...existing, 
          condition: k, 
          history: [historyEntry, ...existing.history] 
        };
      }
      return next;
    });
  };

  const saveNote = () => {
    const timestamp = new Date().toLocaleString();
    setTeeth(prev => {
      const next = { ...prev };
      const existing = next[selected.num] || { history: [], images: { before: null, after: null } };
      
      const historyEntry = {
        date: timestamp,
        action: `Updated clinical note`,
        type: 'note'
      };

      next[selected.num] = { 
        ...existing, 
        note: draftNote.trim(), 
        history: [historyEntry, ...existing.history] 
      };
      return next;
    });
    setSelected(null);
  };

  const handleImageUpload = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const timestamp = new Date().toLocaleString();
      setTeeth(prev => {
        const next = { ...prev };
        const existing = next[selected.num] || { history: [], images: { before: null, after: null } };
        
        const historyEntry = {
          date: timestamp,
          action: `Uploaded ${type} image`,
          type: 'image'
        };

        next[selected.num] = {
          ...existing,
          images: {
            ...existing.images,
            [type]: reader.result
          },
          history: [historyEntry, ...existing.history]
        };
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const summary = Object.values(teeth).reduce((acc, v) => {
    if (v?.condition) acc[v.condition] = (acc[v.condition] || 0) + 1;
    return acc;
  }, {});

  const selCondition = selected ? getCondition(teeth, selected.num) : null;
  const selCond = selCondition ? CONDITIONS[selCondition] : null;
  const selData = selected ? (teeth[selected.num] || { history: [], images: { before: null, after: null } }) : null;

  return (
    <div className="dc-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="dc-modal">

        {/* ── Header ── */}
        <div className="dc-header">
          <div className="dc-header-left">
            <span className="dc-header-icon">🦷</span>
            <div>
              <h2 className="dc-title">Dental Charting System v3.3</h2>
              <p className="dc-subtitle">{patient.name} · {patient.patientId} · {patient.age} yrs</p>
            </div>
          </div>
          <button className="dc-close" onClick={onClose}><X size={18} /></button>
        </div>

        {/* ── Two-column body ── */}
        <div className="dc-body">

          {/* LEFT: chart */}
          <div className="dc-chart-panel">
            <div className="dc-jaw-tag">
              <span className="dc-jaw-tag-text">R</span>
              <span className="dc-jaw-tag-label">UPPER JAW</span>
              <span className="dc-jaw-tag-text">L</span>
            </div>

            <ArchSVG arch={upper} jaw="upper" teeth={teeth} selected={selected} onToothClick={handleToothClick} />

            <div className="dc-midline">
              <div className="dc-midline-line" />
              <span className="dc-midline-label">OCCLUSAL MIDLINE</span>
              <div className="dc-midline-line" />
            </div>

            <ArchSVG arch={lower} jaw="lower" teeth={teeth} selected={selected} onToothClick={handleToothClick} />

            <div className="dc-jaw-tag">
              <span className="dc-jaw-tag-text">R</span>
              <span className="dc-jaw-tag-label">LOWER JAW</span>
              <span className="dc-jaw-tag-text">L</span>
            </div>

            {/* Legend */}
            <div className="dc-legend">
              {Object.entries(CONDITIONS).map(([k, v]) => (
                <span key={k} className="dc-legend-item">
                  <span className="dc-legend-dot" style={{ background: v.bg }} />
                  {v.label}{summary[k] ? ` (${summary[k]})` : ''}
                </span>
              ))}
              <span className="dc-legend-item">
                <span className="dc-legend-dot" style={{ background: '#f59e0b' }} />
                Has Note
              </span>
            </div>
          </div>

          {/* RIGHT: condition + note panel */}
          <div className="dc-side-panel">
            {!selected ? (
              <div className="dc-side-empty">
                <MousePointerClick size={36} strokeWidth={1.5} className="dc-side-empty-icon" />
                <p>Click any tooth<br />to edit its condition,<br />upload images or add notes</p>
              </div>
            ) : (
              <div className="dc-side-scrollable">
                <div className="dc-side-tooth-header">
                  <div className="dc-side-tooth-num">#{selected.num}</div>
                  <div>
                    <p className="dc-side-tooth-name">Tooth {selected.num}</p>
                    <p className="dc-side-tooth-type">{selected.type}</p>
                  </div>
                  {selCond && (
                    <span className="dc-side-badge" style={{ background: selCond.bg }}>
                      {selCond.label}
                    </span>
                  )}
                </div>

                <div className="dc-tab-nav">
                  <button className={`dc-tab-btn ${!showHistory ? 'active' : ''}`} onClick={() => setShowHistory(false)}>Details</button>
                  <button className={`dc-tab-btn ${showHistory ? 'active' : ''}`} onClick={() => setShowHistory(true)}>History ({selData.history.length})</button>
                </div>

                {!showHistory ? (
                  <>
                    <p className="dc-side-section-label">Condition</p>
                    <div className="dc-cond-grid">
                      {Object.entries(CONDITIONS).map(([k, v]) => (
                        <button key={k}
                          className={`dc-cond-btn ${selCondition === k ? 'active' : ''}`}
                          style={{ '--cc': v.bg }}
                          onClick={() => applyCondition(k)}>
                          <span className="dc-cond-dot" style={{ background: v.bg }} />
                          {v.label}
                        </button>
                      ))}
                      <button className="dc-cond-btn clear" onClick={() => applyCondition('clear')}>
                        <span className="dc-cond-dot clear-dot" />
                        Clear
                      </button>
                    </div>

                    <div className="dc-divider" />

                    <p className="dc-side-section-label">Before / After Images</p>
                    <div className="dc-image-grid">
                      <div className="dc-image-box">
                        <label>Before</label>
                        <div className="dc-image-preview">
                          {selData.images.before ? (
                            <img src={selData.images.before} alt="Before" />
                          ) : (
                            <div className="dc-image-placeholder">No Image</div>
                          )}
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload('before', e)} />
                        </div>
                      </div>
                      <div className="dc-image-box">
                        <label>After</label>
                        <div className="dc-image-preview">
                          {selData.images.after ? (
                            <img src={selData.images.after} alt="After" />
                          ) : (
                            <div className="dc-image-placeholder">No Image</div>
                          )}
                          <input type="file" accept="image/*" onChange={(e) => handleImageUpload('after', e)} />
                        </div>
                      </div>
                    </div>

                    <div className="dc-divider" />

                    <label className="dc-side-section-label">
                      <StickyNote size={12} style={{ marginRight: 5 }} />
                      Clinical Note
                    </label>
                    <textarea
                      className="dc-note-input"
                      placeholder="e.g. Moderate caries on mesial surface..."
                      value={draftNote}
                      onChange={e => setDraftNote(e.target.value)}
                      rows={6}
                    />
                    <div className="dc-note-actions">
                      <button className="dc-note-cancel" onClick={() => setSelected(null)}>Cancel</button>
                      <button className="dc-note-save" onClick={saveNote}>Save Note</button>
                    </div>
                  </>
                ) : (
                  <div className="dc-history-list">
                    {selData.history.length === 0 ? (
                      <p className="dc-no-history">No history recorded for this tooth.</p>
                    ) : (
                      selData.history.map((h, i) => (
                        <div key={i} className="dc-history-item">
                          <div className="dc-history-dot" />
                          <div className="dc-history-content">
                            <p className="dc-history-action">{h.action}</p>
                            <p className="dc-history-date">{h.date}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="dc-footer">
          <span className="dc-footer-tip">
            🦷 {Object.keys(teeth).length} of 32 teeth recorded
          </span>
          <button className="dc-done-btn" onClick={onClose}>Done</button>
        </div>
      </div>
    </div>
  );
}


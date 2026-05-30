import { useState, useEffect, useRef } from 'react'
import { CATEGORIES, UNITS, convert, formatResult, getFormula, getUnitAbbr } from './converters'
import { LANGS, TRANSLATIONS } from './translations'
import AdBanner from './AdBanner'
import './App.css'

const MAX_HISTORY  = 10
const MAX_FAVORITES = 8
const CONV_LIMIT   = 5
const COOLDOWN_MS  = 60_000

const DEFAULT_TAB_ORDER = ['temperature', 'weight', 'length', 'volume', 'currency', 'favorites']
const TAB_META = {
  temperature: { icon: '🌡️' },
  weight:      { icon: '⚖️'  },
  length:      { icon: '📏'  },
  volume:      { icon: '🧪'  },
  currency:    { icon: '💱'  },
  favorites:   { icon: '⭐'  },
}

function loadStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
  catch { return fallback }
}

// ── Cooldown Modal ────────────────────────────────────────────────
function CooldownModal({ cooldownUntil, onDismiss, t }) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, cooldownUntil - Date.now()))

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(Math.max(0, cooldownUntil - Date.now())), 200)
    return () => clearInterval(id)
  }, [cooldownUntil])

  const seconds  = Math.ceil(timeLeft / 1000)
  const progress = (timeLeft / COOLDOWN_MS) * 100
  const done     = timeLeft === 0

  return (
    <div className="cooldown-overlay">
      <div className="cooldown-card">
        <div className="cooldown-icon">🕐</div>
        <h2 className="cooldown-title">{t.slowDown}</h2>
        <p className="cooldown-desc">
          <strong>{t.conversionsMade}</strong><br />
          {t.pleaseWait}
        </p>
        <AdBanner slot="1234567890" className="ad-cooldown" />
        {!done ? (
          <>
            <div className="cooldown-timer">{seconds}s</div>
            <div className="cooldown-bar-track">
              <div className="cooldown-bar-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="cooldown-sub">{t.resumeIn.replace('{n}', seconds)}</p>
          </>
        ) : (
          <button className="cooldown-btn" onClick={onDismiss}>{t.continueForFree}</button>
        )}
      </div>
    </div>
  )
}

// ── Favorites View ────────────────────────────────────────────────
function FavoritesView({ favorites, setFavorites, loadFavorite, t }) {
  if (favorites.length === 0) {
    return (
      <div className="converter-card favorites-empty">
        <div className="empty-icon">⭐</div>
        <p className="empty-text">{t.noFavorites}</p>
      </div>
    )
  }
  return (
    <div className="converter-card">
      <div className="favorites-grid">
        {favorites.map(fav => {
          const cat = CATEGORIES.find(c => c.id === fav.category)
          return (
            <div key={fav.key} className="fav-card">
              <button
                className="fav-card-main"
                onClick={() => loadFavorite(fav)}
              >
                <span className="fav-card-icon">{cat?.icon}</span>
                <div className="fav-card-info">
                  <span className="fav-card-cat">{cat?.label}</span>
                  <span className="fav-card-units">
                    {getUnitAbbr(fav.fromUnit, fav.category)} → {getUnitAbbr(fav.toUnit, fav.category)}
                  </span>
                </div>
              </button>
              <button
                className="fav-card-del"
                onClick={() => setFavorites(prev => prev.filter(f => f.key !== fav.key))}
                aria-label="Remove favorite"
              >×</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Main App ──────────────────────────────────────────────────────
export default function App() {
  // Language — auto-detect browser lang, fallback to 'en'
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('uc_lang')
    if (stored && TRANSLATIONS[stored]) return stored
    const bl = navigator.language?.slice(0, 2).toLowerCase()
    return TRANSLATIONS[bl] ? bl : 'en'
  })
  const t = TRANSLATIONS[lang] ?? TRANSLATIONS.en

  // Theme
  const [darkMode, setDarkMode] = useState(() =>
    loadStorage('uc_dark', window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false)
  )

  // Tab order — persisted, 6 tabs including 'favorites'
  const [tabOrder, setTabOrder] = useState(() => {
    try {
      const s = JSON.parse(localStorage.getItem('uc_tab_order'))
      if (Array.isArray(s) && s.length === 6) return s
    } catch {}
    return DEFAULT_TAB_ORDER
  })

  // Drag-to-reorder refs
  const dragItem = useRef(null)
  const dragOver = useRef(null)
  const [draggingIdx, setDraggingIdx] = useState(null)

  // Conversion state
  const [category,   setCategory]   = useState('weight')
  const [fromUnit,   setFromUnit]   = useState('kg')
  const [toUnit,     setToUnit]     = useState('lb')
  const [inputValue, setInputValue] = useState('')
  const [result,     setResult]     = useState('')
  const [copied,     setCopied]     = useState(false)
  const [history,    setHistory]    = useState(() => loadStorage('uc_history',   []))
  const [favorites,  setFavorites]  = useState(() => loadStorage('uc_favorites', []))

  // Cooldown
  const [convCount,     setConvCount]     = useState(() => parseInt(loadStorage('uc_conv_count', 0)))
  const [cooldownUntil, setCooldownUntil] = useState(() => {
    const v = parseInt(localStorage.getItem('uc_cooldown_until') || '0')
    return v > Date.now() ? v : 0
  })
  const cooldownActive = cooldownUntil > 0 && Date.now() < cooldownUntil

  // ── Persist ──────────────────────────────────
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('uc_dark', JSON.stringify(darkMode))
  }, [darkMode])
  useEffect(() => { localStorage.setItem('uc_lang',       lang)                       }, [lang])
  useEffect(() => { localStorage.setItem('uc_history',    JSON.stringify(history))    }, [history])
  useEffect(() => { localStorage.setItem('uc_favorites',  JSON.stringify(favorites))  }, [favorites])
  useEffect(() => { localStorage.setItem('uc_conv_count', String(convCount))          }, [convCount])

  // ── Real-time conversion ──────────────────────
  useEffect(() => {
    if (inputValue === '' || inputValue === '-') { setResult(''); return }
    const converted = convert(inputValue, fromUnit, toUnit, category)
    setResult(converted === '' ? '' : String(converted))
  }, [inputValue, fromUnit, toUnit, category])

  // ── Debounced: save history + count conversion ──
  useEffect(() => {
    if (!inputValue || result === '' || category === 'favorites') return
    const timer = setTimeout(() => {
      setHistory(prev => {
        const entry = { id: Date.now(), category, fromValue: inputValue, fromUnit, toValue: formatResult(result), toUnit }
        const deduped = prev.filter(h =>
          !(h.category === category && h.fromUnit === fromUnit && h.toUnit === toUnit && h.fromValue === inputValue)
        )
        return [entry, ...deduped].slice(0, MAX_HISTORY)
      })
      setConvCount(prev => {
        const next = prev + 1
        if (next >= CONV_LIMIT) {
          const until = Date.now() + COOLDOWN_MS
          setCooldownUntil(until)
          localStorage.setItem('uc_cooldown_until', String(until))
          localStorage.setItem('uc_conv_count', '0')
          return 0
        }
        return next
      })
    }, 1500)
    return () => clearTimeout(timer)
  }, [inputValue, fromUnit, toUnit, category, result])

  // ── Drag handlers ─────────────────────────────
  const handleDragStart = (idx) => { dragItem.current = idx; setDraggingIdx(idx) }
  const handleDragEnter = (idx) => { dragOver.current = idx }
  const handleDragEnd   = () => {
    if (dragItem.current !== null && dragOver.current !== null && dragItem.current !== dragOver.current) {
      const order = [...tabOrder]
      const [moved] = order.splice(dragItem.current, 1)
      order.splice(dragOver.current, 0, moved)
      setTabOrder(order)
      localStorage.setItem('uc_tab_order', JSON.stringify(order))
    }
    dragItem.current = dragOver.current = null
    setDraggingIdx(null)
  }

  // ── Conversion handlers ───────────────────────
  const handleCategoryChange = (cat) => {
    setCategory(cat)
    if (cat !== 'favorites' && UNITS[cat]) {
      setFromUnit(UNITS[cat][0].id)
      setToUnit(UNITS[cat][1].id)
      setInputValue('')
      setResult('')
    }
  }

  const handleSwap = () => {
    setFromUnit(toUnit); setToUnit(fromUnit)
    if (result !== '') setInputValue(formatResult(result))
  }

  const handleClear = () => { setInputValue(''); setResult('') }

  const handleCopy = async () => {
    if (!result) return
    const text = `${inputValue} ${getUnitAbbr(fromUnit, category)} = ${formatResult(result)} ${getUnitAbbr(toUnit, category)}`
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
    catch { /* clipboard not available */ }
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter' && result !== '') handleCopy() }

  const toggleFavorite = () => {
    const key = `${category}:${fromUnit}:${toUnit}`
    if (favorites.some(f => f.key === key)) {
      setFavorites(prev => prev.filter(f => f.key !== key))
    } else {
      setFavorites(prev => [...prev, {
        key, category, fromUnit, toUnit,
        label: `${getUnitAbbr(fromUnit, category)} → ${getUnitAbbr(toUnit, category)}`,
      }].slice(0, MAX_FAVORITES))
    }
  }

  const loadFavorite = (fav) => {
    setCategory(fav.category)
    setFromUnit(fav.fromUnit)
    setToUnit(fav.toUnit)
    setInputValue('')
    setResult('')
  }

  const handleDismissCooldown = () => {
    setCooldownUntil(0)
    localStorage.setItem('uc_cooldown_until', '0')
  }

  const isFavorite = category !== 'favorites' && favorites.some(f => f.key === `${category}:${fromUnit}:${toUnit}`)
  const formula    = category !== 'favorites' ? getFormula(fromUnit, toUnit, category) : ''
  const usesLeft   = CONV_LIMIT - convCount

  return (
    <div className="app">
      {cooldownActive && (
        <CooldownModal cooldownUntil={cooldownUntil} onDismiss={handleDismissCooldown} t={t} />
      )}

      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-top">
          <div className="header-left">
            <span className="app-logo">🔄</span>
            <h1 className="app-title">{t.title}</h1>
          </div>
          <div className="header-right">
            {convCount > 0 && !cooldownActive && (
              <span className="uses-badge">{usesLeft} {t.usesLeft}</span>
            )}
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(d => !d)}
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Language picker row */}
        <div className="lang-row">
          {LANGS.map(l => (
            <button
              key={l.code}
              className={`lang-btn${lang === l.code ? ' active' : ''}`}
              onClick={() => setLang(l.code)}
              title={l.name}
            >
              <span className="lang-flag">{l.flag}</span>
              <span className="lang-code">{l.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="app-main">
        {/* ── Category Tabs — draggable ── */}
        <div className="category-tabs" role="tablist" title={t.dragHint}>
          {tabOrder.map((tabId, idx) => (
            <button
              key={tabId}
              role="tab"
              aria-selected={category === tabId}
              draggable
              className={`cat-tab${category === tabId ? ' active' : ''}${draggingIdx === idx ? ' dragging' : ''}`}
              onClick={() => handleCategoryChange(tabId)}
              onDragStart={() => handleDragStart(idx)}
              onDragEnter={() => handleDragEnter(idx)}
              onDragEnd={handleDragEnd}
              onDragOver={e => e.preventDefault()}
            >
              <span className="cat-icon">{TAB_META[tabId]?.icon}</span>
              <span className="cat-label">{t[tabId] ?? tabId}</span>
            </button>
          ))}
        </div>

        {/* ── Ad Banner — below tabs ── */}
        <AdBanner slot="1111111111" className="ad-leaderboard" />

        {/* ── Main content: Converter or Favorites view ── */}
        {category === 'favorites' ? (
          <FavoritesView
            favorites={favorites}
            setFavorites={setFavorites}
            loadFavorite={loadFavorite}
            t={t}
          />
        ) : (
          <div className="converter-card">
            <div className="converter-grid">
              {/* From */}
              <div className="converter-side">
                <label className="side-label">{t.from}</label>
                <input
                  type="number"
                  className="value-input"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t.enterValue}
                  disabled={cooldownActive}
                  autoFocus
                />
                <select
                  className="unit-select"
                  value={fromUnit}
                  onChange={e => setFromUnit(e.target.value)}
                  disabled={cooldownActive}
                >
                  {UNITS[category]?.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
                </select>
              </div>

              {/* Swap button */}
              <div className="swap-area">
                <button className="swap-btn" onClick={handleSwap} disabled={cooldownActive} title={t.swap}>⇄</button>
              </div>

              {/* To */}
              <div className="converter-side">
                <label className="side-label">{t.to}</label>
                <div className="result-display" aria-live="polite">
                  {result !== ''
                    ? <span className="result-value">{formatResult(result)}</span>
                    : <span className="result-placeholder">—</span>
                  }
                </div>
                <select
                  className="unit-select"
                  value={toUnit}
                  onChange={e => setToUnit(e.target.value)}
                  disabled={cooldownActive}
                >
                  {UNITS[category]?.map(u => <option key={u.id} value={u.id}>{u.label}</option>)}
                </select>
              </div>
            </div>

            {formula && (
              <div className="formula-row">
                <span className="formula-icon">ƒ</span>
                <span className="formula-text">{formula}</span>
              </div>
            )}

            <div className="action-row">
              <button className="action-btn swap-action" onClick={handleSwap} disabled={cooldownActive}>🔁 {t.swap}</button>
              <button className="action-btn clear-btn"   onClick={handleClear}>✕ {t.clear}</button>
              <button
                className={`action-btn copy-btn${copied ? ' copied' : ''}`}
                onClick={handleCopy}
                disabled={!result}
              >
                {copied ? `✓ ${t.copied}` : `📋 ${t.copy}`}
              </button>
              <button
                className={`action-btn fav-btn${isFavorite ? ' favorited' : ''}`}
                onClick={toggleFavorite}
                title={isFavorite ? 'Remove favorite' : 'Add favorite'}
              >
                {isFavorite ? '★' : '☆'}
              </button>
            </div>

            {category === 'currency' && (
              <p className="currency-note">{t.currencyNote}</p>
            )}
          </div>
        )}

        {/* ── Ad Banner ── */}
        <AdBanner slot="2222222222" className="ad-rectangle" />

        {/* ── History ── */}
        {history.length > 0 && (
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">{t.recentTitle}</h2>
              <button className="text-btn" onClick={() => setHistory([])}>{t.clearHistory}</button>
            </div>
            <div className="history-list">
              {history.map(entry => {
                const cat = CATEGORIES.find(c => c.id === entry.category)
                return (
                  <button key={entry.id} className="history-item" onClick={() => {
                    setCategory(entry.category)
                    setFromUnit(entry.fromUnit)
                    setToUnit(entry.toUnit)
                    setInputValue(entry.fromValue)
                  }}>
                    <span className="hist-icon">{cat?.icon}</span>
                    <span className="hist-from">{entry.fromValue} {getUnitAbbr(entry.fromUnit, entry.category)}</span>
                    <span className="hist-arrow">→</span>
                    <span className="hist-to">{entry.toValue} {getUnitAbbr(entry.toUnit, entry.category)}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">{t.footer}</footer>
    </div>
  )
}

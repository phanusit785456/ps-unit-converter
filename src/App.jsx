import { useState, useEffect } from 'react'
import { CATEGORIES, UNITS, convert, formatResult, getFormula, getUnitAbbr } from './converters'
import './App.css'

const MAX_HISTORY = 10
const MAX_FAVORITES = 8

function loadStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
  catch { return fallback }
}

export default function App() {
  const [darkMode, setDarkMode] = useState(() =>
    loadStorage('uc_dark', window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false)
  )
  const [category, setCategory] = useState('weight')
  const [fromUnit, setFromUnit] = useState('kg')
  const [toUnit, setToUnit]     = useState('lb')
  const [inputValue, setInputValue] = useState('')
  const [result, setResult]         = useState('')
  const [copied, setCopied]         = useState(false)
  const [history, setHistory]       = useState(() => loadStorage('uc_history', []))
  const [favorites, setFavorites]   = useState(() => loadStorage('uc_favorites', []))

  // Apply dark mode class to root
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('uc_dark', JSON.stringify(darkMode))
  }, [darkMode])

  useEffect(() => { localStorage.setItem('uc_history',   JSON.stringify(history))   }, [history])
  useEffect(() => { localStorage.setItem('uc_favorites', JSON.stringify(favorites)) }, [favorites])

  // Real-time conversion
  useEffect(() => {
    if (inputValue === '' || inputValue === '-') { setResult(''); return }
    const converted = convert(inputValue, fromUnit, toUnit, category)
    setResult(converted === '' ? '' : String(converted))
  }, [inputValue, fromUnit, toUnit, category])

  // Auto-add to history after 1.5s of inactivity
  useEffect(() => {
    if (!inputValue || result === '') return
    const timer = setTimeout(() => {
      const entry = {
        id: Date.now(),
        category,
        fromValue: inputValue,
        fromUnit,
        toValue: formatResult(result),
        toUnit,
      }
      setHistory(prev => {
        const deduped = prev.filter(h =>
          !(h.category === category && h.fromUnit === fromUnit &&
            h.toUnit === toUnit && h.fromValue === inputValue)
        )
        return [entry, ...deduped].slice(0, MAX_HISTORY)
      })
    }, 1500)
    return () => clearTimeout(timer)
  }, [inputValue, fromUnit, toUnit, category, result])

  const handleCategoryChange = (cat) => {
    setCategory(cat)
    setFromUnit(UNITS[cat][0].id)
    setToUnit(UNITS[cat][1].id)
    setInputValue('')
    setResult('')
  }

  const handleSwap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
    if (result !== '') setInputValue(formatResult(result))
  }

  const handleClear = () => { setInputValue(''); setResult('') }

  const handleCopy = async () => {
    if (!result) return
    const text = `${inputValue} ${getUnitAbbr(fromUnit, category)} = ${formatResult(result)} ${getUnitAbbr(toUnit, category)}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard not available */ }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && result !== '') handleCopy()
  }

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

  const loadHistory = (entry) => {
    setCategory(entry.category)
    setFromUnit(entry.fromUnit)
    setToUnit(entry.toUnit)
    setInputValue(entry.fromValue)
  }

  const isFavorite = favorites.some(f => f.key === `${category}:${fromUnit}:${toUnit}`)
  const formula = getFormula(fromUnit, toUnit, category)

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="header-left">
          <span className="app-logo">🔄</span>
          <h1 className="app-title">Unit Converter</h1>
        </div>
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(d => !d)}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="app-main">
        {/* ── Category Tabs ── */}
        <div className="category-tabs" role="tablist">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={category === cat.id}
              className={`cat-tab${category === cat.id ? ' active' : ''}`}
              onClick={() => handleCategoryChange(cat.id)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span className="cat-label">{cat.label}</span>
            </button>
          ))}
        </div>

        {/* ── Converter Card ── */}
        <div className="converter-card">
          <div className="converter-grid">
            {/* From side */}
            <div className="converter-side">
              <label className="side-label">From</label>
              <input
                type="number"
                className="value-input"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter value…"
                autoFocus
              />
              <select
                className="unit-select"
                value={fromUnit}
                onChange={e => setFromUnit(e.target.value)}
              >
                {UNITS[category].map(u => (
                  <option key={u.id} value={u.id}>{u.label}</option>
                ))}
              </select>
            </div>

            {/* Swap button */}
            <div className="swap-area">
              <button className="swap-btn" onClick={handleSwap} title="Swap units" aria-label="Swap units">
                ⇄
              </button>
            </div>

            {/* To side */}
            <div className="converter-side">
              <label className="side-label">To</label>
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
              >
                {UNITS[category].map(u => (
                  <option key={u.id} value={u.id}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Formula */}
          {formula && (
            <div className="formula-row">
              <span className="formula-icon">ƒ</span>
              <span className="formula-text">{formula}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="action-row">
            <button className="action-btn swap-action" onClick={handleSwap}>🔁 Swap</button>
            <button className="action-btn clear-btn"   onClick={handleClear}>✕ Clear</button>
            <button
              className={`action-btn copy-btn${copied ? ' copied' : ''}`}
              onClick={handleCopy}
              disabled={!result}
            >
              {copied ? '✓ Copied!' : '📋 Copy'}
            </button>
            <button
              className={`action-btn fav-btn${isFavorite ? ' favorited' : ''}`}
              onClick={toggleFavorite}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '★' : '☆'}
            </button>
          </div>

          {category === 'currency' && (
            <p className="currency-note">
              ⚠️ Rates are approximate (fixed). For live rates, integrate a currency API.
            </p>
          )}
        </div>

        {/* ── Favorites ── */}
        {favorites.length > 0 && (
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">⭐ Favorites</h2>
              <button className="text-btn" onClick={() => setFavorites([])}>Clear all</button>
            </div>
            <div className="favorites-list">
              {favorites.map(fav => {
                const cat = CATEGORIES.find(c => c.id === fav.category)
                return (
                  <button
                    key={fav.key}
                    className={`fav-chip${fav.key === `${category}:${fromUnit}:${toUnit}` ? ' active' : ''}`}
                    onClick={() => loadFavorite(fav)}
                  >
                    <span>{cat?.icon}</span>
                    {fav.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── History ── */}
        {history.length > 0 && (
          <div className="section-card">
            <div className="section-header">
              <h2 className="section-title">📜 Recent</h2>
              <button className="text-btn" onClick={() => setHistory([])}>Clear</button>
            </div>
            <div className="history-list">
              {history.map(entry => {
                const cat = CATEGORIES.find(c => c.id === entry.category)
                return (
                  <button key={entry.id} className="history-item" onClick={() => loadHistory(entry)}>
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

      <footer className="app-footer">
        Unit Converter · React + Vite · Press Enter to copy result
      </footer>
    </div>
  )
}

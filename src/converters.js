export const CATEGORIES = [
  { id: 'temperature', label: 'Temperature', icon: '🌡️' },
  { id: 'weight',      label: 'Weight',      icon: '⚖️'  },
  { id: 'length',      label: 'Length',      icon: '📏'  },
  { id: 'volume',      label: 'Volume',      icon: '🧪'  },
  { id: 'currency',    label: 'Currency',    icon: '💱'  },
]

export const UNITS = {
  temperature: [
    { id: 'celsius',    label: 'Celsius (°C)',    symbol: '°C', abbr: '°C'  },
    { id: 'fahrenheit', label: 'Fahrenheit (°F)', symbol: '°F', abbr: '°F'  },
    { id: 'kelvin',     label: 'Kelvin (K)',       symbol: 'K',  abbr: 'K'   },
  ],
  weight: [
    { id: 'kg',  label: 'Kilogram (kg)',    symbol: 'kg',  abbr: 'kg'  },
    { id: 'lb',  label: 'Pound (lb)',       symbol: 'lb',  abbr: 'lb'  },
    { id: 'oz',  label: 'Ounce (oz)',       symbol: 'oz',  abbr: 'oz'  },
    { id: 'g',   label: 'Gram (g)',         symbol: 'g',   abbr: 'g'   },
    { id: 'ton', label: 'Metric Ton (t)',   symbol: 't',   abbr: 't'   },
  ],
  length: [
    { id: 'm',    label: 'Meter (m)',          symbol: 'm',   abbr: 'm'   },
    { id: 'km',   label: 'Kilometer (km)',     symbol: 'km',  abbr: 'km'  },
    { id: 'mile', label: 'Mile (mi)',          symbol: 'mi',  abbr: 'mi'  },
    { id: 'inch', label: 'Inch (in)',          symbol: 'in',  abbr: 'in'  },
    { id: 'cm',   label: 'Centimeter (cm)',    symbol: 'cm',  abbr: 'cm'  },
    { id: 'ft',   label: 'Foot (ft)',          symbol: 'ft',  abbr: 'ft'  },
    { id: 'mm',   label: 'Millimeter (mm)',    symbol: 'mm',  abbr: 'mm'  },
    { id: 'yard', label: 'Yard (yd)',          symbol: 'yd',  abbr: 'yd'  },
  ],
  volume: [
    { id: 'l',      label: 'Liter (L)',           symbol: 'L',     abbr: 'L'      },
    { id: 'ml',     label: 'Milliliter (mL)',      symbol: 'mL',    abbr: 'mL'     },
    { id: 'gallon', label: 'US Gallon (gal)',      symbol: 'gal',   abbr: 'gal'    },
    { id: 'cup',    label: 'US Cup',               symbol: 'cup',   abbr: 'cup'    },
    { id: 'fl_oz',  label: 'Fluid Ounce (fl oz)', symbol: 'fl oz', abbr: 'fl oz'  },
    { id: 'tbsp',   label: 'Tablespoon (tbsp)',    symbol: 'tbsp',  abbr: 'tbsp'   },
    { id: 'tsp',    label: 'Teaspoon (tsp)',       symbol: 'tsp',   abbr: 'tsp'    },
    { id: 'm3',     label: 'Cubic Meter (m³)',     symbol: 'm³',    abbr: 'm³'     },
  ],
  currency: [
    { id: 'usd', label: 'US Dollar (USD)',          symbol: '$',   abbr: 'USD' },
    { id: 'thb', label: 'Thai Baht (THB)',          symbol: '฿',   abbr: 'THB' },
    { id: 'eur', label: 'Euro (EUR)',               symbol: '€',   abbr: 'EUR' },
    { id: 'gbp', label: 'British Pound (GBP)',      symbol: '£',   abbr: 'GBP' },
    { id: 'jpy', label: 'Japanese Yen (JPY)',       symbol: '¥',   abbr: 'JPY' },
    { id: 'sgd', label: 'Singapore Dollar (SGD)',   symbol: 'S$',  abbr: 'SGD' },
    { id: 'cny', label: 'Chinese Yuan (CNY)',       symbol: '¥',   abbr: 'CNY' },
    { id: 'aud', label: 'Australian Dollar (AUD)', symbol: 'A$',  abbr: 'AUD' },
  ],
}

// Rates relative to base unit for each category
const TO_BASE = {
  // base: gram
  weight: { kg: 1000, lb: 453.59237, oz: 28.349523, g: 1, ton: 1_000_000 },
  // base: meter
  length: { m: 1, km: 1000, mile: 1609.344, inch: 0.0254, cm: 0.01, ft: 0.3048, mm: 0.001, yard: 0.9144 },
  // base: milliliter
  volume: { l: 1000, ml: 1, gallon: 3785.41178, cup: 236.5882, fl_oz: 29.57353, tbsp: 14.78677, tsp: 4.92892, m3: 1_000_000 },
  // base: USD — approximate rates as of 2025
  currency: { usd: 1, thb: 33.5, eur: 0.92, gbp: 0.79, jpy: 149.5, sgd: 1.34, cny: 7.24, aud: 1.53 },
}

const TEMP_FORMULAS = {
  'celsius-fahrenheit':    '°F = (°C × 9/5) + 32',
  'fahrenheit-celsius':    '°C = (°F − 32) × 5/9',
  'celsius-kelvin':        'K = °C + 273.15',
  'kelvin-celsius':        '°C = K − 273.15',
  'fahrenheit-kelvin':     'K = (°F + 459.67) × 5/9',
  'kelvin-fahrenheit':     '°F = K × 9/5 − 459.67',
}

function convertTemperature(val, from, to) {
  let celsius
  switch (from) {
    case 'celsius':    celsius = val; break
    case 'fahrenheit': celsius = (val - 32) * 5 / 9; break
    case 'kelvin':     celsius = val - 273.15; break
    default: return NaN
  }
  switch (to) {
    case 'celsius':    return celsius
    case 'fahrenheit': return celsius * 9 / 5 + 32
    case 'kelvin':     return celsius + 273.15
    default: return NaN
  }
}

export function convert(value, fromUnit, toUnit, category) {
  const num = parseFloat(value)
  if (value === '' || value == null || isNaN(num)) return ''
  if (fromUnit === toUnit) return num

  if (category === 'temperature') return convertTemperature(num, fromUnit, toUnit)

  const rates = TO_BASE[category]
  if (!rates) return ''
  return (num * rates[fromUnit]) / rates[toUnit]
}

export function formatResult(value) {
  if (value === '' || value == null || isNaN(Number(value))) return ''
  const num = Number(value)
  const abs = Math.abs(num)
  if (abs === 0) return '0'
  if (abs >= 1_000_000) return num.toExponential(4)
  if (abs >= 1000)      return num.toFixed(2)
  if (abs >= 1)         return num.toFixed(4)
  if (abs >= 0.001)     return num.toFixed(6)
  return num.toExponential(4)
}

export function getFormula(fromUnit, toUnit, category) {
  if (fromUnit === toUnit) return ''
  if (category === 'temperature') return TEMP_FORMULAS[`${fromUnit}-${toUnit}`] || ''

  const result = convert(1, fromUnit, toUnit, category)
  const from = UNITS[category]?.find(u => u.id === fromUnit)
  const to   = UNITS[category]?.find(u => u.id === toUnit)
  return `1 ${from?.abbr || fromUnit} = ${formatResult(result)} ${to?.abbr || toUnit}`
}

export function getUnitAbbr(unitId, category) {
  return UNITS[category]?.find(u => u.id === unitId)?.abbr || unitId
}

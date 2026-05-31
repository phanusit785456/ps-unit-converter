export const CATEGORIES = [
  { id: 'temperature',     label: 'Temperature'    },
  { id: 'weight',          label: 'Weight'         },
  { id: 'length',          label: 'Length'         },
  { id: 'volume',          label: 'Volume'         },
  { id: 'digital_storage', label: 'Digital Storage'},
  { id: 'energy',          label: 'Energy'         },
  { id: 'pressure',        label: 'Pressure'       },
  { id: 'force',           label: 'Force'          },
  { id: 'voltage',         label: 'Voltage'        },
  { id: 'current',         label: 'Current'        },
  { id: 'resistance',      label: 'Resistance'     },
  { id: 'currency',        label: 'Currency'       },
]

export const CATEGORY_GROUPS = {
  all:         ['favorites','temperature','weight','length','volume','digital_storage','energy','pressure','force','voltage','current','resistance','currency'],
  measurement: ['favorites','temperature','weight','length','volume'],
  electrical:  ['favorites','voltage','current','resistance'],
  physics:     ['favorites','energy','pressure','force'],
  digital:     ['favorites','digital_storage'],
  finance:     ['favorites','currency'],
}

export const UNITS = {
  temperature: [
    { id: 'celsius',    label: 'Celsius (°C)',    symbol: '°C', abbr: '°C' },
    { id: 'fahrenheit', label: 'Fahrenheit (°F)', symbol: '°F', abbr: '°F' },
    { id: 'kelvin',     label: 'Kelvin (K)',       symbol: 'K',  abbr: 'K'  },
  ],
  weight: [
    { id: 'kg',  label: 'Kilogram (kg)',  symbol: 'kg', abbr: 'kg' },
    { id: 'lb',  label: 'Pound (lb)',     symbol: 'lb', abbr: 'lb' },
    { id: 'oz',  label: 'Ounce (oz)',     symbol: 'oz', abbr: 'oz' },
    { id: 'g',   label: 'Gram (g)',       symbol: 'g',  abbr: 'g'  },
    { id: 'ton', label: 'Metric Ton (t)', symbol: 't',  abbr: 't'  },
  ],
  length: [
    { id: 'm',    label: 'Meter (m)',       symbol: 'm',  abbr: 'm'  },
    { id: 'km',   label: 'Kilometer (km)', symbol: 'km', abbr: 'km' },
    { id: 'mile', label: 'Mile (mi)',       symbol: 'mi', abbr: 'mi' },
    { id: 'inch', label: 'Inch (in)',       symbol: 'in', abbr: 'in' },
    { id: 'cm',   label: 'Centimeter (cm)',symbol: 'cm', abbr: 'cm' },
    { id: 'ft',   label: 'Foot (ft)',       symbol: 'ft', abbr: 'ft' },
    { id: 'mm',   label: 'Millimeter (mm)',symbol: 'mm', abbr: 'mm' },
    { id: 'yard', label: 'Yard (yd)',       symbol: 'yd', abbr: 'yd' },
  ],
  volume: [
    { id: 'l',      label: 'Liter (L)',           symbol: 'L',    abbr: 'L'    },
    { id: 'ml',     label: 'Milliliter (mL)',      symbol: 'mL',   abbr: 'mL'   },
    { id: 'gallon', label: 'US Gallon (gal)',      symbol: 'gal',  abbr: 'gal'  },
    { id: 'cup',    label: 'US Cup',               symbol: 'cup',  abbr: 'cup'  },
    { id: 'fl_oz',  label: 'Fluid Ounce (fl oz)', symbol: 'fl oz',abbr: 'fl oz'},
    { id: 'tbsp',   label: 'Tablespoon (tbsp)',    symbol: 'tbsp', abbr: 'tbsp' },
    { id: 'tsp',    label: 'Teaspoon (tsp)',       symbol: 'tsp',  abbr: 'tsp'  },
    { id: 'm3',     label: 'Cubic Meter (m³)',     symbol: 'm³',   abbr: 'm³'   },
  ],
  digital_storage: [
    { id: 'byte', label: 'Byte (B)',      symbol: 'B',  abbr: 'B'  },
    { id: 'kb',   label: 'Kilobyte (KB)',  symbol: 'KB', abbr: 'KB' },
    { id: 'mb',   label: 'Megabyte (MB)',  symbol: 'MB', abbr: 'MB' },
    { id: 'gb',   label: 'Gigabyte (GB)',  symbol: 'GB', abbr: 'GB' },
    { id: 'tb',   label: 'Terabyte (TB)',  symbol: 'TB', abbr: 'TB' },
    { id: 'pb',   label: 'Petabyte (PB)',  symbol: 'PB', abbr: 'PB' },
  ],
  energy: [
    { id: 'j',    label: 'Joule (J)',             symbol: 'J',   abbr: 'J'   },
    { id: 'kj',   label: 'Kilojoule (kJ)',         symbol: 'kJ',  abbr: 'kJ'  },
    { id: 'cal',  label: 'Calorie (cal)',           symbol: 'cal', abbr: 'cal' },
    { id: 'kcal', label: 'Kilocalorie (kcal)',      symbol: 'kcal',abbr: 'kcal'},
    { id: 'wh',   label: 'Watt-hour (Wh)',          symbol: 'Wh',  abbr: 'Wh'  },
    { id: 'kwh',  label: 'Kilowatt-hour (kWh)',     symbol: 'kWh', abbr: 'kWh' },
    { id: 'btu',  label: 'BTU',                    symbol: 'BTU', abbr: 'BTU' },
  ],
  pressure: [
    { id: 'pa',   label: 'Pascal (Pa)',       symbol: 'Pa',  abbr: 'Pa'  },
    { id: 'kpa',  label: 'Kilopascal (kPa)', symbol: 'kPa', abbr: 'kPa' },
    { id: 'mpa',  label: 'Megapascal (MPa)', symbol: 'MPa', abbr: 'MPa' },
    { id: 'bar',  label: 'Bar',               symbol: 'bar', abbr: 'bar' },
    { id: 'psi',  label: 'PSI (lb/in²)',      symbol: 'psi', abbr: 'psi' },
    { id: 'atm',  label: 'Atmosphere (atm)', symbol: 'atm', abbr: 'atm' },
    { id: 'mmhg', label: 'mmHg (Torr)',       symbol: 'mmHg',abbr: 'mmHg'},
  ],
  force: [
    { id: 'n',    label: 'Newton (N)',          symbol: 'N',   abbr: 'N'   },
    { id: 'kn',   label: 'Kilonewton (kN)',     symbol: 'kN',  abbr: 'kN'  },
    { id: 'lbf',  label: 'Pound-force (lbf)',   symbol: 'lbf', abbr: 'lbf' },
    { id: 'dyne', label: 'Dyne',                symbol: 'dyn', abbr: 'dyn' },
    { id: 'kgf',  label: 'Kilogram-force (kgf)',symbol: 'kgf', abbr: 'kgf' },
  ],
  voltage: [
    { id: 'v',     label: 'Volt (V)',     symbol: 'V',  abbr: 'V'  },
    { id: 'mv',    label: 'Millivolt (mV)',symbol: 'mV', abbr: 'mV' },
    { id: 'kv',    label: 'Kilovolt (kV)',symbol: 'kV', abbr: 'kV' },
    { id: 'megav', label: 'Megavolt (MV)',symbol: 'MV', abbr: 'MV' },
  ],
  current: [
    { id: 'a',  label: 'Ampere (A)',      symbol: 'A',  abbr: 'A'  },
    { id: 'ma', label: 'Milliampere (mA)',symbol: 'mA', abbr: 'mA' },
    { id: 'ua', label: 'Microampere (μA)',symbol: 'μA', abbr: 'μA' },
    { id: 'ka', label: 'Kiloampere (kA)', symbol: 'kA', abbr: 'kA' },
  ],
  resistance: [
    { id: 'ohm',     label: 'Ohm (Ω)',      symbol: 'Ω',  abbr: 'Ω'  },
    { id: 'mohm',    label: 'Milliohm (mΩ)',symbol: 'mΩ', abbr: 'mΩ' },
    { id: 'kohm',    label: 'Kilohm (kΩ)',  symbol: 'kΩ', abbr: 'kΩ' },
    { id: 'megaohm', label: 'Megaohm (MΩ)',symbol: 'MΩ', abbr: 'MΩ' },
    { id: 'gohm',    label: 'Gigaohm (GΩ)',symbol: 'GΩ', abbr: 'GΩ' },
  ],
  currency: [
    { id: 'usd', label: 'US Dollar (USD)',         symbol: '$',  abbr: 'USD' },
    { id: 'thb', label: 'Thai Baht (THB)',         symbol: '฿',  abbr: 'THB' },
    { id: 'eur', label: 'Euro (EUR)',              symbol: '€',  abbr: 'EUR' },
    { id: 'gbp', label: 'British Pound (GBP)',     symbol: '£',  abbr: 'GBP' },
    { id: 'jpy', label: 'Japanese Yen (JPY)',      symbol: '¥',  abbr: 'JPY' },
    { id: 'sgd', label: 'Singapore Dollar (SGD)', symbol: 'S$', abbr: 'SGD' },
    { id: 'cny', label: 'Chinese Yuan (CNY)',      symbol: '¥',  abbr: 'CNY' },
    { id: 'aud', label: 'Australian Dollar (AUD)',symbol: 'A$', abbr: 'AUD' },
  ],
}

const TO_BASE = {
  weight:  { kg: 1000, lb: 453.59237, oz: 28.349523, g: 1, ton: 1_000_000 },
  length:  { m: 1, km: 1000, mile: 1609.344, inch: 0.0254, cm: 0.01, ft: 0.3048, mm: 0.001, yard: 0.9144 },
  volume:  { l: 1000, ml: 1, gallon: 3785.41178, cup: 236.5882, fl_oz: 29.57353, tbsp: 14.78677, tsp: 4.92892, m3: 1_000_000 },
  currency:{ usd: 1, thb: 33.5, eur: 0.92, gbp: 0.79, jpy: 149.5, sgd: 1.34, cny: 7.24, aud: 1.53 },

  // base: byte (binary, 1 KB = 1024 B)
  digital_storage: {
    byte: 1,
    kb: 1_024,
    mb: 1_048_576,
    gb: 1_073_741_824,
    tb: 1_099_511_627_776,
    pb: 1_125_899_906_842_624,
  },
  // base: joule
  energy: {
    j: 1,
    kj: 1_000,
    cal: 4.184,
    kcal: 4_184,
    wh: 3_600,
    kwh: 3_600_000,
    btu: 1_055.06,
  },
  // base: pascal
  pressure: {
    pa: 1,
    kpa: 1_000,
    mpa: 1_000_000,
    bar: 100_000,
    psi: 6_894.757,
    atm: 101_325,
    mmhg: 133.322,
  },
  // base: newton
  force: {
    n: 1,
    kn: 1_000,
    lbf: 4.44822,
    dyne: 1e-5,
    kgf: 9.80665,
  },
  // base: volt
  voltage: { v: 1, mv: 0.001, kv: 1_000, megav: 1_000_000 },
  // base: ampere
  current:  { a: 1, ma: 0.001, ua: 1e-6, ka: 1_000 },
  // base: ohm
  resistance: { ohm: 1, mohm: 0.001, kohm: 1_000, megaohm: 1_000_000, gohm: 1_000_000_000 },
}

const TEMP_FORMULAS = {
  'celsius-fahrenheit':  '°F = (°C × 9/5) + 32',
  'fahrenheit-celsius':  '°C = (°F − 32) × 5/9',
  'celsius-kelvin':      'K = °C + 273.15',
  'kelvin-celsius':      '°C = K − 273.15',
  'fahrenheit-kelvin':   'K = (°F + 459.67) × 5/9',
  'kelvin-fahrenheit':   '°F = K × 9/5 − 459.67',
}

function convertTemperature(val, from, to) {
  let c
  switch (from) {
    case 'celsius':    c = val; break
    case 'fahrenheit': c = (val - 32) * 5 / 9; break
    case 'kelvin':     c = val - 273.15; break
    default: return NaN
  }
  switch (to) {
    case 'celsius':    return c
    case 'fahrenheit': return c * 9 / 5 + 32
    case 'kelvin':     return c + 273.15
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
  if (abs >= 1e15)  return num.toExponential(4)
  if (abs >= 1e6)   return num.toExponential(4)
  if (abs >= 1000)  return num.toFixed(2)
  if (abs >= 1)     return num.toFixed(4)
  if (abs >= 0.001) return num.toFixed(6)
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

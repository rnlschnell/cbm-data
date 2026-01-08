import type { Lead, LeadCategory, LeadSource, CustomerType, ConfidenceLevel } from '@/types/lead'

const automotiveMakes = ['Ford', 'GM', 'Chevrolet', 'Honda', 'Toyota', 'Dodge', 'Jeep', 'BMW', 'Mercedes', 'Nissan', 'Hyundai', 'Kia', 'Subaru', 'Mazda', 'Volkswagen']
const automotiveModels: Record<string, string[]> = {
  'Ford': ['F-150', 'Explorer', 'Mustang', 'Escape', 'Edge', 'Ranger', 'Bronco'],
  'GM': ['Sierra', 'Yukon', 'Terrain', 'Canyon'],
  'Chevrolet': ['Silverado', 'Tahoe', 'Equinox', 'Malibu', 'Camaro', 'Traverse'],
  'Honda': ['Accord', 'Civic', 'CR-V', 'Pilot', 'Odyssey', 'HR-V'],
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma', 'Tundra'],
  'Dodge': ['Ram', 'Charger', 'Challenger', 'Durango', 'Journey'],
  'Jeep': ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Gladiator'],
  'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'X7'],
  'Mercedes': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
  'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Frontier'],
  'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade'],
  'Kia': ['Forte', 'Optima', 'Sportage', 'Sorento', 'Telluride'],
  'Subaru': ['Outback', 'Forester', 'Crosstrek', 'Impreza', 'Ascent'],
  'Mazda': ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'MX-5'],
  'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf'],
}
const automotivePartTypes = ['PCM', 'ECM', 'TCM', 'BCM', 'cluster', 'ABS module', 'airbag module', 'fuel pump driver', 'TPMS module', 'power steering module']
const automotiveSymptoms = [
  'no start condition', 'check engine light on', 'transmission slipping', 'rough idle',
  'P0300 misfire detected', 'vehicle won\'t shift', 'ABS light on', 'airbag warning light',
  'no communication with module', 'erratic gauge readings', 'stalling at idle',
  'poor fuel economy', 'engine overheating', 'hard shifting', 'no speedometer reading'
]

const applianceMakes = ['Whirlpool', 'GE', 'Samsung', 'LG', 'Bosch', 'KitchenAid', 'Maytag', 'Frigidaire', 'Electrolux', 'Kenmore']
const applianceModels: Record<string, string[]> = {
  'Whirlpool': ['WDT750SAHZ', 'WRF535SWHZ', 'WTW5000DW', 'WED5000DW'],
  'GE': ['GDT665SSNSS', 'GFE28GELDS', 'GTW465ASNWW', 'GFD65ESSNWW'],
  'Samsung': ['RF28R7551SG', 'WF45R6100AW', 'DW80R5060US', 'NE63A6711SS'],
  'LG': ['LRMVS3006S', 'WM4000HWA', 'LDT7808ST', 'LSE4616ST'],
  'Bosch': ['SHPM88Z75N', 'B36CL80SNS', 'WAT28400UC', 'WTG86401UC'],
  'KitchenAid': ['KDTM404KPS', 'KRFC704FPS', 'KOSE500ESS', 'KMBP100ESS'],
  'Maytag': ['MDB8959SKZ', 'MFI2570FEZ', 'MVW7230HW', 'MED7230HW'],
  'Frigidaire': ['FGID2466QF', 'FFSS2615TS', 'FFTW4120SW', 'FFRE4120SW'],
  'Electrolux': ['EI24ID50QS', 'EI23BC82SS', 'EFLS627UTT', 'EFME627UTT'],
  'Kenmore': ['14573', '75232', '41262', '91282'],
}
const appliancePartTypes = ['control_board', 'timer', 'display_board', 'motor_control', 'inverter_board', 'main_board', 'interface_board', 'sensor', 'door_latch']
const applianceSymptoms = [
  'not starting', 'error code E1', 'beeping continuously', 'display blank',
  'not draining', 'not spinning', 'not heating', 'water leaking',
  'door won\'t lock', 'buttons not responding', 'cycle won\'t complete',
  'making loud noise', 'error code F5', 'not dispensing water', 'ice maker not working'
]

const industrialMakes = ['John Deere', 'Caterpillar', 'Kubota', 'New Holland', 'Case IH', 'Bobcat', 'Komatsu']
const industrialModels: Record<string, string[]> = {
  'John Deere': ['8R 410', '6M Series', 'Gator', 'S780', '333G'],
  'Caterpillar': ['D6', '320', '966M', '140M', '299D3'],
  'Kubota': ['M7-172', 'L3901', 'SVL97-2', 'RTV-X1140'],
  'New Holland': ['T7.315', 'Boomer 35', 'C337', 'L234'],
  'Case IH': ['Magnum 340', 'Steiger 620', 'Farmall 75C', 'Maxxum 125'],
  'Bobcat': ['S770', 'T870', 'E85', 'CT5558'],
  'Komatsu': ['PC210', 'D51PXi', 'WA470', 'PC490'],
}
const industrialPartTypes = ['ECU', 'hydraulic_controller', 'display', 'GPS_module', 'engine_controller', 'transmission_controller', 'monitor', 'telematics_module']
const industrialSymptoms = [
  'hydraulics not responding', 'engine derate', 'no start', 'display error',
  'GPS not accurate', 'auto-steer malfunction', 'transmission fault', 'reduced power',
  'regeneration issues', 'tier 4 fault codes', 'DEF system error', 'PTO not engaging'
]

const marineMakes = ['Mercury', 'Yamaha', 'Honda Marine', 'Suzuki', 'Evinrude', 'Johnson']
const marineModels: Record<string, string[]> = {
  'Mercury': ['Verado 300', 'Pro XS 150', 'FourStroke 115', 'Optimax 250'],
  'Yamaha': ['F300', 'F150', 'F70', 'F25'],
  'Honda Marine': ['BF250', 'BF150', 'BF90', 'BF50'],
  'Suzuki': ['DF300AP', 'DF140A', 'DF90A', 'DF50A'],
  'Evinrude': ['E-TEC G2 300', 'E-TEC 150', 'E-TEC 90'],
  'Johnson': ['J200PX', 'J150CX', 'J90PL'],
}
const marinePartTypes = ['ECU', 'gauge_cluster', 'ignition_module', 'fuel_injection', 'power_trim', 'command_link', 'tachometer', 'VesselView']
const marineSymptoms = [
  'no spark', 'overheating alarm', 'fuel delivery issues', 'trim not working',
  'gauges not reading', 'boat won\'t plane', 'rough running', 'stalling at idle',
  'water in fuel alarm', 'low oil pressure warning', 'engine misfiring', 'no communication'
]

const sources: LeadSource[] = ['phone', 'form', 'chat', 'scrape', 'manual']
const customerTypes: CustomerType[] = ['individual', 'shop', 'dealer', 'fleet']
const confidenceLevels: ConfidenceLevel[] = ['high', 'medium', 'low']

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomDate(startDate: Date, endDate: Date): string {
  const start = startDate.getTime()
  const end = endDate.getTime()
  const date = new Date(start + Math.random() * (end - start))
  return date.toISOString().split('T')[0]
}

function randomYear(): number {
  return 2010 + Math.floor(Math.random() * 15)
}

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

function generateLead(category: LeadCategory): Lead {
  let make: string, model: string, partType: string, symptoms: string
  const makes = category === 'automotive' ? automotiveMakes :
                category === 'appliance' ? applianceMakes :
                category === 'industrial' ? industrialMakes : marineMakes

  const models = category === 'automotive' ? automotiveModels :
                 category === 'appliance' ? applianceModels :
                 category === 'industrial' ? industrialModels : marineModels

  const partTypes = category === 'automotive' ? automotivePartTypes :
                    category === 'appliance' ? appliancePartTypes :
                    category === 'industrial' ? industrialPartTypes : marinePartTypes

  const symptomsList = category === 'automotive' ? automotiveSymptoms :
                       category === 'appliance' ? applianceSymptoms :
                       category === 'industrial' ? industrialSymptoms : marineSymptoms

  make = randomItem(makes)
  model = randomItem(models[make] || ['Unknown'])
  partType = randomItem(partTypes)
  symptoms = randomItem(symptomsList)

  const date = randomDate(new Date('2024-01-01'), new Date('2024-12-31'))
  const source = randomItem(sources)
  const weOfferThis = Math.random() > 0.25

  return {
    id: generateUUID(),
    source,
    date,
    category,
    year: category !== 'appliance' ? randomYear() : 2018 + Math.floor(Math.random() * 7),
    make,
    model,
    part_type: partType,
    part_number: Math.random() > 0.3 ? `${make.substring(0, 2).toUpperCase()}-${Math.floor(Math.random() * 9000) + 1000}` : null,
    text: `Customer inquiring about ${partType} for ${make} ${model}`,
    symptoms,
    customer_type: randomItem(customerTypes),
    quantity: Math.random() > 0.8 ? Math.floor(Math.random() * 5) + 2 : 1,
    we_offer_this: weOfferThis,
    confidence: randomItem(confidenceLevels),
    created_at: new Date(date + 'T' + String(Math.floor(Math.random() * 24)).padStart(2, '0') + ':' + String(Math.floor(Math.random() * 60)).padStart(2, '0') + ':00Z').toISOString(),
  }
}

function generateLeads(count: number): Lead[] {
  const leads: Lead[] = []
  const categoryDistribution = {
    automotive: 0.68,
    appliance: 0.24,
    industrial: 0.06,
    marine: 0.02,
  }

  for (let i = 0; i < count; i++) {
    const rand = Math.random()
    let category: LeadCategory
    if (rand < categoryDistribution.automotive) {
      category = 'automotive'
    } else if (rand < categoryDistribution.automotive + categoryDistribution.appliance) {
      category = 'appliance'
    } else if (rand < categoryDistribution.automotive + categoryDistribution.appliance + categoryDistribution.industrial) {
      category = 'industrial'
    } else {
      category = 'marine'
    }
    leads.push(generateLead(category))
  }

  return leads.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const mockLeads: Lead[] = generateLeads(520)

export function getLeadsBySource() {
  const result: Record<string, number> = {}
  for (const lead of mockLeads) {
    result[lead.source] = (result[lead.source] || 0) + 1
  }
  return result
}

export function getLeadsByCategory() {
  const result: Record<string, number> = {}
  for (const lead of mockLeads) {
    if (lead.category) {
      result[lead.category] = (result[lead.category] || 0) + 1
    }
  }
  return result
}

export function getLeadsByCustomerType() {
  const result: Record<string, number> = {}
  for (const lead of mockLeads) {
    result[lead.customer_type] = (result[lead.customer_type] || 0) + 1
  }
  return result
}

export function getTopMakes(limit: number = 10) {
  const counts: Record<string, number> = {}
  for (const lead of mockLeads) {
    if (lead.make) {
      counts[lead.make] = (counts[lead.make] || 0) + 1
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([make, count]) => ({ make, count }))
}

export function getTopPartTypes(limit: number = 10) {
  const counts: Record<string, number> = {}
  for (const lead of mockLeads) {
    if (lead.part_type) {
      counts[lead.part_type] = (counts[lead.part_type] || 0) + 1
    }
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([partType, count]) => ({ partType, count }))
}

export function getServiceGaps() {
  return mockLeads
    .filter(lead => lead.we_offer_this === false)
    .reduce((acc, lead) => {
      const key = `${lead.make}-${lead.model}-${lead.part_type}`
      if (!acc[key]) {
        acc[key] = { make: lead.make, model: lead.model, part_type: lead.part_type, count: 0 }
      }
      acc[key].count++
      return acc
    }, {} as Record<string, { make: string | null; model: string | null; part_type: string | null; count: number }>)
}

export function getMonthlyTrends() {
  const months: Record<string, { total: number; automotive: number; appliance: number; industrial: number; marine: number }> = {}

  for (const lead of mockLeads) {
    const month = lead.date.substring(0, 7)
    if (!months[month]) {
      months[month] = { total: 0, automotive: 0, appliance: 0, industrial: 0, marine: 0 }
    }
    months[month].total++
    if (lead.category) {
      months[month][lead.category]++
    }
  }

  return Object.entries(months)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, data]) => ({ month, ...data }))
}

export function getHeatmapData(xField: 'make' | 'part_type' | 'source', yField: 'category' | 'customer_type') {
  const matrix: Record<string, Record<string, number>> = {}

  for (const lead of mockLeads) {
    const xValue = lead[xField] || 'Unknown'
    const yValue = lead[yField] || 'Unknown'

    if (!matrix[yValue]) {
      matrix[yValue] = {}
    }
    matrix[yValue][xValue] = (matrix[yValue][xValue] || 0) + 1
  }

  return matrix
}

export function getWordCloudData(field: 'symptoms' | 'make' | 'part_type') {
  const counts: Record<string, number> = {}

  for (const lead of mockLeads) {
    const value = lead[field]
    if (value) {
      if (field === 'symptoms') {
        const words = value.toLowerCase().split(/\s+/)
        for (const word of words) {
          if (word.length > 3) {
            counts[word] = (counts[word] || 0) + 1
          }
        }
      } else {
        counts[value] = (counts[value] || 0) + 1
      }
    }
  }

  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

export interface TopRequest {
  category: LeadCategory | null
  make: string | null
  model: string | null
  part_type: string | null
  count: number
  weOfferCount: number
  dontOfferCount: number
}

export function getTopRequests(filterCategory?: LeadCategory | 'all'): TopRequest[] {
  const map = new Map<string, TopRequest>()

  for (const lead of mockLeads) {
    if (filterCategory && filterCategory !== 'all' && lead.category !== filterCategory) {
      continue
    }

    const key = `${lead.category}|${lead.make}|${lead.model}|${lead.part_type}`

    if (!map.has(key)) {
      map.set(key, {
        category: lead.category,
        make: lead.make,
        model: lead.model,
        part_type: lead.part_type,
        count: 0,
        weOfferCount: 0,
        dontOfferCount: 0,
      })
    }

    const entry = map.get(key)!
    entry.count++
    if (lead.we_offer_this === true) {
      entry.weOfferCount++
    } else if (lead.we_offer_this === false) {
      entry.dontOfferCount++
    }
  }

  return Array.from(map.values()).sort((a, b) => b.count - a.count)
}

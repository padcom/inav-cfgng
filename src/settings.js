import yaml from '../settings.yaml'
import { DATA_TYPE } from './models/data-type'

export const settings = {}

// ----------------------------------------------------------------------------
// Translation of the yaml file into usable format
// ----------------------------------------------------------------------------

yaml.groups.forEach(group => {
  group.members.forEach(setting => {
    settings[setting.name] = { ...setting, group: group.name, value: null }
    settings[setting.name].type = DATA_TYPE.UNKNOWN
    settings[setting.name].value = null

    if (setting.table) {
      settings[setting.name].type = DATA_TYPE.LOOKUP
      settings[setting.name].values = yaml
        .tables.find(table => table.name === setting.table)
        .values.map((label, value) => ({ label, value }))
    }
  })
})

// ----------------------------------------------------------------------------
// Custom setting types
// ----------------------------------------------------------------------------

settings['name'].type = DATA_TYPE.STRING

// ----------------------------------------------------------------------------
// Custom mapping of values for fields
// ----------------------------------------------------------------------------

settings['looptime'].values = [
  { label: '8kHz', value: 125 },
  { label: '4kHz', value: 250 },
  { label: '2kHz', value: 500 },
  { label: '1kHz', value: 1000 },
  { label: '667Hz', value: 1500 },
  { label: '500Hz', value: 2000 },
  { label: '334Hz', value: 3000 },
  { label: '250Hz', value: 4000 },
]

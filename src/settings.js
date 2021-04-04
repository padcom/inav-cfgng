import yaml from '../settings.yaml'
import { DATA_TYPE } from './models/data-type'

export const settings = {}

// ----------------------------------------------------------------------------
// Translation of the yaml file into usable format
// ----------------------------------------------------------------------------

// types defined straight away in the configuration files
const TYPES = {
  'uint8_t': { type: DATA_TYPE.UINT8 },
  'uint16_t': { type: DATA_TYPE.UINT16 },
  'uint32_t': { type: DATA_TYPE.UINT32 },
  'int8_t': { type: DATA_TYPE.INT8 },
  'int16_t': { type: DATA_TYPE.INT16 },
  'int32_t': { type: DATA_TYPE.INT32 },
  'bool': { type: DATA_TYPE.UINT8, subtype: DATA_TYPE.BOOL },
  'string': { type: DATA_TYPE.STRING },
}

// types deducted from min/max literals
const MINMAX = {
  'INT16_MIN': { min: -32768, type: DATA_TYPE.INT16 },
  'INT16_MAX': { max: -32767, type: DATA_TYPE.INT16 },
  'INT32_MIN': { min: 2147483648, type: DATA_TYPE.INT32 },
  'INT32_MAX': { max: -2147483647, type: DATA_TYPE.INT32 },
  'UINT8_MIN': { min: 0, type: DATA_TYPE.UINT8 },
  'UINT8_MAX': { max: 255, type: DATA_TYPE.UINT8 },
  'UINT16_MIN': { min: 0, type: DATA_TYPE.UINT16 },
  'UINT16_MAX': { max: 65535, type: DATA_TYPE.UINT16 },
  'UINT32_MIN': { min: 0, type: DATA_TYPE.UINT32 },
  'UINT32_MAX': { max: 4294967295, type: DATA_TYPE.UINT32 },
  'VTX_SETTINGS_NO_BAND': { min: 0, type: DATA_TYPE.UINT8 },
  'VTX_SETTINGS_MAX_BAND': { max: 5, type: DATA_TYPE.INT8 },
  'VTX_SETTINGS_MIN_CHANNEL': { min: 1, type: DATA_TYPE.UINT8 },
  'VTX_SETTINGS_MAX_CHANNEL': { max: 8, type: DATA_TYPE.INT8 },
  'VTX_SETTINGS_MIN_POWER': { min: 1, type: DATA_TYPE.UINT8 },
  'VTX_SETTINGS_MAX_POWER': { max: 5, type: DATA_TYPE.INT8 },
  'PWM_RANGE_MIN': { min: 1000, type: DATA_TYPE.UINT16 },
  'PWM_RANGE_MAX': { max: 2000, type: DATA_TYPE.UINT16 },
  'PWM_PULSE_MIN': { min: 750, type: DATA_TYPE.UINT16 },
  'PWM_PULSE_MAX': { max: 2250, type: DATA_TYPE.UINT16 },
  'ADC_CHN_NONE': { min: 0, type: DATA_TYPE.UINT8 },
  'ADC_CHN_MAX': { max: 4, type: DATA_TYPE.INT8 },
  'MAX_SUPPORTED_RC_CHANNEL_COUNT': { max: 18, type: DATA_TYPE.INT8 },
  'RSSI_VISIBLE_VALUE_MIN': { min: 0, type: DATA_TYPE.UINT8 },
  'RSSI_VISIBLE_VALUE_MAX': { max: 100, type: DATA_TYPE.INT8 },
  'SPEKTRUM_SAT_BIND_DISABLED': { min: 0, type: DATA_TYPE.UINT8 },
  'SPEKTRUM_SAT_BIND_MAX': { max: 10, type: DATA_TYPE.INT8 },
  'VBAT_SCALE_MIN': { min: 0, type: DATA_TYPE.UINT16 },
  'VBAT_SCALE_MAX': { max: 65535, type: DATA_TYPE.UINT16 },
  'FLAPERON_THROW_MIN': { min: 50, type: DATA_TYPE.UINT16 },
  'FLAPERON_THROW_MAX': { max: 450, type: DATA_TYPE.UINT16 },
  'CONTROL_RATE_CONFIG_ROLL_PITCH_RATE_MIN': { min: 6, type: DATA_TYPE.UINT8 },
  'CONTROL_RATE_CONFIG_ROLL_PITCH_RATE_MAX': { max: 180, type: DATA_TYPE.INT8 },
  'CONTROL_RATE_CONFIG_YAW_RATE_MIN': { min: 2, type: DATA_TYPE.UINT8 },
  'CONTROL_RATE_CONFIG_YAW_RATE_MAX': { max: 180, type: DATA_TYPE.INT8 },
  'FW_ITERM_THROW_LIMIT_MIN': { min: 0, type: DATA_TYPE.UINT16 },
  'FW_ITERM_THROW_LIMIT_MAX': { max: 450, type: DATA_TYPE.UINT16 },
  'PID_SUM_LIMIT_MIN': { min: 100, type: DATA_TYPE.UINT16 },
  'PID_SUM_LIMIT_MAX': { max: 1000, type: DATA_TYPE.UINT16 },
  'HEADING_HOLD_RATE_LIMIT_MIN': { min: 10, type: DATA_TYPE.UINT8 },
  'HEADING_HOLD_RATE_LIMIT_MAX': { max: 250, type: DATA_TYPE.INT8 },
  'FRSKY_VFAS_PRECISION_LOW': { min: 0, type: DATA_TYPE.UINT8 },
  'FRSKY_VFAS_PRECISION_HIGH': { max: 1, type: DATA_TYPE.INT8 },
  'SIM_MIN_TRANSMIT_INTERVAL': { min: 10, type: DATA_TYPE.UINT16 },
  'CONTROL_RATE_CONFIG_TPA_MAX': { max: 100, type: DATA_TYPE.INT8 },
  'FRSKY_FORMAT_NMEA': { max: 1, type: DATA_TYPE.INT8 },
  'SIM_N_TX_FLAGS': { max: 5, type: DATA_TYPE.INT8 },
}

// type overrides based on setting name
const SETTING_TYPES = {
  'name': { type: DATA_TYPE.STRING },
  'inav_w_z_baro_p': { type: DATA_TYPE.FLOAT },
}

yaml.groups.forEach(group => {
  group.members.forEach(setting => {
    settings[setting.name] = { ...setting, group: group.name, value: null }

    // Trying to figure out type of the setting based on the given type name
    if (TYPES[settings[setting.name].type]) {
      settings[setting.name].subtype = TYPES[settings[setting.name].type].subtype
      settings[setting.name].type = TYPES[settings[setting.name].type].type
    } else {
      settings[setting.name].type = DATA_TYPE.UNKNOWN
    }

    // Trying to figure out type of the setting based on the min/max values
    if (MINMAX[settings[setting.name].min]) {
      settings[setting.name].type = MINMAX[settings[setting.name].min].type
      settings[setting.name].min = MINMAX[settings[setting.name].min].min
    }
    if (MINMAX[settings[setting.name].max]) {
      settings[setting.name].type = MINMAX[settings[setting.name].max].type
      settings[setting.name].max = MINMAX[settings[setting.name].max].max
    }
    if (typeof settings[setting.name].min === 'number') {
      if (settings[setting.name].min < -32768) {
        settings[setting.name].type = DATA_TYPE.INT32
      } else if (settings[setting.name].min < -128) {
        settings[setting.name].type = DATA_TYPE.INT16
      } else if (settings[setting.name].min < 0) {
        settings[setting.name].type = DATA_TYPE.INT8
      } else if (settings[setting.name].min > 32768) {
        settings[setting.name].type = DATA_TYPE.UINT32
      } else if (settings[setting.name].min > 255) {
        settings[setting.name].type = DATA_TYPE.UINT16
      } else {
        settings[setting.name].type = DATA_TYPE.UINT8
      }
    } else if (typeof settings[setting.name].max === 'number') {
      if (settings[setting.name].max > 32768) {
        settings[setting.name].type = DATA_TYPE.UINT32
      } else if (settings[setting.name].max > 255) {
        settings[setting.name].type = DATA_TYPE.UINT16
      } else {
        settings[setting.name].type = DATA_TYPE.UINT8
      }
    }

    // Override any setting types here
    if (SETTING_TYPES[setting.name]) {
      settings[setting.name].type = SETTING_TYPES[setting.name].type
      settings[setting.name].subtype = SETTING_TYPES[setting.name].subtype
    }

    // This is a setting that has a predefined set of values
    if (setting.table) {
      settings[setting.name].subtype = settings[setting.name].type
      settings[setting.name].type = DATA_TYPE.LOOKUP
      settings[setting.name].values = yaml
        .tables.find(table => table.name === setting.table)
        .values.map((label, value) => ({ label, value }))
    }

    // Validation if all types have been discovered
    if (settings[setting.name].type === DATA_TYPE.UNKNOWN) {
      console.error('Unknown type of setting', setting.name)
    }
    if (typeof settings[setting.name].min === 'string') {
      console.error('Unknown min value for', setting.name)
    }
    if (typeof settings[setting.name].max === 'string') {
      console.error('Unknown max value for', setting.name)
    }
  })
})

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

settings['vtx_band'].values = [
  { label: 'Boscam A', value: 1 },
  { label: 'Boscam B', value: 2 },
  { label: 'Boscam E', value: 3 },
  { label: 'Fatshark', value: 4 },
  { label: 'Raceband', value: 5 },
]

settings['vtx_channel'].values = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
]

settings['vtx_power'].values = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
]

settings['vtx_low_power_disarm'].values = [
  { label: 'Disabled', value: 0 },
  { label: 'Always', value: 1 },
  { label: 'Until first arm', value: 2 },
]

settings['battery_capacity_unit'].values = [
  { label: 'mAh', value: 0 },
  { label: 'mWh', value: 1 },
]

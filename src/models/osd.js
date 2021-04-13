import { OSD_SYMBOL } from './font'

export const UNIT = {
  IMPERIAL: 0,
  METRIC: 1,
  UK: 2,
}

export const OSD_ELEMENT = {
  RSSI_VALUE                       :   0,
  MAIN_BATT_VOLTAGE                :   1,
  CROSSHAIRS                       :   2,
  ARTIFICIAL_HORIZON               :   3,
  HORIZON_SIDEBARS                 :   4,
  ONTIME                           :   5,
  FLYTIME                          :   6,
  FLYMODE                          :   7,
  CRAFT_NAME                       :   8,
  THROTTLE_POSITION                :   9,
  VTX_CHANNEL                      :  10,
  CURRENT_DRAW                     :  11,
  MAH_DRAWN                        :  12,
  GPS_SPEED                        :  13,
  GPS_SATS                         :  14,
  ALTITUDE                         :  15,
  ROLL_PIDS                        :  16,
  PITCH_PIDS                       :  17,
  YAW_PIDS                         :  18,
  POWER                            :  19,
  LONGITUDE                        :  20,
  LATITUDE                         :  21,
  DIRECTION_TO_HOME                :  22,
  DISTANCE_TO_HOME                 :  23,
  HEADING                          :  24,
  VARIO                            :  25,
  VARIO_NUM                        :  26,
  AIR_SPEED                        :  27,
  ONTIME_FLYTIME                   :  28,
  RTC_TIME                         :  29,
  MESSAGES                         :  30,
  GPS_HDOP                         :  31,
  MAIN_BATT_CELL_VOLTAGE           :  32,
  THROTTLE_POSITION_AUTO_THR       :  33,
  HEADING_GRAPH                    :  34,
  EFFICIENCY_MAH                   :  35,
  WH_DRAWN                         :  36,
  MAIN_BATT_REMAINING_CAPACITY     :  37,
  MAIN_BATT_REMAINING_PERCENTAGE   :  38,
  EFFICIENCY_WH                    :  39,
  TRIP_DIST                        :  40,
  PITCH_ANGLE                      :  41,
  ROLL_ANGLE                       :  42,
  MAP_NORTH                        :  43,
  MAP_TAKEOFF                      :  44,
  RADAR                            :  45,
  WIND_SPEED_HORIZONTAL            :  46,
  WIND_SPEED_VERTICAL              :  47,
  REMAINING_FLIGHT_TIME            :  48,
  REMAINING_FLIGHT_DISTANCE        :  49,
  HOME_HEADING_ERROR               :  50,
  CRUISE_HEADING_ERROR             :  51,
  CRUISE_HEADING_ADJUSTMENT        :  52,
  SAG_COMP_MAIN_BATT_VOLTAGE       :  53,
  SAG_COMP_MAIN_BATT_CELL_VOLTAGE  :  54,
  POWER_SUPPLY_IMPEDANCE           :  55,
  LEVEL_PIDS                       :  56,
  POS_XY_PIDS                      :  57,
  POS_Z_PIDS                       :  58,
  VEL_XY_PIDS                      :  59,
  VEL_Z_PIDS                       :  60,
  HEADING_P                        :  61,
  BOARD_ALIGNMENT_ROLL             :  62,
  BOARD_ALIGNMENT_PITCH            :  63,
  STABILIZED_RC_EXPO               :  64,
  STABILIZED_RC_YAW_EXPO           :  65,
  THROTTLE_EXPO                    :  66,
  STABILIZED_PITCH_RATE            :  67,
  STABILIZED_ROLL_RATE             :  68,
  STABILIZED_YAW_RATE              :  69,
  MANUAL_RC_EXPO                   :  70,
  MANUAL_RC_YAW_EXPO               :  71,
  MANUAL_PITCH_RATE                :  72,
  MANUAL_ROLL_RATE                 :  73,
  MANUAL_YAW_RATE                  :  74,
  NAV_FW_CRUISE_THROTTLE           :  75,
  NAV_FW_PITCH_TO_THROTTLE         :  76,
  FW_MIN_THROTTLE_DOWN_PITCH_ANGLE :  77,
  FW_ALT_PID_OUTPUTS               :  79,
  FW_POS_PID_OUTPUTS               :  80,
  MC_VEL_X_PID_OUTPUTS             :  81,
  MC_VEL_Y_PID_OUTPUTS             :  82,
  MC_VEL_Z_PID_OUTPUTS             :  83,
  MC_POS_XYZ_P_OUTPUTS             :  84,
  '3D_SPEED'                       :  85,
  IMU_TEMPERATURE                  :  86,
  BARO_TEMPERATURE                 :  87,
  SENSOR1_TEMPERATURE              :  88,
  SENSOR2_TEMPERATURE              :  89,
  SENSOR3_TEMPERATURE              :  90,
  SENSOR4_TEMPERATURE              :  91,
  SENSOR5_TEMPERATURE              :  92,
  SENSOR6_TEMPERATURE              :  93,
  SENSOR7_TEMPERATURE              :  94,
  SENSOR8_TEMPERATURE              :  95,
  MSL_ALTITUDE                     :  96,
  PLUS_CODE                        :  97,
  MAP_SCALE                        :  98,
  MAP_REFERENCE                    :  99,
  G_FORCE                          : 100,
  G_FORCE_X                        : 101,
  G_FORCE_Y                        : 102,
  G_FORCE_Z                        : 103,
  RC_SOURCE                        : 104,
  VTX_POWER                        : 105,
  ESC_RPM                          : 106,
  ESC_TEMPERATURE                  : 107,
  AZIMUTH                          : 108,
  CRSF_RSSI_DBM                    : 109,
  CRSF_LQ                          : 110,
  CRSF_SNR_DB                      : 111,
  CRSF_TX_POWER                    : 112,
  GVAR_0                           : 113,
  GVAR_1                           : 114,
  GVAR_2                           : 115,
  GVAR_3                           : 116,
  THRUST_PID_ATTENUATION           : 117,
  CONTROL_SMOOTHNESS               : 118,
}

export const OSD_GROUP = [
  {
    title: 'General',
    items: [
      OSD_ELEMENT.RSSI_VALUE,
      OSD_ELEMENT.MAIN_BATT_VOLTAGE,
      OSD_ELEMENT.SAG_COMP_MAIN_BATT_VOLTAGE,
      OSD_ELEMENT.MAIN_BATT_CELL_VOLTAGE,
      OSD_ELEMENT.SAG_COMP_MAIN_BATT_CELL_VOLTAGE,
      OSD_ELEMENT.POWER_SUPPLY_IMPEDANCE,
      OSD_ELEMENT.MAIN_BATT_REMAINING_PERCENTAGE,
      OSD_ELEMENT.REMAINING_FLIGHT_TIME,
      OSD_ELEMENT.REMAINING_FLIGHT_DISTANCE,
      OSD_ELEMENT.THROTTLE_POSITION,
      OSD_ELEMENT.THROTTLE_POSITION_AUTO_THR,
      OSD_ELEMENT.CRAFT_NAME,
      OSD_ELEMENT.FLYMODE,
      OSD_ELEMENT.MESSAGES,
      OSD_ELEMENT.HEADING,
      OSD_ELEMENT.HEADING_GRAPH,
      OSD_ELEMENT.AIR_SPEED,
      OSD_ELEMENT.RTC_TIME,
      OSD_ELEMENT.RC_SOURCE,
      OSD_ELEMENT.ESC_RPM,
    ]
  },
  {
    title: 'Temperature',
    items: [
      OSD_ELEMENT.IMU_TEMPERATURE,
      OSD_ELEMENT.BARO_TEMPERATURE,
      OSD_ELEMENT.ESC_TEMPERATURE,
      OSD_ELEMENT.SENSOR1_TEMPERATURE,
      OSD_ELEMENT.SENSOR2_TEMPERATURE,
      OSD_ELEMENT.SENSOR3_TEMPERATURE,
      OSD_ELEMENT.SENSOR4_TEMPERATURE,
      OSD_ELEMENT.SENSOR5_TEMPERATURE,
      OSD_ELEMENT.SENSOR6_TEMPERATURE,
      OSD_ELEMENT.SENSOR7_TEMPERATURE,
      OSD_ELEMENT.SENSOR8_TEMPERATURE,
    ]
  },
  {
    title: 'Altitude',
    items: [
      OSD_ELEMENT.ALTITUDE,
      OSD_ELEMENT.VARIO,
      OSD_ELEMENT.VARIO_NUM,
    ]
  },
  {
    title: 'G-Force',
    items: [
      OSD_ELEMENT.G_FORCE,
      OSD_ELEMENT.G_FORCE_X,
      OSD_ELEMENT.G_FORCE_Y,
      OSD_ELEMENT.G_FORCE_Z,
    ]
  },
  {
    title: 'Timers',
    items: [
      OSD_ELEMENT.ONTIME_FLYTIME,
      OSD_ELEMENT.ONTIME,
      OSD_ELEMENT.FLYTIME,
    ]
  },
  {
    title: 'Attitude',
    items: [
      OSD_ELEMENT.CROSSHAIRS,
      OSD_ELEMENT.ARTIFICIAL_HORIZON,
      OSD_ELEMENT.HORIZON_SIDEBARS,
      OSD_ELEMENT.PITCH_ANGLE,
      OSD_ELEMENT.ROLL_ANGLE,
    ]
  },
  {
    title: 'Current Meter',
    items: [
      OSD_ELEMENT.CURRENT_DRAW,
      OSD_ELEMENT.MAH_DRAWN,
      OSD_ELEMENT.WH_DRAWN,
      OSD_ELEMENT.POWER,
      OSD_ELEMENT.MAIN_BATT_REMAINING_CAPACITY,
      OSD_ELEMENT.EFFICIENCY_MAH,
      OSD_ELEMENT.EFFICIENCY_WH,
    ]
  },
  {
    title: 'GPS',
    items: [
      OSD_ELEMENT.GPS_SPEED,
      OSD_ELEMENT.MSL_ALTITUDE,
      OSD_ELEMENT['3D_SPEED'],
      OSD_ELEMENT.GPS_SATS,
      OSD_ELEMENT.LONGITUDE,
      OSD_ELEMENT.LATITUDE,
      OSD_ELEMENT.PLUS_CODE,
      OSD_ELEMENT.DIRECTION_TO_HOME,
      OSD_ELEMENT.HOME_HEADING_ERROR,
      OSD_ELEMENT.AZIMUTH,
      OSD_ELEMENT.DISTANCE_TO_HOME,
      OSD_ELEMENT.TRIP_DIST,
      OSD_ELEMENT.GPS_HDOP,
      OSD_ELEMENT.WIND_SPEED_HORIZONTAL,
      OSD_ELEMENT.WIND_SPEED_VERTICAL,
      OSD_ELEMENT.CRUISE_HEADING_ERROR,
      OSD_ELEMENT.CRUISE_HEADING_ADJUSTMENT,
    ]
  },
  {
    title: 'Maps and Radars',
    items: [
      OSD_ELEMENT.MAP_NORTH,
      OSD_ELEMENT.MAP_TAKEOFF,
      OSD_ELEMENT.RADAR,
      OSD_ELEMENT.MAP_SCALE,
      OSD_ELEMENT.MAP_REFERENCE,
    ]
  },
  {
    title: 'VTX',
    items: [
      OSD_ELEMENT.VTX_CHANNEL,
      OSD_ELEMENT.VTX_POWER,
    ]
  },
  {
    title: 'Crossfire RX Statistics',
    items: [
      OSD_ELEMENT.CRSF_RSSI_DBM,
      OSD_ELEMENT.CRSF_LQ,
      OSD_ELEMENT.CRSF_SNR_DB,
      OSD_ELEMENT.CRSF_TX_POWER,
    ]
  },
  {
    title: 'Global Variables',
    items: [
      OSD_ELEMENT.GVAR_0,
      OSD_ELEMENT.GVAR_1,
      OSD_ELEMENT.GVAR_2,
      OSD_ELEMENT.GVAR_3,
    ]
  },
  {
    title: 'RC Adjustment Values',
    items: [
      OSD_ELEMENT.ROLL_PIDS,
      OSD_ELEMENT.PITCH_PIDS,
      OSD_ELEMENT.YAW_PIDS,
      OSD_ELEMENT.LEVEL_PIDS,
      OSD_ELEMENT.POS_XY_PIDS,
      OSD_ELEMENT.POS_Z_PIDS,
      OSD_ELEMENT.VEL_XY_PIDS,
      OSD_ELEMENT.VEL_Z_PIDS,
      OSD_ELEMENT.HEADING_P,
      OSD_ELEMENT.BOARD_ALIGNMENT_ROLL,
      OSD_ELEMENT.BOARD_ALIGNMENT_PITCH,
      OSD_ELEMENT.THROTTLE_EXPO,
      OSD_ELEMENT.STABILIZED_RC_EXPO,
      OSD_ELEMENT.STABILIZED_RC_YAW_EXPO,
      OSD_ELEMENT.STABILIZED_PITCH_RATE,
      OSD_ELEMENT.STABILIZED_ROLL_RATE,
      OSD_ELEMENT.STABILIZED_YAW_RATE,
      OSD_ELEMENT.MANUAL_RC_EXPO,
      OSD_ELEMENT.MANUAL_RC_YAW_EXPO,
      OSD_ELEMENT.MANUAL_PITCH_RATE,
      OSD_ELEMENT.MANUAL_ROLL_RATE,
      OSD_ELEMENT.MANUAL_YAW_RATE,
      OSD_ELEMENT.NAV_FW_CRUISE_THROTTLE,
      OSD_ELEMENT.NAV_FW_PITCH_TO_THROTTLE,
      OSD_ELEMENT.FW_MIN_THROTTLE_DOWN_PITCH_ANGLE,
      OSD_ELEMENT.THRUST_PID_ATTENUATION,
      OSD_ELEMENT.CONTROL_SMOOTHNESS,
    ]
  },
  {
    title: 'PID Controller Outputs',
    items: [
      OSD_ELEMENT.FW_ALT_PID_OUTPUTS,
      OSD_ELEMENT.FW_POS_PID_OUTPUTS,
      OSD_ELEMENT.MC_VEL_X_PID_OUTPUTS,
      OSD_ELEMENT.MC_VEL_Y_PID_OUTPUTS,
      OSD_ELEMENT.MC_VEL_Z_PID_OUTPUTS,
      OSD_ELEMENT.MC_POS_XYZ_P_OUTPUTS,
    ]
  },
]

export const OSD_ITEM = {
  [OSD_ELEMENT.RSSI_VALUE]: {
    name: 'RSSI (Signal Strength)',
    description: 'Shows the quality of the signal received from the RC radio (the higher the better).',
    format: ({ analog }) => {
      const value = Math.round(analog.rssi || 99).padLeftWith(' ', 2)
      return `${OSD_SYMBOL.RSSI.marker}${value}`
    },
  },
  [OSD_ELEMENT.MAIN_BATT_VOLTAGE]: {
    name: 'Battery Voltage',
    description: '',
    format: ({ analog, settings }) => {
      const decimals = settings['osd_main_voltage_decimals']?.value || 2
      const value = analog.batteryVoltage?.toFixed(decimals) || '    '
      return `${OSD_SYMBOL.BATT.marker}${value}${OSD_SYMBOL.VOLT.marker}`
    },
  },
  [OSD_ELEMENT.SAG_COMP_MAIN_BATT_VOLTAGE]: {
    name: 'Sag Compensated Battery Voltage',
    description: 'Calculated voltage the battery should be at without load (simulates ideal battery)',
    format: ({ analog, settings }) => {
      const decimals = settings['osd_main_voltage_decimals']?.value || 2
      const value = analog.batteryVoltage?.toFixed(decimals) || '    '
      return `${OSD_SYMBOL.BATT.marker}${value}${OSD_SYMBOL.VOLT.marker}`
    },
  },
  [OSD_ELEMENT.MAIN_BATT_CELL_VOLTAGE]: {
    name: 'Battery Cell Voltage',
    description: 'Shows the average cell voltage from the main battery',
    format: () => `${OSD_SYMBOL.BATT.marker}3.90${OSD_SYMBOL.VOLT.marker}`
  },
  [OSD_ELEMENT.SAG_COMP_MAIN_BATT_CELL_VOLTAGE]: {
    name: 'Sag Compensated Battery Cell Voltage',
    description: 'Calculated average cell voltage the battery should be at without load (simulates ideal battery)',
    format: () => `${OSD_SYMBOL.BATT.marker}4.18${OSD_SYMBOL.VOLT.marker}`
  },
  [OSD_ELEMENT.POWER_SUPPLY_IMPEDANCE]: {
    name: 'Power supply impedance',
    description: '',
    format: ({ analog }) => ` 23${OSD_SYMBOL.MILLIOHM.marker}`
  },
  [OSD_ELEMENT.MAIN_BATT_REMAINING_PERCENTAGE]: {
    name: 'Battery Remaining Percentage',
    description: '',
    format: ({ analog }) => '100%',
  },
  [OSD_ELEMENT.REMAINING_FLIGHT_TIME]: {
    name: 'Remaining flight time',
    description: 'Estimated remaining flight time before the aircraft needs to go back home based on remaining battery energy, average power and distance to home (Fixed wing only, please read the documentation)',
    format: ({ analog }) => `${OSD_SYMBOL.FLY_M.marker}10:35`,
  },
  [OSD_ELEMENT.REMAINING_FLIGHT_DISTANCE]: {
    name: 'Remaining flight distance',
    description: 'Estimated remaining flight travel distance before the aircraft needs to go back home based on remaining battery energy, average power and distance to home (Fixed wing only, please read the documentation)',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `${OSD_SYMBOL.TRIP_DIST.marker}0.98${OSD_SYMBOL.DIST_MI.marker}`
      } else {
        return `${OSD_SYMBOL.TRIP_DIST.marker}1.73${OSD_SYMBOL.DIST_KM.marker}`
      }
    },
  },
  [OSD_ELEMENT.THROTTLE_POSITION]: {
    name: 'Throttle position',
    description: '',
    format: ({ analog }) => `${OSD_SYMBOL.THR.marker} 69`
  },
  [OSD_ELEMENT.THROTTLE_POSITION_AUTO_THR]: {
    name: 'Throttle Position / Auto Throttle',
    description: 'Shows the throttle stick position in flight modes where it controls the throttle output. On navigation modes, it shows the actual throttle value applied to the motors.',
    format: ({ analog }) => `${OSD_SYMBOL.THR.marker} 51 `
  },
  [OSD_ELEMENT.CRAFT_NAME]: {
    name: 'Craft name',
    description: '',
    format: ({ analog }) => '[CRAFTNAME]',
  },
  [OSD_ELEMENT.FLYMODE]: {
    name: 'Flight mode',
    description: '',
    format: ({ analog }) => 'ACRO',
  },
  [OSD_ELEMENT.MESSAGES]: {
    name: 'System Messages',
    description: 'Shows different system messages like warnings, hardware failures and extended details of the current flight mode (e.g. AUTOTUNE and AUTOTRIM modes and RTH stages).',
    format: ({ analog }) => '       SYSTEM MESSAGE       ',
  },
  [OSD_ELEMENT.HEADING]: {
    name: 'Heading',
    description: '',
    format: ({ analog }) => `${OSD_SYMBOL.HEADING.marker}175${OSD_SYMBOL.DEGREES.marker}`
  },
  [OSD_ELEMENT.HEADING_GRAPH]: {
    name: 'Heading graph',
    description: '',
    format: ({ analog }) => [
      OSD_SYMBOL.HEADING_W.marker +
      OSD_SYMBOL.HEADING_LINE.marker,
      OSD_SYMBOL.HEADING_DIVIDED_LINE.marker,
      OSD_SYMBOL.HEADING_LINE.marker,
      OSD_SYMBOL.HEADING_N.marker,
      OSD_SYMBOL.HEADING_LINE.marker,
      OSD_SYMBOL.HEADING_DIVIDED_LINE.marker,
      OSD_SYMBOL.HEADING_LINE.marker,
      OSD_SYMBOL.HEADING_E.marker,
    ].join(''),
  },
  [OSD_ELEMENT.AIR_SPEED]: {
    name: 'Air speed',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `${OSD_SYMBOL.AIR.marker} 35${OSD_SYMBOL.MPH.marker}`
      } else {
        return `${OSD_SYMBOL.AIR.marker} 55${OSD_SYMBOL.KMH.marker}`
      }
    },
  },
  [OSD_ELEMENT.RTC_TIME]: {
    name: 'Time of the Day',
    description: 'Shows the current time, as retrieved from the GPS or set via the radio.',
    format: ({ analog }) => `${OSD_SYMBOL.CLOCK.marker}13:38`
  },
  [OSD_ELEMENT.RC_SOURCE]: {
    name: 'RC source',
    description: 'Shows the current RC source, STD or MSP (useful when using MSP override)',
    format: ({ analog }) => 'MSP',
  },
  [OSD_ELEMENT.ESC_RPM]: {
    name: 'Motor RPM from ESC telemetry',
    description: '',
    format: ({ analog }) => `${OSD_SYMBOL.RPM.marker}983`,
  },
  [OSD_ELEMENT.IMU_TEMPERATURE]: {
    name: 'IMU Temperature',
    description: 'Temperature of the IMU',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `${OSD_SYMBOL.IMU_TEMP.marker} 90${OSD_SYMBOL.TEMP_F.marker}`
      } else {
        return `${OSD_SYMBOL.IMU_TEMP.marker} 32${OSD_SYMBOL.TEMP_C.marker}`
      }
    },
  },
  [OSD_ELEMENT.BARO_TEMPERATURE]: {
    name: 'Baro Temperature',
    description: 'Temperature of the barometer',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `${OSD_SYMBOL.IMU_TEMP.marker} 90${OSD_SYMBOL.TEMP_F.marker}`
      } else {
        return `${OSD_SYMBOL.IMU_TEMP.marker} 32${OSD_SYMBOL.TEMP_C.marker}`
      }
    },
  },
  [OSD_ELEMENT.ESC_TEMPERATURE]: {
    name: 'ESC Temperature',
    description: 'Temperature of the ESC read from DSHOT telemetry',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `${OSD_SYMBOL.IMU_TEMP.marker} 98${OSD_SYMBOL.TEMP_F.marker}`
      } else {
        return `${OSD_SYMBOL.IMU_TEMP.marker} 37${OSD_SYMBOL.TEMP_C.marker}`
      }
    },
  },
  [OSD_ELEMENT.SENSOR1_TEMPERATURE]: {
    name: 'Temperature sensor 1',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return ` 90${OSD_SYMBOL.TEMP_F.marker}`
      } else {
        return ` 32${OSD_SYMBOL.TEMP_C.marker}`
      }
    },
  },
  [OSD_ELEMENT.SENSOR2_TEMPERATURE]: {
    name: 'Temperature sensor 2',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return ` 90${OSD_SYMBOL.TEMP_F.marker}`
      } else {
        return ` 32${OSD_SYMBOL.TEMP_C.marker}`
      }
    },
  },
  [OSD_ELEMENT.SENSOR3_TEMPERATURE]: {
    name: 'Temperature sensor 3',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return ` 90${OSD_SYMBOL.TEMP_F.marker}`
      } else {
        return ` 32${OSD_SYMBOL.TEMP_C.marker}`
      }
    },
  },
  [OSD_ELEMENT.SENSOR4_TEMPERATURE]: {
    name: 'Temperature sensor 4',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return ` 90${OSD_SYMBOL.TEMP_F.marker}`
      } else {
        return ` 32${OSD_SYMBOL.TEMP_C.marker}`
      }
    },
  },
  [OSD_ELEMENT.SENSOR5_TEMPERATURE]: {
    name: 'Temperature sensor 5',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return ` 90${OSD_SYMBOL.TEMP_F.marker}`
      } else {
        return ` 32${OSD_SYMBOL.TEMP_C.marker}`
      }
    },
  },
  [OSD_ELEMENT.SENSOR6_TEMPERATURE]: {
    name: 'Temperature sensor 6',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return ` 90${OSD_SYMBOL.TEMP_F.marker}`
      } else {
        return ` 32${OSD_SYMBOL.TEMP_C.marker}`
      }
    },
  },
  [OSD_ELEMENT.SENSOR7_TEMPERATURE]: {
    name: 'Temperature sensor 7',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return ` 90${OSD_SYMBOL.TEMP_F.marker}`
      } else {
        return ` 32${OSD_SYMBOL.TEMP_C.marker}`
      }
    },
  },
  [OSD_ELEMENT.SENSOR8_TEMPERATURE]: {
    name: 'Temperature sensor 8',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return ` 90${OSD_SYMBOL.TEMP_F.marker}`
      } else {
        return ` 32${OSD_SYMBOL.TEMP_C.marker}`
      }
    },
  },
  [OSD_ELEMENT.ALTITUDE]: {
    name: 'Altitude',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `118${OSD_SYMBOL.ALT_FT.marker}`
      } else {
        return `399${OSD_SYMBOL.ALT_M.marker}`
      }
    },
  },
  [OSD_ELEMENT.VARIO]: {
    name: 'Vario',
    description: '',
    format: ({ analog }) => [
      OSD_SYMBOL.VARIO_UP_2A.marker,
      OSD_SYMBOL.VARIO_UP_2A.marker,
      OSD_SYMBOL.VARIO_UP_2A.marker,
      OSD_SYMBOL.VARIO_UP_2A.marker,
      OSD_SYMBOL.VARIO_UP_2A.marker,
    ].join('\n')
  },
  [OSD_ELEMENT.VARIO_NUM]: {
    name: 'Numeric vario',
    description: 'Shows vertical speed using a number',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `-1.6${OSD_SYMBOL.FT_S.marker}`
      } else {
        return `-0.5${OSD_SYMBOL.M_S.marker}`
      }
    },
  },
  [OSD_ELEMENT.G_FORCE]: {
    name: 'g force',
    description: 'Shows the g force taking into account all axes',
    format: ({ analog }) => `${OSD_SYMBOL.GFORCE.marker}1.00`
  },
  [OSD_ELEMENT.G_FORCE_X]: {
    name: 'Longitudinal g force in body frame (X)',
    description: 'Shows the g force in the X axis (longitudinal)',
    format: ({ analog }) => `${OSD_SYMBOL.GFORCE_X.marker}-0.10`
  },
  [OSD_ELEMENT.G_FORCE_Y]: {
    name: 'Lateral g force in body frame (Y)',
    description: 'Shows the g force in the Y axis (lateral)Shows the g force in the Y axis (lateral)',
    format: ({ analog }) => `${OSD_SYMBOL.GFORCE_Y.marker}-0.20`
  },
  [OSD_ELEMENT.G_FORCE_Z]: {
    name: 'Vertical g force in body frame (Z)',
    description: 'Shows the g force in the Z axis (vertical)',
    format: ({ analog }) => `${OSD_SYMBOL.GFORCE_Y.marker}-0.30`
  },
  [OSD_ELEMENT.ONTIME_FLYTIME]: {
    name: 'On time / Fly time',
    description: 'Shows "On Time" while unarmed and "Fly Time" while armed.',
    format: ({ analog }) => `${OSD_SYMBOL.FLY_M.marker}04:11`
  },
  [OSD_ELEMENT.ONTIME]: {
    name: 'On time',
    description: '',
    format: ({ analog }) => `${OSD_SYMBOL.FLY_M.marker}04:11`
  },
  [OSD_ELEMENT.FLYTIME]: {
    name: 'Fly time',
    description: '',
    format: () => `${OSD_SYMBOL.FLY_M.marker}04:11`
  },
  [OSD_ELEMENT.CROSSHAIRS]: {
    name: 'Crosshair',
    description: '',
    position: { x: 14, y: 7 },
    format: ({ settings }) => {
      switch (settings['osd_crosshairs_style']?.value) {
        case 1:
          return '#219#220#221'
        case 2:
          return '#400#401#402'
        case 3:
          return '#403#404#405'
        case 4:
          return '#406#407#408'
        case 5:
          return '#409#410#411'
        case 6:
          return '#412#413#414'
        default:
          return '#038#126#039'
      }
    },
  },
  [OSD_ELEMENT.ARTIFICIAL_HORIZON]: {
    name: 'Artificial horizon',
    description: '',
    position: { x: 10, y: 7 },
    format: () => '#045#045#045#045   #045#045#045#045',
  },
  [OSD_ELEMENT.HORIZON_SIDEBARS]: {
    name: 'Horizon sidebars',
    description: '',
    position: { x: 7, y: 4 },
    format: () => [
      '#021               #021',
      '#021               #021',
      '#021               #021',
      '#021#116             #120#021',
      '#021               #021',
      '#021               #021',
      '#021               #021',
    ].join('\n'),
  },
  [OSD_ELEMENT.PITCH_ANGLE]: {
    name: 'Pitch angle',
    description: '',
    format: ({ analog }) => `${OSD_SYMBOL.PITCH_UP.marker} 1.5`
  },
  [OSD_ELEMENT.ROLL_ANGLE]: {
    name: 'Roll angle',
    description: '',
    format: ({ analog }) => `${OSD_SYMBOL.ROLL_LEFT.marker}31.4`
  },
  [OSD_ELEMENT.CURRENT_DRAW]: {
    name: 'Current drawn',
    description: '',
    format: ({ analog }) => `42.1${OSD_SYMBOL.AMP.marker}`
  },
  [OSD_ELEMENT.MAH_DRAWN]: {
    name: 'mAh drawn',
    description: '',
    format: ({ analog }) => ` 690${OSD_SYMBOL.MAH.marker}`
  },
  [OSD_ELEMENT.WH_DRAWN]: {
    name: 'Capacity drawn',
    description: '',
    format: ({ analog }) => `1.25${OSD_SYMBOL.WH.marker}`
  },
  [OSD_ELEMENT.POWER]: {
    name: 'Power',
    description: '',
    format: ({ analog }) => ` 50${OSD_SYMBOL.WATT.marker}`
  },
  [OSD_ELEMENT.MAIN_BATT_REMAINING_CAPACITY]: {
    name: 'Battery Remaining Capacity',
    description: '',
    format: ({ analog }) => ` 690${OSD_SYMBOL.MAH.marker}`
  },
  [OSD_ELEMENT.EFFICIENCY_MAH]: {
    name: 'Efficiency mAh/Km',
    description: '',
    format: ({ analog }) => `123${OSD_SYMBOL.MAH_KM_0.marker}${OSD_SYMBOL.MAH_KM_1.marker}`
  },
  [OSD_ELEMENT.EFFICIENCY_WH]: {
    name: 'Efficiency Wh/Km',
    description: '',
    format: ({ analog }) => `1.23${OSD_SYMBOL.WH_KM_0.marker}${OSD_SYMBOL.WH_KM_1.marker}`
  },
  [OSD_ELEMENT.GPS_SPEED]: {
    name: 'GPS Speed',
    description: 'Shows GPS ground speed.',
    format: ({ analog }) => `1.23${OSD_SYMBOL.KMH.marker}`
  },
  [OSD_ELEMENT.MSL_ALTITUDE]: {
    name: 'MSL Altitude',
    description: 'Altitude above Mean Sea Level',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `275${OSD_SYMBOL.ALT_FT.marker}`
      } else {
        return `477${OSD_SYMBOL.ALT_M.marker}`
      }
    },
  },
  [OSD_ELEMENT['3D_SPEED']]: {
    name: '3D Speed',
    description: 'Shows 3D speed considering both horizontal and vertical speed.',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return ` 30${OSD_SYMBOL.MPH_3D.marker}`
      } else {
        return ` 48${OSD_SYMBOL.KMH_3D.marker}`
      }
    },
  },
  [OSD_ELEMENT.GPS_SATS]: {
    name: 'GPS Satellites',
    description: 'Shows the number of GPS satellites located by the GPS receiver.',
    format: ({ analog }) => `${OSD_SYMBOL.GPS_SAT1.marker}${OSD_SYMBOL.GPS_SAT2.marker}14`
  },
  [OSD_ELEMENT.LONGITUDE]: {
    name: 'Longitude',
    description: '',
    format: ({ settings }) => `${OSD_SYMBOL.LON.marker}${'-114.7652134'.substr(0, settings?.numberOfCoordinateDigits || 11)}`
  },
  [OSD_ELEMENT.LATITUDE]: {
    name: 'Latitude',
    description: '',
    format: ({ settings }) => `${OSD_SYMBOL.LAT.marker}${'-114.7652134'.substr(0, settings?.numberOfCoordinateDigits || 11)}`
  },
  [OSD_ELEMENT.PLUS_CODE]: {
    name: 'Plus Code (latitude + longitude)',
    description: 'Plus codes encode both latitude and longitude on a single value that can be entered directly in Google Maps. It provides the same level of precision than latitude and longitude while using less screen space.',
    format: ({ settings }) => '9547X6PM+VWCCC'.substr(0, (settings['osd_plus_code_digits']?.value || 11) + 1)
  },
  [OSD_ELEMENT.DIRECTION_TO_HOME]: {
    name: 'Direction to home',
    description: '',
    format: () => OSD_SYMBOL.DIR_TO_HOME.marker,
  },
  [OSD_ELEMENT.HOME_HEADING_ERROR]: {
    name: 'Home heading error',
    description: '',
    format: () => `${OSD_SYMBOL.HOME.marker}${OSD_SYMBOL.HEADING.marker} -10${OSD_SYMBOL.DEGREES.marker}`,
  },
  [OSD_ELEMENT.AZIMUTH]: {
    name: 'Azimuth',
    description: 'Azimuth is the direction of the aircraft in relation to the home point. It\'s useful to keep the aircraft on the correct course or to keep the aircraft in front of a fixed directional antenna.',
    format: () => `${OSD_SYMBOL.AZIMUTH.marker} 20`,
  },
  [OSD_ELEMENT.DISTANCE_TO_HOME]: {
    name: 'Distance to home',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `${OSD_SYMBOL.HOME.marker}0.98${OSD_SYMBOL.DIST_MI.marker}`
      } else {
        return `${OSD_SYMBOL.HOME.marker}1.73${OSD_SYMBOL.DIST_KM.marker}`
      }
    },
  },
  [OSD_ELEMENT.TRIP_DIST]: {
    name: 'Trip distance',
    description: '',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `${OSD_SYMBOL.TRIP_DIST.marker}0.98${OSD_SYMBOL.DIST_MI.marker}`
      } else {
        return `${OSD_SYMBOL.TRIP_DIST.marker}1.73${OSD_SYMBOL.DIST_KM.marker}`
      }
    },
  },
  [OSD_ELEMENT.GPS_HDOP]: {
    name: 'GPS HDOP',
    description: 'Shows the Horizontal Dilution Of Precision from the GPS. The lower, the more accurate the GPS fix is.',
    format: ({ analog }) => `${OSD_SYMBOL.GPS_HDP1.marker}${OSD_SYMBOL.GPS_HDP2.marker}1.8`
  },
  [OSD_ELEMENT.WIND_SPEED_HORIZONTAL]: {
    name: 'Horizontal wind speed',
    description: 'Shows estimated horizontal wind speed and direction.',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `${OSD_SYMBOL.WIND_SPEED_HORIZONTAL.marker}${OSD_SYMBOL.DIRECTION1.marker}3.27${OSD_SYMBOL.MPH.marker}`
      } else {
        return `${OSD_SYMBOL.WIND_SPEED_HORIZONTAL.marker}${OSD_SYMBOL.DIRECTION1.marker}5.27${OSD_SYMBOL.KMH.marker}`
      }
    },
  },
  [OSD_ELEMENT.WIND_SPEED_VERTICAL]: {
    name: 'Vertical wind speed',
    description: 'Shows estimated vertical wind speed and direction.',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `${OSD_SYMBOL.WIND_SPEED_VERTICAL.marker}${OSD_SYMBOL.AH_DECORATION_UP.marker}1.03${OSD_SYMBOL.MPH.marker}`
      } else {
        return `${OSD_SYMBOL.WIND_SPEED_VERTICAL.marker}${OSD_SYMBOL.AH_DECORATION_UP.marker}1.67${OSD_SYMBOL.KMH.marker}`
      }
    },
  },
  [OSD_ELEMENT.CRUISE_HEADING_ERROR]: {
    name: 'Cruise heading error',
    description: '',
    format: ({ analog }) => `${OSD_SYMBOL.HEADING.marker}  5${OSD_SYMBOL.DEGREES.marker}`
  },
  [OSD_ELEMENT.CRUISE_HEADING_ADJUSTMENT]: {
    name: 'Cruise heading adjustment',
    description: '',
    format: ({ analog }) => `${OSD_SYMBOL.HEADING.marker} -90${OSD_SYMBOL.DEGREES.marker}`
  },
  [OSD_ELEMENT.MAP_NORTH]: {
    name: 'Map (Up is north)',
    description: '',
    position: { x: 15, y: 8 },
    format: ({ analog }) => 'H',
  },
  [OSD_ELEMENT.MAP_TAKEOFF]: {
    name: 'Map (Up is the takeoff direction)',
    description: '',
    position: { x: 15, y: 8 },
    format: ({ analog }) => 'H',
  },
  [OSD_ELEMENT.RADAR]: {
    name: 'Radar',
    description: '',
    position: { x: 15, y: 8 },
    format: ({ analog }) => OSD_SYMBOL.DIR_TO_HOME.marker,
  },
  [OSD_ELEMENT.MAP_SCALE]: {
    name: 'Map Scale',
    description: 'Scale of the currently shown map/radar.',
    format: ({ analog, settings }) => {
      if (settings['osd_units']?.value === UNIT.IMPERIAL) {
        return `${OSD_SYMBOL.SCALE.marker}0.10${OSD_SYMBOL.MI.marker}`
      } else {
        return `${OSD_SYMBOL.SCALE.marker}100${OSD_SYMBOL.M.marker}`
      }
    },
  },
  [OSD_ELEMENT.MAP_REFERENCE]: {
    name: 'Map Reference',
    description: 'Reference (direction that points up) of the current map. N for North and T for takeoff direction.',
    format: ({ analog }) => `${OSD_SYMBOL.DIRECTION.marker}\nN`
  },
  [OSD_ELEMENT.VTX_CHANNEL]: {
    name: 'Video TX Band and Channel',
    description: 'Shows the current band and channel of the VTX. Requires either a VTX with SmartAudio or Tramp or either a VTX integrated in the flight controller.',
    format: ({ analog }) => 'CH:F7:1',
  },
  [OSD_ELEMENT.VTX_POWER]: {
    name: 'Video TX power level',
    description: 'Shows the current VTX power level. Blinks when the corresponding RC adjustment is selected.',
    format: ({ analog }) => '1',
  },
  [OSD_ELEMENT.CRSF_RSSI_DBM]: {
    name: 'RX RSSI in dBm',
    description: '',
    format: ({ analog, settings }) => `${OSD_SYMBOL.RSSI.marker}-100${OSD_SYMBOL.DBM.marker}`
  },
  [OSD_ELEMENT.CRSF_LQ]: {
    name: 'RX Link Quality %',
    description: 'Use Crossfire LQ Format setting to select format type.',
    format: ({ analog, settings }) => {
      if (settings['osd_crsf_lq_format'].value === 1) {
        return '2:100%'
      } else {
        return '  300%'
      }
    },
  },
  [OSD_ELEMENT.CRSF_SNR_DB]: {
    name: 'RX Uplink SNR in dB',
    description: 'Shown only when SNR goes below alarm level. At 0dB, received signal level equals noise floor level.',
    format: ({ analog }) => `${OSD_SYMBOL.SNR.marker}-12${OSD_SYMBOL.DB.marker}`
  },
  [OSD_ELEMENT.CRSF_TX_POWER]: {
    name: 'TX power in mW',
    description: '',
    format: ({ analog }) => `  10${OSD_SYMBOL.MW.marker}`
  },
  [OSD_ELEMENT.GVAR_0]: {
    name: 'Global variable 0',
    description: '',
    format: ({ analog }) => 'G0:01337',
  },
  [OSD_ELEMENT.GVAR_1]: {
    name: 'Global variable 1',
    description: '',
    format: ({ analog }) => 'G1:31415',
  },
  [OSD_ELEMENT.GVAR_2]: {
    name: 'Global variable 2',
    description: '',
    format: ({ analog }) => 'G2:01611',
  },
  [OSD_ELEMENT.GVAR_3]: {
    name: 'Global variable 3',
    description: '',
    format: ({ analog }) => 'G3:30126',
  },
  [OSD_ELEMENT.ROLL_PIDS]: {
    name: 'Roll PIDs',
    description: '',
    format: ({ analog }) => 'ROL  40  30  23',
  },
  [OSD_ELEMENT.PITCH_PIDS]: {
    name: 'Pitch PIDs',
    description: '',
    format: ({ analog }) => 'PIT  40  30  23',
  },
  [OSD_ELEMENT.YAW_PIDS]: {
    name: 'Yaw PIDs',
    description: '',
    format: ({ analog }) => 'YAW  85  45   0',
  },
  [OSD_ELEMENT.LEVEL_PIDS]: {
    name: 'Level PIDs',
    description: '',
    format: ({ analog }) => 'LEV  20  15  80',
  },
  [OSD_ELEMENT.POS_XY_PIDS]: {
    name: 'Position XY PIDs',
    description: '',
    format: ({ analog }) => 'PXY  20  15  80',
  },
  [OSD_ELEMENT.POS_Z_PIDS]: {
    name: 'Position Z PIDs',
    description: '',
    format: ({ analog }) => 'PZ   20  15  80',
  },
  [OSD_ELEMENT.VEL_XY_PIDS]: {
    name: 'Velocity XY PIDs',
    description: '',
    format: ({ analog }) => 'VXY  20  15  80',
  },
  [OSD_ELEMENT.VEL_Z_PIDS]: {
    name: 'Velocity Z PIDs',
    description: '',
    format: ({ analog }) => 'VZ   20  15  80',
  },
  [OSD_ELEMENT.HEADING_P]: {
    name: 'Heading P',
    description: '',
    format: ({ analog }) => 'HP  20',
  },
  [OSD_ELEMENT.BOARD_ALIGNMENT_ROLL]: {
    name: 'Board Alignment Roll',
    description: '',
    format: ({ analog }) => 'AR    0',
  },
  [OSD_ELEMENT.BOARD_ALIGNMENT_PITCH]: {
    name: 'Board Alignment Pitch',
    description: '',
    format: ({ analog }) => 'AP   1.0',
  },
  [OSD_ELEMENT.THROTTLE_EXPO]: {
    name: 'Throttle Expo',
    description: '',
    format: ({ analog }) => 'TEX   0',
  },
  [OSD_ELEMENT.STABILIZED_RC_EXPO]: {
    name: 'Stabilized RC Expo',
    description: '',
    format: ({ analog }) => 'EXP  20',
  },
  [OSD_ELEMENT.STABILIZED_RC_YAW_EXPO]: {
    name: 'Stabilized RC Yaw Expo',
    description: '',
    format: ({ analog }) => 'YEX  20',
  },
  [OSD_ELEMENT.STABILIZED_PITCH_RATE]: {
    name: 'Stabilized Pitch Rate',
    description: '',
    format: ({ analog }) => 'SPR  20',
  },
  [OSD_ELEMENT.STABILIZED_ROLL_RATE]: {
    name: 'Stabilized Roll Rate',
    description: '',
    format: ({ analog }) => 'SRR  20',
  },
  [OSD_ELEMENT.STABILIZED_YAW_RATE]: {
    name: 'Stabilized Yaw Rate',
    description: '',
    format: ({ analog }) => 'SYR  20',
  },
  [OSD_ELEMENT.MANUAL_RC_EXPO]: {
    name: 'Manual RC Expo',
    description: '',
    format: ({ analog }) => 'MEX  20',
  },
  [OSD_ELEMENT.MANUAL_RC_YAW_EXPO]: {
    name: 'Manual RC Yaw Expo',
    description: '',
    format: ({ analog }) => 'MYX  20',
  },
  [OSD_ELEMENT.MANUAL_PITCH_RATE]: {
    name: 'Manual Pitch Rate',
    description: '',
    format: ({ analog }) => 'MPR  20',
  },
  [OSD_ELEMENT.MANUAL_ROLL_RATE]: {
    name: 'Manual Roll Rate',
    description: '',
    format: ({ analog }) => 'MRR  20',
  },
  [OSD_ELEMENT.MANUAL_YAW_RATE]: {
    name: 'Manual Yaw Rate',
    description: '',
    format: ({ analog }) => 'MYR  20',
  },
  [OSD_ELEMENT.NAV_FW_CRUISE_THROTTLE]: {
    name: 'Navigation FW Cruise throttle',
    description: '',
    format: ({ analog }) => 'CRS 1500',
  },
  [OSD_ELEMENT.NAV_FW_PITCH_TO_THROTTLE]: {
    name: 'Navigation Pitch to Throttle',
    description: '',
    format: ({ analog }) => 'P2T  10',
  },
  [OSD_ELEMENT.FW_MIN_THROTTLE_DOWN_PITCH_ANGLE]: {
    name: 'FW Min Throttle Down Pitch Angle',
    description: '',
    format: ({ analog }) => '0TP  4.5',
  },
  [OSD_ELEMENT.THRUST_PID_ATTENUATION]: {
    name: 'Thrust PID Attenuation',
    description: '',
    format: ({ analog }) => 'TPA    0\nBP  1500',
  },
  [OSD_ELEMENT.CONTROL_SMOOTHNESS]: {
    name: 'Control Smoothness',
    description: '',
    format: ({ analog }) => 'CTL S 3',
  },
  [OSD_ELEMENT.FW_ALT_PID_OUTPUTS]: {
    name: 'FW Altitude PID controller outputs',
    description: '',
    format: ({ analog }) => 'PZO    1.2   0.1   0.0   1.3',
  },
  [OSD_ELEMENT.FW_POS_PID_OUTPUTS]: {
    name: 'FW Position PID controller outputs',
    description: '',
    format: ({ analog }) => 'PXYO   1.2   0.1   0.0   1.3',
  },
  [OSD_ELEMENT.MC_VEL_X_PID_OUTPUTS]: {
    name: 'MC Velocity X PID controller outputs',
    description: '',
    format: ({ analog }) => 'VXO    1.2   0.1   0.0   1.3',
  },
  [OSD_ELEMENT.MC_VEL_Y_PID_OUTPUTS]: {
    name: 'MC Velocity Y PID controller outputs',
    description: '',
    format: ({ analog }) => 'VYO    1.2   0.1   0.0   1.3',
  },
  [OSD_ELEMENT.MC_VEL_Z_PID_OUTPUTS]: {
    name: 'MC Velocity Z PID controller outputs',
    description: '',
    format: ({ analog }) => 'VZO    1.2   0.1   0.0   1.3',
  },
  [OSD_ELEMENT.MC_POS_XYZ_P_OUTPUTS]: {
    name: 'MC Position XYZ P controllers outputs',
    description: '',
    format: ({ analog }) => 'POSO   1.2   0.1   0.0   1.3',
  },
  // [OSD_ELEMENT.]: {
  //   name: '',
  //   description: '',
  //   format: ({ analog }) => '',
  // },
}

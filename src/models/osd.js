export { FONT } from './font'

export const UNIT = {
  IMPERIAL: 0,
  METRIC: 1,
  UK: 2,
}

export const OSD_SYMBOL = {
  MILLIOHM               :   { index: 0, marker: '#000' },
  RSSI                   :   { index: 1, marker: '#001' },
  AH_RIGHT               :   { index: 2, marker: '#002' },
  AH_LEFT                :   { index: 3, marker: '#003' },
  THR                    :   { index: 4, marker: '#004' },
  AH_DECORATION_UP       :   { index: 5, marker: '#005' },
  VOLT                   :   { index: 6, marker: '#006' },
  MAH                    :   { index: 7, marker: '#007' },
  TEMP_F                 :  { index: 13, marker: '#013' },
  TEMP_C                 :  { index: 14, marker: '#014' },
  AH_DECORATION          :  { index: 19, marker: '#019' },
  WIND_SPEED_HORIZONTAL  :  { index: 22, marker: '#022' },
  WIND_SPEED_VERTICAL    :  { index: 23, marker: '#023' },
  HEADING_N              :  { index: 24, marker: '#024' },
  HEADING_E              :  { index: 26, marker: '#026' },
  HEADING_W              :  { index: 27, marker: '#027' },
  HEADING_DIVIDED_LINE   :  { index: 28, marker: '#028' },
  HEADING_LINE           :  { index: 29, marker: '#029' },
  GPS_SAT1               :  { index: 30, marker: '#030' },
  GPS_SAT2               :  { index: 31, marker: '#031' },
  TRIP_DIST              :  { index: 34, marker: '#034' },
  AH_CENTER_LINE         :  { index: 38, marker: '#038' },
  AH_CENTER_LINE_RIGHT   :  { index: 39, marker: '#039' },
  DIR_TO_HOME            :  { index: 96, marker: '#096' },
  DIRECTION              : { index: 114, marker: '#114' },
  AH_CENTER              : { index: 126, marker: '#126' },
  AH_BAR9_0              : { index: 128, marker: '#128' },
  KMH_3D                 : { index: 137, marker: '#137' },
  MPH_3D                 : { index: 138, marker: '#138' },
  RPM                    : { index: 139, marker: '#139' },
  AZIMUTH                : { index: 141, marker: '#141' },
  BATT                   : { index: 144, marker: '#144' },
  AIR                    : { index: 151, marker: '#151' },
  FT_S                   : { index: 153, marker: '#153' },
  AMP                    : { index: 154, marker: '#154' },
  ON_M                   : { index: 155, marker: '#155' },
  FLY_M                  : { index: 156, marker: '#156' },
  MAH_KM_0               : { index: 157, marker: '#157' },
  MAH_KM_1               : { index: 158, marker: '#158' },
  M_S                    : { index: 159, marker: '#159' },
  KMH                    : { index: 161, marker: '#161' },
  VARIO_UP_2A            : { index: 162, marker: '#162' },
  LAT                    : { index: 166, marker: '#166' },
  LON                    : { index: 167, marker: '#167' },
  DEGREES                : { index: 168, marker: '#168' },
  HEADING                : { index: 169, marker: '#169' },
  WH                     : { index: 171, marker: '#171' },
  WH_KM_0                : { index: 172, marker: '#172' },
  WH_KM_1                : { index: 173, marker: '#173' },
  WATT                   : { index: 174, marker: '#174' },
  SCALE                  : { index: 175, marker: '#175' },
  MPH                    : { index: 176, marker: '#176' },
  ALT_M                  : { index: 177, marker: '#177' },
  ALT_FT                 : { index: 179, marker: '#179' },
  DIST_KM                : { index: 182, marker: '#182' },
  DIST_MI                : { index: 184, marker: '#184' },
  M                      : { index: 185, marker: '#185' },
  MI                     : { index: 187, marker: '#187' },
  CLOCK                  : { index: 188, marker: '#188' },
  GPS_HDP1               : { index: 189, marker: '#189' },
  LAST_CHAR              : { index: 190, marker: '#190' },
  GPS_HDP2               : { index: 190, marker: '#190' },
  HOME                   : { index: 191, marker: '#191' },
  ZERO_HALF_TRAILING_DOT : { index: 192, marker: '#192' },
  ROLL_LEFT              : { index: 204, marker: '#204' },
  ROLL_LEVEL             : { index: 205, marker: '#205' },
  ROLL_RIGHT             : { index: 206, marker: '#206' },
  PITCH_UP               : { index: 207, marker: '#207' },
  ZERO_HALF_LEADING_DOT  : { index: 208, marker: '#208' },
  AH_AIRCRAFT0           : { index: 218, marker: '#218' },
  AH_AIRCRAFT1           : { index: 219, marker: '#219' },
  AH_AIRCRAFT2           : { index: 220, marker: '#220' },
  AH_AIRCRAFT3           : { index: 221, marker: '#221' },
  AH_AIRCRAFT4           : { index: 222, marker: '#222' },
  PITCH_DOWN             : { index: 223, marker: '#223' },
  GFORCE                 : { index: 230, marker: '#230' },
  GFORCE_X               : { index: 231, marker: '#231' },
  GFORCE_Y               : { index: 232, marker: '#232' },
  GFORCE_Z               : { index: 233, marker: '#233' },
  RSS2                   : { index: 234, marker: '#234' },
  DB                     : { index: 235, marker: '#235' },
  DBM                    : { index: 236, marker: '#236' },
  MW                     : { index: 237, marker: '#237' },
  SNR                    : { index: 238, marker: '#238' },
  GVAR_1                 : { index: 239, marker: '#239' },
  BARO_TEMP              : { index: 240, marker: '#240' },
  GVAR_2                 : { index: 240, marker: '#240' },
  IMU_TEMP               : { index: 241, marker: '#241' },
  GVAR_3                 : { index: 241, marker: '#241' },
  TEMP                   : { index: 242, marker: '#242' },
  GVAR_4                 : { index: 242, marker: '#242' },
  ESC_TEMPERATURE        : { index: 243, marker: '#243' },
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

export const OSD_ITEM = {
  [OSD_ELEMENT.RSSI_VALUE]: {
    name: 'RSSI (Signal Strength)',
    description: 'Shows the quality of the signal received from the RC radio (the higher the better).',
    format: ({ analog }) => {
      const value = Math.round(analog.rssi || 99).padLeftWith(' ', 2)
      return dot(`${OSD_SYMBOL.RSSI.marker}${value}`)
    },
  },
  [OSD_ELEMENT.MAIN_BATT_VOLTAGE]: {
    name: 'Battery Voltage',
    description: '',
    format: ({ analog, settings }) => {
      const value = (Math.round(analog.batteryVoltage * 100) / 100).padLeftWith(' ', 5)
      return dot(`${value}${OSD_SYMBOL.VOLT.marker}`)
    },
  },
  [OSD_ELEMENT.SAG_COMP_MAIN_BATT_VOLTAGE]: {
    name: 'Sag Compensated Battery Voltage',
    description: 'Calculated voltage the battery should be at without load (simulates ideal battery)',
    format: ({ analog }) => {
      const value = (Math.round(analog.batteryVoltage * 100) / 100).padLeftWith(' ', 5)
      return dot(`${value}${OSD_SYMBOL.VOLT.marker}`)
    },
  },
  [OSD_ELEMENT.MAIN_BATT_CELL_VOLTAGE]: {
    name: 'Battery Cell Voltage',
    description: 'Shows the average cell voltage from the main battery',
    format: ({ analog }) => dot(`${OSD_SYMBOL.BATT.marker}3.90${OSD_SYMBOL.VOLT.marker}`),
  },
  [OSD_ELEMENT.SAG_COMP_MAIN_BATT_CELL_VOLTAGE]: {
    name: 'Sag Compensated Battery Cell Voltage',
    description: 'Calculated average cell voltage the battery should be at without load (simulates ideal battery)',
    format: ({ analog }) => dot(`${OSD_SYMBOL.BATT.marker}4.18${OSD_SYMBOL.VOLT.marker}`),
  },
  [OSD_ELEMENT.POWER_SUPPLY_IMPEDANCE]: {
    name: 'Power supply impedance',
    description: '',
    format: ({ analog }) => dot(` 23${OSD_SYMBOL.MILLIOHM.marker}`),
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
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(`${OSD_SYMBOL.TRIP_DIST.marker}0.98${OSD_SYMBOL.DIST_MI.marker}`)
      } else {
        return dot(`${OSD_SYMBOL.TRIP_DIST.marker}1.73${OSD_SYMBOL.DIST_KM.marker}`)
      }
    },
  },
  [OSD_ELEMENT.THROTTLE_POSITION]: {
    name: 'Throttle position',
    description: '',
    format: ({ analog }) => dot(`${OSD_SYMBOL.THR.marker} 69`),
  },
  [OSD_ELEMENT.THROTTLE_POSITION_AUTO_THR]: {
    name: 'Throttle Position / Auto Throttle',
    description: 'Shows the throttle stick position in flight modes where it controls the throttle output. On navigation modes, it shows the actual throttle value applied to the motors.',
    format: ({ analog }) => dot(`${OSD_SYMBOL.THR.marker} 51 `),
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
    format: ({ analog }) => dot(`${OSD_SYMBOL.HEADING.marker}175${OSD_SYMBOL.DEGREES.marker}`),
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
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(`${OSD_SYMBOL.AIR.marker} 35${OSD_SYMBOL.MPH.marker}`)
      } else {
        return dot(`${OSD_SYMBOL.AIR.marker} 55${OSD_SYMBOL.KMH.marker}`)
      }
    },
  },
  [OSD_ELEMENT.RTC_TIME]: {
    name: 'Time of the Day',
    description: 'Shows the current time, as retrieved from the GPS or set via the radio.',
    format: ({ analog }) => dot(`${OSD_SYMBOL.CLOCK.marker}13:38`),
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
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(`${OSD_SYMBOL.IMU_TEMP.marker} 90${OSD_SYMBOL.TEMP_F.marker}`)
      } else {
        return dot(`${OSD_SYMBOL.IMU_TEMP.marker} 32${OSD_SYMBOL.TEMP_C.marker}`)
      }
    },
  },
  [OSD_ELEMENT.BARO_TEMPERATURE]: {
    name: 'Baro Temperature',
    description: 'Temperature of the barometer',
    format: ({ analog, settings }) => {
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(`${OSD_SYMBOL.IMU_TEMP.marker} 90${OSD_SYMBOL.TEMP_F.marker}`)
      } else {
        return dot(`${OSD_SYMBOL.IMU_TEMP.marker} 32${OSD_SYMBOL.TEMP_C.marker}`)
      }
    },
  },
  [OSD_ELEMENT.ESC_TEMPERATURE]: {
    name: 'ESC Temperature',
    description: 'Temperature of the ESC read from DSHOT telemetry',
    format: ({ analog, settings }) => {
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(`${OSD_SYMBOL.IMU_TEMP.marker} 98${OSD_SYMBOL.TEMP_F.marker}`)
      } else {
        return dot(`${OSD_SYMBOL.IMU_TEMP.marker} 37${OSD_SYMBOL.TEMP_C.marker}`)
      }
    },
  },
  [OSD_ELEMENT.SENSOR1_TEMPERATURE]: {
    name: 'Temperature sensor 1',
    description: '',
    format: ({ analog, settings }) => {
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(` 90${OSD_SYMBOL.TEMP_F.marker}`)
      } else {
        return dot(` 32${OSD_SYMBOL.TEMP_C.marker}`)
      }
    },
  },
  [OSD_ELEMENT.SENSOR2_TEMPERATURE]: {
    name: 'Temperature sensor 2',
    description: '',
    format: ({ analog, settings }) => {
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(` 90${OSD_SYMBOL.TEMP_F.marker}`)
      } else {
        return dot(` 32${OSD_SYMBOL.TEMP_C.marker}`)
      }
    },
  },
  [OSD_ELEMENT.SENSOR3_TEMPERATURE]: {
    name: 'Temperature sensor 3',
    description: '',
    format: ({ analog, settings }) => {
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(` 90${OSD_SYMBOL.TEMP_F.marker}`)
      } else {
        return dot(` 32${OSD_SYMBOL.TEMP_C.marker}`)
      }
    },
  },
  [OSD_ELEMENT.SENSOR4_TEMPERATURE]: {
    name: 'Temperature sensor 4',
    description: '',
    format: ({ analog, settings }) => {
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(` 90${OSD_SYMBOL.TEMP_F.marker}`)
      } else {
        return dot(` 32${OSD_SYMBOL.TEMP_C.marker}`)
      }
    },
  },
  [OSD_ELEMENT.SENSOR5_TEMPERATURE]: {
    name: 'Temperature sensor 5',
    description: '',
    format: ({ analog, settings }) => {
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(` 90${OSD_SYMBOL.TEMP_F.marker}`)
      } else {
        return dot(` 32${OSD_SYMBOL.TEMP_C.marker}`)
      }
    },
  },
  [OSD_ELEMENT.SENSOR6_TEMPERATURE]: {
    name: 'Temperature sensor 6',
    description: '',
    format: ({ analog, settings }) => {
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(` 90${OSD_SYMBOL.TEMP_F.marker}`)
      } else {
        return dot(` 32${OSD_SYMBOL.TEMP_C.marker}`)
      }
    },
  },
  [OSD_ELEMENT.SENSOR7_TEMPERATURE]: {
    name: 'Temperature sensor 7',
    description: '',
    format: ({ analog, settings }) => {
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(` 90${OSD_SYMBOL.TEMP_F.marker}`)
      } else {
        return dot(` 32${OSD_SYMBOL.TEMP_C.marker}`)
      }
    },
  },
  [OSD_ELEMENT.SENSOR8_TEMPERATURE]: {
    name: 'Temperature sensor 8',
    description: '',
    format: ({ analog, settings }) => {
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(` 90${OSD_SYMBOL.TEMP_F.marker}`)
      } else {
        return dot(` 32${OSD_SYMBOL.TEMP_C.marker}`)
      }
    },
  },
  [OSD_ELEMENT.ALTITUDE]: {
    name: 'Altitude',
    description: '',
    format: ({ analog, settings }) => {
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(`118${OSD_SYMBOL.ALT_FT.marker}`)
      } else {
        return dot(`399${OSD_SYMBOL.ALT_M.marker}`)
      }
    },
  },
  [OSD_ELEMENT.VARIO]: {
    name: '',
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
      if (settings?.units === UNIT.IMPERIAL || settings?.units === UNIT.UK) {
        return dot(`-1.6${OSD_SYMBOL.FT_S.marker}`)
      } else {
        return dot(`-0.5${OSD_SYMBOL.M_S.marker}`)
      }
    },
  },
  [OSD_ELEMENT.G_FORCE]: {
    name: 'g force',
    description: 'Shows the g force taking into account all axes',
    format: ({ analog }) => dot(`${OSD_SYMBOL.GFORCE.marker}1.00`),
  },
  [OSD_ELEMENT.G_FORCE_X]: {
    name: 'Longitudinal g force in body frame (X)',
    description: 'Shows the g force in the X axis (longitudinal)',
    format: ({ analog }) => dot(`${OSD_SYMBOL.GFORCE_X.marker}-0.10`),
  },
  [OSD_ELEMENT.G_FORCE_Y]: {
    name: 'Lateral g force in body frame (Y)',
    description: 'Shows the g force in the Y axis (lateral)Shows the g force in the Y axis (lateral)',
    format: ({ analog }) => dot(`${OSD_SYMBOL.GFORCE_Y.marker}-0.20`),
  },
  [OSD_ELEMENT.G_FORCE_Z]: {
    name: 'Vertical g force in body frame (Z)',
    description: 'Shows the g force in the Z axis (vertical)',
    format: ({ analog }) => dot(`${OSD_SYMBOL.GFORCE_Y.marker}-0.30`),
  },
  [OSD_ELEMENT.ONTIME_FLYTIME]: {
    name: 'On time / Fly time',
    description: 'Shows "On Time" while unarmed and "Fly Time" while armed.',
    format: ({ analog }) => dot(`${OSD_SYMBOL.FLY_M.marker}04:11`),
  },
  [OSD_ELEMENT.ONTIME]: {
    name: 'On time',
    description: '',
    format: ({ analog }) => dot(`${OSD_SYMBOL.FLY_M.marker}04:11`),
  },
  [OSD_ELEMENT.FLYTIME]: {
    name: 'Fly time',
    description: '',
    format: ({ analog }) => dot(`${OSD_SYMBOL.FLY_M.marker}04:11`),
  },
  [OSD_ELEMENT.CROSSHAIRS]: {
    name: 'Crosshair',
    description: '',
    position: { x: 13, y: 7 },
    format: ({ analog, settings }) => {
      switch (settings?.chrosshairStyle) {
        case 1:
          return '#403#404#405'
        case 2:
          return '#402#403#404'
        case 3:
          return '#406#407#408'
        case 4:
          return '#409#410#411'
        case 4:
          return '#412#413#414'
        case 5:
          return '#415#416#417'
        default:
          return '#400#401#402'
      }
    },
  },
  [OSD_ELEMENT.ARTIFICIAL_HORIZON]: {
    name: 'Artificial horizon',
    description: '',
    position: { x: 10, y: 7 },
    format: ({ analog }) => '#045#045#045   #045#045#045',
  },
  [OSD_ELEMENT.HORIZON_SIDEBARS]: {
    name: 'Horizon sidebars',
    description: '',
    position: { x: 7, y: 4 },
    format: ({ analog, settings }) => [
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
    format: ({ analog }) => dot(`${OSD_SYMBOL.PITCH_UP.marker} 1.5`),
  },
  [OSD_ELEMENT.ROLL_ANGLE]: {
    name: 'Roll angle',
    description: '',
    format: ({ analog }) => dot(`${OSD_SYMBOL.ROLL_LEFT.marker}31.4`),
  },
  // [OSD_ELEMENT.]: {
  //   name: '',
  //   description: '',
  //   format: ({ analog }) => '',
  // },
}

export function dot(str) {
  const zero = '0'.charCodeAt(0);
  const repl = str.replace(/\d\.\d/, match => {
    const c1 = match.charCodeAt(0) + OSD_SYMBOL.ZERO_HALF_TRAILING_DOT.index - zero
    const c2 = match.charCodeAt(2) + OSD_SYMBOL.ZERO_HALF_LEADING_DOT.index - zero
    return `#${c1.padLeftWith('0', 3)}#${c2.padLeftWith('0', 3)}`
  });
  return repl
}

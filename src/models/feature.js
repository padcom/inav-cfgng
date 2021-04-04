export const FEATURE_FLAG = {
  THR_VBAT_COMP          : 1 << 0,
  VBAT                   : 1 << 1,
  TX_PROF_SEL            : 1 << 2,  // Profile selection by TX stick command
  BAT_PROFILE_AUTOSWITCH : 1 << 3,
  MOTOR_STOP             : 1 << 4,
  UNUSED_1               : 1 << 5,  // was FEATURE_SERVO_TILT was FEATURE_DYNAMIC_FILTERS
  SOFTSERIAL             : 1 << 6,
  GPS                    : 1 << 7,
  UNUSED_3               : 1 << 8,  // was FEATURE_FAILSAFE
  UNUSED_4               : 1 << 9,  // was FEATURE_SONAR
  TELEMETRY              : 1 << 10,
  CURRENT_METER          : 1 << 11,
  REVERSIBLE_MOTORS      : 1 << 12,
  UNUSED_5               : 1 << 13, // RX_PARALLEL_PWM
  UNUSED_6               : 1 << 14, // RX_MSP
  RSSI_ADC               : 1 << 15,
  LED_STRIP              : 1 << 16,
  DASHBOARD              : 1 << 17,
  UNUSED_7               : 1 << 18, // Unused in INAV
  BLACKBOX               : 1 << 19,
  UNUSED_10              : 1 << 20, // was FEATURE_CHANNEL_FORWARDING
  TRANSPONDER            : 1 << 21,
  AIRMODE                : 1 << 22,
  SUPEREXPO_RATES        : 1 << 23,
  VTX                    : 1 << 24,
  UNUSED_8               : 1 << 25, // RX_SPI
  UNUSED_9               : 1 << 26, // SOFTSPI
  UNUSED_11              : 1 << 27, // FEATURE_PWM_SERVO_DRIVER
  PWM_OUTPUT_ENABLE      : 1 << 28,
  OSD                    : 1 << 29,
  FW_LAUNCH              : 1 << 30,
}

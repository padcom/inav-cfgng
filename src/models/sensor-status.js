export const SENSORS = {
  ACC        : 1 << 0,
  BARO       : 1 << 1,
  MAG        : 1 << 2,
  GPS        : 1 << 3,
  RANGEFINDER: 1 << 4,
  OPFLOW     : 1 << 5,
  PITOT      : 1 << 6,
  TEMP       : 1 << 7,

  HARDWARE   : 1 << 15,
}

export const SENSOR_STATUS = {
  NONE       : 0,    // Not selected
  OK         : 1,    // Selected, detected and healthy (ready to be used)
  UNAVAILABLE: 2,    // Selected in configuration but not detected
  UNHEALTHY  : 3,    // Selected, detected but is reported as not healthy
}

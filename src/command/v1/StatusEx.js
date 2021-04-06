import { Request } from '../Request'
import { Response } from '../Response'

export const MSP_STATUS_EX = 150

export class StatusExRequest extends Request {
  constructor() {
    super(MSP_STATUS_EX)
  }
}

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

export const ARMING = {
  ARMED                                           : 1 << 2,
  WAS_EVER_ARMED                                  : 1 << 3,
  ARMING_DISABLED_FAILSAFE_SYSTEM                 : 1 << 7,
  ARMING_DISABLED_NOT_LEVEL                       : 1 << 8,
  ARMING_DISABLED_SENSORS_CALIBRATING             : 1 << 9,
  ARMING_DISABLED_SYSTEM_OVERLOADED               : 1 << 10,
  ARMING_DISABLED_NAVIGATION_UNSAFE               : 1 << 11,
  ARMING_DISABLED_COMPASS_NOT_CALIBRATED          : 1 << 12,
  ARMING_DISABLED_ACCELEROMETER_NOT_CALIBRATED    : 1 << 13,
  ARMING_DISABLED_ARM_SWITCH                      : 1 << 14,
  ARMING_DISABLED_HARDWARE_FAILURE                : 1 << 15,
  ARMING_DISABLED_BOXFAILSAFE                     : 1 << 16,
  ARMING_DISABLED_BOXKILLSWITCH                   : 1 << 17,
  ARMING_DISABLED_RC_LINK                         : 1 << 18,
  ARMING_DISABLED_THROTTLE                        : 1 << 19,
  ARMING_DISABLED_CLI                             : 1 << 20,
  ARMING_DISABLED_CMS_MENU                        : 1 << 21,
  ARMING_DISABLED_OSD_MENU                        : 1 << 22,
  ARMING_DISABLED_ROLLPITCH_NOT_CENTERED          : 1 << 23,
  ARMING_DISABLED_SERVO_AUTOTRIM                  : 1 << 24,
  ARMING_DISABLED_OOM                             : 1 << 25,
  ARMING_DISABLED_INVALID_SETTING                 : 1 << 26,
  ARMING_DISABLED_PWM_OUTPUT_ERROR                : 1 << 27,
}

export class StatusExResponse extends Response {
  get cycleTime() {
    return this.getUint16(0, true)
  }

  get i2cError() {
    return this.getUint16(2, true)
  }

  get activeSensorsFlag() {
    return this.getUint16(4, true)
  }

  get activeSensors() {
    return {
      accelerometer: !!(this.activeSensorsFlag & SENSORS.ACC),
      barometer: !!(this.activeSensorsFlag & SENSORS.BARO),
      magnetometer: !!(this.activeSensorsFlag & SENSORS.MAG),
      gps: !!(this.activeSensorsFlag & SENSORS.GPS),
      rangeFinder: !!(this.activeSensorsFlag & SENSORS.RANGEFINDER),
      opticalFlow: !!(this.activeSensorsFlag & SENSORS.OPFLOW),
      pitotTube: !!(this.activeSensorsFlag & SENSORS.PITOT),
      temperatureSensor: !!(this.activeSensorsFlag & SENSORS.TEMP),
    }
  }

  get isHardwareReady() {
    return !!(this.activeSensorsFlag & SENSORS.HARDWARE)
  }

  get modes() {
    return this.getUint32(6, true)
  }

  get profile() {
    return this.getUint8(10)
  }

  get cpuLoad() {
    return this.getUint16(11, true)
  }

  get armingFlags() {
    return this.getUint16(13, true)
  }

  get arming() {
    return {
      armed: !!(this.armingFlags & ARMING.ARMED),
      wasEverArmed: !!(this.armingFlags & ARMING.WAS_EVER_ARMED),
      failsafeSystem: !!(this.armingFlags & ARMING.ARMING_DISABLED_FAILSAFE_SYSTEM),
      notLevel: !!(this.armingFlags & ARMING.ARMING_DISABLED_NOT_LEVEL),
      sensorsCalibrating: !!(this.armingFlags & ARMING.ARMING_DISABLED_SENSORS_CALIBRATING),
      systemOverloaded: !!(this.armingFlags & ARMING.ARMING_DISABLED_SYSTEM_OVERLOADED),
      navigationUnsafe: !!(this.armingFlags & ARMING.ARMING_DISABLED_NAVIGATION_UNSAFE),
      compassNotCalibrated: !!(this.armingFlags & ARMING.ARMING_DISABLED_COMPASS_NOT_CALIBRATED),
      accelerometerNotCalibrated: !!(this.armingFlags & ARMING.ARMING_DISABLED_ACCELEROMETER_NOT_CALIBRATED),
      armSwitch: !!(this.armingFlags & ARMING.ARMING_DISABLED_ARM_SWITCH),
      hardwareFailure: !!(this.armingFlags & ARMING.ARMING_DISABLED_HARDWARE_FAILURE),
      boxFailsafe: !!(this.armingFlags & ARMING.ARMING_DISABLED_BOXFAILSAFE),
      boxKillSwitch: !!(this.armingFlags & ARMING.ARMING_DISABLED_BOXKILLSWITCH),
      rcLink: !!(this.armingFlags & ARMING.ARMING_DISABLED_RC_LINK),
      throttle: !!(this.armingFlags & ARMING.ARMING_DISABLED_THROTTLE),
      cli: !!(this.armingFlags & ARMING.ARMING_DISABLED_CLI),
      cmsMenu: !!(this.armingFlags & ARMING.ARMING_DISABLED_CMS_MENU),
      osdMenu: !!(this.armingFlags & ARMING.ARMING_DISABLED_OSD_MENU),
      rollPitchNotCentered: !!(this.armingFlags & ARMING.ARMING_DISABLED_ROLLPITCH_NOT_CENTERED),
      servoAutotrim: !!(this.armingFlags & ARMING.ARMING_DISABLED_SERVO_AUTOTRIM),
      oom: !!(this.armingFlags & ARMING.ARMING_DISABLED_OOM),
      invalidSetting: !!(this.armingFlags & ARMING.ARMING_DISABLED_INVALID_SETTING),
      pwmOutputError: !!(this.armingFlags & ARMING.ARMING_DISABLED_PWM_OUTPUT_ERROR),
    }
  }
}

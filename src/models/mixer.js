import { PLATFORM_TYPE } from './platform'

export class MotorMixRule {
  constructor(throttle, roll, pitch, yaw) {
    this.throttle = throttle
    this.roll = roll
    this.pitch = pitch
    this.yaw = yaw
  }

  get isUsed() {
    return this.throttle != 0
  }

  clone() {
    return new MotorMixRule(this.throttle, this.roll, this.pitch, this.yaw)
  }
}

export class ServoMixRule {
  constructor(target, input, rate, speed, condition) {
    this.target = target
    this.input = input
    this.rate = rate
    this.speed = speed
    this.condition = condition
  }

  get isUsed() {
    return this.rate != 0
  }

  clone() {
    return new ServoMixRule(this.target, this.input, this.rate, this.speed, this.condition)
  }
}

export const SERVO = {
  GIMBAL_PITCH       : 0,
  GIMBAL_ROLL        : 1,
  ELEVATOR           : 2,
  FLAPPERON_1        : 3,
  FLAPPERON_2        : 4,
  RUDDER             : 5,
  BICOPTER_LEFT      : 4,
  BICOPTER_RIGHT     : 5,
  DUALCOPTER_LEFT    : 4,
  DUALCOPTER_RIGHT   : 5,
  SINGLECOPTER_1     : 3,
  SINGLECOPTER_2     : 4,
  SINGLECOPTER_3     : 5,
  SINGLECOPTER_4     : 6,
}

export const INPUT = {
  STABILIZED_ROLL    : 0,
  STABILIZED_PITCH   : 1,
  STABILIZED_YAW     : 2,
  STABILIZED_THROTTLE: 3,
  RC_ROLL            : 4,
  RC_PITCH           : 5,
  RC_YAW             : 6,
  RC_THROTTLE        : 7,
  RC_AUX1            : 8,
  RC_AUX2            : 9,
  RC_AUX3            : 10,
  RC_AUX4            : 11,
  GIMBAL_PITCH       : 12,
  GIMBAL_ROLL        : 13,
  FEATURE_FLAPS      : 14,
}

export const MIXER = [
  {
    id: 1,
    name: 'Tricopter',
    model: 'tricopter',
    image: 'tri',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.TRICOPTER,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 1.333333, 0.0),        // REAR
      new MotorMixRule(1.0, -1.0, -0.666667, 0.0),      // RIGHT
      new MotorMixRule(1.0, 1.0, -0.666667, 0.0),       // LEFT
    ],
    servoMixer: [
      new ServoMixRule(SERVO.RUDDER, INPUT.STABILIZED_YAW, 100, 0),
    ]
  },
  {
    id: 3,
    name: 'Quad X',
    model: 'quad_x',
    image: 'quad_x',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, -1.0, 1.0, -1.0),           // REAR_R
      new MotorMixRule(1.0, -1.0, -1.0, 1.0),           // FRONT_R
      new MotorMixRule(1.0, 1.0, 1.0, 1.0),             // REAR_L
      new MotorMixRule(1.0, 1.0, -1.0, -1.0),           // FRONT_L
    ],
    servoMixer: []
  },
  {
    id: 2,
    name: 'Quad +',
    model: 'quad_x',
    image: 'quad_p',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 1.0, -1.0),            // REAR
      new MotorMixRule(1.0, -1.0, 0.0, 1.0),            // RIGHT
      new MotorMixRule(1.0, 1.0, 0.0, 1.0),             // LEFT
      new MotorMixRule(1.0, 0.0, -1.0, -1.0),           // FRONT
    ],
    servoMixer: []
  },
  {
    id: 4,
    name: 'Bicopter',
    model: 'custom',
    image: 'bicopter',
    enabled: false,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [],
    servoMixer: []
  },
  {
    id: 5,
    name: 'Gimbal',
    model: 'custom',
    image: 'custom',
    enabled: false,
    legacy: true,
    platform: PLATFORM_TYPE.OTHER,
    motorMixer: [],
    servoMixer: []
  },
  {
    id: 6,
    name: 'Y6',
    model: 'y6',
    image: 'y6',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 1.333333, 1.0),        // REAR
      new MotorMixRule(1.0, -1.0, -0.666667, -1.0),     // RIGHT
      new MotorMixRule(1.0, 1.0, -0.666667, -1.0),      // LEFT
      new MotorMixRule(1.0, 0.0, 1.333333, -1.0),       // UNDER_REAR
      new MotorMixRule(1.0, -1.0, -0.666667, 1.0),      // UNDER_RIGHT
      new MotorMixRule(1.0, 1.0, -0.666667, 1.0),       // UNDER_LEFT
    ],
    servoMixer: []
  },
  {
    id: 7,
    name: 'Hex +',
    model: 'hex_plus',
    image: 'hex_p',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, -0.866025, 0.5, 1.0),       // REAR_R
      new MotorMixRule(1.0, -0.866025, -0.5, -1.0),     // FRONT_R
      new MotorMixRule(1.0, 0.866025, 0.5, 1.0),        // REAR_L
      new MotorMixRule(1.0, 0.866025, -0.5, -1.0),      // FRONT_L
      new MotorMixRule(1.0, 0.0, -1.0, 1.0),            // FRONT
      new MotorMixRule(1.0, 0.0, 1.0, -1.0),            // REAR
    ],
    servoMixer: []
  },
  {
    id: 8,
    name: 'Flying Wing',
    model: 'custom',
    image: 'flying_wing',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.AIRPLANE,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),
    ],
    servoMixer: [
      new ServoMixRule(SERVO.FLAPPERON_1, INPUT.STABILIZED_ROLL,  50, 0),
      new ServoMixRule(SERVO.FLAPPERON_1, INPUT.STABILIZED_PITCH, 50, 0),
      new ServoMixRule(SERVO.FLAPPERON_2, INPUT.STABILIZED_ROLL, -50, 0),
      new ServoMixRule(SERVO.FLAPPERON_2, INPUT.STABILIZED_PITCH, 50, 0),
    ]
  },
  {
    id: 27,
    name: 'Flying Wing with differential thrust',
    model: 'custom',
    image: 'flying_wing',
    enabled: true,
    legacy: false,
    platform: PLATFORM_TYPE.AIRPLANE,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 0.0, 0.1),
      new MotorMixRule(1.0, 0.0, 0.0, -0.1)
    ],
    servoMixer: [
      new ServoMixRule(SERVO.FLAPPERON_1, INPUT.STABILIZED_ROLL,  50, 0),
      new ServoMixRule(SERVO.FLAPPERON_1, INPUT.STABILIZED_PITCH, 50, 0),
      new ServoMixRule(SERVO.FLAPPERON_2, INPUT.STABILIZED_ROLL, -50, 0),
      new ServoMixRule(SERVO.FLAPPERON_2, INPUT.STABILIZED_PITCH, 50, 0),
    ]
  },
  {
    id: 9,
    name: 'Y4',
    model: 'y4',
    image: 'y4',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 1.0, -1.0),            // REAR_TOP CW
      new MotorMixRule(1.0, -1.0, -1.0, 0.0),           // FRONT_R CCW
      new MotorMixRule(1.0, 0.0, 1.0, 1.0),             // REAR_BOTTOM CCW
      new MotorMixRule(1.0, 1.0, -1.0, 0.0),            // FRONT_L CW
    ],
    servoMixer: []
  },
  {
    id: 10,
    name: 'Hex X',
    model: 'hex_x',
    image: 'hex_x',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, -0.5, 0.866025, 1.0),       // REAR_R
      new MotorMixRule(1.0, -0.5, -0.866025, 1.0),      // FRONT_R
      new MotorMixRule(1.0, 0.5, 0.866025, -1.0),       // REAR_L
      new MotorMixRule(1.0, 0.5, -0.866025, -1.0),      // FRONT_L
      new MotorMixRule(1.0, -1.0, 0.0, -1.0),           // RIGHT
      new MotorMixRule(1.0, 1.0, 0.0, 1.0),             // LEFT
    ],
    servoMixer: []
  },
  {
    id: 11,
    name: 'Octo X8',
    model: 'custom',
    image: 'octo_x8',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, -1.0, 1.0, -1.0),           // REAR_R
      new MotorMixRule(1.0, -1.0, -1.0, 1.0),           // FRONT_R
      new MotorMixRule(1.0, 1.0, 1.0, 1.0),             // REAR_L
      new MotorMixRule(1.0, 1.0, -1.0, -1.0),           // FRONT_L
      new MotorMixRule(1.0, -1.0, 1.0, 1.0),            // UNDER_REAR_R
      new MotorMixRule(1.0, -1.0, -1.0, -1.0),          // UNDER_FRONT_R
      new MotorMixRule(1.0, 1.0, 1.0, -1.0),            // UNDER_REAR_L
      new MotorMixRule(1.0, 1.0, -1.0, 1.0),            // UNDER_FRONT_L
    ],
    servoMixer: []
  },
  {
    id: 12,
    name: 'Octo Flat +',
    model: 'custom',
    image: 'octo_flat_p',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, 0.707107, -0.707107, 1.0),  // FRONT_L
      new MotorMixRule(1.0, -0.707107, -0.707107, 1.0), // FRONT_R
      new MotorMixRule(1.0, -0.707107, 0.707107, 1.0),  // REAR_R
      new MotorMixRule(1.0, 0.707107, 0.707107, 1.0),   // REAR_L
      new MotorMixRule(1.0, 0.0, -1.0, -1.0),           // FRONT
      new MotorMixRule(1.0, -1.0, 0.0, -1.0),           // RIGHT
      new MotorMixRule(1.0, 0.0, 1.0, -1.0),            // REAR
      new MotorMixRule(1.0, 1.0, 0.0, -1.0),            // LEFT
    ],
    servoMixer: []
  },
  {
    id: 13,
    name: 'Octo Flat X',
    model: 'custom',
    image: 'octo_flat_x',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, 1.0, -0.414178, 1.0),       // MIDFRONT_L
      new MotorMixRule(1.0, -0.414178, -1.0, 1.0),      // FRONT_R
      new MotorMixRule(1.0, -1.0, 0.414178, 1.0),       // MIDREAR_R
      new MotorMixRule(1.0, 0.414178, 1.0, 1.0),        // REAR_L
      new MotorMixRule(1.0, 0.414178, -1.0, -1.0),      // FRONT_L
      new MotorMixRule(1.0, -1.0, -0.414178, -1.0),     // MIDFRONT_R
      new MotorMixRule(1.0, -0.414178, 1.0, -1.0),      // REAR_R
      new MotorMixRule(1.0, 1.0, 0.414178, -1.0),       // MIDREAR_L
    ],
    servoMixer: []
  },
  {
    id: 14,
    name: 'Airplane',
    model: 'custom',
    image: 'airplane',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.AIRPLANE,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),
    ],
    servoMixer: [
      new ServoMixRule(SERVO.ELEVATOR,    INPUT.STABILIZED_PITCH, 100, 0),
      new ServoMixRule(SERVO.FLAPPERON_1, INPUT.STABILIZED_ROLL,  100, 0),
      new ServoMixRule(SERVO.FLAPPERON_1, INPUT.FEATURE_FLAPS,    100, 0),
      new ServoMixRule(SERVO.FLAPPERON_2, INPUT.STABILIZED_ROLL,  100, 0),
      new ServoMixRule(SERVO.FLAPPERON_2, INPUT.FEATURE_FLAPS,   -100, 0),
      new ServoMixRule(SERVO.RUDDER,      INPUT.STABILIZED_YAW,   100, 0),
    ]
  },
  {
    id: 15,
    name: 'Heli 120',
    model: 'custom',
    image: 'custom',
    enabled: false,
    legacy: true,
    platform: PLATFORM_TYPE.HELICOPTER,
    motorMixer: [],
    servoMixer: []
  },
  {
    id: 16,
    name: 'Heli 90',
    model: 'custom',
    image: 'custom',
    enabled: false,
    legacy: true,
    platform: PLATFORM_TYPE.HELICOPTER,
    motorMixer: [],
    servoMixer: []
  },
  {
    id: 17,
    name: 'V-tail Quad',
    model: 'quad_vtail',
    image: 'vtail_quad',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, -0.58, 0.58, 1.0),          // REAR_R
      new MotorMixRule(1.0, -0.46, -0.39, -0.5),        // FRONT_R
      new MotorMixRule(1.0, 0.58, 0.58, -1.0),          // REAR_L
      new MotorMixRule(1.0, 0.46, -0.39, 0.5),          // FRONT_L
    ],
    servoMixer: []
  },
  {
    id: 18,
    name: 'Hex H',
    model: 'custom',
    image: 'custom',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, -1.0, 1.0, -1.0),           // REAR_R
      new MotorMixRule(1.0, -1.0, -1.0, 1.0),           // FRONT_R
      new MotorMixRule(1.0, 1.0, 1.0, 1.0),             // REAR_L
      new MotorMixRule(1.0, 1.0, -1.0, -1.0),           // FRONT_L
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),             // RIGHT
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),             // LEFT
    ],
    servoMixer: []
  },
  {
    id: 19,
    name: 'PPM to SERVO',
    model: 'custom',
    image: 'custom',
    enabled: false,
    legacy: true,
    platform: PLATFORM_TYPE.OTHER,
    motorMixer: [],
    servoMixer: []
  },
  {
    id: 20,
    name: 'Dualcopter',
    model: 'custom',
    image: 'custom',
    enabled: false,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [],
    servoMixer: []
  },
  {
    id: 21,
    name: 'Singlecopter',
    model: 'custom',
    image: 'custom',
    enabled: false,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [],
    servoMixer: []
  },
  {
    id: 22,
    name: 'A-tail Quad',
    model: 'quad_atail',
    image: 'atail_quad',
    enabled: true,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 1.0, 1.0),             // REAR_R
      new MotorMixRule(1.0, -1.0, -1.0, 0.0),           // FRONT_R
      new MotorMixRule(1.0, 0.0, 1.0, -1.0),            // REAR_L
      new MotorMixRule(1.0, 1.0, -1.0, -0.0),           // FRONT_L
    ],
    servoMixer: []
  },
  {
    id: 23,
    name: 'Custom',
    model: 'custom',
    image: 'custom',
    enabled: false,
    legacy: true,
    platform: PLATFORM_TYPE.MULTIROTOR,
    motorMixer: [],
    servoMixer: []
  },
  {
    id: 24,
    name: 'Custom Airplane',
    model: 'custom',
    image: 'custom',
    enabled: false,
    legacy: true,
    platform: PLATFORM_TYPE.AIRPLANE,
    motorMixer: [],
    servoMixer: []
  },
  {
    id: 25,
    name: 'Custom Tricopter',
    model: 'custom',
    image: 'custom',
    enabled: false,
    legacy: true,
    platform: PLATFORM_TYPE.TRICOPTER,
    motorMixer: [],
    servoMixer: []
  },
  {
    id: 26,
    name: 'Airplane with differential thrust',
    model: 'custom',
    image: 'airplane',
    enabled: true,
    legacy: false,
    platform: PLATFORM_TYPE.AIRPLANE,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 0.0, 0.3),
      new MotorMixRule(1.0, 0.0, 0.0, -0.3)
    ],
    servoMixer: [
      new ServoMixRule(SERVO.ELEVATOR,    INPUT.STABILIZED_PITCH, 100, 0),
      new ServoMixRule(SERVO.FLAPPERON_1, INPUT.STABILIZED_ROLL,  100, 0),
      new ServoMixRule(SERVO.FLAPPERON_1, INPUT.FEATURE_FLAPS,    100, 0),
      new ServoMixRule(SERVO.FLAPPERON_2, INPUT.STABILIZED_ROLL,  100, 0),
      new ServoMixRule(SERVO.FLAPPERON_2, INPUT.FEATURE_FLAPS,   -100, 0),
      new ServoMixRule(SERVO.RUDDER,      INPUT.STABILIZED_YAW,   100, 0),
    ]
  },
  {
    id: 28,
    name: 'Airplane V-tail (individual aileron servos)',
    model: 'custom',
    image: 'airplane_vtail',
    enabled: true,
    legacy: false,
    platform: PLATFORM_TYPE.AIRPLANE,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),
    ],
    servoMixer: [
      new ServoMixRule(2, INPUT.STABILIZED_ROLL,  100, 0),
      new ServoMixRule(3, INPUT.STABILIZED_ROLL,  100, 0),
      new ServoMixRule(4, INPUT.STABILIZED_PITCH, 50, 0),
      new ServoMixRule(4, INPUT.STABILIZED_YAW,   -50, 0),
      new ServoMixRule(5, INPUT.STABILIZED_PITCH, -50, 0),
      new ServoMixRule(5, INPUT.STABILIZED_YAW,   -50, 0)
    ]
  },
  {
    id: 29,
    name: 'Airplane V-tail (single aileron servo)',
    model: 'custom',
    image: 'airplane_vtail_single',
    enabled: true,
    legacy: false,
    platform: PLATFORM_TYPE.AIRPLANE,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),
    ],
    servoMixer: [
      new ServoMixRule(2, INPUT.STABILIZED_ROLL,  100, 0),
      new ServoMixRule(3, INPUT.STABILIZED_PITCH, 50, 0),
      new ServoMixRule(3, INPUT.STABILIZED_YAW,   -50, 0),
      new ServoMixRule(4, INPUT.STABILIZED_PITCH, -50, 0),
      new ServoMixRule(4, INPUT.STABILIZED_YAW,   -50, 0),
    ]
  },
  {
    id: 30,
    name: 'Airplane without rudder',
    model: 'custom',
    image: 'airplane_norudder',
    enabled: true,
    legacy: false,
    platform: PLATFORM_TYPE.AIRPLANE,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),
    ],
    servoMixer: [
      new ServoMixRule(SERVO.ELEVATOR,    INPUT.STABILIZED_PITCH, 100, 0),
      new ServoMixRule(SERVO.FLAPPERON_1, INPUT.STABILIZED_ROLL,  100, 0),
      new ServoMixRule(SERVO.FLAPPERON_2, INPUT.STABILIZED_ROLL,  100, 0),
    ]
  },
  {
    id: 31,
    name: 'Rover',
    model: 'custom',
    image: 'custom',
    enabled: true,
    legacy: false,
    platform: PLATFORM_TYPE.ROVER,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),
    ],
    servoMixer: [
      new ServoMixRule(3, INPUT.STABILIZED_YAW,  100, 0),
    ]
  },
  {
    id: 32,
    name: 'Boat',
    model: 'custom',
    image: 'custom',
    enabled: true,
    legacy: false,
    platform: PLATFORM_TYPE.BOAT,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),
    ],
    servoMixer: [
      new ServoMixRule(3, INPUT.STABILIZED_YAW,  100, 0),
    ]
  },
  {
    id: 33,
    name: 'Other',
    model: 'custom',
    image: 'custom',
    enabled: true,
    legacy: false,
    platform: PLATFORM_TYPE.OTHER,
    motorMixer: [
      new MotorMixRule(1.0, 0.0, 0.0, 0.0),
    ],
    servoMixer: [
      new ServoMixRule(3, INPUT.STABILIZED_YAW,  100, 0),
    ]
  }                 
]

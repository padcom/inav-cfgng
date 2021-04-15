export const PLATFORM_TYPE = {
  MULTIROTOR: 0,
  AIRPLANE  : 1,
  HELICOPTER: 2,
  TRICOPTER : 3,
  ROVER     : 4,
  BOAT      : 5,
  OTHER     : 6,
}

export const PLATFORM = {
  [PLATFORM_TYPE.MULTIROTOR]: {
    name: 'Multirotor',
    enabled: true,
    flapsPossible: false,
    isMultirotor: true,
  },
  [PLATFORM_TYPE.AIRPLANE]: {
    name: 'Airplane',
    enabled: true,
    flapsPossible: true,
  },
  [PLATFORM_TYPE.HELICOPTER]: {
    name: 'Helicopter',
    enabled: false,
    flapsPossible: false,
    isMultirotor: false,
  },
  [PLATFORM_TYPE.TRICOPTER]: {
    name: 'Tricopter',
    enabled: true,
    flapsPossible: false,
    isMultirotor: true,
  },
  [PLATFORM_TYPE.ROVER]: {
    name: 'Rover',
    enabled: true,
    flapsPossible: false,
    isMultirotor: false,
  },
  [PLATFORM_TYPE.BOAT]: {
    name: 'Boat',
    enabled: true,
    flapsPossible: false,
    isMultirotor: false,
  },
  [PLATFORM_TYPE.OTHER]: {
    name: 'Other',
    enabled: true,
    flapsPossible: false,
    isMultirotor: false,
  }
}

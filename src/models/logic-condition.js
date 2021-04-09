export const LOGIC_CONDITION_COUNT = 32

export const OPERATION = {
  0: { name: 'True', hasOperand: [false, false], output: 'boolean' },
  1: { name: 'Equal', hasOperand: [true, true], output: 'boolean' },
  2: { name: 'Greater Than', hasOperand: [true, true], output: 'boolean' },
  3: { name: 'Lower Than', hasOperand: [true, true], output: 'boolean' },
  4: { name: 'Low', hasOperand: [true, false], output: 'boolean' },
  5: { name: 'Mid', hasOperand: [true, false], output: 'boolean' },
  6: { name: 'High', hasOperand: [true, false], output: 'boolean' },
  7: { name: 'AND', hasOperand: [true, true], output: 'boolean' },
  8: { name: 'OR', hasOperand: [true, true], output: 'boolean' },
  9: { name: 'XOR', hasOperand: [true, true], output: 'boolean' },
  10: { name: 'NAND', hasOperand: [true, true], output: 'boolean' },
  11: { name: 'NOR', hasOperand: [true, true], output: 'boolean' },
  12: { name: 'NOT', hasOperand: [true, false], output: 'boolean' },
  13: { name: 'STICKY', hasOperand: [true, true], output: 'boolean' },
  14: { name: 'ADD', hasOperand: [true, true], output: 'raw' },
  15: { name: 'SUB', hasOperand: [true, true], output: 'raw' },
  16: { name: 'MUL', hasOperand: [true, true], output: 'raw' },
  17: { name: 'DIV', hasOperand: [true, true], output: 'raw' },
  18: { name: 'GVAR SET', hasOperand: [true, true], output: 'none' },
  19: { name: 'GVAR INC', hasOperand: [true, true], output: 'none' },
  20: { name: 'GVAR DEC', hasOperand: [true, true], output: 'none' },
  21: { name: 'IO PORT SET', hasOperand: [true, true], output: 'none' },
  22: { name: 'OVERRIDE ARMING SAFETY', hasOperand: [false, false], output: 'boolean' },
  23: { name: 'OVERRIDE THROTTLE SCALE', hasOperand: [true, false], output: 'boolean' },
  29: { name: 'OVERRIDE THROTTLE', hasOperand: [true, false], output: 'boolean' },
  24: { name: 'SWAP ROLL & YAW', hasOperand: [false, false], output: 'boolean' },
  25: { name: 'SET VTX POWER LEVEL', hasOperand: [true, false], output: 'boolean' },
  30: { name: 'SET VTX BAND', hasOperand: [true, false], output: 'boolean' },
  31: { name: 'SET VTX CHANNEL', hasOperand: [true, false], output: 'boolean' },
  26: { name: 'INVERT ROLL', hasOperand: [false, false], output: 'boolean' },
  27: { name: 'INVERT PITCH', hasOperand: [false, false], output: 'boolean' },
  28: { name: 'INVERT YAW', hasOperand: [false, false], output: 'boolean' },
  32: { name: 'SET OSD LAYOUT', hasOperand: [true, false], output: 'boolean' },
  33: { name: 'SIN', hasOperand: [true, true], output: 'raw' },
  34: { name: 'COS', hasOperand: [true, true], output: 'raw' },
  35: { name: 'TAN', hasOperand: [true, true], output: 'raw' },
  36: { name: 'MAP INPUT', hasOperand: [true, true], output: 'raw' },
  37: { name: 'MAP OUTPUT', hasOperand: [true, true], output: 'raw' }
}

export const OPERAND_TYPE = {
  0: {
    name: 'Value',
    type: 'value',
    min: -1000000,
    max: 1000000,
    step: 1,
    default: 0
  },
  1: {
    name: 'RC Channel',
    type: 'range',
    range: [1, 16],
    default: 1
  },
  2: {
    name: 'Flight',
    type: 'dictionary',
    default: 0,
    values: {
      0: 'ARM timer [s]',
      1: 'Home distance [m]',
      2: 'Trip distance [m]',
      3: 'RSSI',
      4: 'Vbat [deci-Volt] [1V = 10]',
      5: 'Cell voltage [deci-Volt] [1V = 10]',
      6: 'Current [centi-Amp] [1A = 100]',
      7: 'Current drawn [mAh]',
      8: 'GPS Sats',
      9: 'Ground speed [cm/s]',
      10: '3D speed [cm/s]',
      11: 'Air speed [cm/s]',
      12: 'Altitude [cm]',
      13: 'Vertical speed [cm/s]',
      14: 'Throttle position [%]',
      15: 'Roll [deg]',
      16: 'Pitch [deg]',
      17: 'Is Armed',
      18: 'Is Autolaunch',
      19: 'Is Controlling Altitude',
      20: 'Is Controlling Position',
      21: 'Is Emergency Landing',
      22: 'Is RTH',
      23: 'Is WP',
      24: 'Is Landing',
      25: 'Is Failsafe',
      26: 'Stabilized Roll',
      27: 'Stabilized Pitch',
      28: 'Stabilized Yaw',
      29: 'Current Waypoint Index',
      30: 'Current Waypoint Action',
      31: '3D home distance [m]',
      32: 'CRSF LQ',
      33: 'CRSF SNR',
    }
  },
  3: {
    name: 'Flight Mode',
    type: 'dictionary',
    default: 0,
    values: {
      0: 'Failsafe',
      1: 'Manual',
      2: 'RTH',
      3: 'Position Hold',
      4: 'Cruise',
      5: 'Altitude Hold',
      6: 'Angle',
      7: 'Horizon',
      8: 'Air',
      9: 'USER 1',
      10: 'USER 2'
    }
  },
  4: {
    name: 'Logic Condition',
    type: 'range',
    range: [0, 15],
    default: 0
  },
  5: {
    name: 'Global Variable',
    type: 'range',
    range: [0, 7],
    default: 0
  }
}
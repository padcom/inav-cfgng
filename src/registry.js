import { Registry } from './command/Registry'
import * as Ident from './command/v1/Ident'
import * as Version from './command/v1/Version'
import * as FcVersion from './command/v1/FcVersion'
import * as FcVariant from './command/v1/FcVariant'
import * as BuildInfo from './command/v1/BuildInfo'
import * as BoardInfo from './command/v1/BoardInfo'
import * as Uid from './command/v1/Uid'
import * as StatusEx from './command/v1/StatusEx'
import * as SensorConfig from './command/v1/SensorConfig'
import * as SensorStatus from './command/v1/SensorStatus'
import * as EepromWrite from './command/v1/EepromWrite'
import * as Feature from './command/v1/Feature'
import * as FeatureSet from './command/v1/SetFeature'
import * as Analog from './command/v1/Analog'
import * as Rc from './command/v1/Rc'
import * as RxMap from './command/v1/RxMap'
import * as SetRxMap from './command/v1/SetRxMap'
import * as BoxNames from './command/v1/BoxNames'
import * as BoxIDs from './command/v1/BoxIDs'
import * as ActiveBoxes from './command/v1/ActiveBoxes'
import * as ModeRanges from './command/v1/ModeRanges'
import * as SetModeRange from './command/v1/SetModeRange'
import * as AdjustmentRanges from './command/v1/AdjustmentRanges'
import * as SetAdjustmentRange from './command/v1/SetAdjustmentRange'
import * as OsdCharWrite from './command/v1/OsdCharWrite'
import * as ServoConfigurations from './command/v1/ServoConfigurations'

import * as CommonSerialConfig from './command/v2/CommonSerialConfig'
import * as CommonSetSerialConfig from './command/v2/CommonSetSerialConfig'
import * as CommonSettingInfo from './command/v2/CommonSettingInfo'
import * as CommonSetting from './command/v2/CommonSetting'
import * as CommonSetSetting from './command/v2/CommonSetSetting'
import * as LogicConditions from './command/v2/LogicConditions'
import * as SetLogicConditions from './command/v2/SetLogicConditions'
import * as GvarStatus from './command/v2/GvarStatus'
import * as LogicConditionsStatus from './command/v2/LogicConditionsStatus'
import * as AnalogV2 from './command/v2/Analog'
import * as InavOsdLayouts from './command/v2/InavOsdLayouts'
import * as InavOsdSetLayoutItem from './command/v2/InavOsdSetLayoutItem'
import * as InavMixer from './command/v2/InavMixer'
import * as InavSetMixer from './command/v2/InavSetMixer'
import * as CommonMotorMixer from './command/v2/CommonMotorMixer'
import * as CommonSetMotorMixer from './command/v2/CommonSetMotorMixer'
import * as InavServoMixer from './command/v2/InavServoMixer'
import * as InavSetServoMixer from './command/v2/InavSetServoMixer'
import * as InavOutputMapping from './command/v2/InavOutputMapping'


export const registry = new Registry()

registry.registerMSPv1Command(Version)
registry.registerMSPv1Command(Ident)
registry.registerMSPv1Command(FcVersion)
registry.registerMSPv1Command(FcVariant)
registry.registerMSPv1Command(BuildInfo)
registry.registerMSPv1Command(BoardInfo)
registry.registerMSPv1Command(Uid)
registry.registerMSPv1Command(StatusEx)
registry.registerMSPv1Command(SensorConfig)
registry.registerMSPv1Command(SensorStatus)
registry.registerMSPv1Command(EepromWrite)
registry.registerMSPv1Command(Feature)
registry.registerMSPv1Command(FeatureSet)
registry.registerMSPv1Command(Analog)
registry.registerMSPv1Command(Rc)
registry.registerMSPv1Command(RxMap)
registry.registerMSPv1Command(SetRxMap)
registry.registerMSPv1Command(BoxNames)
registry.registerMSPv1Command(BoxIDs)
registry.registerMSPv1Command(ActiveBoxes)
registry.registerMSPv1Command(ModeRanges)
registry.registerMSPv1Command(SetModeRange)
registry.registerMSPv1Command(AdjustmentRanges)
registry.registerMSPv1Command(SetAdjustmentRange)
registry.registerMSPv1Command(OsdCharWrite)
registry.registerMSPv1Command(ServoConfigurations)

registry.registerMSPv2Command(CommonSerialConfig)
registry.registerMSPv2Command(CommonSetSerialConfig)
registry.registerMSPv2Command(CommonSettingInfo)
registry.registerMSPv2Command(CommonSetting)
registry.registerMSPv2Command(CommonSetSetting)
registry.registerMSPv2Command(LogicConditions)
registry.registerMSPv2Command(SetLogicConditions)
registry.registerMSPv2Command(GvarStatus)
registry.registerMSPv2Command(LogicConditionsStatus)
registry.registerMSPv2Command(AnalogV2)
registry.registerMSPv2Command(InavOsdLayouts)
registry.registerMSPv2Command(InavOsdSetLayoutItem)
registry.registerMSPv2Command(InavMixer)
registry.registerMSPv2Command(InavSetMixer)
registry.registerMSPv2Command(CommonMotorMixer)
registry.registerMSPv2Command(CommonSetMotorMixer)
registry.registerMSPv2Command(InavServoMixer)
registry.registerMSPv2Command(InavSetServoMixer)
registry.registerMSPv2Command(InavOutputMapping)

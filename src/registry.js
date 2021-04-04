import { Registry } from './command/Registry'
import * as Ident from './command/v1/Ident'
import * as Version from './command/v1/Version'
import * as FcVersion from './command/v1/FcVersion'
import * as FcVariant from './command/v1/FcVariant'
import * as BuildInfo from './command/v1/BuildInfo'
import * as BoardInfo from './command/v1/BoardInfo'
import * as Uid from './command/v1/Uid'
import * as StatusEx from './command/v1/StatusEx'
import * as EepromWrite from './command/v1/EepromWrite'
import * as Feature from './command/v1/Feature'
import * as FeatureSet from './command/v1/SetFeature'
import * as Analog from './command/v1/Analog'

import * as CommonSerialConfig from './command/v2/CommonSerialConfig'
import * as CommonSetSerialConfig from './command/v2/CommonSetSerialConfig'
import * as CommonSettingInfo from './command/v2/CommonSettingInfo'
import * as CommonSetting from './command/v2/CommonSetting'
import * as CommonSetSetting from './command/v2/CommonSetSetting'


export const registry = new Registry()

registry.registerMSPv1Command(Version)
registry.registerMSPv1Command(Ident)
registry.registerMSPv1Command(FcVersion)
registry.registerMSPv1Command(FcVariant)
registry.registerMSPv1Command(BuildInfo)
registry.registerMSPv1Command(BoardInfo)
registry.registerMSPv1Command(Uid)
registry.registerMSPv1Command(StatusEx)
registry.registerMSPv1Command(EepromWrite)
registry.registerMSPv1Command(Feature)
registry.registerMSPv1Command(FeatureSet)
registry.registerMSPv1Command(Analog)

registry.registerMSPv2Command(CommonSerialConfig)
registry.registerMSPv2Command(CommonSetSerialConfig)
registry.registerMSPv2Command(CommonSettingInfo)
registry.registerMSPv2Command(CommonSetting)
registry.registerMSPv2Command(CommonSetSetting)

import { Registry } from './command/Registry'
import * as Ident from './command/v1/Ident'
import * as Version from './command/v1/Version'
import * as FcVersion from './command/v1/FcVersion'
import * as FcVariant from './command/v1/FcVariant'
import * as BuildInfo from './command/v1/BuildInfo'
import * as BoardInfo from './command/v1/BoardInfo'
import * as Uid from './command/v1/Uid'

export const registry = new Registry()

registry.registerMPSv1Command(Version)
registry.registerMPSv1Command(Ident)
registry.registerMPSv1Command(FcVersion)
registry.registerMPSv1Command(FcVariant)
registry.registerMPSv1Command(BuildInfo)
registry.registerMPSv1Command(BoardInfo)
registry.registerMPSv1Command(Uid)

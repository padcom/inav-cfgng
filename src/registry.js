import { Registry } from './command/Registry'
import * as Ident from './command/v1/Ident'
import * as Version from './command/v1/Version'
import * as FcVersion from './command/v1/FcVersion'
import * as FcVariant from './command/v1/FcVariant'
import * as BuildInfo from './command/v1/BuildInfo'
import * as BoardInfo from './command/v1/BoardInfo'
import * as Uid from './command/v1/Uid'

export const registry = new Registry()

registry.register('MSP_API_VERSION', Version.MSP_API_VERSION, Version.VersionRequest, Version.VersionResponse)
registry.register('MSP_IDENT', Ident.MSP_IDENT, Ident.IdentRequest, Ident.IdentResponse)
registry.register('MSP_FC_VERSION', FcVersion.MSP_FC_VERSION, FcVersion.FcVersionRequest, FcVersion.FcVersionResponse)
registry.register('MSP_FC_VARIANT', FcVariant.MSP_FC_VARIANT, FcVariant.FcVariantRequest, FcVariant.FcVariantResponse)
registry.register('MSP_BUILD_INFO', BuildInfo.MSP_BUILD_INFO, BuildInfo.BuildInfoRequest, BuildInfo.BuildInfoResponse)
registry.register('MSP_BOARD_INFO', BoardInfo.MSP_BOARD_INFO, BoardInfo.BoardInfoRequest, BoardInfo.BoardInfoResponse)
registry.register('MSP_UID', Uid.MSP_UID, Uid.UidRequest, Uid.UidResponse)

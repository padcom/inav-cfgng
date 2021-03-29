import { Registry } from './command/Registry'
import * as Ident from './command/v1/Ident'
import * as Version from './command/v1/Version'

export const registry = new Registry()

registry.register('MSP_API_VERSION', Version.MSP_API_VERSION, Version.VersionRequest, Version.VersionResponse)
registry.register('MSP_IDENT', Ident.MSP_IDENT, Ident.IdentRequest, Ident.IdentResponse)

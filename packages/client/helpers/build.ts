import type { BuildOptions } from 'esbuild'
import { build } from '../../../helpers/compile/build'
import { fillPlugin } from '../../../helpers/compile/fillPlugin'

const external = ['_http_common', 'spdx-license-ids', 'spdx-exceptions']

// we define the config for generator
const generatorBuildConfig: BuildOptions = {
  entryPoints: ['src/generation/generator.ts'],
  outfile: 'generator-build/index',
  bundle: true,
  external: external,
  define: { NOT_PROXY: 'true' },
}

// we define the config for runtime
const runtimeBuildConfig: BuildOptions = {
  entryPoints: ['src/runtime/index.ts'],
  outfile: 'runtime/index',
  bundle: true,
  external: external,
  define: { NOT_PROXY: 'true' },
}

// we define the config for browser
const browserBuildConfig: BuildOptions = {
  entryPoints: ['src/runtime/index-browser.ts'],
  outfile: 'runtime/index-browser',
  target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
  bundle: true,
  external: external,
  define: { NOT_PROXY: 'true' },
}

// we define the config for proxy
const proxyBuildConfig: BuildOptions = {
  entryPoints: ['src/runtime/index.ts'],
  outfile: 'runtime/proxy',
  bundle: true,
  external: external,
  define: { NOT_PROXY: 'false' },
  plugins: [fillPlugin({})],
  logLevel: 'error',
}

build([
  generatorBuildConfig,
  runtimeBuildConfig,
  browserBuildConfig,
  proxyBuildConfig,
])

import vue from '@vitejs/plugin-vue'
import ssr from 'vite-plugin-ssr/plugin'
import { UserConfig } from 'vite'
import { fileURLToPath } from 'url'
import inspect from 'vite-plugin-inspect'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import cp from 'vite-plugin-cp'
import { grpcWebImportFixPlugins } from './scripts/grpcweb-import-fix-plugins'

const config: UserConfig = {
  plugins: [
    vue(),
    ssr(),
    inspect(),
    viteCommonjs(),
    cp({
      globbyOptions: {},
      hook: 'writeBundle',
      targets: [
        { 
          src: './idl/**/*.proto',
          dest: './dist/server/idl',
          rename: '',
        }
      ],
    }),
    ...grpcWebImportFixPlugins(),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
}

export default config

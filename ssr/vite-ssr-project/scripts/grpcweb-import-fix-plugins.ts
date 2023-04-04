import { createUnplugin } from 'unplugin'
import fs from 'fs'

export type Options = {
  include?: string | RegExp,
}

const issueImportRegexp = /import\s+(\*\sas)\s+.*_pb\s+from\s+(?<start>['"]).*_pb(\k<start>);/gm
const closureExportsRegexp = /goog\.object\.extend\(exports,\s.*\);/g

// proto_web/idl/client/HelloworldServiceClientPb.ts
export const importUnplugin = createUnplugin((options: Options) => ({
  name: 'unplugin:grpc-web-import-fix',
  enforce: 'pre',
  transformInclude(id: string) {
    if (typeof options?.include === 'string') {
      return id.includes(options?.include)
    } else {
      return options?.include?.test(id)
    }
  },
  transform(code: string, id: string) {
    console.log('Import: ', id)
    // import * as idl_client_helloworld_pb from '../../idl/client/helloworld_pb';
    // import idl_client_helloworld_pb from '../../idl/client/helloworld_pb';
    const matches = code && code.match(issueImportRegexp)
    if (matches && matches.length) {
      for (const match of matches) {
        code = code.replace(
          match,
          match.slice(0, 'import '.length) + match.slice('import * as '.length),
        )
      }
      fs.writeFileSync(id, code, { encoding: 'utf-8' })
      return code
    }
    return null
  }
}))

const commonjsModuleExports = 'module.exports = exports;\n'
// 'proto_web/idl/client/helloworld_pb.js'
export const exportUnplugin = createUnplugin((options: Options) => ({
  name: 'unplugin:grpc-web-export-fix',
  enforce: 'pre',
  transformInclude(id: string) {
    if (typeof options?.include === 'string') {
      return id.includes(options?.include)
    } else {
      return options?.include?.test(id)
    }
  },
  transform(code: string, id: string) {
    console.log('Export: ', id)
    // goog.object.extend(exports, proto.helloworld);
    const matches = code && code.match(closureExportsRegexp)
    if (matches && matches.length && !code.includes(commonjsModuleExports)) {
      const replacer = matches[0] + '\n' + commonjsModuleExports
      code = code.replace(matches[0], replacer)
      fs.writeFileSync(id, code, { encoding: 'utf-8' })
      return code
    }
    return null
  },
}))

export const vitePlugins = () => [importUnplugin.vite, exportUnplugin.vite]
export const rollupPlugins = () => [importUnplugin.rollup, exportUnplugin.rollup]

console.log(vitePlugins())
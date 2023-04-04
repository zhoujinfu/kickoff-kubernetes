import { TransformResult } from 'esbuild'
import createFilter, { Filter } from './create-filter'

export type Option = {
  include?: Filter,
  exclude?: Filter,
}

export type Options = {
  import?: Option,
  export?: Option,
}

const issueImportRegexp = /import\s+(\*\sas)\s+.*_pb\s+from\s+(?<start>['"]).*_pb(\k<start>);/gm
const closureExportsRegexp = /goog\.object\.extend\(exports,\s.*\);/g

export function grpcWebImportFixPlugins(options: Options = {
  import: {
    include: '/idl/client/HelloworldServiceClientPb.ts',
  },
  export: {
    include: '/idl/client/helloworld_pb.js',
  },
}) {
  const importFilter = createFilter(options?.import?.include, options?.import?.exclude)
  const exportFilter = createFilter(options?.export?.include, options?.export?.exclude)
  return [{
      name: 'grpc-web-import-fix',
      enforce: 'post',
      transform(code: string, id: string): TransformResult {
        if (!importFilter(id)) return null as any as TransformResult

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
          return {
            code: code,
            map: null,
            warnings: null,
          } as any as TransformResult
        }
        return null as any as TransformResult
      }
    },

    {
      name: 'grpc-web-export-fix',
      enforce: 'pre',
      transform(code: string, id: string): TransformResult {
        if (!exportFilter(id)) return null as any as TransformResult

        // goog.object.extend(exports, proto.helloworld);
        const matches = code && code.match(closureExportsRegexp)
        if (matches && matches.length) {
          const replacer = matches[0] + '\n' + 'module.exports = exports;\n'
          code = code.replace(matches[0], replacer)
          return {
            code: code,
            map: null,
            warnings: null,
          } as any as TransformResult
        }
        return null as any as TransformResult
      },
    }
  ]
}
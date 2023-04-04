import fs from 'fs'
import path from 'path'
import { viteCommonjs as cjs } from '@originjs/vite-plugin-commonjs'

const commonJSRegex = /\b(module\.exports|exports\.\w+|exports\s*=\s*|exports\s*\[.*\]\s*=\s*)/

const protoWebHellowolrdPb = fs.readFileSync(path.resolve('./proto_web/idl/client/helloworld_pb.js'), {
  encoding: 'utf-8',
})

console.log(commonJSRegex.test(protoWebHellowolrdPb))
console.log(commonJSRegex.test(''))

console.log(cjs().transform(protoWebHellowolrdPb, '1'))



const issueImportRegexp = /import\s+(\*\sas)\s+.*_pb\s+from\s+(?<start>['"]).*_pb(\k<start>);/gm
const replaceRegexp = /\s\*\sas/gm
console.log(`import * as grpcWeb from "grpc-web";
import * as idl_client_helloworld_pb from "../../idl/client/helloworld_pb";`.match(issueImportRegexp))
console.log(`import * as idl_client_helloworld_pb from "../../idl/client/helloworld_pb";`.match(issueImportRegexp))
console.log(`import * as grpcWeb from "grpc-web";`.match(issueImportRegexp))

console.log(`import * as grpcWeb from "grpc-web";
import * as idl_client_helloworld_pb from "../../idl/client/helloworld_pb";`.replace(replaceRegexp, ''))


const closureExportsRegexp = /goog\.object\.extend\(exports,\s.*\);/g
console.log(`goog.object.extend(exports, proto.helloworld);`.match(closureExportsRegexp))
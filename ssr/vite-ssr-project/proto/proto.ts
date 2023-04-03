import path from 'path'
import grpc from '@grpc/grpc-js'
import ProtoLoader from '@grpc/proto-loader'
import type { ProtoGrpcType } from './helloworld'

const helloWorldDefinition = ProtoLoader.loadSync(
  // NOTE: vite-plugin-cp will cp all the proto files into dist/server/proto
  path.resolve('./proto/helloworld.proto'),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
)

const helloWorldDescriptor = grpc.loadPackageDefinition(helloWorldDefinition) as unknown as ProtoGrpcType

export const helloworld = helloWorldDescriptor.helloworld

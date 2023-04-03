import path from 'path'
import grpc from '@grpc/grpc-js'
import ProtoLoader from '@grpc/proto-loader'
import { root } from '~/server/root'
import type { ProtoGrpcType } from './helloworld'

const helloWorldDefinition = ProtoLoader.loadSync(
  path.join(root, './proto/helloworld.proto'),
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

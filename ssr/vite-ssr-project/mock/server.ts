import * as proto_loader from '@grpc/proto-loader'
import * as grpc from '@grpc/grpc-js'
import type { ProtoGrpcType } from '~/proto/helloworld'
import path from 'path'

function getProtoFromPkgDefinition(pkgName: string, pkgDef: any): any {
  const pathArr: string[] = pkgName.split('.')
  return pathArr.reduce((obj, key) => {
    return obj && obj[key] !== 'undefined' ? obj[key] : undefined
  }, pkgDef)
}

class GrpcMockServer {
  private readonly _server: grpc.Server

  public constructor(
    public readonly serverAddress: string = '0.0.0.0:50051'
  ) {
    this._server = new grpc.Server()
  }

  public addService(
    protoPath: string,
    pkgName: string,
    serviceName: string,
    implementations: any,
    protoLoadOptions?: any
  ): GrpcMockServer {
    const pkgDef: grpc.GrpcObject = grpc.loadPackageDefinition(
      proto_loader.loadSync(protoPath, protoLoadOptions)
    )
    const proto: any = getProtoFromPkgDefinition(pkgName, pkgDef)

    if (!proto) {
      throw new Error('Seems like the package name is wrong.')
    }

    if (!proto[serviceName]) {
      throw new Error('Seems like the service name is wrong.')
    }

    const service: any = proto[serviceName].service
    this.server.addService(service, implementations)
    return this
  }

  public get server(): grpc.Server {
    return this._server
  }

  public start() {
    console.log('Starting gRPC mock server ...')

    this.server.bindAsync(
      this.serverAddress,
      grpc.ServerCredentials.createInsecure(),
      () => {
        this.server.start()
      },
    )
  }
}

// my mocks
function main(protoPath: string, pkgName: string, svcName: string) {
  const pkgDef = grpc.loadPackageDefinition(
    proto_loader.loadSync(protoPath),
  )
  const proto = getProtoFromPkgDefinition(
    pkgName,
    pkgDef,
  ) as unknown as ProtoGrpcType

  const server = new GrpcMockServer()
  // 1. init
  const implementations = {
    SayHello: (call: any, callback: any) => {
      const response: any = {
        message: 'GO-the response message: ' + call.request.name,
      }
      callback(null, response)
    }
  }
  server.addService(protoPath, pkgName, svcName, implementations)
  // 2. run
  try {
    server.start()
    console.log(`Mock GRPC server is listening at: ${server.serverAddress}`)
  } catch (error) {
    throw new Error(`Failed initializing Mock GRPC server at: ${server.serverAddress}`)
  }
}

main(
  path.resolve('./idl/server/helloworld.proto'),
  'helloworld',
  'Greeter',
)

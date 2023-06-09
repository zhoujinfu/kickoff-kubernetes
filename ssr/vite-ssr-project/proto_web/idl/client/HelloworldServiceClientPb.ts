/**
 * @fileoverview gRPC-Web generated client stub for helloworld
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.4.1
// 	protoc              v3.19.1
// source: idl/client/helloworld.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import idl_client_helloworld_pb from '../../idl/client/helloworld_pb';


export class GreeterClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorSayHello = new grpcWeb.MethodDescriptor(
    '/helloworld.Greeter/SayHello',
    grpcWeb.MethodType.UNARY,
    idl_client_helloworld_pb.HelloRequest,
    idl_client_helloworld_pb.HelloReply,
    (request: idl_client_helloworld_pb.HelloRequest) => {
      return request.serializeBinary();
    },
    idl_client_helloworld_pb.HelloReply.deserializeBinary
  );

  sayHello(
    request: idl_client_helloworld_pb.HelloRequest,
    metadata: grpcWeb.Metadata | null): Promise<idl_client_helloworld_pb.HelloReply>;

  sayHello(
    request: idl_client_helloworld_pb.HelloRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: idl_client_helloworld_pb.HelloReply) => void): grpcWeb.ClientReadableStream<idl_client_helloworld_pb.HelloReply>;

  sayHello(
    request: idl_client_helloworld_pb.HelloRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: idl_client_helloworld_pb.HelloReply) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/helloworld.Greeter/SayHello',
        request,
        metadata || {},
        this.methodDescriptorSayHello,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/helloworld.Greeter/SayHello',
    request,
    metadata || {},
    this.methodDescriptorSayHello);
  }

  methodDescriptorSayHelloStreamReply = new grpcWeb.MethodDescriptor(
    '/helloworld.Greeter/SayHelloStreamReply',
    grpcWeb.MethodType.SERVER_STREAMING,
    idl_client_helloworld_pb.HelloRequest,
    idl_client_helloworld_pb.HelloReply,
    (request: idl_client_helloworld_pb.HelloRequest) => {
      return request.serializeBinary();
    },
    idl_client_helloworld_pb.HelloReply.deserializeBinary
  );

  sayHelloStreamReply(
    request: idl_client_helloworld_pb.HelloRequest,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<idl_client_helloworld_pb.HelloReply> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/helloworld.Greeter/SayHelloStreamReply',
      request,
      metadata || {},
      this.methodDescriptorSayHelloStreamReply);
  }

}


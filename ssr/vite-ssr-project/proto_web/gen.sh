# https://github.com/hronro/protoc-gen-grpc-web-npm
# this library can handle the bin downloading from Github
# https://github.com/hronro/protoc-gen-grpc-web-npm/blob/master/post-install.js#L8
grpc_tools_node_protoc -I=. ./idl/client/helloworld.proto \
  --js_out=import_style=commonjs:"proto_web" \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:"proto_web"

# https://github.com/grpc/grpc-web/issues/1242#issuecomment-1141914327

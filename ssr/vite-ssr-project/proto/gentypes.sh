# npm i -g grpc-tools for static 
# here use for dynamic only generate the types
# using `proto-loader-gen-types` from @grpc/proto-loader
$(pnpm bin)/proto-loader-gen-types \
--longs=String \
--enums=String \
--defaults \
--oneofs \
--grpcLib=@grpc/grpc-js \
--outDir=proto/ idl/server/*.proto

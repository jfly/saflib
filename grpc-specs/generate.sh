#!/bin/bash
protoc --ts_out=./dist/ \
  --proto_path=. \
  --proto_path=../.. \
  --ts_opt=no_namespace \
  --ts_opt=unary_rpc_promise=true \
  ../../saflib/grpc-specs/protos/*.proto \
  protos/*.proto

# Hack to add .ts extension to dependency imports, because node requires them
for file in ./dist/*.ts; do
  sed 's/from "\.\([^"]*\)"/from "\.\1.ts"/' "$file" > "$file.tmp" && mv "$file.tmp" "$file"
done

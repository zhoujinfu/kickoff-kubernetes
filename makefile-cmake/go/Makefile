# BIN_HELLO = hello
# .PHONY: build-run
# build-run:
# 	@go build -o $(BIN_HELLO) main.go
# 	./$(BIN_HELLO)

.PHONY: all build clean run check cover lint docker help
BIN = hello
all: check build
build:
	@go build -o $(BIN)
clean:
	@go clean
# rm --force xx.out
	rm hello
test:
	@go test
check:
	@go fmt ./
	@go vet ./
cover:
	@go test -coverprofile xx.out
	@go tool cover -html=xx.out
run:
	./$(bin)
lint:
	golangci-lint run --enable-all
docker:
	@docker build -t hello/latest .
help:
	@echo "make 格式化go代码 并编译生成二进制文件"
	@echo "make build 编译go代码生成二进制文件"
	@echo "make clean 清理中间目标文件"
	@echo "make test 执行测试case"
	@echo "make check 格式化go代码"
	@echo "make cover 检查测试覆盖率"
	@echo "make run 直接运行程序"
	@echo "make lint 执行代码检查"
	@echo "make docker 构建docker镜像"

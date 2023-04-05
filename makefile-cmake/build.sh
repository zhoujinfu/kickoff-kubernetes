# g++ main.cpp factorial.cpp printhello.cpp -o hello
# ./hello

# 如修改某个模块，只需要重新编译改动模块
# 然后再链接
# g++ main.cpp -c
# g++ factorial.cpp -c
# g++ printhello.cpp -c
# g++ *.o -o hello

mkdir -p build
cd build
# brew install cmake
cmake ../
cd -
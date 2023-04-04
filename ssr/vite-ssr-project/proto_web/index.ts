import * as proto from './idl/client/HelloworldServiceClientPb'
import helloworld from './idl/client/helloworld_pb'

export async function sayHello(name: string) {
  console.log('aaa', helloworld.HelloRequest)
  const client = new proto.GreeterClient('http://localhost:8080')
  return new Promise((resolve, reject) => {
    const request = new helloworld.HelloRequest()
    request.setName(name)
    client.sayHello(request, null, (err, response) => {
      console.log(err, response)
      if (err) reject(err)
      else resolve(response)
    })
  })
}
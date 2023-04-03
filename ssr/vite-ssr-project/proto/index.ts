import { helloworld } from './proto'
import grpc from '@grpc/grpc-js'

export async function sayHello(name: string) {
  const client = new helloworld.Greeter('localhost:50051', grpc.credentials.createInsecure())
  return new Promise((resolve, reject) => {
    client.sayHello({ name: 'tinychou', }, (err, response) => {
      if (err) reject(err)
      else resolve(response)
    })
  })
}

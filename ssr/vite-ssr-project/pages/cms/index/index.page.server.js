// Environment: Node.js

import { sayHello } from '~/proto/index'

export async function onBeforeRender(pageContext) {
  console.log(await sayHello('GGGGoood!'))
  return {}
}

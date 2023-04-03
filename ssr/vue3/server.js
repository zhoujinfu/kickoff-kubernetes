import express from 'express'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './app.js'

const server = express()

server.use(express.static('.'))

server.get('/', (req, res) => {
  const app = createApp()

  renderToString(app).then(html => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vue SSR Example</title>
          <script type="importmap">
            {
              "imports": {
                "vue":          "https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.0-beta.15/vue.esm-browser.js",
                "vue-router":   "https://cdnjs.cloudflare.com/ajax/libs/vue-router/4.0.0-alpha.12/vue-router.esm.js",
                "vuex":         "https://cdnjs.cloudflare.com/ajax/libs/vuex/4.0.0-beta.2/vuex.esm-browser.js"
              }
            }
          </script>
          <script type="module" src="/client.js"></script>
        </head>
        <body>
          <div id="app">${html}</div>
        </body>
      </html>
    `)
  })
})

server.listen(3000, () => {
  console.log('ready')
})
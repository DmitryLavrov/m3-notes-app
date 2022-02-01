const http = require('http')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs/promises')
const {addNote} = require('./notes.controller')

const port = 3000
const hostname = 'localhost'
const basePath = path.join(__dirname, 'pages')

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET') {
    const content = await fs.readFile(path.join(basePath, 'index.html'), {encoding: 'utf8'})
    res.end(content)

  } else if (req.method === 'POST') {
    const body = []

    req.on('data',data=>{
      body.push(Buffer.from(data))
    })

    req.on('end', () => {
      const title = body.toString().split('=')[1].replaceAll('+', ' ')
      addNote(title)
    })

    res.end('OK')
  }
})

server.listen(port, hostname, () => {
  console.log(chalk.cyan(`Server started on: http://${hostname}:${port}`))
})

const http = require('http')
const express = require('express')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs/promises')
const {addNote, getNotes, removeNote} = require('./notes.controller')
const {urlencoded} = require('express')

const port = 3000
const hostname = 'localhost'
const basePath = path.join(__dirname, 'pages')

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Notes app',
    notes: await getNotes(),
    created: false
  })
})

app.post('/', async (req, res) => {
  await addNote(req.body.title)

  res.render('index', {
    title: 'Notes app (note added)',
    notes: await getNotes(),
    created: true
  })
})

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id)

  res.render('index', {
    title: 'Notes app (note deleted)',
    notes: await getNotes(),
    created: false
  })
})

app.listen(port, hostname, () => {
  console.log(chalk.cyan(`Server started on: http://${hostname}:${port}`))
})

const express = require('express')
const webpack = require('webpack')

const app = express()

const middle = require('webpack-dev-middleware')

const config = require('./webpack.config.js')

const compiler = webpack(config)

app.use(middle(compiler))

app.get('/user', (req, res) => {
  res.json({name: 'AimerFan'})
})

app.listen(3000)
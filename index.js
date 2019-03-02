const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use('/math',express.static(path.join(__dirname, 'html')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  .get('/math', (req, res) => res.sendfile('static_form.html'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


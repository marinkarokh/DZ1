const express = require('express')
const path = require('path')
const { db } = require('./DB')

const PORT = 3000

const server = express()

server.set('view engine', 'hbs')
server.set('views', path.join(__dirname, 'src', 'views'))

server.use(express.urlencoded({ extended: true }))
server.use(express.static(path.join(__dirname, 'public')))

// server.get('/', (req, res) => {
//   const query1 = req.query
//   console.log(query1, query1.reverse, query1.limit, {db.people})
//   let peopleForRender = db.people
// if (query1.limit !== undefined && Number.isNaN(+query1.limit) === false && query1.limit !== {}) {
//     peopleForRender = db.people.slice(0, query1.limit)
//   } else if (query1.reverse === 'true' && query1.limit === undefined) {
//     peopleForRender = db.people.reverse()
//   }

//   res.render('main', { listOfPeople: peopleForRender })
// })

server.get('/', (req, res) => {
  const query1 = req.query
  const quRe = query1.reverse
  const quLim = query1.limit
  let peopleForRender = db.people
  if (quRe !== undefined && quRe === 'true' && quLim === undefined) {
    peopleForRender = db.people.reverse()
  } else if (quLim !== undefined && Number.isNaN(+quLim) === false && quRe === undefined) {
    peopleForRender = db.people.slice(0, quLim)
  } else if ((quRe !== undefined && quRe === 'true' && quLim !== undefined && Number.isNaN(+quLim) === false)) {
    peopleForRender = db.people.slice(0, quLim).reverse()
  }

  res.render('main', { listOfPeople: peopleForRender })
})

server.post('/adressbook', (req, res) => {
  const dataFromForm = req.body

  db.people.push(dataFromForm)

  res.redirect('/')
})

server.get('*', (req, res) => {
  res.send(`<div>
  <h1>404</h1>
  <a href="/">Как страница пропала?! Срочно возвращаемся на главную!</a>
  <br>
  <img src="404.jpg" width="500">
  </div>`)
})

server.listen(PORT, () => {
  console.log(`Server has been started on port: ${PORT}`)
})

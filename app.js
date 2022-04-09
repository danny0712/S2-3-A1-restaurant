const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')


const restaurantList = require('./restaurant.json')



// express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))


//route setting
app.get('/', (req, res) => {
  console.log(restaurantList)
  res.render('index', { restaurants: restaurantList.results })
})

//querystring
app.get('/search', (req, res) => {
  keyword = req.query.keywords
  const restaurants = restaurantList.results.filter((item) => {
    return item.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword })
})

app.get('/restaurants/:restaurant_id', (req, res) => {

  const restaurant = restaurantList.results.find((item) => item.id.toString() === req.params.restaurant_id)
  console.log(restaurant)
  res.render('show', { restaurant })
})

// start server
app.listen(port, () => {
  console.log(`Server is running at http:/localhost:${port}`)
})

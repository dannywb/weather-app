// Added comment
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Danny Brown'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Danny Brown',
    picName: 'Gracie'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    msg: 'This is the help message',
    name: 'Danny Brown'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    })
  } else {

      geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
          return res.send({
            error: 'Unable to find location. Try another search.'
          });
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({
              error: 'Unable to find location'
            });
          }
          
          res.send({
            forecast: forecastData.desc,
            location,
            address: req.query.address
          })
        });
      });  
    }
})  

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article not found',
    name: 'Danny Brown'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found',
    name: 'Danny Brown'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
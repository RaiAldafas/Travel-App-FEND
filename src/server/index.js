let projectData ={}

const dotenv = require('dotenv')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const cors = require('cors')
const mockAPIResponse = require('./mockAPI.js')
const request = require('supertest');


dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(express.static('dist'))

app.get('/', function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve('src/client/views/index.html'))
})

// Declaring variables to APIs
const geoNamesBaseUrl = 'http://api.geonames.org/searchJSON?q='
const geoNameskey = process.env.GEO_NAMES_KEY
const weatherBitBaseUrl = 'https://api.weatherbit.io/v2.0/current?'
const weatherBitKey = process.env.WEATHER_BIT_KEY
const pixaBayBaseUrl = 'https://pixabay.com/api/?'
const pixaBayKey = process.env.PIXABAY_KEY


// function to get data from Geoname API
const getGeo = async (destination) => {
  const geoNamesUrl = `${geoNamesBaseUrl}${destination}&username=${geoNameskey}`
  const response = await fetch(geoNamesUrl)
  try {
    const data = await response.json();
    return {
      lat: data.geonames[0].lat,
      lng: data.geonames[0].lng,
    }
  } catch (error) {
    console.log(error, 'error');
  }
}

// function to get data from Weatherbit API
const getWeather = async (lat, lng) => {
  const weatherBitUrl = `${weatherBitBaseUrl}lat=${lat}&lon=${lng}&key=${weatherBitKey}&include=minutely`
  const WeatherData = await fetch(weatherBitUrl)
  try {
    const data = await WeatherData.json()
    const weather = {
      description: data.data[0].weather.description,
      snow: data.data[0].snow,
      temp: data.data[0].temp
    }
    return weather
  } catch (error) {
    console.log(error, 'error');
  }
}

// function to get data from Pixabay API
const getImage = async (destination) => {
  const pixabayUrl = `${pixaBayBaseUrl}&key=${pixaBayKey}&q=${destination}`
  const imgData = await fetch(pixabayUrl)
  try {
    const data = await imgData.json()
    const imgPlace = {
      img: data.hits[2].previewURL
    }
    const {
      img
    } = imgPlace
    return img
  } catch (error) {
    console.log(error, 'error');
  }
}



app.post('/add-url', async (req, res) => {

  const {
    destination
  } = req.body
  const geoNamesData = await getGeo(destination)
  const lat = geoNamesData.lat
  const lng = geoNamesData.lng
  try {
    const weatherbitData = await getWeather(lat, lng);
    const pixaBayData = await getImage(destination);
    const projectData = {
      weatherbitData,
      pixaBayData
    }
    res.send(projectData)
  } catch (error) {
    console.log(error, 'error');
  }

})



app.get('/test', function (req, res) {
  res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(8080, (error) => {
  if (error) throw new Error(error)
  console.log('Server listening on port 8080!')
})
const express = require('express');
const axios = require('axios');
const nodemon = require('nodemon');

const app = express();
const port = 3013;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/weather', async (req, res) => {
  const city = req.body.city;

  // Replace 'YOUR_OPENWEATHER_API_KEY' with your actual OpenWeather API key
  const apiKey = '99783bf64b55abb1a3cb123f01527319';

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = response.data;

    // Extract relevant information (e.g., temperature) from the OpenWeather API response
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    res.send(`
    <h1>Temperature in ${city}: ${temperature}K <h1/>, 
     Description: ${description}`);
  } catch (error) {
    console.error('Error fetching data from OpenWeather API:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 8080;

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
  },
  methods: ['GET'],
  credentials: true, 
}));


// route to get weather data
app.get('/api/weather', async (req, res) => {
  const { lat, lon } = req.query;
  const API_KEY = process.env.API_KEY;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;
  const uvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  try {
    const weatherResponse = await axios.get(weatherUrl);
    const uvResponse = await axios.get(uvUrl);

    res.json({
      temperature: weatherResponse.data.main.temp,
      weatherIcon: weatherResponse.data.weather[0].icon,
      uvIndex: uvResponse.data.value,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).send({ error: 'Failed to fetch weather data' });
  }
});

// serve static files from React app's build directory
app.use(express.static(path.join(__dirname, 'build')));

// handle root route
app.get('/', (req, res) => {
  res.send('Welcome to the Heat Stroke Wristband API');
});

// all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

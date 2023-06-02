const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/getWeather', async (req, res) => {
  const { cities } = req.body;
  const weatherData = {};

  try {
    for (const city of cities) {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=YOURAPIKEY&q=${city}`
      );
      const temperature = response.data.current.temp_c;
      weatherData[city] = `${temperature}C`;
    }

    res.json({ weather: weatherData });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

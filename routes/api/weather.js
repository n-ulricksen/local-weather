const express = require('express');
const router = express.Router();
const axios = require('axios');
const CircularJSON = require('circular-json');

const key = require('../../config/keys').darkSkyKey;

router.get('/test', (req, res) => res.send("Weather test"));

// Get current weather info
router.get('/current/:lat/:long', (req, res) => {
  let { lat, long } = req.params;
  const reqUrl = `https://api.darksky.net/forecast/${key}/${lat},${long}`;

  // Get weather data specific to user data from Dark Sky API
  axios.get(reqUrl)
    .then(response => {
      const json = CircularJSON.stringify(response.data);

      res.send(json);
    })
    .catch(err => console.log(err));
});

module.exports = router;
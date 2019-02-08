const express = require('express');
const app = express();
const path = require('path');

const weather = require('./routes/api/weather');

const port = process.env.PORT || 5000;

// CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Body Parser middleware
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
app.use(express.json());

// Use Routes
app.use('/api/weather', weather);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`App listening on port ${port}`));

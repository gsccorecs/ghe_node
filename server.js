const express = require('express');
const app = express();
const port = 4000;
const http = require('http');
const cors = require('cors');

app.use(cors());

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token mainflux-token',
  },
};



app.get('/api/test', (req, res) => {
    const param1 = req.query.param1;
    // Extract headers
    const customHeader = req.headers['Authorization'];
    console.log('Received parameters:', { param1});
    const request = http.get(param1, options, (response) => {
        const chunks = [];

    response.on('data', (chunk) => {
      chunks.push(chunk);
    });
    
    response.on('end', () => {
        // Send the raw InfluxDB query result back to Angular
        res.send(Buffer.concat(chunks));
      });
    });

      request.on('error', (error) => {
        console.error('Error accessing InfluxDB API:', error.message);
        // Handle the error and send an appropriate response
        res.status(500).json({ error: 'Internal Server Error' });
    });
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
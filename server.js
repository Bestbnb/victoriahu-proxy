const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3010;


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));

// var optionsRec = {
//   host: 'localhost',
//   port: 3001,
//   path: '/map',
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': Buffer.byteLength(data)
//   }
// };  

// var optionsMap = {
//   host: 'localhost',
//   port: 3001,
//   path: '/map',
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': Buffer.byteLength(data)
//   }
// };  

app.get('/map', (req, res) => {
  axios.get('http://localhost:3001/map')
  .then(function(response){
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
    res.send(response.data);
  });  
  
}
);


app.get('/recommendations', (req, res) => {
  axios.get('http://localhost:3001/recommendations')
  .then(function(response){
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
    res.send(response.data);
  });  
  })

    



app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

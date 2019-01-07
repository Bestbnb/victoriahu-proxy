const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const axios = require('axios');

const PORT = process.env.PORT || 3010;

app.get('/', function(req, res) {
 res.redirect('/home/1');
});

app.get('/home/:homeId', function(req, res) {
 const reactPath = path.join(__dirname, './public/index.html');
 res.sendFile(reactPath);
});

app.use(express.static(path.join(__dirname, 'public')));

//Reviews
const reviewsOptions = {
 target: 'http://3.17.145.71',
 changeOrigin: true
};
const reviewsProxy = proxy(reviewsOptions);
app.use('/api/home/:homeId/reviews', reviewsProxy);

// //Photo Stream
// const photosOptions = {
//   target: 'http://ec2-52-15-165-182.us-east-2.compute.amazonaws.com:9999',
//   changeOrigin: true
// };
// const photosProxy = proxy(photosOptions);
// app.use('/api/gallery', photosProxy);

// //Calendar and Booking
// const calendarOptions = {
//   target: '',
//   changeOrigin: true
// };
// const calendarProxy = proxy(calendarOptions);
// app.use('/api/home/:homeId/bookings', calendarProxy);

//Map and Recommendation
// const mapOptions = {
//   target: 'http://localhost:3001',
//   changeOrigin: true
// };
// const mapProxy = proxy(mapOptions);
// app.use('/api/map', mapProxy);

// const recommendationOptions = {
//   target: 'http://localhost:3001',
//   changeOrigin: true
// };
// const recommendationProxy = proxy(recommendationOptions);
// app.use('/api/recommendations', recommendationProxy);
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

 app.get('/booking', (req, res) => {
  axios.get('http://18.224.149.154/booking')
  .then(function(response){
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
    res.send(response.data);
  });
  })

  app.get('http://ec2-52-15-165-182.us-east-2.compute.amazonaws.com/gallery', (req, res) => {
    axios.get('http://ec2-52-15-165-182.us-east-2.compute.amazonaws.com/gallery')
    .then(function(response){
      console.log(response.data, "GALLERY ALSKDJLSKDJSA"); // ex.: { user: 'Your User'}
      console.log(response.status); // ex.: 200
      res.send(response.data);
    });
    })

//server
app.listen(PORT, () => {
 console.log(`server running at: http://localhost:${PORT}`);
});
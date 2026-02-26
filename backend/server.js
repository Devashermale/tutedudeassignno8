const express = require('express');
const mongoose = require('mongoose');
const todo = require('./route/route')
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'https://tutedudeassignno8.vercel.app'}));
app.use('/',todo);


mongoose.connect('mongodb+srv://shermaledeva:deva171005@backenddb.ylp8dnw.mongodb.net/')
  .then(() => {
    console.log('connected');
    app.listen(3000, () => {
      console.log(`here  http://localhost:${3000}`)
    })

  }).catch((err) => {
    console.log(err)
  });

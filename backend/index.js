const express = require('express');
const cors = require('cors');
const db = require ('./config/index.JS')
const app = express()


app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(express.urlencoded({ extended: true }));


const PORT = 3000;


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
const express = require('express');
const cors = require('cors');
const db = require ('./config/index.JS')
const app = express()
const UserRoot = require ('./routerAuth/userRoot.js')
const {authenticateUser} = require('./middelwhere/auth.js')
const authentication = require('./routerAuth/AuthRoot.js')


app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(express.urlencoded({ extended: true }));

//auth route (public)
app.use("/auth", authentication);

//all routes below this middelware are secure
// app.use(authenticateUser);

const PORT = 3000;


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
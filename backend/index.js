const express = require('express');
const cors = require('cors');
const db = require ('./config/index.JS')
const app = express()
const articlerouter=require("./Router/ArticleR.js")
const Categoryrouter=require('./Router/CategoryR.js')
const exporouter=require('./Router/ExpositionR.js')
const logrouter=require('./Router/LogR.js')
const marquerouter=require('./Router/MarqueR.js')
const pdvrouter=require('./Router/PdvR.js');
const presencerouter=require('./Router/PresR.js')
const pricatrouter=require('./Router/PriceCategR.js')
const pricemrouter=require('./Router/PriceR')
const referencerouter=require('./Router/RefR.js')
const selloutrouter=require('./Router/SelloutR.js')
const usersrouter=require('./Router/UsersR.js')

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(express.urlencoded({ extended: true }));
app.use('/api/articles',articlerouter)
app.use("/api/categories",Categoryrouter)
app.use('/api/expositions',exporouter)
app.use('/api/logs',logrouter)
app.use('/api/marques',marquerouter)
app.use('/api/pdvs',pdvrouter)
app.use('/api/presences',presencerouter)
app.use('/api/pricecateg',pricatrouter)
app.use('/api/pricem',pricemrouter)
app.use('/api/reference',referencerouter)
app.use('api/sellout',selloutrouter)
app.use('api/users',usersrouter)

const PORT = 3000;


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
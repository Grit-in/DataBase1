const express = require(`express`)
const cors = require(`cors`)
const mongoose = require(`mongoose`)
var kon = express()
kon.use(cors())
kon.use(express.json())
const url = 'mongodb://localhost/bp'
mongoose.connect(url,{useUnifiedTopology:true,useNewUrlParser:true})
const con = mongoose.connection
const router = require("./router")
kon.use("/telefon", router)
kon.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
con.on(`open`,function(){
    console.log(`connected`)
})
kon.listen(46738)

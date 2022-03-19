require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const sessions = require('express-session');

const MongoStore = require('connect-mongo')(sessions);

const dbString = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@mongodb:${process.env.MONGODB_DOCKER_PORT}`

console.log(dbString)

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const connection = mongoose.createConnection(dbString,dbOptions)

const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: process.env.SESSIONS_COLLECTION_NAME
 })

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(sessions({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24//
  }
}))


function errorHandler(err,req,res,next){
  if (err) {
    res.send('<h1>Something went wrong!</h1>')
  }

  next()
}

function myMW(req,res,next){
  console.log(req.method)
  next()
}

app.use(myMW)

app.get(['/','/hello','/home'],
  (req, res) => {
    req.session.viewCount = req.session.viewCount ? ++req.session.viewCount : 1
    res.send(`<h1>Hello Sam! (You have been here ${req.session.viewCount} times  )</h1>`)
  })

app.use(errorHandler)

const PORT = process.env.NODE_DOCKER_PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

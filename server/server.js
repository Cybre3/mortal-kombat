// var createError = require('http-errors');
var express = require("express");
var app = express();
var cors = require("cors");
var cookieParser = require("cookie-parser");
require("dotenv").config();
// const { MongoClient } = require("mongodb");
var MongoClient = require('mongodb').MongoClient;
var url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dzllk8p.mongodb.net/?retryWrites=true&w=majority`


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);
app.use(cookieParser());

// mongoDB connection
// const client = new MongoClient(
//   `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dzllk8p.mongodb.net/?retryWrites=true&w=majority`,
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("characters");
  dbo.collection("names").find({}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
// client.connect((err) => {
//   const collection = client.db("characters").collection("names");

//   // collection
//   //   .find({})
//   //   .then((data) => {
//   //     console.log("data", data);
//   //     this.resource.json(data);
//   //   })
//   //   .catch((err) => console.log(err));
//   console.log("Connected to db - Mortal Kombat!");
// });

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

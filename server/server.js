// var createError = require('http-errors');
var express = require("express");
var app = express();
var cors = require("cors");
var cookieParser = require("cookie-parser");
require("dotenv").config();
// const { MongoClient } = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
var url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dzllk8p.mongodb.net/?retryWrites=true&w=majority`;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);
app.use(cookieParser());

async function databaseConnect() {
  const uri =
    "mongodb+srv://Raiden:earthrealm_warriors@cluster0.dzllk8p.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    await client.connect(() => {
      console.log("Connected to db - Mortal Kombat!");
    });
    // await findCharacters(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

databaseConnect().catch(console.error);

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

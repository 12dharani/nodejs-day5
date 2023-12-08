const express = require("express");
//object desctructuring
const { MongoClient } = require("mongodb");
// ES5 usage of mongoclient
//const mongoClient  = require('mongodb').mongoClient;
const bodyParser = require("body-parser");
const ObjectID = require("mongodb").ObjectID;
const connectToMongoDb = require('./db/checkdb')
const app = express();

const MongoURL = "mongodb://127.0.0.1:27017/";
const port = 4002;

connectToMongoDb();

// connection to data base
// previously mongodb has two connection string mongodb+srv:// mongodb://
// autoReconnect
// reconnectTries
// reconnectInterval
const client = new MongoClient(MongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//express middleware section
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let db;

client.connect((dbconnectionerror, connection) => {
  if (dbconnectionerror) {
    response.send({
      status: 500,
      message: "db connection error",
    });
  } else {
    db = connection.db("zomatodb");
    app.listen(port, () => {
      console.log("server started on port ", port);
    });
    
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to node js day 5 hit getOrderDetails for api response");
});
//getorderdetails end point
app.get("/getOrderDetails", (request, response) => {
  if (db) {
    db.collection("orderdetails")
      .find()
      .toArray((err, result) => {
        if (err) {
          console.log(err);
        } else {
          response.send(result);
        }
      });
  }
});

//addOrderDetails end point
app.post("/addOrderDetails", (request, response) => {
    if (db) {
      db.collection("orderdetails").insertOne(request.body, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          response.send("order details added successfully");
        }
      });
    }
});

//addOrderDetails end point
app.put("/updateOrderDetails", (request, response) => {
    if (db) {
      db.collection("orderdetails").updateOne(
        { _id: ObjectID(request.body._id) },
        {
          $set: {
            price: request.body.price,
            restaurant: request.body.restaurant,
          },
        },
        request.body,
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            response.send("order details updated successfully");
          }
        }
      );
    }
});

app.delete("/deleteOrderDetails", (request, response) => {
    if (db) {
      db.collection("orderdetails").remove(
        { _id: ObjectID(request.body._id) },
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            response.send("order details removed successfully");
          }
        }
      );
    }
});

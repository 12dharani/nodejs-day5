const express = require("express");

const { MongoClient } = require("mongodb");

const bodyParser = require('body-parser');
const ObjectID = require("mongodb").ObjectID

const app = express();

const MongoURL = "mongodb://127.0.0.1:27017/";
const port = 4002;


const client =  new MongoClient(MongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  res.send("Welcome to node js day 5 hit getOrderDetails for api response");
});

app.get("/getOrderDetails", (request, response) => {
  client.connect((dbconnectionerror, connection) => {
    if (dbconnectionerror) {
        response.send({
        status: 500,
        message: "db connection error",
      });
    } else {
      const db = connection.db("zomatodb");

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
});



//addOrderDetails end point
app.post("/addOrderDetails", (request, response) => {
  client.connect((dbconnectionerror, connection) => {
    if (dbconnectionerror) {
      response.send({
        status: 500,
        message: "db connection error",
      });
    } else {
      const db = connection.db("zomatodb");
      db.collection("orderdetails").insertOne(request.body,(err, result) => {
          if (err) {
            console.log(err);
          } else {
            response.send("order details added successfully");
          }
        });
    }
  });
});


//addOrderDetails end point
app.put("/updateOrderDetails", (request, response) => {
    client.connect((dbconnectionerror, connection) => {
      if (dbconnectionerror) {
        response.send({
          status: 500,
          message: "db connection error",
        });
      } else {
        const db = connection.db("zomatodb");
        db.collection("orderdetails").updateOne({_id: ObjectID(request.body._id)},{
            $set:{price:request.body.price,restaurant:request.body.restaurant}
        },request.body,(err, result) => {
            if (err) {
              console.log(err);
            } else {
              response.send("order details updated successfully");
            }
          })
        }
    });
  });
  

  app.delete("/deleteOrderDetails", (request, response) => {
    client.connect((dbconnectionerror, connection) => {
      if (dbconnectionerror) {
        response.send({
          status: 500,
          message: "db connection error",
        });
      } else {
        const db = connection.db("zomatodb");
        db.collection("orderdetails").remove({_id: ObjectID(request.body._id)},(err, result) => {
            if (err) {
              console.log(err);
            } else {
              response.send("order details removed successfully");
            }
          })
        }
    });
  });

app.listen(port, () => {
  console.log("server started on port ", port);
});


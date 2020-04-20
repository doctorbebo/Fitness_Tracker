
const express = require("express");
const mongojs = require("mongojs");

const app = express();

const databaseUrl = "workouts";
const collections = ["cardio", "resistance"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
  console.log("Database Error:", error);
});

app.get("/", (req, res) => {
  res.send("Hello Workouts");
});

app.get("/all", (req, res) => {
  db.animals.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.json(found);
    }
  });
});

app.get("/cardio", (req, res) => {
    db.cardio.find({}, (err, found) => {
      if (err) {
        console.log(err);
      } else {
        res.json(found);
      }
    });
  });

  app.get("/resistance", (req, res) => {
    db.resistance.find({}, (err, found) => {
      if (err) {
        console.log(err);
      } else {
        res.json(found);
      }
    });
  });

app.listen(3000, () => {
  console.log("App running on port 3000!");
});
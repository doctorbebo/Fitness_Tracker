const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const workout = require("./models/workout.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

var MONGODB_URI = "mongodb://bebo92:Brb1992!!@ds125623.mlab.com:25623/heroku_xrqh2gt5" || "mongodb://localhost/budget";
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect(MONGODB_URI,options)


app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.get("/api/workouts", (req, res) => 
{
    workout.find({}, (err, response) =>
    {
        if(err) console.log(err);

        res.json(response);
    })
});

app.get("/api/workouts/range", (req, res) => 
{
    workout.find({}, (err, response) =>
    {
        if(err) console.log(err);
        console.log(response);
        res.json(response);
    })
});

app.put("/api/workouts/:id", (req, res) => 
{
    console.log(req.body);
    workout.findById(req.params.id, (err, thisWorkout) =>
     {
         if(err) console.log(err);
         thisWorkout.exercises.push(req.body);
         thisWorkout.totalDuration = thisWorkout.setTotalDuration();
            
         workout.findByIdAndUpdate(req.params.id, thisWorkout , (err, secondResponse) =>
         {
             if(err) console.log(err)

             res.json(secondResponse);
         });
    });
});

app.post("/api/workouts", (req, res) => 
{
    const data = req.body;
    workout.create({"exercises": []})
    .then(dbWorkout => {
        console.log(dbWorkout)
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
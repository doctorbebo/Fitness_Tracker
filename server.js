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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


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
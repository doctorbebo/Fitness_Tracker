const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const User = require("./userModel.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/userdb", { useNewUrlParser: true });


db.on("error", error => {
  console.log("Database Error:", error);
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});

app.get("/api/workouts", (req, res) => 
{
    db.workout.find((err, response) =>
    {
        if(err) console.log(err);

        res.json(response);
    });
});

app.get("/api/workouts/range", (req, res) => 
{
    db.workout.find((err, response) =>
    {
        if(err) console.log(err);

        res.json(response);
    });
});

app.put("/api/workouts/:id", (req, res) => 
{
    console.log(req.params.id);
    db.workout.update({_id: mongojs.ObjectId(req.params.id)}, {$push: {exercises: req.body}}, {multi: true}, (err, response) => {
        // the update is complete
        if(err) console.log(err);

        res.json(response);
    })
});

app.post("/api/workouts", (req, res) => 
{
    const data = req.body;
    db.workout.insert({"exercises": []}, (err, response) =>
    {
        if(err) console.log(err);

        res.json(response);
    });
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
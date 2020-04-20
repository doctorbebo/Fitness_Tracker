const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({  
      id: Schema.ObjectId,
      day: {
        type: Date,
        trim: true,
        default: Date.now(),
      },
    
      exercises: {
        type: Array,
        trim: true,
      },

      totalDuration: {
        type: Number,
        default: 0
      }
    
})

workoutSchema.methods.setTotalDuration = function() {
  totalDuration = 0;

  this.exercises.forEach(e => {
    totalDuration += e.duration
  });
  
  return totalDuration;
};


const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;


const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });

// Basically we'll have two models, user and Tweet
const userSchema = new Schema({
  username: String,
  age: Number,
});

const twwetSchema = new Schema({
  tweet: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

// Now we create the two models

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", twwetSchema);

// Now we have the two models, we can create a function to create tweets

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
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

// Now we create the two models

const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", twwetSchema);

// Now we have the two models, we can create a function to create tweets for example
// const makeTweets = async () => {
//   // First we create the information about the user inside the u variable (from user)
//   // const user = new User({ username: "marlonfrade", age: 24 });
//   // We create another user to find and add tweets
//   const user = await User.findOne({ username: "marlonfrade" });
//   const tweet2 = new Tweet({ text: "Second Text", likes: 200 });
//   tweet2.user = user;
//   // then save the new user, and don't need to await this time
//   user.save();
//   tweet2.save();
// };

// makeTweets();

// Now we populate with tweets

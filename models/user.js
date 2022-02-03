const mongoose = require("mongoose");

// Conexão com o Mongo
mongoose.connect("mongodb://localhost:27017/relationshipDemo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Confirmando a conexão com o banco de dados, valores podem ser alterados.
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      // Mongo creates an Id for each document created on DataBase, to turn it off, we can set the value of id to false
      _id: { id: false },
      street: String,
      city: String,
      state: String,
      country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const u = new User({
    first: "Harry",
    last: "Potter",
  });

  u.addresses.push({
    street: "123 Sesame St.",
    city: "New York",
    state: "NY",
    country: "USA",
  });
  const res = await u.save();
  console.log(res);
};

// We can make a function to add address to a new user created with the function below, we can use to set the address to a user created or we can make a function to add another address to a user created, depends what you're looking for
const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: "99 3rd St.",
    city: "New York",
    state: "NY",
    country: "USA",
  });
  const res = await user.save();
  console.log(res);
};

// When you call the function to add a new address to a user created, we have to pass the id in the database as a param.

makeUser();

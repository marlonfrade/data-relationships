// Another way to connect the DataBase
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

// Defining the schema to store the farm products
// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   season: {
//     type: String,
//     enum: ["Spring", "Summer", "Fall", "Winter"],
//   },
// });

// Now we comment the product schema to create the farm schema(don't need to mongoose.schema cause we've imported from above)
const farmSchema = new Schema({
  name: String,
  city: String,
  //   Consult the docs of mongoose to import the Object Id, and refers it to the products schema
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const product = mongoose.model("Product", productSchema);

product.insertMany([
  { name: "Goddess Melon", price: 4.99, season: "Summer" },
  { name: "Baby Watermelon", price: 4.99, season: "Summer" },
  { name: "Asparagus", price: 3.99, season: "Springs" },
]);
const 

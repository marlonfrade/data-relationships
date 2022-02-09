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
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

// Now we comment the product schema to create the farm schema(don't need to mongoose.schema cause we've imported from above)
const farmSchema = new Schema({
  name: String,
  city: String,
  //   Consult the docs of mongoose to import the Object Id, and refers it to the products schema
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// Product.insertMany([
//   { name: "Goddess Melon", price: 4.99, season: "Summer" },
//   { name: "Baby Watermelon", price: 4.99, season: "Summer" },
//   { name: "Asparagus", price: 3.99, season: "Spring" },
// ]);

const makeFarm = async () => {
  const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" });
  const melon = await Product.findOne({ name: "Goddess Melon" });
  farm.products.push(melon);
  await farm.save();
  console.log(farm);
};

// After we create the function, when run the function on terminal, switch on database Mongo to relationshipDemo and run db.farms.find()

// We execute the function to see if works
// makeFarm();

const addProduct = async () => {
  // First we look through the farm schema
  const farm = await Farm.findOne({ name: "Full Belly Farms" });
  // After we look up through the product schema to find one
  const watermelon = await Product.findOne({ name: "Baby Watermelon" });
  // Now we push all the things we catch to the array
  farm.products.push(watermelon);
  await farm.save();
  console.log(farm);
};

// Execute the function
// Verify if the finds are searching correctly
// addProduct();

// Testing Populate
Farm.findOne({ name: "Full Belly Farms" })
  // Executing the mongo command populate
  .populate("products")
  .then((farm) => console.log(farm));

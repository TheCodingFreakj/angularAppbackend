// Import dependencies
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
let bodyParser = require("body-parser");
// Create a new express application named 'app'
var app = express();

// Set our backend port to be either an environment variable or port 5000
const port = process.env.PORT || 5000;
console.log(process.env.PORT);
// This application level middleware prints incoming requests to the servers console, useful to see incoming requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

// Configure the bodyParser middleware
app.use(express.json({ limit: "500000mb" }));
app.use(express.urlencoded({ extended: true, limit: "500000mb" }));

// Configure the CORs middleware
app.use(cors());
//app.session
//options for cors in production

//connect fb

if (process.env.NODE_ENV === "production") {
  mongoose
    .connect(
      "mongodb+srv://pallavi57:pallavi57@cluster0.07c2o.mongodb.net/angularDb?retryWrites=true&w=majority"
      //   {
      //     useNewUrlParser: true,
      //     useUnifiedTopology: true,

      //   }
    )
    .then(() => console.log("DB Connected!"))
    .catch((err) => {

      console.log(`DB Connection Error: ${err.message}`);
      throw err
    });
} else if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "staging"
) {
  mongoose
    .connect(
      "mongodb+srv://pallavi57:pallavi57@cluster0.joavu.mongodb.net/angularDb?retryWrites=true&w=majority"
      //   {
      //     useNewUrlParser: true,
      //     useUnifiedTopology: true,
      //     useFindAndModify: false,
      //     useCreateIndex: true,
      //   }
    )
    .then(() => console.log(`Database connected to developement db`))
    .catch((err) => {
      console.log(`DB Connection Error: ${err.message}`);
      throw err
    });
}

//set static folder
// app.use(express.static("client/build"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// });
const UserRoute = require("./Routes/userRoute");
app.use("/api/v1", UserRoute);

const ProductRoute = require("./Routes/productRoute");
app.use("/api/v1", ProductRoute);
console.log("This is runing on docke at port ")
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));

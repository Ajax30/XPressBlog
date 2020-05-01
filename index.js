const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressLayouts = require("express-ejs-layouts");
const flash = require("express-flash");
const session = require("express-session");
const app = express();

dotenv.config();

//Conect to MONGODB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("conected");
  });

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

// Set static directory
app.use(express.static(path.join(__dirname, "public")));

// Set uploads directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// Set views directory
app.set("views", path.join(__dirname, "views"));

// Set view engine
app.set("view engine", "ejs");

// Use Express Layouts
app.use(expressLayouts);

// Morgan Middleware
app.use(morgan("dev"));

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

// Express Sessions Middleware
app.use(session({
  secret: '123',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Bring the Dashboard
const dashboardRoute = require("./routes/admin/dashboard");

// Register Dashboard Routes
app.use('/dashboard', dashboardRoute);

// Bring the Posts Routes
const postsRoute = require('./routes/front-end/posts');

// Register Posts Routes
app.use('/', postsRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`App listening on port ${port}!`));
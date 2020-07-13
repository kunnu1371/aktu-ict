const express = require("express");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

// Passport Config
require("./config/passport")(passport);

// db connection
require("./config/dbConnection");

// EJS
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

app.use("*", (req, res) => {
  res.send("This route does not exists!!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

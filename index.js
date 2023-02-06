const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

//used for session cookie and authentication
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");

//mongo store is used to store the seeion cookie in the db
//using for loggin if even if restart server
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const customMware = require('./config/middleware');


app.use(express.urlencoded({ extended: true })); //read through post request
app.use(cookieParser());
app.use(express.static("./assets"));
//make the upload path availabel to browser
app.use('/uploads',express.static(__dirname + '/uploads'));

//extract styles and scripts from sub page into layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(expressLayouts);

//set up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the seeion cookie in the db
app.use(
  session({
    name: "codeial", //todo the secret befor deployment in production mode.
    secret: "blahsomething", //key to encrypt
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/codeial_development",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());



app.use(passport.setAuthenticatedUser);


app.use(flash());
app.use(customMware.setFlash);

//use express router(no need to give /index)
//tell all root request go to routes/index
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`); //callled interpolation `Error in running the server: ${err}`
  }
  console.log(`Server is running on Port ${port}`);
});

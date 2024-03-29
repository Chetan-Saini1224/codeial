const express = require("express");
const env = require("./config/environment");

//to create log for error in production
const looger = require("morgan")



const cookieParser = require("cookie-parser");
const app = express();
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

//to use the menifest file to access assets(.min) 
require("./config/view_helper")(app);

//used for session cookie and authentication
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");



//mongo store is used to store the seeion cookie in the db
//using for loggin if even if restart server
const MongoStore = require("connect-mongo");
const flash = require('connect-flash');
const customMware = require('./config/middleware');


//set up the chat server to be used with socket.io
//when scale up put this is seprate file
const chatServer = require('http').Server(app);
const chatSocket = require("./config/chat_sockets").chatSockets(chatServer);
chatServer.listen(5000);

app.use(express.urlencoded({ extended: true })); //read through post request
app.use(cookieParser());
app.use(express.static(env.asset_path));


app.use(looger(env.morgan.mode,env.morgan.options))


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
    secret: env.session_cookie_key, //key to encrypt
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    // session data is not being persisted between server restarts. 
    //This can happen if you are using the default in-memory 
    //session store that is provided by express-session
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/codeial_development",
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);


app.use(flash()); //set the req.flash 
app.use(customMware.setFlash); //get the value for req.flash and set in res.message to use noty on frontend.



//use express router(no need to give /index)
//tell all root request go to routes/index
app.use("/", require("./routes"));

app.listen(port, (err) => {
  if (err) {
    console.log(`Error in running the server: ${err}`); //callled interpolation `Error in running the server: ${err}`
  }
  console.log(`Server is running on Port ${port}`);
});

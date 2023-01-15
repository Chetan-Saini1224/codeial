const express = require('express');
const app = express();
const port  = 8000;
const expressLayouts = require("express-ejs-layouts");

app.use(express.static('./assets'));

app.use(expressLayouts);

//use express router(no need to give /index)
//tell all root request go to routes/index
app.use('/',require('./routes'));

//set up view engine
app.set('view engine','ejs');
app.set("views",'./views');

app.listen(port,(err) =>{
if(err)
{
    console.log(`Error in running the server: ${err}`);    //callled interpolation `Error in running the server: ${err}`
}
console.log(`Server is running on Port ${port}`)
});
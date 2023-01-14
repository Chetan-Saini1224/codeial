const express = require('express');
const app = express();
const port  = 8000;

//use express router(no need to give /index)
//tell all root request go to routes/index
app.use('/',require('./routes'));

app.set('view engine',ejs);
app.set("views",'./views');

app.listen(port,(err) =>{
if(err)
{
    console.log(`Error in running the server: ${err}`);    //callled interpolation `Error in running the server: ${err}`
}
console.log(`Server is running on Port ${port}`)
});
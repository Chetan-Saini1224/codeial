const express = require('express');
const app = express();
const port  = 8000;

//use express router(no need to give /index)
app.use('/',require('./routes'));


app.listen(port,(err) =>{
if(err)
{
    console.log(`Error in running the server: ${err}`);    //callled interpolation `Error in running the server: ${err}`
}
console.log(`Server is running on Port ${port}`)
});
const express = require('express');
const app = express();
const port  = 8000;


app.listen(port,(err) =>{
if(err)
{
    //callled interpolation
    console.log(`Error in running the server: ${err}`);
}
console.log(`Server is running on Port ${port}`)
});
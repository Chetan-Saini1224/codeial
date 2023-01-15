//module.export.actionName = function(req,res){}
const fs = require('fs'); //not working path file

module.exports.home = function(req,res)
{
    return res.render("home",{title:"home"})
}






















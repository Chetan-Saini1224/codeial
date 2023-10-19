//reading meneifist to provide the correct path for assets
const env = require("./environment");
const fs = require("fs");
const path = require("path");

//this will recieve express app instance
module.exports = (app) => {
    app.locals.assetPath = function(filepath){
        if(env.name == 'development'){
            return filepath;
        }
        return  '/' + JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assets/rev-manifest.json')))[filepath];
    }
}


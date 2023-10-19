//put all creditenials and imp info here
//we dont want other developer to access this
const rfs = require("rotating-file-stream");
const path = require("path");
const fs = require("fs");

const logDirectory = path.join(__dirname,'../production_log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log',{
    interval: '1d',
    path:logDirectory
})


const development = {
    name:"development",
    asset_path: "./assets",
    session_cookie_key: "blahsomething",
    db:"codeial_development",
    smtp:{
        service: 'gmail',
        //google create it for developer to interact with mailing server
        host: 'smtp.gmail.com',
        port: 587,
        secure:false, //like not using two factor auth
        auth:{
            user: 'cs75198404',
            pass: 'eamysdppgibdeppy'
        }
    },
    google_client_id: "468337025118-572s86nojicuhgelvsl62sbk7ti4h6mq.apps.googleusercontent.com",
    google_client_secret: "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",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: "codeial",
    morgan:{
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}

//in terminal :- $env:key='value'
//after that we can use this key in .....(process.env) 
const production = {
    name:"production",
    asset_path: "./assets",
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service: 'gmail',
        //google create it for developer to interact with mailing server
        host: 'smtp.gmail.com',
        port: 587,
        secure:false, //like not using two factor auth
        auth:{
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan:{
        mode: 'combined',
        options: {stream: accessLogStream}
    }
}



module.exports = eval(process.env.CODEIAL_ENVIRONMENT == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT)) ;

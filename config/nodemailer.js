const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const env = require("./environment")

//error
//https://stackoverflow.com/questions/59188483/error-invalid-login-535-5-7-8-username-and-password-not-accepted


//not good practice to put all in code
const transporter = nodemailer.createTransport(env.smtp);


//html email template
let renderTemplate = (data,relativePath) => {
    let mailHtml;
    //console.log(__dirname);
    ejs.renderFile(
        path.join(__dirname,"../views/mailers",relativePath),
        data,
        function(err,template){
            if(err)
            {
                console.log("error in rendering mailer template",err);
                return;
            }

            mailHtml = template;
        }
    )
    return mailHtml;
}



module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
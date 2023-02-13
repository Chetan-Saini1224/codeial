const nodemailer = require("../config/nodemailer");

//this is another way of exporting a method
exports.resetPassword = (resetToken) => {
    nodemailer.transporter.sendMail({
        from:'chetan@codeial.com',
        to: resetToken.user.email,
        subject: "Reset Password",
        html: `<p>click here to <a href='http://localhost:8000/users/resetpassword/${resetToken.accesstoken}'>Reset Password</a></p>`
    },(err, info) => {
            if(err)
            {
                console.log('error in sending mail ',err);
                return;
            }
            console.log("mail sent to reset password");
            return;
    })
}

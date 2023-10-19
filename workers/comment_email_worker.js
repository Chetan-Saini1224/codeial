const queue = require("../config/kue");

const commentsMailer = require("../mailers/comments_mailer");


//every worker has process function tell worker 
//whenever new job added run this process fun.

queue.process('emails',function(job, done){
    console.log("emails worker",job.data);
    commentsMailer.newComment(job.data);
    done();
})

//config kue -> create worker(which is going to send mail
//instead of controller) -> put into queue in controller action
const kue = require("kue");

const queue = kue.createQueue();

module.exports = queue;


//different worker can also run on same queue
//one queue is of similar job ex:- noti,email..



//config kue -> create worker(which is going to send mail 
// instead of controller) -> put into queue in controller action
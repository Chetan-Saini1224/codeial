//observer
module.exports.chatSockets = function(socketServer)
{
    let io = require('socket.io')(socketServer,{ cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    
    //event ocuuring here and client side must have same name  
    io.sockets.on('connection',function(socket){
        console.log('new connection recieved',socket.id);

       //this event fire from browser when client disconnect 
       socket.on("disconnect",function(){
        console.log('socket disconnected !');
       })

       
        socket.on('join_room',function(data) {
        console.log("joinig req recieved",data);
        
        socket.join(data.chatroom);
         
        //tell the whole room someone joined
        io.in(data.chatroom).emit('user_joined',data);
       });

       socket.on('send_message',function(data){
          io.in(data.chatroom).emit('receive_message',data);
       })

    })
}
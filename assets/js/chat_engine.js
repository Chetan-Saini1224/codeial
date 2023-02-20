
//after creating initiate this class
class chatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        //io given to use socket.io file(CDN) 
        //this will fire event connection(check in config)
        this.socket = io.connect('http://localhost:5000');
         if(this.userEmail)
         {
            this.connectionHandler();
         }

    }

    connectionHandler(){        
        //change this because this changed in on connect
        let self =  Object. assign({}, this);
        
        //server emit this connect event(automatically) 
        this.socket.on('connect',function(){
            console.log("connection established");

            //event name must same as on server side
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom: 'codeial'
            });
            self.socket.on('user_joined',function(data)
            {
                console.log('a user joined',data);
            });
        });

        $("#send-message").click(function(){
            let msg = $("#chat-message-input").val();

            if(msg)
            {
                self.socket.emit('send_message',{
                    message:msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                })     
            }
        });


        self.socket.on('receive_message',function(data){
            console.log('message recieved', data);

            let messageType = 'other-message';
            if(data.user_email == self.userEmail)
            {
                messageType = 'self-message'
            }

            $("#display-chat").append(`<li class=${messageType}> <span> ${data.message} </span> </li>`);

        })
    }
}
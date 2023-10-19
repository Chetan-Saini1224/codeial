
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



dragElement(document.getElementById("chatbox"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById("chatbox")) {
    // if present, the header is where you move the DIV from:
    document.getElementById("chatbox").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
$(function() {
    const socket = io();
    var user = '';
    // We access to elements from the DOM
    const messageForm = $('#message-form'); //i'm accessing the form with id 'message-form'
    const messageBox = $('#message');
    const chat = $('#chat');
    const userForm = $('#user-form');
    const userError = $('#user-error');
    const username = $('#username');
    const usernames = $('#usernames');


    //Events
    messageForm.submit(e => {
        e.preventDefault();
        socket.emit('send message', messageBox.val()); //sending the message to the server
        messageBox.val(''); //clearing the message box
    });
    // get response from server
    socket.on('receive message', function(message){
        let color = '#f4f4f4';
        if (message.username == user) {
            color = '#9ff4c5';
        }
         chat.append($(`<div class="msg-area mb-2 d-flex"style="background-color:${color}"><b>${message.username} :</b><p class="msg">${message.msg}</p></div>`));
    });

    userForm.submit(e => {
        e.preventDefault();
        socket.emit('add user', username.val(), message =>{
            if(message){
                user = username.val();
                $('#user-wrap').hide();
                $('#container-wrap').show();
            }else{
                userError.html('<div class="alert alert-danger">El usuario ya existe</div>');
            }
            username.val('');
        }); // creating a new user
    });

    socket.on('name users', message =>{
        let html = '';
        let color = '';
        let exit = '';
        for(let i = 0; i < message.length; i++){
            if(user == message[i]){
                color = "#027f43";
                exit = '<a class ="exit-link" href="/">Exit</a>';
            }else{
                color = "#000";
                exit = '';
            }
            html += `<p style="color: ${color}">${message[i]} ${exit}</p>`; 
    }
    usernames.html(html);
    });

    });



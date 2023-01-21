module.exports = (io) => {
    let userNames = [];
    io.on('connection', socket => {
        console.log("new user connected");
        socket.on('send message', (message) => {
            io.emit('receive message', {
                msg:message,
                username: socket.username
            });
        });
        socket.on('add user', (message, callback)=>{
            if(userNames.indexOf(message) !=-1){
                callback(false);
            }else{
                callback(true);
                socket.username = message;
                userNames.push(socket.username);
                io.sockets.emit('name users', userNames);
            }
        });

        socket.on('disconnect',message => {
            if(!socket.username){
                return;
            }else{
                userNames.splice(userNames.indexOf(socket.username),1);
                io.sockets.emit('name users', userNames);
            }
        });
    });
}





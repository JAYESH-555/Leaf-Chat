// Node Server which will handle socket io connections.
const io = require('socket.io')(8000) // ye socket.io ek server hai jo 8000 port pe run ho rha hai 

const users = {};


// ye io.on sare connections ko handle karta hai jo bhi event io server pe ho rhe hai yaha pe jo 'connection' likha hua hai wo inbuild hai
io.on('connection', socket => {
    // If any new user joins, let other users connected to the server know!
    // ye pe jo new-user-joined event likha hai wo custom hai wo humne likha hai waha pe koi bhi naam de sakte hai and wo event ko client.js file me handle karne wale hai 
    // socket.on sare event ko listen karta hai means receive kar rha hai 
    // socket.on will listen incoming data 

    socket.on('new-user-joined', name => {
        // console.log("New user", name) This was for just to check in console tab 
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    //If someone sends a message, broadcast it to other people.
    socket.on('send', message => {
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id] })
    });

    //If someone leaves or disconnects the chat then let others know.
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id] )
        delete users[socket.id];
    });
})


var express=require('express');
var app =express();
let http=require('http').Server(app);

const port =process.env.port || 3001 || '127.0.0.1';

let io=require('socket.io')(http)

app.use(express.static('public'));


http.listen(port, ()=>{
    console.log('listening 0n :',port);
})

io.on('connection',socket=>{
    console.log('user connected');

    socket.on('chat message',function(msg){
        console.log('msg:',msg)
        io.emit('chat message',msg)
    })
    
})

     

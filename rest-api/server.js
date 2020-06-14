const http=require('http');
const app=require('./app');

//PORT
const port = process.env.PORT || 3002 || '127.0.0.1';

//SERVER
const server= http.createServer(app);

//LISTENING
server.listen(port, function(){
    console.log('listening on *:3000');
  });

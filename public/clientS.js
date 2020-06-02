const socket = io(); //location of where server is hosting socket app

socket.on('chat-message', data =>{
    console.log(data)
});

// query DOM
// const message = document.getElementById('message');
//       handle = document.getElementById('handle');
//       button =  document.getElementById('submit');
//       output = document.getElementById('output');


// // Emit events

// button.addEventListener('click', () =>
// {
//     socket.emit('chat', {
//         message: message.value,
//         handle: handle.value
//     })
// }) 

// // Listen to events

// socket.on('chat', (data)=>{
//     output.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>'
// })

//get usermedia

function getLVideo(callbacks){

    navigator.getUserMedia=navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia
    var constraints={
        audio:true,
        video:true
    }
    navigator.getUserMedia(constraints,callbacks.success,callbacks.error)

}

function recStream(stream, elemid){

    var video=document.getElementById(elemid)

    video.srcObject=stream
    window.peer_stream=stream

}


    getLVideo({
        success:function(stream){
            window.localstream=stream
            recStream(stream,'lVideo')
        },
        error:function(err){
            alert("cant access camera:")
            console.log(err)
        }
    })


//creste peer

var conn
var myID
var peerid
var peer = new Peer();

//GENERATING MY ID
    peer.on('open', function(id) {
        document.getElementById("displayId").innerHTML=id
        console.log('My peer ID is: ' + id);
        myID=id
        socket.emit('callID', id)
    });


//connection establishment
  peer.on('connection', function(connection) { 
    console.log('connection established: ' + connection);
    conn=connection
    peerid=connection.peer
    document.getElementById("connId").value=peerid

   });


//ERROR DISPLAY
  peer.on('error', function(err) { 
    console.log('err: ' + err);
   });



socket.on('callID', function(id) {
    if(id!=myID){
        peerid=id
    }
    })

//CALL CALLING PEER

var options = {
    'constraints': {
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': true
        }
    }
}

peer.on("call",function(call)
{
    var acceptCall=confirm("Agree to take a call")

    if(acceptCall)
    {
        call.answer(window.localstream,options)

        call.on("stream",function(stream){
            window.peer_stream=stream
            recStream(stream,'rVideo')
        })

        call.on("close",function(){
            alert("call ended")
        })
    }else{
        alert("call denied")
    }
})

//CALL BUTTON EVENTS



document.getElementById("call_btn").addEventListener('click',function(){

    peerid=document.getElementById("connId").value

    var conn = peer.connect('another-peers-id');

   if(conn)
   {
    console.log("connnected",conn)
   }else
   {
       return false
   }
    console.log("calling peer",peerid)
    console.log(peer)


    var call=peer.call(peerid,window.localstream,options)

    call.on("stream",function(stream){
        window.peer_stream=stream

        recStream(stream,'rVideo')
    })
})
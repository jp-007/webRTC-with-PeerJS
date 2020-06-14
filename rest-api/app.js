const express=require("express");
const app=express();
const morgan=require('morgan')
const userRoute=require('./api/routes/users')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

//BODY PSARSER
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//DATABASE CONNECTION
/***************************************************************************/

mongoose.connect('mongodb+srv://jp_007:jpatmongoDB@jp-node-rest-epsyl.mongodb.net/video_call_app?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() => console.log( 'Database Connected' ))
.catch(err => console.log( err ));

/***************************************************************************/


//ACCESS CONTROL CORS ERRORS
/***************************************************************************/

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-with, Content-Type, Accept, Authorization"
            )
    
            if(req.method==='OPTIONS'){
                res.header("Access-Control-Allow-Metods","GET, POST, DELETE, PUT, PATCH")
                return res.status(200).json({

                })
            }
        next()
})

/***************************************************************************/


//LOGGING REQUESTS
app.use(morgan('dev'))


//ROUTING
/***************************************************************************/

app.use('/users',userRoute);
app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);  
});
app.use((error,req,res,next)=>{
    res.status(error.status ||500)
    res.json({
        message:error.message
    })
})
/***************************************************************************/


//EXPORTS
module.exports=app;
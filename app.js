const express =require('express');
const bodyParser =require('body-parser');

const placesRoutes =require('./routes/place-routes');
const userRoutes =require("./routes/users-routes");
const HttpError =require("./modules/http-error");
const app =express();

app.use(bodyParser.json());

app.use('/api/places',placesRoutes); 

app.use('/api/users',userRoutes); 

app.use((req,res,next)=>{
    const error =new HttpError("Could not find this route", 404);
    throw error;

})

app.use((error, req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message : error.message || "Unknown error"})
    // if error message exists then fine, or show unknown error
})
// will be executed if the middleware has error i.e if they have error parameter

app.listen(8000);
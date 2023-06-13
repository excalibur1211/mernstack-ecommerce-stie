const  app=require("./app");
const dotenv=require("dotenv");
const cloudinary = require("cloudinary");
//const connectDataBase=require("./db/DataBase.js");
const connectDB = require("./db/DataBase.js");
const PORT = process.env.PORT || 3001;
const path = require('path');
const  express=require("express");
// Handling uncaught Exception
process.on("uncaughtException",(err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server for Handling uncaught Exception`);
})

//CONFIG
dotenv.config({
    path:"backend/config/.env"
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//connect data base
connectDB();



  // Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  });

 
//create server
const server=app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  
});


// Unhandled promise rejection
process.on("unhandledRejection", (err) =>{
    console.log(`Shutting down server for ${err.message}`);
    console.log(`Shutting down the server due to Unhandled promise rejection`);
    server.close(() =>{
        process.exit(1);
    })
});
require("dotenv").config();
const express = require("express");
const sequlize = require('./db');
const models = require("./models/models.js")
const cors = require("cors")
const router = require("./routes/index.js");
const fileUpload = require("express-fileupload");
const path = require("path")
const errorHandler = require("./middleware/ErrorHandlingMiddleware.js");


const PORT = process.env.PORT || 3300;

const app = express()
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

//обработка ошибок
app.use(errorHandler)

app.get("/", (req, res)=>{
    res.status(200).json({message: "юля ghfghfhghg"})
})


const start = async () =>{
    try{
        await sequlize.authenticate()
        await sequlize.sync()
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    }
    catch(e){
        console.log(e);
        
    }
}

start()
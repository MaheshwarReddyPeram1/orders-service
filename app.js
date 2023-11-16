
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const eurekaHelper = require('./eureka-helper');

const multer = require("multer")

BUCKET_NAME = "auto-manage-peram"
BUCKET_REGION = "us-east-2"

Access_key = "AKIAVTTETVLIYOBAK7MQ"
Secret_access_key = "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"

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
// const cookieParser = require('cookie-parser');
const port = 8085;


//controllers

// const {
//   userId,
//   signUp,
//   getuser,
//   getAllUser,
//   updatepassword,
//   signIn,
// } = require("./controller/user");

const {addOrder, getAllOrders, getOrderById, updateOrder, deleteOrder, userOrders, getCarOrders} = require("./controller/cars")


// middlewares

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect('mongodb+srv://peramm:Mahimahi123@cluster0.ixrmeo2.mongodb.net/?retryWrites=true&w=majority' , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("DB Connected")
  }).catch(error=>{console.log('Error Occured while connecting to database : ',error)});




const db = mongoose.connection;
db.once("open",()=>{
    console.log('Connected Successfully!')
})


app.post("/api/addOrder", addOrder);
app.get("/api/getAllOrders", getAllOrders);
app.get("/api/order/:id", getOrderById);
app.put("/api/updateOrder", updateOrder);
app.get("/api/delete/:id", deleteOrder);
app.get("/api/userOrders/:id", userOrders);
app.get("/api/getCarOrders/:id", getCarOrders);








app.listen(port,()=>{
    console.log(`listening to the port ${port}`)
});



// eurekaHelper.registerWithEureka('product-service', port);





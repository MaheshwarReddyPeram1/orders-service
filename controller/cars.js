const  Order = require("../models/Orders");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { async } = require("rxjs");
const multer = require("multer")
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");

// const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

BUCKET_NAME = "auto-manage-peram"
BUCKET_REGION = "us-east-2"

Access_key = "AKIAVTTETVLIYOBAK7MQ"
Secret_access_key = "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"

// const s3 = new S3Client({
//     credentials:{
//         accessKeyId: Access_key,
//         secretAccessKey: Secret_access_key
//     },
//     region: BUCKET_REGION
// })


//add car
exports.addOrder = (req, res) => {
    
    // const params = {
    //     Bucket: BUCKET_NAME,
    //     Key: req.file.originalname,
    //     Body: req.file.buffer,
    //     ContentType: req.file.mimetype
    // }
    // console.log("hiiii", params);

    // const imagedata = new PutObjectCommand(params)
    // s3.send(imagedata)

    let orderBody = new  Order({
        userId: req.body.userId,
        carId: req.body.carId,
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        state: req.body.state,
        zipCode: req.body.zipCode,
        creditScore: req.body.creditScore,
        start: req.body.start
    });
    orderBody.save(async(err, orderData) => {
        if (err || !orderData) {
            return res.status(400).json({ message: err });
        }
        res.status(200).json({ message: "successfully created", status: 200, order: orderData });
    });
}

//find all cars
exports.getAllOrders = (req, res) =>{
    Order.find().exec(async(err, orders) => {
        if (err) {
            return res.status(200).json({
                error: "can`t get cars",
            });
        }
        
        console.log(orders);
        res.json(orders);
    });
}
// //get car by id
exports.getOrderById = (req, res) =>{
    console.log(req);
    let id = req.params.id
    Order.findById(id).exec((err, orderData) =>{
        if (err) {
            return res.status(200).json({
                error: "can`t get car details",
            });
        }
        res.json(orderData);
    })
}


exports.updateOrder = (req, res) => {
    let id = req.body._id
    
    delete req.body['_id']
    Order.findOneAndUpdate(
            { id: id },
            { $set: req.body }
        ).exec((err, cardata) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ message: "car details are not updated" });
            }
            return res.status(200).json({ message: "car details updated" });
        });
};

exports.userOrders = (req, res) => {
    let id = req.params.id
    Order.find(
            { userId: id },
        ).exec((err, cardata) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ message: "car details are not updated" });
            }
            return res.status(200).json({ status:200, cardata});
        });

};

exports.getCarOrders = (req, res) => {
    let id = req.params.id
    Order.find(
            { carId: id },
        ).exec((err, cardata) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ message: "car details are not updated" });
            }
            return res.status(200).json({ status:200, cardata});
        });
};

exports.deleteOrder = async (req, res) => {
    let id = req.params.id
    await  Order.deleteOne({ _id: id });
    res.status(200).json({ status:200, message: 'successfull' })
  }

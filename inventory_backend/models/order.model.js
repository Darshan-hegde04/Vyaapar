const mongoose = require('mongoose');

const orderSchema=new mongoose.Schema(
    {
        productName:
    {
        type: String,
        required:true,
    },

    productid:{
        type: Number,
        requried:true,
    },

    BarcodeNo:
    {
        type: Number,
        required:true,
    },

    Category:
    {
        type:Number,
        required:true,

    },
    
    orderValue:
    {
        type:Number,
        requeired:true
    },

    

    Quantity:
    {
        type: Number,
        required:true,
        default:0,
    },

    Unit:
    {
        type:Number,
        required:true,
        default:0,
    
    },

    BuyingPrice:
    {
        type:Number,
        required:true,

    },

    DateofDelivery:
    {
        type:Date,
        required:false,
    },

    },
    {
        timestamps: true
    }
)

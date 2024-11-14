const mongoose = require("mongoose");
const productSchema=new mongoose.Schema(
{ 
    Image:
    {
        type:String,
        required:false,
    },

    productName:
    {
        type: String,
        required:false,
    },

    productId:
    {
        type:Number,
        required:true,
    },

    barcodeNo:
    {
        type: Number,
        required:false,
    },

    Category:
    {
        type:Number,
        required:false,

    },

    BuyingPrice:
    {
        type:Number,
        required:false,

    },

    Quantity:
    {
        type: Number,
        required:false,
        default:0,
    },

    Unit:
    {
        type:Number,
        required:false,
        default:0,
    
    },

    expiryDate:{
        type:Date,
        required:false,
    },

    thresholdValue:
    {
        type:Number,
        required:false,
    },
},
{
    timestamps: true
}
)
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
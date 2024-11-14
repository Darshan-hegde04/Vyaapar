const mongoose = require('mongoose');
const supplierSchema=new mongoose.Schema(
    {
        supplierName:
        {
            type:String,
            required:false,
        },

        product:
        {
            type:Array,
            required:false,

        },

        Category:
        {
            type:Selection,
            required:false,
        },

        BuyingPrice:
        {
            type:Number,
            required:false,
        },

        ContanctNumber:
        {
            type:Number,
            required:false,
        },

        Type:{
            type:Selection,
            required:false,
        }


    },
    {
        timestamps:true
    }
)
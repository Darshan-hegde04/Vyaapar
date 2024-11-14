const mongoose = require('mongoose');

const ledgerSchema=new mongoose.Schema(
    {
        customer:
        {
            type:'string',
            required:true,
        },

        orderValue:
        {
            type:String,
            required:true,
        },

        itemList:
        {
            type:String,
            required:true,

        },

        dueAmount:
        {
            type:Number,
            required:false,
        },

        dueDate:
        {
            type:Date,
            required:false,
        },

        Status:
        {
            type:Selection,
            required:false,
        }

    }
) 
const mongoose = require('mongoose');

const ledgerSchema=new mongoose.Schema(
    {
        customer:
        {
            type:string,
            required:false,
        },

        id:{
            type:Number,
            required:true,
        },

        orderValue:
        {
            type:Number,
            required:false,
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
const ledger = mongoose.model("ledger", ledgerSchema);
module.exports = ledger;
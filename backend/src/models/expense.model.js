  import mongoose, { Schema } from "mongoose";
  import jwt from "jsonwebtoken";
  import bcrypt from "bcrypt";

  const expenseSchema = new Schema(
    {
      title : {
          type:String,
          required : true,
          index : true,
          trim : true,
          lowercase:true
      },
      amount : {
          type:Number,
          required : true,
          trim : true
      },
      date :{
          type : String,
          required : true,
          trim:true
      },
      user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' },
    },
    {
      timestamps: true,
    }
  );

  export const Expense = mongoose.model("Expense", expenseSchema);
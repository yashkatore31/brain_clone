//create the schemas and user models for the db
import mongoose, { Schema, model } from "mongoose";

mongoose.connect('mongodb+srv://ybkatore31:ybkatore31@cluster0.qnnd1.mongodb.net/brainly')
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Connection error:', err));


const UserSchema = new Schema({
    username : {type: String , unique: true },
    password : String
})

export const UserModel = model( "User" ,UserSchema);

const ContentSchema = new Schema({
  title : String,
  link : String,
  tags: [{type: mongoose.Types.ObjectId, ref:'Tag' }],
  userID : {type: mongoose.Types.ObjectId , ref:"User" }
})

export const ContentModel = model( "Content" ,ContentSchema);
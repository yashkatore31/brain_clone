import { Model } from 'mongoose';
//create the schemas and user models for the db

import { Schema,Model } from "mongoose";

const UserSchema = new Schema({
    username : {type: String , unique: true },
    password : String
})

export const UserModel = new Model(UserSchema , "User");
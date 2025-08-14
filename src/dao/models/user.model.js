import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema(
    {
        first_name:String,
        last_name:String,
        email:String,
        age:Number,
        password:String,
        role:
        {
            type:String,
            enum:['user','admin','superadmin'],
            default: 'user'
        }
    }
)

const userModel = mongoose.model(collection, schema);

export default userModel;
import mongoose from "mongoose";

export const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,   //this is used to define relation between user and blog
        ref:"User",                      //this is used to define relation between user and blog
        required: true
    } 
})


export default mongoose.model("Blog", BlogSchema);
import mongoose, { mongo } from "mongoose";

export const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    blogs:[{type: mongoose.Types.ObjectId, ref: "Blog", required: true}]  //this is used to define relation between user and blog
});

export default mongoose.model("User", UserSchema);
//users
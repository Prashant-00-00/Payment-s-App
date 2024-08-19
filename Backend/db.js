import mongoose from "mongoose";

mongoose.connect("mongodb+srv://prashant:RbZhgAXkd1YF9O9I@prashant-cluster.a3uiuae.mongodb.net/Self-Paytm");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: 5
    },
    password: String, // Corrected
    firstName: String,
    lastName: String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

export const User = mongoose.model("User", userSchema); // Using mongoose.model() directly
export const Account = mongoose.model("Account", accountSchema); // Using mongoose.model() directly

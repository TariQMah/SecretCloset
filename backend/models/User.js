import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    email: {
        type: String,
        required: [true, "Please enter a email"],
        unique: [true, "Email already exist"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password must be at least 6 character"],
        select: false
    },
    isSuperAdmin: {
        type: Boolean,
        default: false,
        select: false
    }
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next();
})

userSchema.methods.matchPassword = async function (password) {

    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = async function (password) {
    return jwt.sign({ _id: this._id }, process.env.SECRET)
}



export const User = mongoose.model("User", userSchema)
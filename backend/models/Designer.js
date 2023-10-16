import mongoose from "mongoose"

const designerSchema = new mongoose.Schema({
    logo: {
        public_id: String,
        url: {
            type: String,
            required: [true, "Please enter designer logo"]
        }
    },
    profileImage: {
        public_id: String,
        url: String
    },
    title: {
        type: String,
        required: [true, "Please enter designer name"]
    },
    description: String,
    contact: {
        phone: String,
        email: String,
        address: String,
        website: String,
    },
    socialMedia: {
        facebook: String,
        instagram: String,
    },
    collections: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection"
    }
});


export const Designer = mongoose.model("Designer", designerSchema);

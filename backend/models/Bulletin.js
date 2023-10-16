
import mongoose from "mongoose"

const bulletinSchema = new mongoose.Schema({
    cover: {
        type: String,
        required: [true, "Please enter cover"]
    },
    featureTitle: {
        type: String,

    },
    title: {
        type: String,
        required: [true, "Please enter a title"]
    },
    date: {
        type: String,
    },
    summary: String,
    content: String,
    isActive: {
        type: Boolean,
        default: false,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    }
});



export const Bulletin = mongoose.model("Bulletin", bulletinSchema)
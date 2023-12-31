
import mongoose from "mongoose"

const spottedSchema = new mongoose.Schema({
    cover: {
        type: String,
        required: [true, "Please enter cover"]
    },
    eventName: {
        type: String,

    },
    title: {
        type: String,
        required: [true, "Please enter a title"]
    },
    date: {
        type: String,
    },
    category: {
        ref: "SpottedCategory",
        type: mongoose.Schema.Types.ObjectId,
    },

    order: Number,

    summary: String,

    isActive: {
        type: Boolean,
        default: false,
    },
    isHome: {
        type: Boolean,
        default: false,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    }
});



export const Spotted = mongoose.model("Spotted", spottedSchema)
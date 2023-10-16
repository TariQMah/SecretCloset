import mongoose from "mongoose"

const spottedCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"]
    },
    isActive: {
        type: Boolean,
        default: true,
    }
});



export const SpottedCategory = mongoose.model("SpottedCategory", spottedCategorySchema)
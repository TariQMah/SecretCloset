
const mongoose = require("mongoose")

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



module.exports = mongoose.model("SpottedCategory", spottedCategorySchema)
import mongoose from "mongoose"

const collectionSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Designer"
    },

    album: {
        title: {
            required: [true, "Please enter collection name"],
            type: String
        },
        photos: [{
            image: {
                type: String,
                required: [true, "Image is required"]
            },
            order: Number,
        }],
        order: Number,
        isActive: {
            type: Boolean,
            default: true
        },
        isLatest: {
            type: Boolean,
            default: false
        },
    }

});

export const Collection = mongoose.model("Collection", collectionSchema)
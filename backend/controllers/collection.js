import { Collection } from "../models/Collection.js"

export const createCollection = async (req, res) => {

    try {
        const { title, photos, order, isActive, isLatest, designer } = req.body

        const newCollectionData = {
            owner: designer,
            album: {
                title,
                photos: photos?.map((item, index) => {
                    return {
                        image: item,
                        order: index + 1
                    }
                }),
                order,
                isActive,
                isLatest
            }
        }
        const newCollection = await Collection.create(newCollectionData)
        res.status(201).json({
            success: true,
            collection: newCollection
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
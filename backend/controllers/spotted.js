import { Spotted } from "../models/Spotted.js"
import { SpottedCategory } from "../models/SpottedCategory.js"

export const createSpotted = async (req, res) => {

    try {
        const { cover, eventName, title, date, category, order, summary, isActive, isHome, isFeatured } = req.body

        const newSpottedData = {
            cover,
            eventName,
            title,
            summary,
            date,
            category,
            order,
            summary,
            isActive,
            isHome,
            isFeatured

        }

        const newSpotted = await Spotted.create(newSpottedData)

        res.status(201).json({
            success: true,
            designer: newSpotted
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}


export const getAllSpotted = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const queryOptions = {
            skip: skip,
            limit: limit,
        };

        const totalRecords = await Spotted.countDocuments({});

        const spottedRecords = await Spotted.find({}, {}, queryOptions);

        res.status(200).json({
            success: true,
            totalRecords: totalRecords,
            currentPage: page,
            spotted: spottedRecords,
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const updateSpotted = async (req, res) => {
    try {
        const spottedId = req.query.id;
        const { cover, eventName, title, date, category, order, summary, isActive, isHome, isFeatured } = req.body;

        const updatedSpottedData = {
            cover,
            eventName,
            title,
            summary,
            date,
            category,
            order,
            summary,
            isActive,
            isHome,
            isFeatured,
        };

        const updatedSpotted = await Spotted.findByIdAndUpdate(spottedId, updatedSpottedData, { new: true });

        if (!updatedSpotted) {
            return res.status(404).json({
                success: false,
                message: 'Spotted not found',
            });
        }

        res.status(200).json({
            success: true,
            spotted: updatedSpotted,
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteSpotted = async (req, res) => {
    try {
        const id = req.query.id;
        const deletedSpotted = await Spotted.findByIdAndRemove(id);

        if (!deletedSpotted) {
            return res.status(404).json({
                success: false,
                message: 'Spotted not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Spotted deleted successfully',
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
};


export const createSpottedCategory = async (req, res) => {

    try {
        const { title } = req.body

        const newSpotted = await SpottedCategory.create({ title })

        res.status(201).json({
            success: true,
            designer: newSpotted
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}
export const updateSpottedCategory = async (req, res) => {
    try {
        const categoryId = req.query.id;
        const { title } = req.body;

        const updatedCategory = await SpottedCategory.findByIdAndUpdate(categoryId, { title }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }

        res.status(200).json({
            success: true,
            category: updatedCategory,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteSpottedCategory = async (req, res) => {

    try {
        const id = req.query.id;
        const deletedSpottedCategory = await SpottedCategory.findByIdAndRemove(id);

        if (!deletedSpottedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Category deleted successfully',
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}



export const getAllSpottedCategories = async (req, res) => {
    try {

        const spottedRecords = await SpottedCategory.find();

        res.status(200).json({
            success: true,
            data: spottedRecords,
        });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
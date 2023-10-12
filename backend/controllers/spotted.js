const Spotted = require("../models/Spotted")
const SpottedCategory = require("../models/SpottedCategory")

exports.createSpotted = async (req, res) => {

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


exports.getAllSpotted = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters
        const limit = parseInt(req.query.limit) || 10; // Get the number of records to display per page from the query parameters

        const skip = (page - 1) * limit; // Calculate the number of records to skip

        // Query options to fetch the Spotted records with pagination
        const queryOptions = {
            skip: skip,
            limit: limit,
        };

        const totalRecords = await Spotted.countDocuments({}); // Get the total number of Spotted records

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


exports.updateSpotted = async (req, res) => {
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


exports.createSpottedCategory = async (req, res) => {

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

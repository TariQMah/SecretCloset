import Bulletin from "../models/Bulletin.js"

exports.createBulletin = async (req, res) => {

    try {
        const { cover, eventName, title, date, category, order, summary, isActive, isHome, isFeatured } = req.body

        const newBulletinData = {
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

        const newBulletin = await Bulletin.create(newBulletinData)

        res.status(201).json({
            success: true,
            designer: newBulletin
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}


exports.getAllBulletin = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const queryOptions = {
            skip: skip,
            limit: limit,
        };

        const totalRecords = await Bulletin.countDocuments({});

        const bulletinRecords = await Bulletin.find({}, {}, queryOptions);

        res.status(200).json({
            success: true,
            totalRecords: totalRecords,
            currentPage: page,
            bulletin: bulletinRecords,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.updateBulletin = async (req, res) => {
    try {
        const bulletinId = req.query.id;
        const { cover, eventName, title, date, category, order, summary, isActive, isHome, isFeatured } = req.body;

        const updatedBulletinData = {
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

        const updatedBulletin = await Bulletin.findByIdAndUpdate(bulletinId, updatedBulletinData, { new: true });

        if (!updatedBulletin) {
            return res.status(404).json({
                success: false,
                message: 'Bulletin not found',
            });
        }

        res.status(200).json({
            success: true,
            bulletin: updatedBulletin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.deleteBulletin = async (req, res) => {
    try {
        const id = req.query.id;
        const deletedBulletin = await Bulletin.findByIdAndRemove(id);

        if (!deletedBulletin) {
            return res.status(404).json({
                success: false,
                message: 'Bulletin not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Bulletin deleted successfully',
        });


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }
};


import { Designer } from "../models/Designer.js"

export const createDesigner = async (req, res) => {

    try {
        const { logo, profileImage, title, description, phone, email, address, facebook, instagram, website } = req.body

        const newDesignerData = {
            logo: {
                url: logo,
                public_id: "ID",
            },
            profileImage: {
                public_id: "ID",
                url: profileImage
            },
            title, description,
            contact: {
                email, address, phone, website
            },
            socialMedia: {
                facebook, instagram
            },

        }

        const newDesigner = await Designer.create(newDesignerData)

        res.status(201).json({
            success: true,
            designer: newDesigner
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}

export const updateDesigner = async (req, res) => {
    try {
        const designerId = req.query.id;
        const { logo, profileImage, title, description, phone, email, address, facebook, instagram, website } = req.body;

        const updatedDesignerData = {
            logo: {
                url: logo,
                public_id: "ID",
            },
            profileImage: {
                public_id: "ID",
                url: profileImage,
            },
            title,
            description,
            contact: {
                email,
                address,
                phone,
                website,
            },
            socialMedia: {
                facebook,
                instagram,
            },
        };

        const updatedDesigner = await Designer.findByIdAndUpdate(designerId, updatedDesignerData, { new: true });

        if (!updatedDesigner) {
            return res.status(404).json({
                success: false,
                message: 'Designer not found',
            });
        }

        res.status(200).json({
            success: true,
            designer: updatedDesigner,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
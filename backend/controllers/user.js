import { User } from "../models/User.js"


const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true
}
export const register = async (req, res) => {

    try {
        const { name, email, password } = req.body
        console.log('email: ', email);
        let user = await User.findOne({ email })
        console.log('user: ', user);
        if (user) return res.status(400).json({
            message: "User already exists",
            success: false
        })



        const newUserData = {
            name,
            email,
            password
        }

        user = await User.create(newUserData)

        res.status(201).json({
            success: true,
            User: user
        })


    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}


export const login = async (req, res) => {

    try {
        const { email, password } = req.body
        let user = await User.findOne({ email }).select("+password")
        console.log('user: ', user);
        if (!user) return res.status(400).json({
            message: "User does not exists",
            success: false
        })

        const isMatch = await user.matchPassword(password)

        if (!isMatch) return res.status(400).json({
            message: "Incorrect Password",
            success: false
        })

        const token = await user.generateToken()

        res.status(201).cookie("token", token, options).json({
            success: true,
            user,
            token
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })

    }

}
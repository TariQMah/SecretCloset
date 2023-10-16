import mongoose from "mongoose";

export const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then((con) => {
        console.log(`Connected to MongoDB: ${con.connection.host}`)
    }).catch((err) => console.log(`Error in mongoDB ${err}`))
}
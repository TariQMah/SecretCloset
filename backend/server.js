import app from "./app.js"

import { connectDatabase } from "./config/database.js"

connectDatabase()
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})


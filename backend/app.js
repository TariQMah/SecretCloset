import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import designer from "./routes/designer.js";
import spotted from "./routes/spotted.js";
import bulletin from "./routes/bulletin.js";
import collection from "./routes/collection.js";
import user from "./routes/user.js";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: "backend/config/config.env" }); // Corrected the function name to dotenv.config
}

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/spotted", spotted);
app.use("/api/v1/designer", designer);
app.use("/api/v1/collection", collection);
app.use("/api/v1/bulletin", bulletin);
app.use("/api/v1/auth", user);

export default app;
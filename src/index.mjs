import express from "express";
import connectToMongoDB from "./conn.mjs";
import staticRouter from "./routes/staticRouter.mjs";
import path from "path";
import router from "./routes/user.mjs";
import cookieParser from "cookie-parser";
import { AppConfig } from "./config/config.mjs";
import cors from "cors";

const app = express();
const port = AppConfig.PORT || 3000;

// connection to database
connectToMongoDB(AppConfig.DB_URL);
// middlewares
app.use(cors({ credentials: true, methods: ["GET", "POST", "DELETE"] }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", staticRouter);
app.use(express.static(path.resolve("./src/views/static")));
app.use("/api", router);
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

app.listen(port, () => console.log(`Server: http://localhost:${port}`));

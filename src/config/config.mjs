import {config} from "dotenv";

config();

export const AppConfig = {
    DB_URL:`${process.env.DB_URL}${process.env.DB_NAME}`,
    JWT_SECRET:process.env.SECRET_KEY,
    PORT:process.env.PORT
}
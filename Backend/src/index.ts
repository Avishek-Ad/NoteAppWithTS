import express from "express";
import Router from "./routers/routes";
import sequelize from "./libs/database";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
//middleware
import notFound from "./middleware/not-found";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use('/api/v1/notes', Router);

//route not found middleware
app.use(notFound);

const PORT = process.env.PORT || 5000;


const start = async() => {
    await sequelize.sync({ force: true });
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

start();
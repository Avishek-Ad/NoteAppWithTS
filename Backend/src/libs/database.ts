import { Sequelize } from "sequelize";

const sequelize = new Sequelize("note_app", "root", "Password@123", {
    dialect: "mysql",
    host: "localhost",
    port: 3306
});

export default sequelize;
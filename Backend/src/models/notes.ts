import { DataTypes } from "sequelize";
import sequelize from "../libs/database";

const Note = sequelize.define("notes", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tags: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Note;
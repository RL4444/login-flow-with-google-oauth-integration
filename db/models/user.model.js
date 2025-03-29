import { DataTypes } from "sequelize";
import sequelize from "../index.js";

export const User = sequelize.define("user", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  needsEmailConfirmation: {
    allowNull: false,
    defaultValue: false,
    type: DataTypes.BOOLEAN,
  },
  confirmationToken: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  isGoogleAuth: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

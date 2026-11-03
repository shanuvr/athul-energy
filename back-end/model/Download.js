import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Download = sequelize.define(
  "Download",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Document name is required",
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Government Orders",
    },
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "PDF file URL is required",
        },
      },
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fileSize: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "0 KB",
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "2026",
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      field: "display_order",
    },
  },
  {
    tableName: "downloads",
    timestamps: true,
  }
);

export default Download;


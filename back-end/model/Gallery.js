import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Gallery = sequelize.define(
  "Gallery",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "",
    },
    caption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image caption is required",
        },
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Energy audits",
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Image URL is required",
        },
      },
    },
    alt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "gallery",
    timestamps: true,
  }
);

export default Gallery;

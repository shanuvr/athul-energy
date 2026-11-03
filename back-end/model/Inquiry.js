import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

/**
 * Inquiry Model
 * Captures plant audit leads and technical scoping requests submitted via website
 */
export const Inquiry = sequelize.define(
  "Inquiry",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ticketId: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(191),
      allowNull: true,
      defaultValue: "Individual / Facility",
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    service: {
      type: DataTypes.STRING(191),
      allowNull: true,
      defaultValue: "General Audit Scoping",
    },
    location: {
      type: DataTypes.STRING(191),
      allowNull: true,
    },
    load: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "Review Pending",
        "Proposal Sent",
        "Scheduled",
        "Completed",
        "Archived"
      ),
      defaultValue: "Review Pending",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    source: {
      type: DataTypes.STRING(64),
      defaultValue: "contact-page",
    },
    ipAddress: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
  },
  {
    tableName: "inquiries",
    timestamps: true,
    indexes: [
      { fields: ["ticketId"], unique: true },
      { fields: ["status"] },
      { fields: ["email"] },
      { fields: ["createdAt"] },
    ],
  }
);

export default Inquiry;


import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: { msg: "Slug is required" },
      },
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Article title is required" },
      },
    },
    excerpt: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Article excerpt is required" },
      },
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Article content is required" },
      },
    },
    coverImage: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Cover image is required" },
      },
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "energy-audits",
    },
    categoryLabel: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: "BEE Energy Audits",
    },
    authorName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      defaultValue: "Er. Santhosh A.",
    },
    authorRole: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "Lead BEE Accredited Energy Auditor (AEA-0275)",
    },
    authorBadge: {
      type: DataTypes.STRING(100),
      allowNull: true,
      defaultValue: "AEA-0275 / EmAEA 091",
    },
    authorAvatar: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    authorBio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publishedAt: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: () => new Date().toISOString().split("T")[0],
    },
    readTime: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "5 min read",
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    tableOfContents: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    metaTitle: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    metaDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    keywords: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    canonicalUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    viewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "blogs",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["slug"],
      },
      {
        fields: ["category"],
      },
      {
        fields: ["isPublished"],
      },
      {
        fields: ["featured"],
      },
    ],
  }
);

export default Blog;


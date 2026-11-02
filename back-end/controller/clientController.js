import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { Client } from "../model/Client.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @desc   Get all client logos
 * @route  GET /api/clients
 * @access Public
 */
export async function getAllClients(req, res, next) {
  try {
    const clients = await Client.findAll({
      order: [
        ["order", "ASC"],
        ["id", "ASC"],
      ],
    });

    return res.status(200).json({
      success: true,
      count: clients.length,
      data: clients,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc   Get single client by ID
 * @route  GET /api/clients/:id
 * @access Public
 */
export async function getClientById(req, res, next) {
  try {
    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: `Client not found with ID ${req.params.id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: client,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc   Upload and create a new client logo
 * @route  POST /api/clients
 * @access Admin (Protected)
 */
export async function createClient(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image file (PNG, WEBP, SVG, JPG)",
      });
    }

    const { name } = req.body;

    if (!name || !name.trim()) {
      await fs.unlink(req.file.path).catch(() => {});
      return res.status(400).json({
        success: false,
        message: "Client company name is required",
      });
    }

    const logoUrl = `/media/clients/${req.file.filename}`;

    const newClient = await Client.create({
      name: name.trim(),
      logoUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Client logo added successfully",
      data: newClient,
    });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path).catch(() => {});
    }
    next(error);
  }
}

/**
 * @desc   Delete client logo by ID
 * @route  DELETE /api/clients/:id
 * @access Admin (Protected)
 */
export async function deleteClient(req, res, next) {
  try {
    const client = await Client.findByPk(req.params.id);

    if (!client) {
      return res.status(404).json({
        success: false,
        message: `Client not found with ID ${req.params.id}`,
      });
    }

    // If logo was uploaded to /media/clients/, delete file from disk
    if (client.logoUrl && client.logoUrl.startsWith("/media/clients/")) {
      const filename = path.basename(client.logoUrl);
      const filePath = path.join(__dirname, "..", "media", "clients", filename);
      await fs.unlink(filePath).catch(() => {});
    }

    await client.destroy();

    return res.status(200).json({
      success: true,
      message: "Client logo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getAllClients,
  getClientById,
  createClient,
  deleteClient,
};


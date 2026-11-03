import { Op } from "sequelize";
import { Inquiry } from "../model/Inquiry.js";

/**
 * Helper to generate a unique professional Ticket ID
 * Example: AEC-INQ-8492
 */
async function generateUniqueTicketId() {
  let ticketId = "";
  let isUnique = false;
  let attempts = 0;

  while (!isUnique && attempts < 10) {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    ticketId = `AEC-INQ-${randomDigits}`;
    const existing = await Inquiry.findOne({ where: { ticketId } });
    if (!existing) {
      isUnique = true;
    }
    attempts++;
  }

  // Fallback if needed
  if (!isUnique) {
    ticketId = `AEC-INQ-${Date.now().toString().slice(-4)}`;
  }

  return ticketId;
}

/**
 * POST /api/inquiries
 * Public lead submission (Contact form, Homepage CTA, etc.)
 */
export async function createInquiry(req, res) {
  try {
    const {
      name,
      company,
      email,
      phone,
      service,
      location,
      load,
      message,
      source = "contact-page",
    } = req.body;

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Your name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Work email is required",
      });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Inquiry message or audit requirements are required",
      });
    }

    const ticketId = await generateUniqueTicketId();

    const clientIp =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket.remoteAddress ||
      null;

    const newInquiry = await Inquiry.create({
      ticketId,
      name: name.trim(),
      company: company?.trim() || "Facility / Plant",
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      service: service?.trim() || "General Audit Scoping",
      location: location?.trim() || null,
      load: load?.trim() || null,
      message: message.trim(),
      status: "Review Pending",
      source: source || "contact-page",
      ipAddress: clientIp,
    });

    console.log(
      `[Inquiry] New lead received: ${ticketId} from ${newInquiry.name} (${newInquiry.company})`
    );

    return res.status(201).json({
      success: true,
      message: "Your audit inquiry has been received. Our lead engineer will review and contact you shortly.",
      data: {
        id: newInquiry.id,
        ticketId: newInquiry.ticketId,
        name: newInquiry.name,
        company: newInquiry.company,
        email: newInquiry.email,
        service: newInquiry.service,
        status: newInquiry.status,
        createdAt: newInquiry.createdAt,
      },
    });
  } catch (error) {
    console.error("Error creating audit inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to submit inquiry. Please try again or reach out to info@athulenergy.com.",
      error: error.message,
    });
  }
}

/**
 * GET /api/inquiries
 * List inquiries (Admin protected, supports search & status filter)
 */
export async function getAllInquiries(req, res) {
  try {
    const { search = "", status = "All", limit = 100, page = 1 } = req.query;

    const whereConditions = {};

    if (status && status !== "All") {
      whereConditions.status = status;
    }

    if (search && search.trim()) {
      const q = `%${search.trim().toLowerCase()}%`;
      whereConditions[Op.or] = [
        { ticketId: { [Op.like]: q } },
        { name: { [Op.like]: q } },
        { company: { [Op.like]: q } },
        { email: { [Op.like]: q } },
        { phone: { [Op.like]: q } },
        { service: { [Op.like]: q } },
        { location: { [Op.like]: q } },
        { message: { [Op.like]: q } },
      ];
    }

    const parsedLimit = Math.max(1, Math.min(100, parseInt(limit, 10) || 50));
    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const offset = (parsedPage - 1) * parsedLimit;

    const { count, rows: inquiries } = await Inquiry.findAndCountAll({
      where: whereConditions,
      order: [["createdAt", "DESC"]],
      limit: parsedLimit,
      offset,
    });

    return res.status(200).json({
      success: true,
      count,
      page: parsedPage,
      totalPages: Math.ceil(count / parsedLimit),
      data: inquiries,
    });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inquiries",
      error: error.message,
    });
  }
}

/**
 * GET /api/inquiries/stats
 * Summary statistics for admin dashboard badge and cards
 */
export async function getInquiryStats(req, res) {
  try {
    const total = await Inquiry.count();
    const pending = await Inquiry.count({ where: { status: "Review Pending" } });
    const proposalSent = await Inquiry.count({ where: { status: "Proposal Sent" } });
    const scheduled = await Inquiry.count({ where: { status: "Scheduled" } });
    const completed = await Inquiry.count({ where: { status: "Completed" } });

    return res.status(200).json({
      success: true,
      data: {
        total,
        pending,
        proposalSent,
        scheduled,
        completed,
      },
    });
  } catch (error) {
    console.error("Error fetching inquiry stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inquiry statistics",
      error: error.message,
    });
  }
}

/**
 * GET /api/inquiries/:id
 * Single inquiry lookup
 */
export async function getInquiryById(req, res) {
  try {
    const { id } = req.params;
    const inquiry = isNaN(id)
      ? await Inquiry.findOne({ where: { ticketId: id } })
      : await Inquiry.findByPk(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: `Inquiry #${id} not found`,
      });
    }

    return res.status(200).json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error("Error fetching single inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch inquiry",
      error: error.message,
    });
  }
}

/**
 * PATCH /api/inquiries/:id/status
 * Update status & internal notes (Admin protected)
 */
export async function updateInquiryStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = [
      "Review Pending",
      "Proposal Sent",
      "Scheduled",
      "Completed",
      "Archived",
    ];

    const inquiry = await Inquiry.findByPk(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: `Inquiry #${id} not found`,
      });
    }

    if (status) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        });
      }
      inquiry.status = status;
    }

    if (notes !== undefined) {
      inquiry.notes = notes;
    }

    await inquiry.save();

    return res.status(200).json({
      success: true,
      message: `Inquiry #${inquiry.ticketId} updated to '${inquiry.status}'`,
      data: inquiry,
    });
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update inquiry",
      error: error.message,
    });
  }
}

/**
 * DELETE /api/inquiries/:id
 * Remove inquiry (Admin protected)
 */
export async function deleteInquiry(req, res) {
  try {
    const { id } = req.params;
    const inquiry = await Inquiry.findByPk(id);

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: `Inquiry #${id} not found`,
      });
    }

    const ticket = inquiry.ticketId;
    await inquiry.destroy();

    return res.status(200).json({
      success: true,
      message: `Inquiry ${ticket} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete inquiry",
      error: error.message,
    });
  }
}

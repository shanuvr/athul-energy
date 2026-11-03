import api from "./api";

export type InquiryStatus =
  | "Review Pending"
  | "Proposal Sent"
  | "Scheduled"
  | "Completed"
  | "Archived";

export interface Inquiry {
  id: number;
  ticketId: string;
  name: string;
  company: string;
  email: string;
  phone?: string | null;
  service: string;
  location?: string | null;
  load?: string | null;
  message: string;
  status: InquiryStatus;
  notes?: string | null;
  source?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateInquiryInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  location?: string;
  load?: string;
  message: string;
  source?: string;
}

export interface InquiryStats {
  total: number;
  pending: number;
  proposalSent: number;
  scheduled: number;
  completed: number;
}

/**
 * Public: Submit a new plant audit inquiry or lead
 */
export async function submitInquiry(payload: CreateInquiryInput) {
  const response = await api.post("/inquiries", payload);
  return response.data;
}

/**
 * Admin: Fetch all inquiries with optional search and status filter
 */
export async function fetchInquiries(params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const response = await api.get("/inquiries", { params });
  return response.data;
}

/**
 * Admin: Fetch inquiry statistics
 */
export async function fetchInquiryStats() {
  const response = await api.get("/inquiries/stats");
  return response.data;
}

/**
 * Admin: Update inquiry status and optional notes
 */
export async function updateInquiryStatus(
  id: number | string,
  status: InquiryStatus,
  notes?: string
) {
  const response = await api.patch(`/inquiries/${id}/status`, { status, notes });
  return response.data;
}

/**
 * Admin: Delete an inquiry
 */
export async function deleteInquiry(id: number | string) {
  const response = await api.delete(`/inquiries/${id}`);
  return response.data;
}

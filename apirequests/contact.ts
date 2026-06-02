import axios from "axios";
import { origin } from "./config";

// Ensure axios sends cookies when making cross-origin requests
axios.defaults.withCredentials = true;

// Helper to get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminAuthToken');
};

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface ContactFormData {
  name: string;
  phone: string;
  service: string;
  message: string;
}

export interface ContactResponse {
  id?: number;
  name: string;
  phone: string;
  service: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}

// Submit contact form
export const submitContactForm = async (data: ContactFormData) => {
  try {
    const response = await axios.post(`${origin}/api/v1/contact`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Submit contact error:", error.response?.data || error.message);
    throw error;
  }
};

// Get all contacts (admin only)
export const getAllContacts = async () => {
  try {
    const response = await axios.get(`${origin}/api/v1/contact`, {
      headers: {
        ...getAuthHeaders(),
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Get contacts error:", error.response?.data || error.message);
    throw error;
  }
};

// Get paginated contacts (admin only)
export const getPaginatedContacts = async (page: number = 1, limit: number = 10) => {
  try {
    const response = await axios.get(`${origin}/api/v1/contact/paginated`, {
      params: { page, limit },
      headers: {
        ...getAuthHeaders(),
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Get paginated contacts error:", error.response?.data || error.message);
    throw error;
  }
};

// Get contact by ID (admin only)
export const getContactById = async (id: number) => {
  try {
    const response = await axios.get(`${origin}/api/v1/contact/${id}`, {
      headers: {
        ...getAuthHeaders(),
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Get contact error:", error.response?.data || error.message);
    throw error;
  }
};

// Delete contact (admin only)
export const deleteContact = async (id: number) => {
  try {
    const response = await axios.delete(`${origin}/api/v1/contact/${id}`, {
      headers: {
        ...getAuthHeaders(),
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Delete contact error:", error.response?.data || error.message);
    throw error;
  }
};

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

// Cache for CSRF token
let cachedCsrfToken: string | null = null;

// Helper to get CSRF token
const getCsrfToken = async (): Promise<string> => {
  try {
    // Return cached token if available
    if (cachedCsrfToken) {
      return cachedCsrfToken;
    }

    const response = await axios.get(`${origin}/api/v1/admin-auth/csrf-token`, {
      withCredentials: true,
    });

    if (response.data.csrfToken) {
      cachedCsrfToken = response.data.csrfToken;
      return response.data.csrfToken;
    }

    throw new Error('No CSRF token received');
  } catch (error: any) {
    console.error('Failed to get CSRF token:', error.response?.data || error.message);
    throw error;
  }
};

// Helper to get CSRF headers
const getCsrfHeaders = async () => {
  const token = await getCsrfToken();
  return { 'x-csrf-token': token };
};

export interface Insight {
    id?: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    readTime: string;
    slug: string;
    content?: string;
    imageUrl?: string;
    isPublished: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// Get all published insights
export const getAllInsights = async () => {
    try {
        const response = await axios.get(`${origin}/api/v1/insights`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        console.error("Get insights error:", error.response?.data || error.message);
        throw error;
    }
};

// Get all insights (including unpublished) - for admin
export const getAllInsightsAdmin = async () => {
    try {
        const response = await axios.get(`${origin}/api/v1/insights/all`, {
            headers: {
                ...getAuthHeaders(),
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        console.error("Get all insights error:", error.response?.data || error.message);
        throw error;
    }
};

// Get paginated insights
export const getPaginatedInsights = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await axios.get(`${origin}/api/v1/insights/paginated`, {
            params: { page, limit },
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        console.error("Get paginated insights error:", error.response?.data || error.message);
        throw error;
    }
};

// Get insight by slug
export const getInsightBySlug = async (slug: string) => {
    try {
        const response = await axios.get(`${origin}/api/v1/insights/slug/${slug}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        console.error("Get insight by slug error:", error.response?.data || error.message);
        throw error;
    }
};

// Get insight by ID
export const getInsightById = async (id: number) => {
    try {
        const response = await axios.get(`${origin}/api/v1/insights/${id}`, {
            headers: {
                ...getAuthHeaders(),
            },
            withCredentials: true,
        });
        return response.data;
    } catch (error: any) {
        console.error("Get insight by ID error:", error.response?.data || error.message);
        throw error;
    }
};

// Create new insight
export const createInsight = async (data: Insight | FormData) => {
    try {
        const isFormData = data instanceof FormData;
        const csrfHeaders = await getCsrfHeaders();
        
        const response = await axios.post(`${origin}/api/v1/insights`, data, {
            headers: {
                ...getAuthHeaders(),
                ...csrfHeaders,
                ...(isFormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" }),
            },
            withCredentials: true,
        });
        
        // Reset cached token after successful request
        cachedCsrfToken = null;
        
        return response.data;
    } catch (error: any) {
        console.error("Create insight error:", error.response?.data || error.message);
        throw error;
    }
};

// Update insight
export const updateInsight = async (id: number, data: Partial<Insight> | FormData) => {
    try {
        const isFormData = data instanceof FormData;
        const csrfHeaders = await getCsrfHeaders();
        
        const response = await axios.put(`${origin}/api/v1/insights/${id}`, data, {
            headers: {
                ...getAuthHeaders(),
                ...csrfHeaders,
                ...(isFormData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" }),
            },
            withCredentials: true,
        });
        
        // Reset cached token after successful request
        cachedCsrfToken = null;
        
        return response.data;
    } catch (error: any) {
        console.error("Update insight error:", error.response?.data || error.message);
        throw error;
    }
};

// Delete insight
export const deleteInsight = async (id: number) => {
    try {
        const csrfHeaders = await getCsrfHeaders();
        
        const response = await axios.delete(`${origin}/api/v1/insights/${id}`, {
            headers: {
                ...getAuthHeaders(),
                ...csrfHeaders,
            },
            withCredentials: true,
        });
        
        // Reset cached token after successful request
        cachedCsrfToken = null;
        
        return response.data;
    } catch (error: any) {
        console.error("Delete insight error:", error.response?.data || error.message);
        throw error;
    }
};

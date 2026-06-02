import axios from "axios";
import { origin } from "./config";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface SustainabilityFeature {
  title: string;
  description: string;
}

interface AboutUsData {
  id?: number;
  hero_title: string;
  hero_subtitle: string;
  carousel_slides: CarouselSlide[];
  story_title: string;
  story_paragraphs: string[];
  sustainability_title: string;
  sustainability_description: string;
  sustainability_features: SustainabilityFeature[];
  sustainability_commitment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ApiResponse<T = any> {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
}

// Admin Section Interface
export interface AboutSection {
  id?: number;
  sectionTitle: string;
  sectionSubtitle?: string;
  content: string;
  imageUrl?: string;
  order: number;
  isVisible: boolean;
  createdAt?: string;
  updatedAt?: string;
}

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

/**
 * 📋 Get About Us content
 */
export const getAboutUs = async (): Promise<ApiResponse<AboutUsData>> => {
  try {
    const response = await axios.get(`${origin}/api/v1/about`);

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Fetching About Us content failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to fetch About Us content",
      };
    } else if (error.request) {
      return {
        ok: false,
        status: 503,
        error: "Network error - Unable to reach the server",
      };
    } else {
      return {
        ok: false,
        status: 500,
        error: "An unexpected error occurred",
      };
    }
  }
};

/**
 * ✏️ Create or Update About Us content
 */
export const updateAboutUs = async (formData: FormData): Promise<ApiResponse<AboutUsData>> => {
  try {
    const response = await axios.post(`${origin}/api/v1/about`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      ok: true,
      status: response.status,
      data: response.data.data,
    };
  } catch (error: any) {
    console.error("Updating About Us content failed:", error);

    if (error.response) {
      return {
        ok: false,
        status: error.response.status,
        error: error.response.data?.message || "Failed to update About Us content",
      };
    } else if (error.request) {
      return {
        ok: false,
        status: 503,
        error: "Network error - Unable to reach the server",
      };
    } else {
      return {
        ok: false,
        status: 500,
        error: "An unexpected error occurred",
      };
    }
  }
};

// ==================== ADMIN SECTION MANAGEMENT ====================

/**
 * 📖 Get all visible about sections (public)
 */
export const getAboutSections = async () => {
  try {
    const response = await axios.get(`${origin}/api/v1/about-sections`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Get about sections error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 📋 Get all about sections including hidden (admin only)
 */
export const getAllAboutSectionsAdmin = async () => {
  try {
    const response = await axios.get(`${origin}/api/v1/about-sections/admin/all`, {
      headers: {
        ...getAuthHeaders(),
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Get all about sections error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 🔍 Get single about section by ID
 */
export const getAboutSectionById = async (id: number) => {
  try {
    const response = await axios.get(`${origin}/api/v1/about-sections/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    console.error("Get about section error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ➕ Create new about section (admin only)
 */
export const createAboutSection = async (data: FormData) => {
  try {
    const csrfHeaders = await getCsrfHeaders();
    const response = await axios.post(`${origin}/api/v1/about-sections`, data, {
      headers: {
        ...getAuthHeaders(),
        ...csrfHeaders,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    cachedCsrfToken = null;
    return response.data;
  } catch (error: any) {
    console.error("Create about section error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * ✏️ Update about section (admin only)
 */
export const updateAboutSection = async (id: number, data: FormData) => {
  try {
    const csrfHeaders = await getCsrfHeaders();
    const response = await axios.put(`${origin}/api/v1/about-sections/${id}`, data, {
      headers: {
        ...getAuthHeaders(),
        ...csrfHeaders,
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    cachedCsrfToken = null;
    return response.data;
  } catch (error: any) {
    console.error("Update about section error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 🗑️ Delete about section (admin only)
 */
export const deleteAboutSection = async (id: number) => {
  try {
    const csrfHeaders = await getCsrfHeaders();
    const response = await axios.delete(`${origin}/api/v1/about-sections/${id}`, {
      headers: {
        ...getAuthHeaders(),
        ...csrfHeaders,
      },
      withCredentials: true,
    });
    cachedCsrfToken = null;
    return response.data;
  } catch (error: any) {
    console.error("Delete about section error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 👁️ Update section visibility (admin only)
 */
export const updateSectionVisibility = async (id: number, isVisible: boolean) => {
  try {
    const csrfHeaders = await getCsrfHeaders();
    const response = await axios.patch(
      `${origin}/api/v1/about-sections/${id}/visibility`,
      { isVisible },
      {
        headers: {
          ...getAuthHeaders(),
          ...csrfHeaders,
        },
        withCredentials: true,
      }
    );
    cachedCsrfToken = null;
    return response.data;
  } catch (error: any) {
    console.error("Update visibility error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 🔄 Reorder sections (admin only)
 */
export const reorderAboutSections = async (sections: Array<{ id: number; order: number }>) => {
  try {
    const csrfHeaders = await getCsrfHeaders();
    const response = await axios.patch(
      `${origin}/api/v1/about-sections/admin/reorder`,
      { sections },
      {
        headers: {
          ...getAuthHeaders(),
          ...csrfHeaders,
        },
        withCredentials: true,
      }
    );
    cachedCsrfToken = null;
    return response.data;
  } catch (error: any) {
    console.error("Reorder sections error:", error.response?.data || error.message);
    throw error;
  }
};
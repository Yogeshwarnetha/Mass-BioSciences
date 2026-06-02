import axios from 'axios';
import { origin } from './config';

// Ensure axios sends cookies when making cross-origin requests
axios.defaults.withCredentials = true;

export interface AdminLoginCredentials {
  email: string;
  password: string;
}

export interface AdminAuthResponse {
  success: boolean;
  message: string;
  code: string;
  data: {
    admin: {
      id: number;
      email: string;
    };
    token: string;
    expiresIn: string;
  };
}

export interface CsrfTokenResponse {
  success: boolean;
  csrfToken: string;
  expiresIn: number;
}

class AdminAuthService {
  private csrfToken: string | null = null;
  private token: string | null = null;

  constructor() {
    // Try to load token from localStorage on initialization
    this.token = this.getStoredToken();
  }

  /**
   * Get CSRF token from server
   */
  async getCsrfToken(): Promise<string> {
    try {
      const response = await axios.get<CsrfTokenResponse>(
        `${origin}/api/v1/admin-auth/csrf-token`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      this.csrfToken = response.data.csrfToken;
      return this.csrfToken;
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
      throw error;
    }
  }

  /**
   * Admin login
   */
  async login(credentials: AdminLoginCredentials): Promise<AdminAuthResponse> {
    try {
      // Get CSRF token first
      if (!this.csrfToken) {
        await this.getCsrfToken();
      }

      const response = await axios.post<AdminAuthResponse>(
        `${origin}/api/v1/admin-auth/login`,
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-csrf-token': this.csrfToken || '',
          },
          withCredentials: true,
        }
      );

      if (response.data.success && response.data.data?.token) {
        // Store token securely
        this.token = response.data.data.token;
        this.storeToken(this.token);

        // Set default Authorization header for future requests
        this.setAuthHeader(this.token);
      }

      return response.data;
    } catch (error: any) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Verify if token is valid
   */
  async verifyToken(token?: string): Promise<boolean> {
    try {
      const tokenToVerify = token || this.token;
      if (!tokenToVerify) {
        return false;
      }

      const response = await axios.post(
        `${origin}/api/v1/admin-auth/verify`,
        { token: tokenToVerify },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.success;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  }

  /**
   * Admin logout
   */
  async logout(): Promise<void> {
    try {
      await axios.post(
        `${origin}/api/v1/admin-auth/logout`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local state
      this.clearAuth();
    }
  }

  /**
   * Make authenticated request with CSRF protection
   */
  async makeRequest<T = any>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    endpoint: string,
    data?: any,
    config?: any
  ): Promise<T> {
    try {
      // Get fresh CSRF token for state-changing requests
      if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method) && !this.csrfToken) {
        await this.getCsrfToken();
      }

      const response = await axios({
        method,
        url: `${origin}${endpoint}`,
        data,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
          'x-csrf-token': this.csrfToken || '',
          ...config?.headers,
        },
        withCredentials: true,
        ...config,
      });

      return response.data;
    } catch (error: any) {
      // If token expired, try refreshing and retry once
      if (error.response?.status === 401 && error.response?.data?.code === 'TOKEN_EXPIRED') {
        this.clearAuth();
        throw new Error('Session expired. Please login again.');
      }

      throw error;
    }
  }

  /**
   * Store token in localStorage
   */
  private storeToken(token: string): void {
    try {
      localStorage.setItem('adminAuthToken', token);
      // Also store timestamp for expiry checking
      localStorage.setItem('adminTokenTime', Date.now().toString());
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  }

  /**
   * Get stored token from localStorage
   */
  private getStoredToken(): string | null {
    try {
      const token = localStorage.getItem('adminAuthToken');
      const tokenTime = localStorage.getItem('adminTokenTime');

      if (!token || !tokenTime) {
        return null;
      }

      // Check if token is older than 24 hours (in milliseconds)
      const age = Date.now() - parseInt(tokenTime);
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours

      if (age > maxAge) {
        this.clearAuth();
        return null;
      }

      return token;
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      return null;
    }
  }

  /**
   * Set Authorization header for axios
   */
  private setAuthHeader(token: string): void {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Clear authentication
   */
  private clearAuth(): void {
    this.token = null;
    this.csrfToken = null;

    try {
      localStorage.removeItem('adminAuthToken');
      localStorage.removeItem('adminTokenTime');
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }

    delete axios.defaults.headers.common['Authorization'];
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Check if admin is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.token;
  }

  /**
   * Get current CSRF token
   */
  getCsrfTokenSync(): string | null {
    return this.csrfToken;
  }
}

// Export singleton instance
export const adminAuthService = new AdminAuthService();

// Legacy functions for backward compatibility
export const loginAdmin = async (credentials: AdminLoginCredentials) => {
  return adminAuthService.login(credentials);
};

export const logoutAdmin = async () => {
  return adminAuthService.logout();
};

export const verifyAdminToken = async () => {
  return adminAuthService.verifyToken();
};

export default AdminAuthService;

import axios, { AxiosInstance } from 'axios';
import { AuthTokens, LoginCredentials, RegisterData, MagicLinkRequest, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add interceptor to include token in requests
    this.api.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add interceptor for automatic token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              const data = await this.refreshToken(refreshToken);
              this.setTokens(data.access_token, data.refresh_token);
              originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/login';
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Token management
  getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refresh_token');
    }
    return null;
  }

  setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  }

  // Auth endpoints
  async register(data: RegisterData): Promise<AuthTokens> {
    const response = await this.api.post<AuthTokens>('/auth/register', data);
    this.setTokens(response.data.access_token, response.data.refresh_token);
    return response.data;
  }

  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    const response = await this.api.post<AuthTokens>('/auth/login', credentials);
    this.setTokens(response.data.access_token, response.data.refresh_token);
    return response.data;
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    const response = await this.api.post<AuthTokens>('/auth/refresh', { refresh_token: refreshToken });
    return response.data;
  }

  async getProfile(): Promise<{ user: User }> {
    const response = await this.api.get<{ user: User }>('/auth/profile');
    return response.data;
  }

  // OAuth endpoints
  getGoogleOAuthUrl(): string {
    return `${API_BASE_URL}/oauth/google`;
  }

  getGithubOAuthUrl(): string {
    return `${API_BASE_URL}/oauth/github`;
  }

  // Magic link endpoints
  async sendMagicLink(data: MagicLinkRequest): Promise<{ message: string }> {
    const response = await this.api.post<{ message: string }>('/magiclink/send', data);
    return response.data;
  }

  async verifyMagicLink(token: string): Promise<AuthTokens> {
    const response = await this.api.get<AuthTokens>(`/magiclink/verify?token=${token}`);
    this.setTokens(response.data.access_token, response.data.refresh_token);
    return response.data;
  }

  // User management endpoints
  async getAllUsers(): Promise<User[]> {
    const response = await this.api.get<User[]>('/users');
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await this.api.get<User>(`/users/${id}`);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await this.api.delete(`/users/${id}`);
  }

  logout(): void {
    this.clearTokens();
  }
}

export const apiService = new ApiService();

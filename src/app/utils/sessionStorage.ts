import { User } from '@/app/context/AuthContext';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER: 'user',
};

export const sessionStorage = {
  // Save auth token
  saveToken: (token: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (err) {
      console.error('Failed to save auth token', err);
    }
  },

  // Get auth token
  getToken: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (err) {
      console.error('Failed to get auth token', err);
      return null;
    }
  },

  // Save user data
  saveUser: (user: User): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (err) {
      console.error('Failed to save user', err);
    }
  },

  // Get user data
  getUser: (): User | null => {
    try {
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);
      if (!userStr) return null;

      const user = JSON.parse(userStr);
      // Convert date strings back to Date objects
      return {
        ...user,
        createdAt: new Date(user.createdAt),
        updatedAt: new Date(user.updatedAt),
      };
    } catch (err) {
      console.error('Failed to get user', err);
      return null;
    }
  },

  // Clear all auth data
  clear: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (err) {
      console.error('Failed to clear session storage', err);
    }
  },
};

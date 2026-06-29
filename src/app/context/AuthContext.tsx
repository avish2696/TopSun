import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { authService } from '@/app/utils/authService';
import { addressService } from '@/app/utils/addressService';
import { sessionStorage } from '@/app/utils/sessionStorage';

export interface User {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OTPRequest {
  phone: string;
}

interface AuthContextType {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Auth methods
  signup: (fullName: string, phone: string) => Promise<void>;
  signin: (phone: string) => Promise<void>;
  verifyOTP: (otp: string) => Promise<void>;
  logout: () => void;
  updateProfile: (fullName: string, email?: string) => Promise<void>;
  getCurrentUser: () => User | null;

  // Address methods
  getAddresses: () => Promise<Address[]>;
  addAddress: (address: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => Promise<Address>;
  updateAddress: (id: string, address: Partial<Address>) => Promise<Address>;
  deleteAddress: (id: string) => Promise<void>;
  setDefaultAddress: (id: string) => Promise<void>;

  // OTP request tracking
  currentOTPRequest: OTPRequest | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentOTPRequest, setCurrentOTPRequest] = useState<OTPRequest | null>(null);

  // Initialize user from localStorage on mount - non-blocking
  useEffect(() => {
    // Use setTimeout to avoid blocking initial render
    const timer = setTimeout(() => {
      const savedUser = sessionStorage.getUser();
      if (savedUser) {
        setUser(savedUser);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const signup = async (fullName: string, phone: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newUser = authService.signup(fullName, phone);
      // Store phone with +91 prefix for OTP verification
      const formattedPhone = '+91' + phone;
      setCurrentOTPRequest({ phone: formattedPhone });
      // Don't set user until OTP is verified
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signin = async (phone: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const existingUser = authService.signin(phone);
      if (!existingUser) {
        throw new Error('Phone number is not registered');
      }
      // Store phone with +91 prefix for OTP verification
      const formattedPhone = '+91' + phone;
      setCurrentOTPRequest({ phone: formattedPhone });
      // Don't set user until OTP is verified
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (otp: string) => {
    setIsLoading(true);
    setError(null);
    try {
      if (!currentOTPRequest) {
        throw new Error('No OTP request in progress');
      }

      // Debug logging
      console.log(`🔍 Verifying OTP for phone: ${currentOTPRequest.phone}`);
      console.log(`📝 OTP code: ${otp}`);

      const result = authService.verifyOTP(currentOTPRequest.phone, otp);
      sessionStorage.saveToken(result.token);
      sessionStorage.saveUser(result.user);
      setUser(result.user);
      setCurrentOTPRequest(null);
      
      console.log(`✅ OTP verified successfully for ${result.user.fullName}`);
    } catch (err: any) {
      console.error(`❌ OTP verification failed:`, err.message);
      setError(err.message || 'OTP verification failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    sessionStorage.clear();
    setUser(null);
    setError(null);
    setCurrentOTPRequest(null);
  };

  const updateProfile = async (fullName: string, email?: string) => {
    if (!user) throw new Error('User not authenticated');

    setIsLoading(true);
    setError(null);
    try {
      const updatedUser = authService.updateProfile(user.id, { fullName, email });
      sessionStorage.saveUser(updatedUser);
      setUser(updatedUser);
    } catch (err: any) {
      setError(err.message || 'Profile update failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = () => {
    return user;
  };

  const getAddresses = async () => {
    if (!user) throw new Error('User not authenticated');
    return addressService.getByUserId(user.id);
  };

  const addAddress = async (address: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    if (!user) throw new Error('User not authenticated');
    return addressService.create(user.id, address);
  };

  const updateAddress = async (id: string, updates: Partial<Address>) => {
    if (!user) throw new Error('User not authenticated');
    return addressService.update(id, user.id, updates);
  };

  const deleteAddress = async (id: string) => {
    if (!user) throw new Error('User not authenticated');
    return addressService.delete(id, user.id);
  };

  const setDefaultAddress = async (id: string) => {
    if (!user) throw new Error('User not authenticated');
    addressService.setDefault(id, user.id);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        error,
        signup,
        signin,
        verifyOTP,
        logout,
        updateProfile,
        getCurrentUser,
        getAddresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        currentOTPRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

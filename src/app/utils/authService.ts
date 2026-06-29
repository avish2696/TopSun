import { User } from '@/app/context/AuthContext';
import { userService } from '@/app/utils/userService';
import { otpService } from '@/app/utils/otpService';
import { validation } from '@/app/utils/validation';
import { v4 as uuidv4 } from 'uuid';

export const authService = {
  // Sign-up flow
  signup: (fullName: string, phone: string): User => {
    // Validate inputs
    if (!validation.isValidFullName(fullName)) {
      throw new Error('Full name must be 2-100 characters with no special characters');
    }

    if (!validation.isValidPhone(phone)) {
      throw new Error('Phone number must be exactly 10 digits');
    }

    // Format phone with +91 prefix
    const formattedPhone = '+91' + phone;

    // Check if phone already exists
    if (userService.phoneExists(formattedPhone)) {
      throw new Error('Phone number is already registered');
    }

    // Create user record
    const user = userService.create(fullName, formattedPhone);

    // Generate and send OTP
    otpService.send(formattedPhone);

    return user;
  },

  // Sign-in flow
  signin: (phone: string): User | null => {
    // Validate phone format
    if (!validation.isValidPhone(phone)) {
      throw new Error('Phone number must be exactly 10 digits');
    }

    // Format phone with +91 prefix
    const formattedPhone = '+91' + phone;

    // Check if user exists
    const user = userService.getByPhone(formattedPhone);
    if (!user) {
      return null;
    }

    // Generate and send OTP
    otpService.send(formattedPhone);

    return user;
  },

  // OTP verification
  verifyOTP: (phone: string, otp: string): { token: string; user: User } => {
    // Validate OTP format
    if (!validation.isValidOTP(otp)) {
      throw new Error('OTP must be exactly 6 digits');
    }

    // Debug logging
    console.log(`🔐 Verifying OTP for phone: ${phone}, code: ${otp}`);

    // Verify OTP code
    const isValid = otpService.verify(phone, otp);
    
    if (!isValid) {
      const attempts = otpService.getAttempts(phone);
      console.log(`❌ OTP verification failed. Phone: ${phone}, Attempts remaining: ${attempts}`);
      if (attempts <= 0) {
        throw new Error('Maximum retry attempts exceeded. Please request a new OTP.');
      }
      throw new Error(`Invalid OTP. ${attempts} attempt(s) remaining.`);
    }

    console.log(`✅ OTP verified successfully for phone: ${phone}`);

    // Get user
    const user = userService.getByPhone(phone);
    if (!user) {
      throw new Error('User not found');
    }

    // Generate session token
    const token = uuidv4();

    // Clear OTP after successful verification
    otpService.clear(phone);

    return { token, user };
  },

  // Get current user from storage
  getCurrentUser: (): User | null => {
    // This would typically get from localStorage/sessionStorage
    // For now, return null - actual retrieval happens in AuthContext
    return null;
  },

  // Logout
  logout: (): void => {
    // Clear any session data
    // localStorage and context state are cleared in AuthContext
  },

  // Update profile
  updateProfile: (userId: string, updates: { fullName?: string; email?: string }): User => {
    if (updates.fullName && !validation.isValidFullName(updates.fullName)) {
      throw new Error('Full name must be 2-100 characters with no special characters');
    }

    if (updates.email && !validation.isValidEmail(updates.email)) {
      throw new Error('Invalid email format');
    }

    const user = userService.update(userId, updates);
    return user;
  },
};

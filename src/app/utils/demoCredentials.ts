/**
 * Demo Credentials Setup
 * Pre-populated test users for development & demonstration purposes
 * These credentials are only available in development environment
 */

import { userService } from '@/app/utils/userService';
import { otpService } from '@/app/utils/otpService';

export interface DemoUser {
  fullName: string;
  phone: string; // Without +91 prefix
  otp?: string;
  description: string;
}

// Demo users for testing
export const DEMO_USERS: DemoUser[] = [
  {
    fullName: 'Rajesh Kumar',
    phone: '9876543210',
    description: 'Demo user #1 - Premium customer',
  },
  {
    fullName: 'Priya Singh',
    phone: '9123456789',
    description: 'Demo user #2 - Regular customer',
  },
  {
    fullName: 'Amit Patel',
    phone: '9988776655',
    description: 'Demo user #3 - Test customer',
  },
  {
    fullName: 'Sarah Johnson',
    phone: '8765432109',
    description: 'Demo user #4 - International format',
  },
];

/**
 * Initialize demo users in the system
 * Call this once when app starts in development mode
 */
export const initializeDemoUsers = (): void => {
  console.log('🧪 Initializing demo users...');

  DEMO_USERS.forEach((demoUser) => {
    try {
      const formattedPhone = '+91' + demoUser.phone;

      // Check if user already exists
      if (!userService.phoneExists(formattedPhone)) {
        // Create the user
        const user = userService.create(demoUser.fullName, formattedPhone);

        // Generate and store OTP for easy testing
        const otp = otpService.generate(formattedPhone);

        console.log(`✅ Created demo user: ${demoUser.fullName}`);
        console.log(`   📱 Phone: +91 ${demoUser.phone}`);
        console.log(`   🔐 OTP: ${otp} (for testing)`);
      } else {
        console.log(`⏭️  Demo user already exists: ${demoUser.fullName}`);
      }
    } catch (error) {
      console.error(`❌ Failed to create demo user ${demoUser.fullName}:`, error);
    }
  });

  console.log('🧪 Demo users setup complete!');
};

/**
 * Get all demo credentials formatted for display
 */
export const getDemoCredentialsForDisplay = (): Array<{
  name: string;
  phone: string;
  otp: string;
  description: string;
}> => {
  return DEMO_USERS.map((user) => ({
    name: user.fullName,
    phone: `+91 ${user.phone}`,
    otp: otpService.getLastGenerated(`+91${user.phone}`) || 'Generate new OTP',
    description: user.description,
  }));
};

/**
 * Get a single demo user by phone
 */
export const getDemoUserByPhone = (phone: string): DemoUser | undefined => {
  return DEMO_USERS.find((user) => user.phone === phone);
};

/**
 * Refresh OTP for all demo users (useful for expired OTPs)
 */
export const refreshAllDemoOTPs = (): void => {
  console.log('🔄 Refreshing demo user OTPs...');

  DEMO_USERS.forEach((demoUser) => {
    const formattedPhone = '+91' + demoUser.phone;
    const otp = otpService.generate(formattedPhone);

    console.log(`🔐 ${demoUser.fullName}: ${otp}`);
  });

  console.log('✅ All demo OTPs refreshed!');
};

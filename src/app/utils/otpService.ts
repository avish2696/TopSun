interface OTPRecord {
  phone: string;
  code: string;
  expiresAt: Date;
  attempts: number;
  createdAt: Date;
}

// In-memory OTP storage
const otpStore: Map<string, OTPRecord> = new Map();

const OTP_EXPIRY_MINUTES = 10;
const MAX_ATTEMPTS = 3;

export const otpService = {
  // Generate 6-digit OTP
  generate: (phone: string): string => {
    // Generate random 6-digit code
    const code = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');

    // Set expiry to 10 minutes from now
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    // Store OTP record
    otpStore.set(phone, {
      phone,
      code,
      expiresAt,
      attempts: 0,
      createdAt: new Date(),
    });

    // Log for development (remove in production)
    console.log(`🔐 OTP for ${phone}: ${code} (expires in ${OTP_EXPIRY_MINUTES} minutes)`);

    return code;
  },

  // Send OTP (mock implementation)
  send: async (phone: string): Promise<void> => {
    // Generate OTP
    otpService.generate(phone);

    // In production, integrate with SMS provider (Twilio, AWS SNS, etc.)
    // For now, just log to console
    return Promise.resolve();
  },

  // Verify OTP
  verify: (phone: string, code: string): boolean => {
    const record = otpStore.get(phone);

    console.log(`🔐 OTP Store Debug:`);
    console.log(`   Looking for phone: ${phone}`);
    console.log(`   Code to verify: ${code}`);
    console.log(`   Record found: ${record ? 'YES' : 'NO'}`);
    
    if (record) {
      console.log(`   Stored code: ${record.code}`);
      console.log(`   Code match: ${record.code === code ? 'YES ✅' : 'NO ❌'}`);
      console.log(`   Expired: ${new Date() > record.expiresAt ? 'YES' : 'NO'}`);
      console.log(`   Attempts used: ${record.attempts}/${3}`);
    }

    if (!record) {
      console.log(`❌ No OTP record found for ${phone}`);
      return false;
    }

    // Check if expired
    if (new Date() > record.expiresAt) {
      console.log(`❌ OTP expired for ${phone}`);
      otpStore.delete(phone);
      return false;
    }

    // Check if max attempts exceeded
    if (record.attempts >= 3) {
      console.log(`❌ Max attempts exceeded for ${phone}`);
      return false;
    }

    // Check if code matches
    if (record.code !== code) {
      // Increment attempts
      record.attempts += 1;
      console.log(`❌ OTP code mismatch. Expected: ${record.code}, Got: ${code}`);
      return false;
    }

    console.log(`✅ OTP verified successfully!`);
    return true;
  },

  // Get remaining attempts
  getAttempts: (phone: string): number => {
    const record = otpStore.get(phone);
    if (!record) {
      return MAX_ATTEMPTS;
    }

    return Math.max(0, MAX_ATTEMPTS - record.attempts);
  },

  // Clear OTP after verification
  clear: (phone: string): void => {
    otpStore.delete(phone);
  },

  // Get last generated OTP (for testing)
  getLastGenerated: (phone: string): string | null => {
    const record = otpStore.get(phone);
    return record ? record.code : null;
  },
};

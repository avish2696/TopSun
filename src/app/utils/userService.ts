import { User } from '@/app/context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

// In-memory user database
const userDatabase: Map<string, User> = new Map();

export const userService = {
  // Create new user
  create: (fullName: string, phone: string): User => {
    // Check if phone already exists
    for (const user of userDatabase.values()) {
      if (user.phone === phone) {
        throw new Error('Phone number already registered');
      }
    }

    // Generate userId
    const id = uuidv4();

    // Create user record
    const user: User = {
      id,
      fullName,
      phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Store in database
    userDatabase.set(id, user);

    return user;
  },

  // Get user by phone
  getByPhone: (phone: string): User | null => {
    for (const user of userDatabase.values()) {
      if (user.phone === phone) {
        return user;
      }
    }
    return null;
  },

  // Get user by ID
  getById: (userId: string): User | null => {
    return userDatabase.get(userId) || null;
  },

  // Update user
  update: (userId: string, updates: Partial<User>): User => {
    const user = userDatabase.get(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Update fields
    const updatedUser: User = {
      ...user,
      ...updates,
      id: user.id, // Prevent ID change
      phone: user.phone, // Prevent phone change
      createdAt: user.createdAt, // Prevent creation date change
      updatedAt: new Date(),
    };

    userDatabase.set(userId, updatedUser);
    return updatedUser;
  },

  // Check if phone exists
  phoneExists: (phone: string): boolean => {
    for (const user of userDatabase.values()) {
      if (user.phone === phone) {
        return true;
      }
    }
    return false;
  },

  // Get all users (for admin purposes - usually not exposed)
  getAll: (): User[] => {
    return Array.from(userDatabase.values());
  },
};

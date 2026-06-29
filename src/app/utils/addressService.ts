import { Address } from '@/app/context/AuthContext';
import { validation } from '@/app/utils/validation';
import { v4 as uuidv4 } from 'uuid';

// In-memory address database
const addressDatabase: Map<string, Address> = new Map();

export const addressService = {
  // Get addresses for user
  getByUserId: (userId: string): Address[] => {
    const userAddresses: Address[] = [];

    for (const address of addressDatabase.values()) {
      if (address.userId === userId) {
        userAddresses.push(address);
      }
    }

    // Sort by default address first
    userAddresses.sort((a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0));

    return userAddresses;
  },

  // Get default address for user
  getDefaultAddress: (userId: string): Address | null => {
    for (const address of addressDatabase.values()) {
      if (address.userId === userId && address.isDefault) {
        return address;
      }
    }
    return null;
  },

  // Create new address
  create: (
    userId: string,
    address: Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
  ): Address => {
    // Validate required fields
    if (!address.fullName) throw new Error('Full name is required');
    if (!validation.isValidPhone(address.phone.replace('+91', ''))) {
      throw new Error('Invalid phone number');
    }
    if (!address.addressLine1) throw new Error('Address is required');
    if (!validation.isValidPINCode(address.postalCode)) {
      throw new Error('Invalid PIN code');
    }

    // Generate address ID
    const id = uuidv4();

    // If this is the first address for user, mark as default
    const userAddresses = addressService.getByUserId(userId);
    const isDefault = userAddresses.length === 0 || address.isDefault;

    // Create address record
    const newAddress: Address = {
      id,
      userId,
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      postalCode: address.postalCode,
      city: address.city,
      state: address.state,
      country: address.country,
      isDefault,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Store in database
    addressDatabase.set(id, newAddress);

    return newAddress;
  },

  // Update address
  update: (
    addressId: string,
    userId: string,
    updates: Partial<Address>
  ): Address => {
    const address = addressDatabase.get(addressId);

    if (!address) {
      throw new Error('Address not found');
    }

    // Verify ownership
    if (address.userId !== userId) {
      throw new Error('Unauthorized');
    }

    // Validate updates if provided
    if (updates.phone && !validation.isValidPhone(updates.phone.replace('+91', ''))) {
      throw new Error('Invalid phone number');
    }
    if (updates.postalCode && !validation.isValidPINCode(updates.postalCode)) {
      throw new Error('Invalid PIN code');
    }

    // Update fields
    const updatedAddress: Address = {
      ...address,
      ...updates,
      id: address.id,
      userId: address.userId,
      createdAt: address.createdAt,
      updatedAt: new Date(),
    };

    addressDatabase.set(addressId, updatedAddress);

    return updatedAddress;
  },

  // Delete address
  delete: (addressId: string, userId: string): void => {
    const address = addressDatabase.get(addressId);

    if (!address) {
      throw new Error('Address not found');
    }

    // Verify ownership
    if (address.userId !== userId) {
      throw new Error('Unauthorized');
    }

    // Remove from database
    addressDatabase.delete(addressId);

    // If deleted address was default, set next address as default
    if (address.isDefault) {
      const userAddresses = addressService.getByUserId(userId);
      if (userAddresses.length > 0) {
        addressService.setDefault(userAddresses[0].id, userId);
      }
    }
  },

  // Set address as default
  setDefault: (addressId: string, userId: string): void => {
    const address = addressDatabase.get(addressId);

    if (!address) {
      throw new Error('Address not found');
    }

    // Verify ownership
    if (address.userId !== userId) {
      throw new Error('Unauthorized');
    }

    // Set all user addresses to non-default
    for (const addr of addressDatabase.values()) {
      if (addr.userId === userId) {
        addr.isDefault = false;
      }
    }

    // Set this address as default
    address.isDefault = true;
    addressDatabase.set(addressId, address);
  },

  // Get all addresses (for admin purposes)
  getAll: (): Address[] => {
    return Array.from(addressDatabase.values());
  },
};

import React, { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { AlertCircle } from 'lucide-react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string | null;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  placeholder?: string;
}

export function PhoneInput({
  value,
  onChange,
  error,
  disabled = false,
  label = 'Phone Number',
  required = true,
  placeholder = 'Enter 10-digit number',
}: PhoneInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/\D/g, '');

    // Limit to 10 digits
    inputValue = inputValue.slice(0, 10);

    onChange(inputValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor="phone-input" className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      {/* Phone Input Container */}
      <div className="flex items-center gap-0 border-2 rounded-lg overflow-hidden transition-all duration-200"
        style={{
          borderColor: error ? '#dc2626' : isFocused ? '#ADD8E6' : '#e5e5e5',
          boxShadow: error ? 'none' : isFocused ? '0 0 0 3px rgba(173, 216, 230, 0.1)' : 'none',
        }}
      >
        {/* +91 Prefix */}
        <div className="px-4 py-3 bg-gray-50 border-r-2 border-gray-200 flex items-center">
          <span className="text-sm font-semibold text-gray-700">+91</span>
        </div>

        {/* Phone Input */}
        <Input
          id="phone-input"
          type="tel"
          inputMode="numeric"
          maxLength={10}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          placeholder={placeholder}
          className={`flex-1 border-0 focus:ring-0 text-base font-medium ${
            disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'
          } ${error ? 'text-red-600' : 'text-gray-900'}`}
          style={{
            padding: '12px 16px',
          }}
        />

        {/* Formatted Display */}
        {!isFocused && value && (
          <div className="absolute right-4 pointer-events-none">
            <span className="text-xs text-gray-500 font-mono">
              {value.slice(0, 4)} {value.slice(4, 7)} {value.slice(7)}
            </span>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
          <AlertCircle size={14} className="text-red-600 flex-shrink-0" />
          <p className="text-xs text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
}

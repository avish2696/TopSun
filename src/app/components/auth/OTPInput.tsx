import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import { AlertCircle, Loader } from 'lucide-react';

interface OTPInputProps {
  onOTPSubmit: (otp: string) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  attempts?: number;
  maxAttempts?: number;
  onResendClick?: () => Promise<void>;
  phone?: string;
}

export function OTPInput({
  onOTPSubmit,
  isLoading = false,
  error = null,
  attempts = 3,
  maxAttempts = 3,
  onResendClick,
  phone,
}: OTPInputProps) {
  const [otpValue, setOtpValue] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle resend cooldown
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Only allow digits
    value = value.replace(/\D/g, '');

    // Limit to 6 digits
    value = value.slice(0, 6);

    setOtpValue(value);

    // Auto-submit when 6 digits entered
    if (value.length === 6 && !isSubmitting && !isLoading) {
      handleSubmit(value);
    }
  };

  const handleSubmit = async (otpCode: string) => {
    if (isSubmitting || isLoading || otpCode.length !== 6) return;

    setIsSubmitting(true);
    try {
      await onOTPSubmit(otpCode);
    } catch {
      // Error handled by parent, just reset submitting state
      setIsSubmitting(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length === 6) {
      await handleSubmit(otpValue);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      if (onResendClick) {
        await onResendClick();
      }
      setOtpValue('');
      setResendCooldown(30);
      inputRef.current?.focus();
    } catch {
      // Error handled by parent
    } finally {
      setResendLoading(false);
    }
  };

  const handleClear = () => {
    setOtpValue('');
    inputRef.current?.focus();
  };

  const isDisabled = isLoading || isSubmitting || attempts <= 0 || error?.includes('exceeded');

  return (
    <div className="w-full space-y-6">
      {/* Phone Display */}
      {phone && (
        <p className="text-center text-sm text-gray-600">
          OTP sent to <span className="font-semibold text-gray-900">{phone}</span>
        </p>
      )}

      {/* OTP Input Form */}
      <form onSubmit={handleManualSubmit} className="space-y-4">
        {/* Single OTP Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Enter 6-digit OTP</label>
          <Input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otpValue}
            onChange={handleInputChange}
            disabled={isDisabled}
            placeholder="000000"
            className="h-12 text-center text-2xl font-mono font-bold border-2 border-gray-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg transition-all duration-200"
            autoFocus
          />
          <p className="text-xs text-gray-500 text-center">
            {otpValue.length}/6 digits • Auto-submits when complete
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Attempts Remaining */}
        {attempts < maxAttempts && attempts > 0 && (
          <p className="text-center text-xs text-amber-600">
            ⚠️ {attempts} attempt{attempts !== 1 ? 's' : ''} remaining
          </p>
        )}

        {/* Loading State */}
        {isLoading || isSubmitting ? (
          <div className="flex items-center justify-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <Loader size={18} className="animate-spin text-blue-500 mr-2" />
            <span className="text-sm text-blue-700 font-medium">Verifying OTP...</span>
          </div>
        ) : (
          // Manual Submit Button
          <Button
            type="submit"
            disabled={otpValue.length !== 6}
            className="w-full h-11 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: otpValue.length === 6 ? 'linear-gradient(135deg, #ADD8E6, #87CEEB)' : '#ccc',
            }}
          >
            Verify OTP
          </Button>
        )}
      </form>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {/* Clear Button */}
        {otpValue.length > 0 && (
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={isLoading || isSubmitting}
            className="w-full text-sm"
          >
            Clear
          </Button>
        )}

        {/* Resend Button */}
        {(attempts <= 0 || resendLoading) && (
          <Button
            variant="outline"
            onClick={handleResend}
            disabled={resendLoading || resendCooldown > 0}
            className="w-full"
          >
            {resendLoading ? (
              <>
                <Loader size={16} className="animate-spin mr-2" />
                Resending...
              </>
            ) : resendCooldown > 0 ? (
              `Resend in ${resendCooldown}s`
            ) : (
              'Request New OTP'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

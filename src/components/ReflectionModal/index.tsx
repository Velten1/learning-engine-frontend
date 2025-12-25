'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import ReflectionForm from '@/components/ReflectionForm';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  pomodoroId: string;
  onSuccess?: () => void;
}

export default function ReflectionModal({
  isOpen,
  onClose,
  pomodoroId,
  onSuccess,
}: ReflectionModalProps) {
  if (!isOpen) return null;

  const handleSuccess = () => {
    if (onSuccess) {
      onSuccess();
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-3xl glass-strong rounded-2xl shadow-2xl fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/20">
          <h2 className="text-xl font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
            Reflexão sobre o aprendizado
          </h2>
          <p className="text-sm text-[#64748b] dark:text-[#94a3b8] mt-1">
            Registre seus pensamentos e insights sobre o que você estudou
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-4 max-h-[80vh] overflow-y-auto">
          <ReflectionForm
            pomodoroId={pomodoroId}
            onSuccess={handleSuccess}
            onCancel={handleCancel}
            showCancelButton={true}
            showCard={false}
            showHeader={false}
          />
        </div>
      </div>
    </div>
  );
}


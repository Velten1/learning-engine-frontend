'use client';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Logout"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Sair
          </Button>
        </>
      }
    >
      <p className="text-[#475569] dark:text-[#cbd5e1]">
        Tem certeza que deseja sair? Você precisará fazer login novamente para acessar sua conta.
      </p>
    </Modal>
  );
}


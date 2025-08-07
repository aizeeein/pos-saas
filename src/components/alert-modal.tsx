import { useEffect, useState } from "react";
import Modal from "./ui/modal";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface AlertModalProps {
  isCheckout?: boolean;
  title?: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal = ({
  isCheckout,
  title,
  description,
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title={title ? title : "Apakah yakin akan menghapus?"}
      description={
        description ? description : "Data yang dihapus tidak dapat dikembalikan"
      }
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button variant={"outline"} disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button
          className={cn(isCheckout ? "bg-green-600 hover:bg-green-600/70" : "")}
          disabled={loading}
          variant={isCheckout ? "default" : "destructive"}
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

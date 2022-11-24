import { useNavigate, useParams } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";

type ModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  children: ReactNode;
};
export function Modal({ isOpen, onOpenChange, children }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-gray-400/40 fixed inset-0 animate-[overlayShow_150ms_ease-in]" />
        <Dialog.Content className="bg-white rounded-md fixed shadow-dark-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-lg max-h-[85vh] animate-[contentShow_150ms_ease-in] overflow-auto">
          {children}

          <Dialog.Close asChild>
            <button
              className="absolute border border-gray50 top-4 right-4 bg-slate-900/30 hover:bg-slate-900/80 text-gray-50 rounded-full p-2"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

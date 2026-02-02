import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogContentProps } from "@radix-ui/react-dialog";
import React from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { cn } from "@/utils/util";

interface IProps extends DialogContentProps {
  trigger?: React.ReactElement;
  children: React.ReactNode;
  title: string;
  description: string;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  hideHeader?: boolean;
}

const Modal = ({
  trigger,
  title,
  description,
  children,
  className,
  hideHeader,
  isOpen,
  open: openModal,
  close: closeModal,
  ...restProps
}: IProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => (isOpen ? openModal() : closeModal())}
    >
      {trigger && (
        <DialogTrigger asChild>{React.cloneElement(trigger)}</DialogTrigger>
      )}

      <DialogContent
        className={cn(
          "w-[90vw] max-w-[500px] sm:max-w-[425px] max-h-[85vh]",
          className,
        )}
        {...restProps}
      >
        {hideHeader ? (
          <VisuallyHidden>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </VisuallyHidden>
        ) : (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        )}

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;

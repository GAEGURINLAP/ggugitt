"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AlertProps {
  title?: string;
  message: string;
  subMessage?: string;
  isShowTitle?: boolean;
  isShowSubMessage?: boolean;
  buttons: React.ReactNode[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function Alert({
  title,
  message,
  subMessage,
  buttons,
  isShowTitle,
  isShowSubMessage,
  open,
  onOpenChange,
}: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[327px] p-6">
        <AlertDialogHeader className="text-center">
          {isShowTitle && (
            <AlertDialogTitle className="text-2xl">{title}</AlertDialogTitle>
          )}
        </AlertDialogHeader>
        <AlertDialogDescription className="text-center space-y-1">
          <div className="text-base">{message}</div>
          {isShowSubMessage && (
            <div className="text-xs text-gray-500">{subMessage}</div>
          )}
        </AlertDialogDescription>
        <AlertDialogFooter className="flex-row gap-2 sm:justify-center">
          {buttons.map((button, index) => (
            <div key={index} className="flex-1">
              {button}
            </div>
          ))}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps {
  isWidthFull?: boolean;
  isRadiusFull?: boolean;
  isDisabled?: boolean;
  isFloating?: boolean;
  size?: "default" | "sm" | "lg" | "Large";
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  children?: React.ReactNode;
}

export function ButtonPrimary({
  onClick,
  label,
  size = "default",
  isWidthFull,
  isRadiusFull,
  isDisabled,
  isFloating,
  type = "button",
  className,
  children,
}: ButtonProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter") {
      if (onClick && !isDisabled) {
        onClick();
      }
    }
  };

  return (
    <Button
      type={type}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={isDisabled}
      className={cn(
        "min-w-[120px] flex items-center justify-center select-none transition-all duration-200 ease-in-out",
        // 크기 설정
        size === "Large" ? "h-16" : "h-12",
        // 너비 설정
        isWidthFull ? "w-full" : "w-fit",
        // 둥근 모서리 설정
        isRadiusFull ? "rounded-[1000px]" : "rounded-lg",
        // 패딩 설정
        "px-6",
        // 색상 설정
        isDisabled
          ? "bg-gray-300 text-gray-500 cursor-default"
          : "bg-[#00a4a9] text-white hover:bg-[#019398]",
        // 그림자 설정
        isFloating && "shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
        // 사용자 선택 방지
        "select-none",
        className
      )}
    >
      {children || label}
    </Button>
  );
}

export function ButtonSecondary({
  onClick,
  label,
  size = "default",
  isWidthFull,
  isRadiusFull,
  isDisabled,
  isFloating,
  type = "button",
  className,
  children,
}: ButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      variant="outline"
      className={cn(
        "min-w-[120px] flex items-center justify-center select-none transition-all duration-200 ease-in-out",
        // 크기 설정
        size === "Large" ? "h-16" : "h-12",
        // 너비 설정
        isWidthFull ? "w-full" : "w-fit",
        // 둥근 모서리 설정
        isRadiusFull ? "rounded-[1000px]" : "rounded-lg",
        // 패딩 설정
        "px-6",
        // 색상 설정
        isDisabled
          ? "bg-gray-100 text-gray-500 cursor-default border-gray-200"
          : "border-gray-300 hover:bg-gray-50",
        // 그림자 설정
        isFloating && "shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
        // 사용자 선택 방지
        "select-none",
        className
      )}
    >
      {children || label}
    </Button>
  );
}

export function ButtonError({
  onClick,
  label,
  size = "default",
  isWidthFull,
  isRadiusFull,
  isDisabled,
  isFloating,
  type = "button",
  className,
  children,
}: ButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      variant="destructive"
      className={cn(
        "min-w-[120px] flex items-center justify-center select-none transition-all duration-200 ease-in-out",
        // 크기 설정
        size === "Large" ? "h-16" : "h-12",
        // 너비 설정
        isWidthFull ? "w-full" : "w-fit",
        // 둥근 모서리 설정
        isRadiusFull ? "rounded-[1000px]" : "rounded-lg",
        // 패딩 설정
        "px-6",
        // 색상 설정
        isDisabled
          ? "bg-gray-300 text-gray-500 cursor-default"
          : "bg-red-600 hover:bg-red-700",
        // 그림자 설정
        isFloating && "shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
        // 사용자 선택 방지
        "select-none",
        className
      )}
    >
      {children || label}
    </Button>
  );
}

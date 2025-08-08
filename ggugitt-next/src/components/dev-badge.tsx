"use client";

import { Badge } from "@/components/ui/badge";

interface DevBadgeProps {
  className?: string;
}

export default function DevBadge({ className }: DevBadgeProps) {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (!isDevelopment) {
    return null;
  }

  return (
    <Badge
      variant="destructive"
      className={`text-xs font-bold uppercase tracking-wider ${className}`}
    >
      DEV
    </Badge>
  );
}

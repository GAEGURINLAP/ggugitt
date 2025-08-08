"use client";

import Image from "next/image";

interface LoadingScreenProps {
  isDim?: boolean;
}

export default function LoadingScreen({ isDim }: LoadingScreenProps) {
  return (
    <div
      className={`absolute left-0 w-full h-screen flex justify-center items-center z-[999999] ${
        isDim ? "bg-black/20" : ""
      }`}
    >
      <Image
        src="/images/animation/loading.gif"
        width={120}
        height={120}
        alt="ggugitt Loading"
      />
    </div>
  );
}

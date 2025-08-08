"use client";

import Image from "next/image";
import { ButtonPrimary } from "@/components/ui/custom-button";

export default function Landing() {
  return (
    <>
      <nav className="flex justify-between items-center px-4 py-4">
        <div className="flex items-center">
          <Image
            src="/images/logo/lg-brandingtitle-sm.png"
            width={100}
            height={20}
            alt="꾸깃"
          />
        </div>
        <div className="flex items-center">
          <Image
            src="/images/icon/common/icon-menu.svg"
            width={24}
            height={24}
            alt="메뉴"
          />
        </div>
      </nav>

      <div className="min-h-screen bg-white">
        <section className="flex flex-col lg:flex-row items-center justify-center px-4 py-8 lg:py-16">
          <div className="text-center lg:text-left lg:mr-8 space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
              끈김없는 연속적인 <br /> 투표 서비스
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              가끔... 투표가 끊겨서 아쉬운, <br />
              그런 때 있지 않나요? 그렇죠
            </p>
            <div className="pt-4">
              <ButtonPrimary label="첫 투표 시작하기" />
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <Image
              src="/images/illust/il-landing-section-01.webp"
              alt="히어로 이미지"
              width={390}
              height={390}
              className="max-w-full h-auto"
            />
          </div>
        </section>
      </div>
    </>
  );
}

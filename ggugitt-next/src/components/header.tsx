"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Alert from "@/components/alert";
import { ButtonSecondary, ButtonPrimary } from "@/components/ui/custom-button";
import DevBadge from "@/components/dev-badge";

import { auth } from "@/lib/firebase";

interface HeaderProps {
  isNavigator?: boolean;
  path?: string;
}

export default function Header({ isNavigator, path }: HeaderProps) {
  const [isShowAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const clickBackButton = () => {
    router.push(`/${path}`);
  };

  const clickLogOut = () => {
    setShowAlert(true);
  };

  const confirmLogOut = () => {
    auth.signOut();
    router.refresh();
  };

  const userName = auth.currentUser?.displayName;

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {isNavigator && (
              <button
                onClick={clickBackButton}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Image
                  src="/images/icon/common/icon-arrow-left.svg"
                  width={24}
                  height={24}
                  alt="뒤로가기"
                />
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <DevBadge />
            <button
              onClick={() => router.push("/mypage")}
              className="text-sm hover:text-blue-600 transition-colors"
            >
              <span className="font-semibold">{userName}</span>님
            </button>
            <button
              onClick={clickLogOut}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <img
                src="/images/icon/common/icon-logout.svg"
                width={24}
                height={24}
                alt="로그아웃"
              />
            </button>
          </div>
        </div>
      </header>

      <Alert
        message="정말로 로그아웃 하시나요?!"
        buttons={[
          <ButtonSecondary
            key="no"
            label="아니오"
            onClick={() => setShowAlert(false)}
            isWidthFull
          />,
          <ButtonPrimary
            key="yes"
            label="로그아웃"
            onClick={confirmLogOut}
            isWidthFull
          />,
        ]}
        open={isShowAlert}
        onOpenChange={setShowAlert}
      />
    </>
  );
}

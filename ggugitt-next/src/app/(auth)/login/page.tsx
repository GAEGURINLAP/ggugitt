"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Sentry from "@sentry/react";

import { ButtonPrimary } from "@/components/ui/custom-button";
import DevBadge from "@/components/dev-badge";
import Alert from "@/components/alert";

const loginSchema = z.object({
  email: z.string().email("이메일 형식에 맞지 않습니다."),
  password: z.string().min(8, "8자리 이상 비밀번호를 사용하세요."),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const { email, password } = data;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setShowAlert(true);
        console.log(e.message);

        Sentry.captureException(e, {
          tags: {
            location: "login-page",
            action: "sign-in",
            errorType: "firebase-auth",
            environment:
              typeof window !== "undefined" &&
              window.location.hostname.includes("localhost")
                ? "local"
                : typeof window !== "undefined" &&
                  window.location.hostname.includes("ggugitt-dev.web.app")
                ? "development"
                : typeof window !== "undefined" &&
                  window.location.hostname.includes("ggugitt.com")
                ? "production"
                : "unknown",
            project: "ggugitt",
          },
          extra: {
            email: email,
            errorCode: e.code,
            errorMessage: e.message,
          },
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const clickConfirm = () => {
    router.back();
  };

  if (user === null) {
    return (
      <>
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md space-y-8">
            <div className="flex justify-center">
              <Image
                src="/images/illust/il-vote-progress-square.png"
                alt="꾸깃"
                width={180}
                height={180}
              />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold">
                <span className="font-bold">꾸깃</span> 로그인
              </h1>
              <DevBadge />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register("email")}
                  id="email"
                  placeholder="이메일을 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("password")}
                  id="password"
                  placeholder="패스워드를 입력해주세요"
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="text-center">
                <Link
                  href="/reset-password"
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>

              <ButtonPrimary
                label={isLoading ? "로딩 중입니다..." : "로그인"}
                isRadiusFull
                isWidthFull
                type="submit"
                isDisabled={isLoading}
              />
            </form>
            <div className="text-center text-sm">
              계정이 없으신가요?{" "}
              <Link
                href="/create-account"
                className="text-blue-600 hover:text-blue-800"
              >
                회원 가입 →
              </Link>
            </div>
          </div>
        </div>

        <Alert
          message="로그인 정보가 틀렸어요!"
          buttons={[
            <ButtonPrimary
              key="confirm"
              label="확인"
              onClick={handleAlertClose}
              isWidthFull
            />,
          ]}
          open={isShowAlert}
          onOpenChange={setShowAlert}
        />
      </>
    );
  }

  return (
    <Alert
      message="이미 로그인 하셨습니다!"
      buttons={[
        <ButtonPrimary
          key="confirm"
          label="확인"
          onClick={clickConfirm}
          isWidthFull
        />,
      ]}
      open={true}
      onOpenChange={() => {}}
    />
  );
}

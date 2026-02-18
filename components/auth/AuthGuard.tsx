"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/config/supabase";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const isAuthPage = pathname === "/login" || pathname === "/register";

      if (!session && !isAuthPage) {
        router.push("/login");
      } else if (session && isAuthPage) {
        router.push("/");
      } else {
        setLoading(false);
      }
    };

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const isAuthPage = pathname === "/login" || pathname === "/register";

      if (!session && !isAuthPage) {
        router.push("/login");
      } else if (session && isAuthPage) {
        router.push("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e23]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-lg font-medium animate-pulse">
            กำลังตรวจสอบสถานะ...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

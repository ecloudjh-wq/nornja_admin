"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { adminMarkup } from "@/data/adminMarkup";
import { adminLegacyScripts } from "@/data/adminLegacyScripts";

export default function AdminLegacy() {
  const router = useRouter();
  const rootRef = useRef(null);

  useEffect(() => {
    if (window.sessionStorage.getItem("nornjaAdminLoggedIn") !== "1") {
      router.replace("/login");
      return;
    }

    // React Strict Mode에서 레거시 이벤트가 중복 등록되는 것을 방지한다.
    if (!window.__NORNJA_LEGACY_LOADED__) {
      window.__NORNJA_LEGACY_LOADED__ = true;

      adminLegacyScripts.forEach((code, index) => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.dataset.nornjaLegacy = String(index);
        script.text = code;
        document.body.appendChild(script);
      });
    }

    const logoutButton = document.getElementById("previewLogoutBtn");
    const handleLogout = () => {
      window.sessionStorage.removeItem("nornjaAdminLoggedIn");
      window.sessionStorage.removeItem("nornjaAdminJustLoggedIn");
      window.__NORNJA_LEGACY_LOADED__ = false;

      // 레거시 document 이벤트까지 깨끗하게 초기화하기 위해 전체 이동.
      window.location.href = "/login";
    };

    logoutButton?.addEventListener("click", handleLogout);

    if (window.sessionStorage.getItem("nornjaAdminJustLoggedIn") === "1") {
      window.sessionStorage.removeItem("nornjaAdminJustLoggedIn");

      const toast = document.createElement("div");
      toast.className = "login-success-toast";
      toast.textContent = "로그인되었습니다.";
      document.body.appendChild(toast);
      window.setTimeout(() => toast.remove(), 1400);
    }

    return () => {
      logoutButton?.removeEventListener("click", handleLogout);
    };
  }, [router]);

  return (
    <div
      ref={rootRef}
      className="nornja-admin-legacy-root"
      dangerouslySetInnerHTML={{ __html: adminMarkup }}
    />
  );
}

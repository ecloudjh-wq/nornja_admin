"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { adminMarkup } from "@/data/adminMarkup";
import { adminLegacyScripts } from "@/data/adminLegacyScripts";
import AdminProfileModal from "@/components/AdminProfileModal";

export default function AdminLegacy() {
  const router = useRouter();
  const rootRef = useRef(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const closeProfile = useCallback(() => setProfileOpen(false), []);

  const showProfileToast = useCallback((message) => {
    const toast = document.createElement("div");
    toast.className = "login-success-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    window.setTimeout(() => toast.remove(), 1400);
  }, []);

  const handleProfileSaved = useCallback(
    (profile) => {
      const profileName = document.querySelector(".profile-text strong");
      if (profileName) profileName.textContent = profile.name;
      showProfileToast("관리자 정보가 수정되었습니다.");
    },
    [showProfileToast]
  );

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

    const savedProfile = window.localStorage.getItem("nornjaAdminProfile");
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        const profileName = document.querySelector(".profile-text strong");
        if (profileName && profile?.name) profileName.textContent = profile.name;
      } catch {
        // 화면 확인용 프로필 데이터가 깨진 경우 기본 표시값을 유지한다.
      }
    }

    const logoutButton = document.getElementById("previewLogoutBtn");
    const profileButton = document.querySelector(".profile-button");

    const handleLogout = () => {
      window.sessionStorage.removeItem("nornjaAdminLoggedIn");
      window.sessionStorage.removeItem("nornjaAdminJustLoggedIn");
      window.__NORNJA_LEGACY_LOADED__ = false;

      // GitHub Pages의 프로젝트 basePath를 포함해 전체 이동한다.
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
      window.location.href = `${basePath}/login/`;
    };

    const handleProfileClick = (event) => {
      // 기존 레거시 공통 모달보다 먼저 처리한다.
      event.preventDefault();
      event.stopImmediatePropagation();
      setProfileOpen(true);
    };

    logoutButton?.addEventListener("click", handleLogout);
    profileButton?.addEventListener("click", handleProfileClick, true);

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
      profileButton?.removeEventListener("click", handleProfileClick, true);
    };
  }, [router]);

  return (
    <>
      <div
        ref={rootRef}
        className="nornja-admin-legacy-root"
        dangerouslySetInnerHTML={{ __html: adminMarkup }}
      />
      <AdminProfileModal
        open={profileOpen}
        onClose={closeProfile}
        onSaved={handleProfileSaved}
      />
    </>
  );
}

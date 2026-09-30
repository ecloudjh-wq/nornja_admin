"use client";

import { useEffect, useState } from "react";
import styles from "./AdminProfileModal.module.css";

const DEFAULT_PROFILE = {
  name: "김관리자",
  adminId: "admin01",
  email: "admin@company.com",
  phone: "010-1234-5678",
  department: "운영팀 / 관리자",
  role: "최고관리자",
};

export default function AdminProfileModal({ open, onClose, onSaved }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    const saved = window.localStorage.getItem("nornjaAdminProfile");
    if (saved) {
      try {
        setProfile({ ...DEFAULT_PROFILE, ...JSON.parse(saved) });
      } catch {
        setProfile(DEFAULT_PROFILE);
      }
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const updateProfile = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!profile.name.trim()) {
      setError("관리자명을 입력해 주세요.");
      return;
    }

    if (newPassword || confirmPassword || currentPassword) {
      if (!currentPassword) {
        setError("비밀번호 변경 시 현재 비밀번호를 입력해 주세요.");
        return;
      }
      if (newPassword.length < 8) {
        setError("새 비밀번호는 8자 이상 입력해 주세요.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setError("새 비밀번호가 일치하지 않습니다.");
        return;
      }
    }

    window.localStorage.setItem(
      "nornjaAdminProfile",
      JSON.stringify({
        name: profile.name.trim(),
        adminId: profile.adminId,
        email: profile.email.trim(),
        phone: profile.phone.trim(),
        department: profile.department.trim(),
        role: profile.role,
      })
    );

    onSaved(profile);
    onClose();
  };

  return (
    <div className={styles.backdrop} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="adminProfileTitle">
        <header className={styles.header}>
          <div>
            <h2 id="adminProfileTitle">내 정보 수정</h2>
            <p>관리자 기본 정보와 비밀번호를 변경할 수 있습니다.</p>
          </div>
          <button className={styles.closeButton} type="button" onClick={onClose} aria-label="닫기">
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit}>
          <div className={styles.body}>
            <div className={styles.sectionTitle}>기본 정보</div>
            <div className={styles.formGrid}>
              <label htmlFor="profileName">관리자명</label>
              <input
                id="profileName"
                value={profile.name}
                onChange={(event) => updateProfile("name", event.target.value)}
              />

              <label htmlFor="profileId">아이디</label>
              <div className={styles.readonlyWrap}>
                <input id="profileId" value={profile.adminId} readOnly />
                <span>변경 불가</span>
              </div>

              <label htmlFor="profileEmail">이메일</label>
              <input
                id="profileEmail"
                type="email"
                value={profile.email}
                onChange={(event) => updateProfile("email", event.target.value)}
              />

              <label htmlFor="profilePhone">휴대폰</label>
              <input
                id="profilePhone"
                value={profile.phone}
                onChange={(event) => updateProfile("phone", event.target.value)}
                placeholder="010-0000-0000"
              />

              <label htmlFor="profileDepartment">소속/직급</label>
              <input
                id="profileDepartment"
                value={profile.department}
                onChange={(event) => updateProfile("department", event.target.value)}
              />

              <label htmlFor="profileRole">권한</label>
              <div className={styles.readonlyWrap}>
                <input id="profileRole" value={profile.role} readOnly />
                <span>변경 불가</span>
              </div>

              <div className={styles.metaLabel}>최근 로그인</div>
              <div className={styles.metaValue}>2026.09.30 10:42</div>
            </div>

            <div className={styles.divider} />

            <div className={styles.sectionHeadingRow}>
              <div>
                <div className={styles.sectionTitle}>비밀번호 변경</div>
                <p>비밀번호를 변경하지 않을 경우 아래 항목은 비워두세요.</p>
              </div>
            </div>

            <div className={styles.formGrid}>
              <label htmlFor="currentPassword">현재 비밀번호</label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(event) => {
                  setCurrentPassword(event.target.value);
                  setError("");
                }}
                autoComplete="current-password"
              />

              <label htmlFor="newPassword">새 비밀번호</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                  setError("");
                }}
                placeholder="8자 이상 입력"
                autoComplete="new-password"
              />

              <label htmlFor="confirmPassword">새 비밀번호 확인</label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setError("");
                }}
                autoComplete="new-password"
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}
          </div>

          <footer className={styles.footer}>
            <button className="btn" type="button" onClick={onClose}>
              취소
            </button>
            <button className="btn primary" type="submit">
              저장
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

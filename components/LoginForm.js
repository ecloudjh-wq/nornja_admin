"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/login/login.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberId, setRememberId] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const savedId = window.localStorage.getItem("nornjaAdminId");
    if (savedId) {
      setAdminId(savedId);
      setRememberId(true);
    }
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (!adminId.trim() || !password.trim()) {
      setError("아이디 또는 비밀번호를 확인해 주세요.");
      return;
    }

    setError("");
    setSubmitting(true);

    if (rememberId) {
      window.localStorage.setItem("nornjaAdminId", adminId.trim());
    } else {
      window.localStorage.removeItem("nornjaAdminId");
    }

    // 화면 확인용 임시 로그인.
    // 실제 개발에서는 이 부분을 관리자 인증 API로 교체.
    window.sessionStorage.setItem("nornjaAdminLoggedIn", "1");
    window.sessionStorage.setItem("nornjaAdminJustLoggedIn", "1");

    window.setTimeout(() => {
      router.push("/admin");
    }, 650);
  }

  return (
    <main className={styles.loginPage}>
      <div className={styles.loginShell}>
        <section className={styles.brandPanel}>
          <div>
            <div className={styles.brand}>
              <div className={styles.brandMark}>🥚</div>
              <span>노른자국어 관리자센터</span>
            </div>

            <div className={styles.brandCopy}>
              <div className={styles.eyebrow}>NOREUNJA KOREAN ADMIN</div>
              <h1>
                서비스 운영을 위한
                <br />
                관리자 전용 페이지입니다.
              </h1>
              <p>
                회원·구독·결제·학습·콘텐츠 및 운영 정보를
                <br />
                관리자 계정으로 확인하고 관리할 수 있습니다.
              </p>
            </div>
          </div>

          <div className={styles.footer}>© 노른자국어. All rights reserved.</div>
        </section>

        <section className={styles.formPanel}>
          <div className={styles.formWrap}>
            <div className={styles.formHead}>
              <h2>관리자 로그인</h2>
              <p>발급받은 관리자 계정으로 로그인해 주세요.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label htmlFor="adminId">아이디</label>
                <input
                  id="adminId"
                  value={adminId}
                  onChange={(e) => {
                    setAdminId(e.target.value);
                    setError("");
                  }}
                  autoComplete="username"
                  placeholder="아이디를 입력해 주세요."
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="adminPassword">비밀번호</label>
                <div className={styles.passwordWrap}>
                  <input
                    id="adminPassword"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    autoComplete="current-password"
                    placeholder="비밀번호를 입력해 주세요."
                  />
                  <button
                    className={styles.passwordToggle}
                    type="button"
                    aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                    onClick={() => setShowPassword((value) => !value)}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
                      <circle cx="12" cy="12" r="2.5" />
                    </svg>
                  </button>
                </div>
              </div>

              <label className={styles.remember}>
                <input
                  type="checkbox"
                  checked={rememberId}
                  onChange={(e) => setRememberId(e.target.checked)}
                />
                <span>아이디 저장</span>
              </label>

              <button className={styles.loginButton} type="submit" disabled={submitting}>
                {submitting ? "로그인되었습니다." : "로그인"}
              </button>

              {error && <p className={styles.error}>{error}</p>}
            </form>

            <div className={styles.help}>
              로그인에 문제가 있으신가요?
              <br />
              <strong>관리자에게 문의해 주세요.</strong>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

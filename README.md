# 노른자국어 관리자센터 · Next.js JavaScript 이관본

기존 HTML 관리자 설계를 **Next.js App Router + JavaScript(JSX)** 프로젝트로 옮긴 1차 이관본입니다.

## 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 시 `/login`으로 이동합니다.

## 로그인

현재는 화면/동작 확인용 Mock 로그인입니다.

- 아이디: 아무 값
- 비밀번호: 아무 값
- 로그인 성공 → `/admin`
- 관리자 상단 `로그아웃` → `/login`

실제 개발 시 `components/LoginForm.js`의 Mock 로그인 부분을 인증 API 호출로 교체하면 됩니다.

## 이번 이관에서 제외한 기능

- 디스크립션 보기 버튼 및 패널
- 빨간 번호 마커
- 관리자 기획서 외부 링크
- 급수 등록
- 단락 등록
- 매듭 등록
- 학습 구조 수정

## 포함

- 관리자 로그인
- 대시보드
- 계정 관리 / 개인정보·동의 관리
- 구독 / 주문·결제 / 결제 실패 / 환불
- 학습 현황 / 이력 / 결과 / 분석
- 콘텐츠 목록 / 등록 / 수정 / 일괄 등록 / 변경 이력
- 매출·구독 / 유입·전환 / 페이지 행동 분석
- 알림 발송 이력
- 1:1 문의 / 전화 문의 / FAQ
- 약관 / 게시판 / 자료실 / 팝업 / 메인 배너 / 운영자 처리 이력
- 관리자 계정 / 권한 관리

## 구현 방식

이번 버전은 화면을 빠르게 Next.js로 이관하고 기존 시안의 동작을 최대한 보존하기 위해:

- 로그인 화면은 React 컴포넌트로 신규 구현
- 관리자 본문은 기존 최신 HTML Markup/CSS를 Next.js에서 렌더링
- 기존 화면의 인터랙션 JavaScript는 Client Component에서 실행

하는 **1차 Migration 방식**입니다.

즉, Next.js 프로젝트에서 바로 실행하고 화면 확인은 가능하지만,
모든 관리자 화면을 처음부터 React state/API 구조로 다시 작성한 최종 운영 코드 단계는 아닙니다.

실개발에서는 화면별 API 연결 시점에 `data/adminMarkup.js`와 `adminLegacyScripts.js`의 기능을
각 React Component로 순차 분리하는 방식이 가장 안전합니다.

## 추천 2차 구조

```text
app/
  login/
  admin/
    members/
    payments/
    learning/
    contents/
    analytics/
    notifications/
    cs/
    operation/

components/
  layout/
  common/
  members/
  payments/
  ...
```

현재 이관본을 UI 기준점으로 사용한 뒤 화면 단위로 위 구조로 분리하면 됩니다.

# 개발 이관 체크

1. 관리자 인증 API 연결
2. 미인증 `/admin` 접근 차단을 middleware 또는 서버 세션 방식으로 변경
3. Mock 데이터 → 실제 API 데이터 교체
4. 기존 DOM 이벤트를 화면별 React state/event로 순차 전환
5. 관리자 역할/권한 정책 확정 후 route/action guard 적용
6. 지원 브라우저 및 최소 해상도 확정
7. 환불/개인정보 등 중요 처리 API는 서버 재검증 필수

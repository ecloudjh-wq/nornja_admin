# QC 결과

검수 기준: 기존 최신 관리자 HTML → Next.js JavaScript 1차 이관본

## 확인 완료
- 관리자 실제 화면: 33개
- 좌측 메뉴: 28개
- 제외 대상 화면 4개 미포함
  - 급수 등록
  - 단락 등록
  - 매듭 등록
  - 학습 구조 수정
- 디스크립션 UI 미포함
- 디스크립션 레거시 JavaScript도 제거
- 관리자 기획서 링크 미포함
- 모든 `data-go` 화면 이동 대상 유효성 확인
- 기존 관리자 JavaScript 구문 검사 통과
- 브라우저 DOM 시뮬레이션 기준 28개 사이드 메뉴 이동 정상
- 계정 관리 보호자 탭 전환 정상
- 주문 상세 팝업 열기 정상
- 콘텐츠 등록 화면 이동 정상
- 페이지 행동 분석 23개 페이지 데이터 확인
- FAQ 39개 항목 데이터 확인
- 브라우저 시뮬레이션 중 JavaScript page error / console error 없음

## 확인 제한
현재 실행 환경에서 외부 npm registry 접근이 제한되어 `npm install`이 완료되지 않아,
Next.js 자체의 `npm run build`까지는 실행 검증하지 못했습니다.

따라서 이 ZIP은 정적 구조/JavaScript/DOM 동작까지 QC한 버전이며,
개발 환경에서 아래 두 명령만 최종 확인하면 됩니다.

```bash
npm install
npm run build
```

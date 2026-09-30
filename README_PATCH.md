# nornja_admin GitHub Pages + 관리자 정보 수정 패치

이 ZIP은 기존 `ecloudjh-wq/nornja_admin` 저장소에 덮어쓰기 위한 패치 파일입니다.

## 적용 방법

1. ZIP 압축을 풉니다.
2. 압축을 푼 내부 파일/폴더를 기존 `nornja_admin` 저장소 **루트**에 그대로 복사합니다.
3. 같은 이름의 파일은 덮어씁니다.
4. 새로 추가되는 `.github/workflows/deploy.yml`, `components/AdminProfileModal.js`, `components/AdminProfileModal.module.css`도 함께 포함되어야 합니다.
5. GitHub에 commit / push 합니다.
6. GitHub 저장소 `Settings > Pages > Build and deployment > Source`에서 **GitHub Actions**를 선택합니다.

## 포함 변경사항

- Next.js 정적 Export 활성화 (`output: "export"`)
- GitHub Pages 프로젝트 경로 `/nornja_admin` 대응
- 루트(`/`)에서도 로그인 화면 표시
- GitHub Pages 환경에서도 로그아웃 시 로그인 페이지로 정상 이동
- 상단 관리자 프로필 클릭 시 `내 정보 수정` 팝업 표시
- 관리자명 / 이메일 / 휴대폰 / 소속·직급 수정
- 아이디 / 권한 읽기 전용
- 비밀번호 변경 입력 및 기본 검증
- 저장 후 관리자명 즉시 반영 + 완료 토스트
- 화면 확인용 변경 정보는 `localStorage`에 저장

## 배포 URL

GitHub Pages가 정상 배포되면 아래 주소에서 확인할 수 있습니다.

`https://ecloudjh-wq.github.io/nornja_admin/`

## 개발 환경

기존 개발 방식은 그대로 유지됩니다.

```bash
npm install
npm run dev
```

로컬 개발에서는 `NEXT_PUBLIC_BASE_PATH`를 지정하지 않으므로 기존처럼 `http://localhost:3000` 기준으로 동작합니다.

# 우리 팀 Git 협업 규칙 🤝

충돌 방지를 위한 규칙입니다. 작업 순서대로 아래 내용을 지켜주세요.

## 브랜치 이름

- 형식: `feature/이니셜_작업제목`
- 예시: `feature/kna_search-filter`, `feature/jsy_login-fix`
- 소문자·하이픈(-)만 사용, 한글·공백 금지
- 한 브랜치 = 한 작업

## 작업 순서 (충돌 방지 체크리스트)

1. **담당 나누기** — 시작 전 팀원과 누가 어떤 파일을 만질지 정하기 (같은 파일 동시 수정 금지)
2. **최신 main 받기** — `git checkout main` → `git pull origin main`
3. **브랜치 만들기** — `git checkout -b feature/이니셜_작업제목`
4. **작게 자주 커밋** — 큰 덩어리로 몰아 쓰지 않기 → `git add .` → `git commit -m "feat: ..."`
5. **자주 푸시** — `git push -u origin feature/이니셜_작업제목`
6. **하루 1번 main 반영** — `git merge origin/main` 으로 최신 변경을 미리 합치기 (충돌 조기 발견)
7. **PR 전 마지막 동기화** — 다시 `git merge origin/main` → 충돌 있으면 여기서 해결
8. **PR 올리기** — `내 브랜치 → main`, 리뷰어 1명 이상 지정
9. **병합 후 정리** — 병합된 브랜치 삭제, 다음 작업은 1번부터 다시

## 충돌 났을 때

- `<<<<<<< HEAD` / `=======` / `>>>>>>> main` 표시를 전부 지우고 최종 코드로 정리
- `git add .` → `git commit`
- 어떤 코드를 남길지 애매하면 혼자 판단하지 말고 상대와 상의
- 꼬이면 `git merge --abort` 로 되돌리고 다시 시작

## 특히 조심할 파일

- `package.json` / `package-lock.json` → 패키지 설치는 한 명이 담당 후 공유
- 라우터 / `App.tsx` → 라우트는 서로 다른 줄에 추가
- 공용 타입 · 전역 스타일 → 수정 전 팀에 공유

## 금지

- main에 직접 push (항상 PR로)
- `git push -f` (강제 푸시)
- 충돌 표시(`<<<<`)를 안 지우고 커밋

# 계약AX Desk 로컬 실행 안내

준정부기관 계약 AX 시스템 기능명세서를 기반으로 만든 로컬 실증용 동적·반응형 웹앱이다.

## 실행 방법

PowerShell 실행 정책 때문에 `npm` 명령이 차단되는 환경에서는 아래 둘 중 하나를 사용한다.

```powershell
npm.cmd run dev
```

또는

```powershell
node server.js
```

접속 주소:

```text
http://localhost:4173
```

## 주요 화면

- 대시보드
- 새 계약 준비
- 사전점검 결과
- 계약부서 검토함
- 규정 검색
- 후속관리
- 감사·분석
- 관리자 콘솔

## 구현 방식

- Node 내장 HTTP 서버
- 바닐라 JavaScript SPA
- 해시 라우팅
- 브라우저 메모리 기반 목업 데이터
- 역할 기반 메뉴와 화면 접근 제어

## 검증 명령

```powershell
npm.cmd run test
```


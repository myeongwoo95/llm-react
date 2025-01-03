# TODO

- axios instace[완료]
- 클릭시 라우팅[완료]
- NotFound.jsx[완료]
- 로그인/회원가입 퍼블[완료]
- 자동 ipmort 라이브러리[완료] (Autu Import, Reactjs code snippets)
- 사용안하는 import 자동삭제[완료] ([settiong](https://webruden.tistory.com/1069))
- 로그인/회원가입 기능 [완료]
- 로그인 유지 [완료]
- 권한별 메뉴 다르게 보이기 [완료]
- 인증별 route 제한 [완료]
- 권한별 route 제한 [완료]
- axios api 모듈화 [완료]
- token 자동삽입 [완료]
- input hooks [완료]
- 메뉴 뎁스로 나누기 [완료]
- 디코드 토큰하는걸 로컬스토리지로 변경
- 게시판 삭제를 모달로
- detail 에서 목록가기할 때 페이지 유지하기
- zustand
- 각각의 폴더마다 index.js만들고 사용하는 경우 공부 및 적용
- 리액트 Dockerfile
- vite로 전환
- ESLint와 Prettier
- hooks 복습 및 정리
- setupProxy.js 주석 설명 (100% 까먹음)
- .env 파일이 정상작동안함 (setupProxy.js, axios.js)
- 리액트 부트스트랩 그리드 정리 (모바일, 태블릿, 웹 sm,md etc....)
- React Developer Tools 사용법

# 학습내용

# async/await

- async/await을 쓰지않으면 콜백지옥(then, catch)
- async는 함수에 앞에 달아주어 비동기 함수로 만들어줌
- async 사용 시 try/catch를 사용해야함
- 함수내에서 await을 사용할 수 있음

```javascript
async function fetchData() {
  try {
    const response = await axios.get("https://api.example.com/data");
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}
fetchData();
```

#

# Frontend Project

React 기반의 프론트엔드 프로젝트입니다. S3 Presigned URL을 사용한 안전한 파일 업로드 기능을 포함하고 있습니다.

### 배포 주소

https://d3b1u1b57tjxpa.cloudfront.net/

## Available Scripts

In the project directory, you can run:

### `yarn install` or `yarn add`

한번만 진행해도 되는 프로젝트 라이브러리 세팅

### `yarn start`

실행하기\
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

테스트용 인터랙티브 모드\
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

배포용 정적 파일을 생성\
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.\

## .env 파일 내용

```
REACT_APP_API_URL=http://백엔드 서버 주소
REACT_APP_WEBSOCKET_URL=ws://백엔드 서버 주소

```

## 프로젝트 구조

```
src/
├── apis/               # API 함수
├── assets/             # 아이콘
├── components/         # 헤더, 푸터 등 전역적으로 쓰이는 컴포넌트
├── pages/              # 라우팅되는 페이지들
│   └── 페이지명/
│       ├── index.tsx   # 페이지 구조
│       └── style.ts    # 스타일드 컴포넌트
├── store/              # 유저정보 저장
├── styles/             # 컬러 토큰화
├── utils/              # S3 업로드 유틸리티
└── types/              # 타입 정의
```

## 보안 고려사항

- 파일 크기 및 타입 검증
- Presigned URL 만료 시간 설정
- S3 파일 존재 확인
- 사용자 권한 검증

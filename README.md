# Frontend Project

React 기반의 프론트엔드 프로젝트입니다. S3 Presigned URL을 사용한 안전한 파일 업로드 기능을 포함하고 있습니다.

## 주요 기능

### 📁 S3 Presigned URL 파일 업로드

- **안전한 업로드**: AWS S3 Presigned URL을 사용한 직접 업로드
- **진행률 표시**: 실시간 업로드 진행률 추적
- **드래그 앤 드롭**: 직관적인 파일 업로드 인터페이스
- **파일 검증**: 크기 및 타입 검증
- **다중 파일 지원**: 여러 파일 동시 업로드

#### 업로드 플로우

1. **프론트엔드**: 파일 선택 → 백엔드에 presigned URL 요청
2. **백엔드**: S3 SDK로 presigned URL 생성 → 프론트엔드에 전달
3. **프론트엔드**: presigned URL로 S3에 직접 업로드
4. **프론트엔드**: 업로드 완료 후 파일 정보를 백엔드에 전송
5. **백엔드**: 파일 정보를 DB에 저장하고 S3에서 파일 존재 확인

#### 사용 예시

```tsx
import FileUpload from './components/FileUpload';

// 단일 파일 업로드
<FileUpload
  onUploadSuccess={(result) => console.log('업로드 완료:', result)}
  onUploadError={(error) => console.error('업로드 실패:', error)}
  maxSize={10} // MB
  allowedTypes={['image/jpeg', 'image/png', 'application/pdf']}
  folder="uploads"
  description="업로드된 파일"
  showProgress={true}
/>

// 다중 파일 업로드
<FileUpload
  multiple={true}
  onUploadSuccess={(results) => console.log('업로드 완료:', results)}
  onUploadError={(error) => console.error('업로드 실패:', error)}
  maxSize={20}
  allowedTypes={['image/jpeg', 'image/png']}
  folder="images"
  showProgress={false}
/>
```

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
REACT_APP_API_URL={백엔드 서버 주소}
```

## 백엔드 API 요구사항

파일 업로드 기능을 사용하려면 백엔드에서 다음 API를 구현해야 합니다:

### 1. Presigned URL 생성 API
- **POST** `/api/files/presigned-url/`
- 파일 업로드를 위한 S3 presigned URL 생성

### 2. 파일 정보 저장 API
- **POST** `/api/files/`
- 업로드 완료된 파일 정보를 DB에 저장

자세한 백엔드 구현 가이드는 `BACKEND_API_GUIDE.md` 파일을 참조하세요.

## 프로젝트 구조

```
src/
├── components/
│   └── FileUpload/          # 파일 업로드 컴포넌트
├── pages/
│   └── FileUploadExample/   # 파일 업로드 예시 페이지
├── apis/
│   └── file.ts             # 파일 관련 API 함수
├── utils/
│   └── s3Upload.ts         # S3 업로드 유틸리티
└── types/
    └── s3.ts               # S3 관련 타입 정의
```

## 의존성

- `react-dropzone`: 드래그 앤 드롭 파일 업로드
- `styled-components`: 스타일링
- `axios`: HTTP 클라이언트

## 보안 고려사항

- 파일 크기 및 타입 검증
- Presigned URL 만료 시간 설정
- S3 파일 존재 확인
- 사용자 권한 검증
REACT_APP_API_URL={http://백엔드 서버 주소} \
REACT_APP_WEBSOCKET_URL={ws://백엔드 서버 주소} \

### 마이크 인식률 높이기...?

\Backend\routes\websocket.py 485줄 \
`session["max_silence_duration"] = 1.0  # 일반 발화` \
`session["max_silence_duration"] = 10.0  # 일반 발화` 으로 변경해보기

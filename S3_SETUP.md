# S3 파일 업로드 설정 가이드

## 🔧 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경변수를 설정하세요:

```env
# API URL
REACT_APP_API_URL=http://localhost:8000/api

# AWS S3 설정
REACT_APP_AWS_REGION=ap-northeast-2
REACT_APP_AWS_ACCESS_KEY_ID=your_access_key_id
REACT_APP_AWS_SECRET_ACCESS_KEY=your_secret_access_key
REACT_APP_S3_BUCKET_NAME=your_bucket_name
```

## 📋 AWS S3 설정 단계

### 1. S3 버킷 생성
1. AWS 콘솔에서 S3 서비스로 이동
2. "버킷 만들기" 클릭
3. 버킷 이름 설정 (예: `my-app-uploads`)
4. 리전 선택 (예: `ap-northeast-2`)
5. 퍼블릭 액세스 설정에서 "모든 퍼블릭 액세스 차단" 해제
6. 버킷 생성

### 2. IAM 사용자 생성 및 권한 설정
1. AWS 콘솔에서 IAM 서비스로 이동
2. "사용자" → "사용자 생성"
3. 사용자 이름 설정 (예: `s3-upload-user`)
4. "액세스 키 - 프로그래밍 방식 액세스" 선택
5. 권한 정책 생성:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:PutObjectAcl",
                "s3:GetObject",
                "s3:DeleteObject"
            ],
            "Resource": "arn:aws:s3:::your-bucket-name/*"
        }
    ]
}
```

### 3. CORS 설정 (S3 버킷)
S3 버킷의 CORS 설정에 다음을 추가:

```json
[
    {
        "AllowedHeaders": ["*"],
        "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
        "AllowedOrigins": ["http://localhost:3000", "https://your-domain.com"],
        "ExposeHeaders": []
    }
]
```

## 🚀 사용 방법

### 1. 기본 사용법
```tsx
import FileUpload from './components/FileUpload';

function App() {
  const handleUploadSuccess = (fileData) => {
    console.log('업로드된 파일:', fileData);
  };

  const handleUploadError = (error) => {
    console.error('업로드 실패:', error);
  };

  return (
    <FileUpload
      onUploadSuccess={handleUploadSuccess}
      onUploadError={handleUploadError}
      maxSizeMB={10}
      allowedTypes={['image/jpeg', 'image/png', 'application/pdf']}
      folder="uploads"
    />
  );
}
```

### 2. 다중 파일 업로드
```tsx
<FileUpload
  multiple={true}
  onUploadSuccess={handleUploadSuccess}
  onUploadError={handleUploadError}
  maxSizeMB={5}
  allowedTypes={['image/jpeg', 'image/png']}
  folder="images"
/>
```

## 📁 파일 구조

```
src/
├── components/
│   └── FileUpload/
│       └── index.tsx          # 파일 업로드 컴포넌트
├── utils/
│   └── s3Upload.ts            # S3 업로드 유틸리티
├── apis/
│   └── file.ts                # 백엔드 API 함수
├── types/
│   └── s3.ts                  # S3 관련 타입 정의
└── pages/
    └── FileUploadExample/
        └── index.tsx          # 사용 예시 페이지
```

## 🔄 업로드 프로세스

1. **파일 선택** → 사용자가 파일 선택
2. **파일 검증** → 크기, 타입 검증
3. **S3 업로드** → AWS SDK로 S3에 직접 업로드
4. **백엔드 전송** → S3 URL을 백엔드에 전송
5. **DB 저장** → 백엔드에서 URL을 데이터베이스에 저장

## ⚠️ 보안 주의사항

- `.env.local` 파일은 `.gitignore`에 추가하여 Git에 커밋하지 마세요
- AWS 액세스 키는 최소 권한 원칙에 따라 설정하세요
- 프로덕션에서는 환경변수를 안전하게 관리하세요

## 🐛 문제 해결

### CORS 오류
- S3 버킷의 CORS 설정 확인
- 올바른 도메인이 허용되었는지 확인

### 권한 오류
- IAM 사용자의 권한 정책 확인
- S3 버킷 이름이 정확한지 확인

### 환경변수 오류
- `.env.local` 파일이 프로젝트 루트에 있는지 확인
- 환경변수 이름이 `REACT_APP_`으로 시작하는지 확인






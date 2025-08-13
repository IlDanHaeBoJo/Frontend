# 백엔드 API 라우터 구조

## 개요
이 프로젝트는 공지사항별 첨부파일 관리 시스템을 위한 백엔드 API 라우터를 제공합니다.

## API 구조

### 1. 첨부파일 관리 API (`/src/apis/attachment.ts`)

#### 핵심 기능
- **Presigned URL 발급**: S3 업로드를 위한 임시 URL 생성
- **파일 업로드 완료 처리**: S3 업로드 후 백엔드에 파일 정보 저장
- **첨부파일 목록 조회**: 공지사항별 첨부파일 목록
- **파일 다운로드**: 첨부파일 다운로드
- **파일 삭제**: 개별/일괄 첨부파일 삭제

#### 주요 엔드포인트

| 메서드 | 엔드포인트 | 설명 |
|--------|------------|------|
| POST | `/attachments/upload-url/{notice_id}` | 1단계: Presigned URL 생성 |
| POST | `/attachments/upload-complete/{notice_id}` | 3단계: 업로드 완료 처리 |
| GET | `/attachments/notice/{notice_id}` | 첨부파일 목록 조회 |
| GET | `/attachments/download/{attachment_id}` | 다운로드 URL 생성 |
| DELETE | `/attachments/{attachment_id}` | 첨부파일 삭제 |
| GET | `/attachments/{attachment_id}/info` | 첨부파일 정보 조회 |
| POST | `/attachments` | 첨부파일 생성 |

### 2. 파일 관리 API (`/src/apis/file.ts`)

#### 기능
- **S3 직접 업로드**: 클라이언트에서 S3로 직접 PUT 요청
- **기존 파일 관리**: 범용 파일 관리 기능

#### 주요 함수
- `uploadToS3()`: S3에 직접 업로드
- `saveFileInfo()`: 파일 정보 저장
- `getFileList()`: 파일 목록 조회
- `deleteFile()`: 파일 삭제

## 사용법

### 1. 첨부파일 업로드 플로우

```typescript
import { 
  getPresignedUrl, 
  uploadToS3, 
  uploadComplete 
} from '../apis/attachment';

// 1. Presigned URL 발급
const presignedResponse = await getPresignedUrl({
  noticeId: 1,
  request: {
    fileName: 'example.pdf',
    fileType: 'application/pdf',
    fileSize: 1024000
  }
});

// 2. S3에 직접 업로드
await uploadToS3(presignedResponse.presignedUrl, file);

// 3. 업로드 완료 콜백
await uploadComplete({
  noticeId: 1,
  fileData: {
    key: presignedResponse.key,
    fileName: 'example.pdf',
    fileType: 'application/pdf',
    fileSize: 1024000
  }
});
```

### 2. 첨부파일 목록 조회

```typescript
import { getAttachmentList } from '../apis/attachment';

const attachments = await getAttachmentList({ noticeId: 1 });
```

### 3. 파일 다운로드

```typescript
import { downloadAttachment } from '../apis/attachment';

const blob = await downloadAttachment({ attachmentId: 123 });
```

### 4. 파일 삭제

```typescript
import { deleteAttachment } from '../apis/attachment';

await deleteAttachment({ attachmentId: 123 });
```

### 5. 첨부파일 생성

```typescript
import { createAttachment } from '../apis/attachment';

const newAttachment = await createAttachment({
  noticeId: 1,
  fileData: {
    fileName: 'example.pdf',
    fileType: 'application/pdf',
    fileSize: 1024000,
    url: 'https://s3.amazonaws.com/bucket/key',
    key: 'attachments/example.pdf',
    bucket: 'my-bucket',
    description: '예시 파일'
  }
});
```

## 핵심 규칙

### S3 업로드 규칙
1. **Authorization 헤더 금지**: Presigned URL 자체가 권한을 포함
2. **Content-Type 일치**: Presigned URL 생성 시와 동일한 Content-Type 사용
3. **withCredentials: false**: 쿠키 전송 금지
4. **URL 수정 금지**: Presigned URL의 쿼리스트링을 수정하지 않음

### API 호출 규칙
1. **단일 객체 인자**: 모든 API 함수는 단일 객체로 매개변수 전달
2. **일관된 패턴**: `{ noticeId, request }` 형태로 통일
3. **타입 안전성**: TypeScript 타입 정의 준수

## 에러 처리

```typescript
try {
  const result = await getPresignedUrl({ noticeId: 1, request });
} catch (error) {
  console.error('API 호출 실패:', error);
  // 사용자에게 적절한 에러 메시지 표시
}
```

## 확장 가능성

### 추가 기능
- 파일 압축/압축 해제
- 파일 미리보기 생성
- 바이러스 검사
- 파일 버전 관리
- 접근 권한 관리

### 성능 최적화
- 파일 업로드 진행률 추적
- 대용량 파일 청크 업로드
- 캐싱 전략
- CDN 연동

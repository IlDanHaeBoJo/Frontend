export interface S3UploadResponse {
  url: string;
  key: string;
  bucket: string;
}

export interface FileUploadData {
  file: File;
  fileName?: string;
  folder?: string;
}

export interface S3Config {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
}

// Presigned URL 관련 타입들
export interface PresignedUrlRequest {
  filename: string;
  content_type: string;
  content_length: number;
  folder?: string;
}

export interface PresignedUrlResponse {
  presignedUrl?: string;
  presigned_url?: string;
  upload_url?: string;
  url?: string;
  key?: string;
  stored_filename?: string;
  bucket?: string;
  fields?: Record<string, string>; // POST 방식일 때 사용
  file_type?: string; // Backend API spec
}

export interface FileUploadResult {
  url: string;
  key: string;
  bucket: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  description?: string;
}

export interface FileInfo {
  id: number;
  url: string;
  key: string;
  bucket: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

// 공지사항별 첨부파일 관련 타입들
export interface AttachmentUploadRequest {
  filename: string;
  content_type: string;
  content_length: number;
}

export interface AttachmentUploadCompleteRequest {
  key: string;
  filename: string;
  content_type: string;
  content_length: number;
}

export interface AttachmentInfo {
  id: number;
  original_filename: string;
  file_type: string;
  file_size: number;
  url: string;
  key: string;
  bucket: string;
  created_at: string;
  updated_at: string;
}



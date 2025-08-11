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
  fileName: string;
  fileType: string;
  fileSize: number;
  folder?: string;
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  key: string;
  bucket: string;
  fields?: Record<string, string>; // POST 방식일 때 사용
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
  fileName: string;
  fileType: string;
  fileSize: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}



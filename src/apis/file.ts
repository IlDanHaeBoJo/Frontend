import { api } from ".";
import { 
  S3UploadResponse, 
  PresignedUrlRequest, 
  PresignedUrlResponse, 
  FileUploadResult, 
  FileInfo 
} from "../types/s3";

// S3에 직접 업로드하는 함수 (클라이언트에서 S3로 PUT 요청)
export const uploadToS3 = async (
  presignedUrl: string, 
  file: File
): Promise<void> => {
  // upload_url은 쿼리스트링 한 글자도 수정하지 않음
  // Content-Type을 presign과 동일하게 설정
  // Authorization 헤더 금지 (URL 자체가 권한)
  // withCredentials: false 유지 (axios 기본값)
  
  if (!presignedUrl) {
    throw new Error('Presigned URL is undefined');
  }
  
  console.log('Uploading to S3 with URL:', presignedUrl);
  
  await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
      // Authorization 헤더는 추가하지 않음
    },
    // withCredentials는 fetch의 기본값이 false이므로 별도 설정 불필요
  });
};

// 기존 파일 관리 함수들 (필요시 사용)
export const saveFileInfo = async (fileData: {
  url: string;
  key: string;
  bucket: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  description?: string;
}): Promise<FileInfo> => {
  const response = await api.post("/files/", fileData);
  return response.data;
};

export const saveMultipleFileInfo = async (files: {
  url: string;
  key: string;
  bucket: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  description?: string;
}[]): Promise<FileInfo[]> => {
  const response = await api.post("/files/bulk/", { files });
  return response.data;
};

export const getFileList = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{
  files: FileInfo[];
  total: number;
  page: number;
  limit: number;
}> => {
  const response = await api.get("/files/", { params });
  return response.data;
};

export const deleteFile = async (fileId: number): Promise<void> => {
  const response = await api.delete(`/files/${fileId}/`);
  return response.data;
};

export const updateFileInfo = async (
  fileId: number,
  data: {
    fileName?: string;
    description?: string;
  }
): Promise<FileInfo> => {
  const response = await api.put(`/files/${fileId}/`, data);
  return response.data;
};

export const getFileInfo = async (fileId: number): Promise<FileInfo> => {
  const response = await api.get(`/files/${fileId}/`);
  return response.data;
};



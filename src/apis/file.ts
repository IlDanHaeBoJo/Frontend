import { api } from ".";
import { 
  S3UploadResponse, 
  PresignedUrlRequest, 
  PresignedUrlResponse, 
  FileUploadResult, 
  FileInfo 
} from "../types/s3";

// 1. Presigned URL 요청 (백엔드에서 S3 SDK로 생성)
export const getPresignedUrl = async (request: PresignedUrlRequest): Promise<PresignedUrlResponse> => {
  const response = await api.post("/files/presigned-url/", request);
  return response.data;
};

// 2. 파일 정보를 백엔드에 저장 (업로드 완료 후)
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

// 여러 파일 정보를 백엔드에 저장
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

// 파일 목록 조회
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

// 파일 삭제
export const deleteFile = async (fileId: number): Promise<void> => {
  const response = await api.delete(`/files/${fileId}/`);
  return response.data;
};

// 파일 정보 업데이트
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

// 파일 상세 정보 조회
export const getFileInfo = async (fileId: number): Promise<FileInfo> => {
  const response = await api.get(`/files/${fileId}/`);
  return response.data;
};



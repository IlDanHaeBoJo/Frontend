import { api } from ".";
import { 
  PresignedUrlRequest, 
  PresignedUrlResponse, 
  FileInfo 
} from "../types/s3";

// 1. Presigned URL 발급 요청 (POST /attachments/upload-url/{notice_id})
export const getPresignedUrl = async (
  params: { noticeId: number; request: PresignedUrlRequest }
): Promise<PresignedUrlResponse> => {
  const { noticeId, request } = params;
  
  // 백엔드 API 스펙에 맞는 필드명으로 변환
  const requestData = {
    filename: request.filename,
    file_type: request.content_type,
    file_size: request.content_length,
    method: 'PUT'
  };
  
  const response = await api.post(`/attachments/upload-url/${noticeId}`, requestData);
  return response.data;
};

// 2. 업로드 완료 콜백 (POST /attachments/upload-complete/{notice_id})
export const uploadComplete = async (
  params: {
    noticeId: number;
    fileData: {
      key: string;
      filename: string;
      content_type: string;
      content_length: number;
      etag?: string;
    };
  }
): Promise<FileInfo> => {
  const { noticeId, fileData } = params;
  
  // 백엔드 API 스펙에 맞는 필드명으로 변환
  const requestData = {
    original_filename: fileData.filename,
    s3_key: fileData.key,
    file_size: fileData.content_length,
    file_type: fileData.content_type,
    etag: fileData.etag || '업로드_완료_후_받은_ETag' // 실제로는 S3 응답에서 받은 ETag 사용
  };
  
  console.log('Upload complete request data:', requestData);
  console.log('Original fileData:', fileData);
  
  try {
    const response = await api.post(`/attachments/upload-complete/${noticeId}`, requestData);
    console.log('Upload complete response:', response);
    console.log('Upload complete response data:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Upload complete API error:', error);
    console.error('Upload complete API error response:', error.response);
    throw error;
  }
};

// 3. 첨부파일 목록 조회 (GET /attachments/notice/{notice_id})
export const getAttachmentList = async (params: { noticeId: number }): Promise<FileInfo[]> => {
  const { noticeId } = params;
  const response = await api.get(`/attachments/notice/${noticeId}`);
  return response.data;
};

// 4. 첨부파일 다운로드 (GET /attachments/download/{attachment_id})
export const downloadAttachment = async (params: { attachmentId: number }): Promise<Blob> => {
  const { attachmentId } = params;
  const response = await api.get(`/attachments/download/${attachmentId}`, {
    responseType: 'blob'
  });
  return response.data;
};

// 5. 첨부파일 삭제 (DELETE /attachments/{attachment_id})
export const deleteAttachment = async (params: { attachmentId: number }): Promise<void> => {
  const { attachmentId } = params;
  const response = await api.delete(`/attachments/${attachmentId}`);
  return response.data;
};

// 6. 첨부파일 정보 조회 (GET /attachments/{attachment_id}/info)
export const getAttachmentInfo = async (params: { attachmentId: number }): Promise<FileInfo> => {
  const { attachmentId } = params;
  const response = await api.get(`/attachments/${attachmentId}/info`);
  return response.data;
};

// 7. 첨부파일 생성 (POST /attachments)
export const createAttachment = async (
  params: {
    noticeId: number;
    fileData: {
      fileName: string;
      fileType: string;
      fileSize: number;
      url: string;
      key: string;
      bucket: string;
      description?: string;
    };
  }
): Promise<FileInfo> => {
  const { noticeId, fileData } = params;
  const response = await api.post(`/attachments`, {
    noticeId,
    ...fileData
  });
  return response.data;
};

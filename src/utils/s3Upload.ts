import { 
  PresignedUrlRequest, 
  PresignedUrlResponse, 
  FileUploadResult, 
  FileUploadData 
} from '../types/s3';
import { getPresignedUrl, saveFileInfo } from '../apis/file';

/**
 * Presigned URL을 사용하여 파일을 S3에 업로드
 */
export const uploadFileWithPresignedUrl = async (
  fileData: FileUploadData,
  description?: string
): Promise<FileUploadResult> => {
  const { file, fileName, folder = 'uploads' } = fileData;
  
  // 1. 백엔드에 presigned URL 요청
  const presignedRequest: PresignedUrlRequest = {
    fileName: fileName || file.name,
    fileType: file.type,
    fileSize: file.size,
    folder
  };

  const presignedResponse: PresignedUrlResponse = await getPresignedUrl(presignedRequest);

  // 2. Presigned URL로 S3에 직접 업로드
  const uploadResult = await uploadToS3WithPresignedUrl(file, presignedResponse);

  // 3. 업로드 완료 후 백엔드에 파일 정보 저장
  const fileInfo = await saveFileInfo({
    url: uploadResult.url,
    key: uploadResult.key,
    bucket: uploadResult.bucket,
    fileName: fileName || file.name,
    fileType: file.type,
    fileSize: file.size,
    description
  });

  return {
    url: fileInfo.url,
    key: fileInfo.key,
    bucket: fileInfo.bucket,
    fileName: fileInfo.fileName,
    fileType: fileInfo.fileType,
    fileSize: fileInfo.fileSize,
    description: fileInfo.description
  };
};

/**
 * Presigned URL을 사용하여 S3에 직접 업로드 (PUT 방식)
 */
const uploadToS3WithPresignedUrl = async (
  file: File, 
  presignedResponse: PresignedUrlResponse
): Promise<{ url: string; key: string; bucket: string }> => {
  try {
    const response = await fetch(presignedResponse.presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    // S3 URL 생성 (presigned URL에서 추출)
    const url = presignedResponse.presignedUrl.split('?')[0];
    
    return {
      url,
      key: presignedResponse.key,
      bucket: presignedResponse.bucket,
    };
  } catch (error) {
    console.error('S3 업로드 실패:', error);
    throw new Error('파일 업로드에 실패했습니다.');
  }
};

/**
 * Presigned POST URL을 사용하여 S3에 업로드 (POST 방식)
 */
const uploadToS3WithPresignedPost = async (
  file: File, 
  presignedResponse: PresignedUrlResponse
): Promise<{ url: string; key: string; bucket: string }> => {
  try {
    const formData = new FormData();
    
    // presigned POST의 fields를 FormData에 추가
    if (presignedResponse.fields) {
      Object.entries(presignedResponse.fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    
    // 파일 추가
    formData.append('file', file);

    const response = await fetch(presignedResponse.presignedUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
    }

    // S3 URL 생성
    const url = `${presignedResponse.presignedUrl}/${presignedResponse.key}`;
    
    return {
      url,
      key: presignedResponse.key,
      bucket: presignedResponse.bucket,
    };
  } catch (error) {
    console.error('S3 업로드 실패:', error);
    throw new Error('파일 업로드에 실패했습니다.');
  }
};

/**
 * 여러 파일을 Presigned URL로 업로드
 */
export const uploadMultipleFilesWithPresignedUrl = async (
  files: FileUploadData[],
  description?: string
): Promise<FileUploadResult[]> => {
  const uploadPromises = files.map(fileData => 
    uploadFileWithPresignedUrl(fileData, description)
  );
  return Promise.all(uploadPromises);
};

/**
 * 파일 크기 검증
 */
export const validateFileSize = (file: File, maxSizeMB: number = 10): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * 파일 타입 검증
 */
export const validateFileType = (
  file: File, 
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
): boolean => {
  return allowedTypes.includes(file.type);
};

/**
 * 업로드 진행률을 추적하는 함수
 */
export const uploadFileWithProgress = async (
  fileData: FileUploadData,
  onProgress?: (progress: number) => void,
  description?: string
): Promise<FileUploadResult> => {
  const { file, fileName, folder = 'uploads' } = fileData;
  
  // 1. Presigned URL 요청
  const presignedRequest: PresignedUrlRequest = {
    fileName: fileName || file.name,
    fileType: file.type,
    fileSize: file.size,
    folder
  };

  const presignedResponse: PresignedUrlResponse = await getPresignedUrl(presignedRequest);

  // 2. 진행률 추적과 함께 업로드
  const uploadResult = await uploadToS3WithProgress(file, presignedResponse, onProgress);

  // 3. 백엔드에 파일 정보 저장
  const fileInfo = await saveFileInfo({
    url: uploadResult.url,
    key: uploadResult.key,
    bucket: uploadResult.bucket,
    fileName: fileName || file.name,
    fileType: file.type,
    fileSize: file.size,
    description
  });

  return {
    url: fileInfo.url,
    key: fileInfo.key,
    bucket: fileInfo.bucket,
    fileName: fileInfo.fileName,
    fileType: fileInfo.fileType,
    fileSize: fileInfo.fileSize,
    description: fileInfo.description
  };
};

/**
 * 진행률 추적과 함께 S3에 업로드
 */
const uploadToS3WithProgress = async (
  file: File, 
  presignedResponse: PresignedUrlResponse,
  onProgress?: (progress: number) => void
): Promise<{ url: string; key: string; bucket: string }> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = (event.loaded / event.total) * 100;
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const url = presignedResponse.presignedUrl.split('?')[0];
        resolve({
          url,
          key: presignedResponse.key,
          bucket: presignedResponse.bucket,
        });
      } else {
        reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });

    xhr.open('PUT', presignedResponse.presignedUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
  });
};



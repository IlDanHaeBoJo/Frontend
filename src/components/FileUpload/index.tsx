import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  uploadFileWithPresignedUrl, 
  uploadMultipleFilesWithPresignedUrl,
  uploadFileWithProgress,
  validateFileSize,
  validateFileType 
} from '../../utils/s3Upload';
import { FileUploadData, FileUploadResult } from '../../types/s3';
import './styles.css';

interface FileUploadProps {
  onUploadSuccess?: (result: FileUploadResult | FileUploadResult[]) => void;
  onUploadError?: (error: Error) => void;
  multiple?: boolean;
  maxSize?: number; // MB
  allowedTypes?: string[];
  folder?: string;
  description?: string;
  showProgress?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  multiple = false,
  maxSize = 10,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  folder = 'uploads',
  description,
  showProgress = true
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadResult[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setProgress(0);

    try {
      // 파일 검증
      const invalidFiles = acceptedFiles.filter(file => {
        if (!validateFileSize(file, maxSize)) {
          throw new Error(`${file.name}: 파일 크기가 ${maxSize}MB를 초과합니다.`);
        }
        if (!validateFileType(file, allowedTypes)) {
          throw new Error(`${file.name}: 지원하지 않는 파일 형식입니다.`);
        }
        return false;
      });

      if (invalidFiles.length > 0) {
        throw new Error('일부 파일이 검증을 통과하지 못했습니다.');
      }

      const fileDataArray: FileUploadData[] = acceptedFiles.map(file => ({
        file,
        fileName: file.name,
        folder
      }));

      let results: FileUploadResult[];

      if (multiple) {
        // 여러 파일 업로드
        results = await uploadMultipleFilesWithPresignedUrl(fileDataArray, description);
      } else {
        // 단일 파일 업로드 (진행률 추적 포함)
        if (showProgress) {
          const result = await uploadFileWithProgress(
            fileDataArray[0], 
            (progressValue) => setProgress(progressValue),
            description
          );
          results = [result];
        } else {
          const result = await uploadFileWithPresignedUrl(fileDataArray[0], description);
          results = [result];
        }
      }

      setUploadedFiles(prev => [...prev, ...results]);
      
      if (onUploadSuccess) {
        onUploadSuccess(multiple ? results : results[0]);
      }

    } catch (error) {
      console.error('파일 업로드 실패:', error);
      if (onUploadError) {
        onUploadError(error as Error);
      }
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [multiple, maxSize, allowedTypes, folder, description, showProgress, onUploadSuccess, onUploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: allowedTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>)
  });

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="file-upload-container">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? 'active' : ''} ${uploading ? 'uploading' : ''}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="upload-progress">
            <div className="progress-text">업로드 중...</div>
            {showProgress && (
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            <div className="progress-percentage">{Math.round(progress)}%</div>
          </div>
        ) : (
          <div className="dropzone-content">
            <div className="upload-icon">📁</div>
            <p className="upload-text">
              {isDragActive
                ? '파일을 여기에 놓으세요'
                : '클릭하거나 파일을 드래그하여 업로드하세요'
              }
            </p>
            <p className="upload-hint">
              최대 {maxSize}MB, 지원 형식: {allowedTypes.join(', ')}
            </p>
          </div>
        )}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h4>업로드된 파일:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="uploaded-file">
              <div className="file-info">
                <span className="file-name">{file.fileName}</span>
                <span className="file-size">
                  ({(file.fileSize / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
              <div className="file-actions">
                <a 
                  href={file.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="view-link"
                >
                  보기
                </a>
                <button 
                  onClick={() => removeFile(index)}
                  className="remove-btn"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;



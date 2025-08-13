import React, { useState, useRef } from 'react';
import { uploadToS3 } from '../../apis/file';
import { 
  getPresignedUrl, 
  uploadComplete, 
  getAttachmentList, 
  downloadAttachment,
  deleteAttachment 
} from '../../apis/attachment';
import { FileInfo } from '../../types/s3';
import './styles.css';

interface FileUploadProps {
  noticeId: number;
  onUploadComplete?: () => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ noticeId, onUploadComplete }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [attachments, setAttachments] = useState<FileInfo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 첨부파일 목록 로드
  const loadAttachments = async () => {
    try {
      const attachmentList = await getAttachmentList({ noticeId });
      setAttachments(attachmentList);
    } catch (error) {
      console.error('첨부파일 목록 로드 실패:', error);
    }
  };

  // 컴포넌트 마운트 시 첨부파일 목록 로드
  React.useEffect(() => {
    loadAttachments();
  }, [noticeId]);

  // 파일 선택 핸들러
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  // 파일 업로드 핸들러
  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadProgress({});

    try {
      for (const file of files) {
        // 1. Presigned URL 발급 요청
        const presignedResponse = await getPresignedUrl({
          noticeId,
          request: {
            filename: file.name,
            content_type: file.type,
            content_length: file.size,
          }
        });

        // 2. S3에 직접 PUT 업로드
        setUploadProgress(prev => ({ ...prev, [file.name]: 50 }));
        
        // presigned URL을 유연하게 처리
        const uploadUrl = presignedResponse.presignedUrl || 
                         presignedResponse.presigned_url || 
                         presignedResponse.upload_url || 
                         presignedResponse.url;
        
        if (!uploadUrl) {
          throw new Error('Presigned URL not found in response');
        }
        
        console.log('Presigned URL response:', presignedResponse);
        console.log('Using upload URL:', uploadUrl);
        
        await uploadToS3(uploadUrl, file);
        
        setUploadProgress(prev => ({ ...prev, [file.name]: 75 }));

                 // 3. 업로드 완료 콜백
         await uploadComplete({
           noticeId,
           fileData: {
             key: presignedResponse.stored_filename || presignedResponse.key || '',
             filename: file.name,
             content_type: file.type,
             content_length: file.size,
           }
         });

        setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
      }

      // 4. 목록 새로고침
      await loadAttachments();
      
      // 파일 선택 초기화
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // 콜백 호출
      if (onUploadComplete) {
        onUploadComplete();
      }

    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
      setUploadProgress({});
    }
  };

  // 파일 다운로드 핸들러
  const handleDownload = async (attachment: FileInfo) => {
    try {
      const blob = await downloadAttachment({ attachmentId: attachment.id });
      
      // 다운로드 링크 생성
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = attachment.original_filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('파일 다운로드 실패:', error);
      alert('파일 다운로드에 실패했습니다.');
    }
  };

  // 파일 삭제 핸들러
  const handleDelete = async (attachment: FileInfo) => {
    if (!window.confirm('정말로 이 파일을 삭제하시겠습니까?')) return;

    try {
      await deleteAttachment({ attachmentId: attachment.id });
      await loadAttachments(); // 목록 새로고침
    } catch (error) {
      console.error('파일 삭제 실패:', error);
      alert('파일 삭제에 실패했습니다.');
    }
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="file-upload-container">
      {/* 파일 선택 UI */}
      <div className="file-select-section">
        <h3>첨부파일 업로드</h3>
        <div className="file-input-wrapper">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            disabled={uploading}
            className="file-input"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="file-select-btn"
          >
            파일 선택
          </button>
        </div>

        {/* 선택된 파일 목록 */}
        {files.length > 0 && (
          <div className="selected-files">
            <h4>선택된 파일:</h4>
            <ul>
              {files.map((file, index) => (
                <li key={index}>
                  {file.name} ({formatFileSize(file.size)})
                  {uploadProgress[file.name] && (
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${uploadProgress[file.name]}%` }}
                      />
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="upload-btn"
            >
              {uploading ? '업로드 중...' : '업로드'}
            </button>
          </div>
        )}
      </div>

      {/* 첨부파일 목록 */}
      <div className="attachments-section">
        <h3>첨부파일 목록</h3>
        {attachments?.length === 0 ? (
          <p className="no-files">첨부된 파일이 없습니다.</p>
        ) : (
          <div className="attachments-list">
            {attachments.map((attachment) => (
              <div key={attachment.id} className="attachment-item">
                <div className="attachment-info">
                  <span className="file-name">{attachment.original_filename}</span>
                  <span className="file-size">{formatFileSize(attachment.file_size)}</span>
                  <span className="file-type">{attachment.file_type}</span>
                </div>
                <div className="attachment-actions">
                  <button
                    onClick={() => handleDownload(attachment)}
                    className="download-btn"
                  >
                    다운로드
                  </button>
                  <button
                    onClick={() => handleDelete(attachment)}
                    className="delete-btn"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;



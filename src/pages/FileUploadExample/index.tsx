import React, { useState } from 'react';
import styled from 'styled-components';
import FileUpload from '../../components/FileUpload';
import { FileUploadResult } from '../../types/s3';

const FileUploadExample = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadResult[]>([]);
  const [error, setError] = useState<string>('');

  const handleUploadSuccess = (result: FileUploadResult | FileUploadResult[]) => {
    if (Array.isArray(result)) {
      setUploadedFiles(prev => [...prev, ...result]);
    } else {
      setUploadedFiles(prev => [...prev, result]);
    }
    setError('');
    alert('파일 업로드가 완료되었습니다!');
  };

  const handleUploadError = (error: Error) => {
    setError(error.message);
    alert(`업로드 실패: ${error.message}`);
  };

  return (
    <Container>
      <Title>📁 S3 Presigned URL 파일 업로드 예시</Title>
      
      <Description>
        이 예시는 S3 Presigned URL을 사용한 안전한 파일 업로드를 보여줍니다.
        <br />
        <strong>플로우:</strong> 프론트엔드 → 백엔드에 presigned URL 요청 → S3에 직접 업로드 → 백엔드에 파일 정보 저장
      </Description>
      
      <Section>
        <SectionTitle>단일 파일 업로드 (진행률 표시)</SectionTitle>
        <FileUpload
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          maxSize={5}
          allowedTypes={['image/jpeg', 'image/png', 'image/gif']}
          folder="images"
          description="이미지 파일"
          showProgress={true}
        />
      </Section>

      <Section>
        <SectionTitle>다중 파일 업로드</SectionTitle>
        <FileUpload
          multiple={true}
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          maxSize={10}
          allowedTypes={['image/jpeg', 'image/png', 'image/gif', 'application/pdf']}
          folder="documents"
          description="문서 파일들"
          showProgress={false}
        />
      </Section>

      <Section>
        <SectionTitle>PDF 파일만 업로드</SectionTitle>
        <FileUpload
          onUploadSuccess={handleUploadSuccess}
          onUploadError={handleUploadError}
          maxSize={20}
          allowedTypes={['application/pdf']}
          folder="pdfs"
          description="PDF 문서"
          showProgress={true}
        />
      </Section>

      {error && (
        <ErrorMessage>
          ❌ 오류: {error}
        </ErrorMessage>
      )}

      {uploadedFiles.length > 0 && (
        <Section>
          <SectionTitle>업로드된 파일 목록 ({uploadedFiles.length}개)</SectionTitle>
          <FileList>
            {uploadedFiles.map((file, index) => (
              <FileItem key={index}>
                <FileInfo>
                  <FileName>{file.fileName}</FileName>
                  <FileDetails>
                    <FileSize>{(file.fileSize / 1024 / 1024).toFixed(2)} MB</FileSize>
                    <FileType>{file.fileType}</FileType>
                    {file.description && <FileDescription>{file.description}</FileDescription>}
                  </FileDetails>
                </FileInfo>
                <FileActions>
                  <FileUrl href={file.url} target="_blank" rel="noopener noreferrer">
                    🔗 보기
                  </FileUrl>
                  <FileKey>Key: {file.key}</FileKey>
                </FileActions>
              </FileItem>
            ))}
          </FileList>
        </Section>
      )}
    </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.div`
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
`;

const Section = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const SectionTitle = styled.h2`
  color: #555;
  margin-bottom: 15px;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  padding: 10px;
  margin: 10px 0;
`;

const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const FileName = styled.span`
  font-weight: bold;
  color: #333;
  font-size: 16px;
`;

const FileDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FileSize = styled.span`
  font-size: 12px;
  color: #666;
`;

const FileType = styled.span`
  font-size: 12px;
  color: #007bff;
  background-color: #e3f2fd;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
  width: fit-content;
`;

const FileDescription = styled.span`
  font-size: 12px;
  color: #28a745;
  font-style: italic;
`;

const FileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-end;
`;

const FileUrl = styled.a`
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
  padding: 4px 8px;
  background-color: #f8f9fa;
  border-radius: 4px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #e9ecef;
    text-decoration: none;
  }
`;

const FileKey = styled.span`
  font-size: 10px;
  color: #999;
  font-family: monospace;
  word-break: break-all;
  max-width: 200px;
`;

export default FileUploadExample;



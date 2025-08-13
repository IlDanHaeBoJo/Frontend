import React, { useState, useEffect, useRef } from "react";
import * as S from "./style";
import {
  createNotice,
  getAdminNotices,
  updateNotice,
  deleteNotice,
} from "../../apis/notice";
import { 
  getPresignedUrl, 
  uploadComplete,
  getAttachmentList,
  downloadAttachment,
  deleteAttachment
} from "../../apis/attachment";
import { uploadToS3 } from "../../apis/file";
import { useUser } from "../../store/UserContext";
import { GetNotice, dummyNotices } from "../../types/notice";
import { FileInfo } from "../../types/s3";

const NoticeManage = () => {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [important, setImportant] = useState(false);
  const [notices, setNotices] = useState<GetNotice[]>([]);
  const [editingNotice, setEditingNotice] = useState<GetNotice | null>(null);
  const [viewingNotice, setViewingNotice] = useState<GetNotice | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [uploadStatus, setUploadStatus] = useState<{ [key: string]: string }>({});
  const [createdNoticeId, setCreatedNoticeId] = useState<number | null>(null);
  const [attachments, setAttachments] = useState<FileInfo[]>([]);
  const [deletingNoticeId, setDeletingNoticeId] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

           const fetchNotices = async () => {
      try {
        console.log('Fetching notices...');
        const data = await getAdminNotices();
        console.log('Raw notices data:', data);
        
        if (data && data.length > 0) {
          // 각 공지사항의 첨부파일 정보도 함께 로드
          const noticesWithAttachments = await Promise.all(
            data.map(async (notice: GetNotice) => {
                             try {
                 console.log(`Fetching attachments for notice ${notice.notice_id}...`);
                 const attachments = await getAttachmentList({ noticeId: notice.notice_id });
                 console.log(`Attachments for notice ${notice.notice_id}:`, attachments);
                 
                 // attachments가 배열인지 확인하고, 배열이 아니면 빈 배열로 처리
                 let attachmentArray: any[] = [];
                 
                                   if (Array.isArray(attachments)) {
                    attachmentArray = attachments;
                  } else if (attachments && typeof attachments === 'object') {
                    // 백엔드에서 객체를 반환하는 경우, 객체의 키들을 확인
                    console.log(`Notice ${notice.notice_id} attachments object:`, attachments);
                    console.log(`Notice ${notice.notice_id} attachments object keys:`, Object.keys(attachments));
                    console.log(`Notice ${notice.notice_id} attachments object values:`, Object.values(attachments));
                    
                    // 객체가 비어있지 않다면 배열로 변환 시도
                    if (Object.keys(attachments).length > 0) {
                      // 만약 attachments가 { items: [...] } 형태라면
                      if ((attachments as any).items && Array.isArray((attachments as any).items)) {
                        attachmentArray = (attachments as any).items;
                        console.log(`Notice ${notice.notice_id} found items array:`, attachmentArray);
                      } else if ((attachments as any).attachments && Array.isArray((attachments as any).attachments)) {
                        // { notice_id: 1, attachments: [...] } 형태라면
                        attachmentArray = (attachments as any).attachments;
                        console.log(`Notice ${notice.notice_id} found attachments array:`, attachmentArray);
                      } else if ((attachments as any).data && Array.isArray((attachments as any).data)) {
                        // { data: [...] } 형태라면
                        attachmentArray = (attachments as any).data;
                        console.log(`Notice ${notice.notice_id} found data array:`, attachmentArray);
                      } else {
                        // 다른 형태의 객체라면 빈 배열로 처리
                        attachmentArray = [];
                        console.log(`Notice ${notice.notice_id} no recognizable array found, using empty array`);
                      }
                    } else {
                      console.log(`Notice ${notice.notice_id} attachments object is empty`);
                    }
                  }
                 
                                   return {
                    ...notice,
                                                              attachments: attachmentArray.map(att => ({
                        id: att.attachment_id || att.id, // attachment_id가 우선, 없으면 id
                        original_filename: att.original_filename || att.fileName,
                        file_size: att.file_size || att.fileSize,
                        file_type: att.file_type || att.fileType
                      }))
                  };
               } catch (error) {
                 console.error(`Failed to fetch attachments for notice ${notice.notice_id}:`, error);
                 return {
                   ...notice,
                   attachments: []
                 };
               }
            })
          );
          console.log('Final notices with attachments:', noticesWithAttachments);
          setNotices(noticesWithAttachments);
        } else {
          console.log('No notices found, using dummy data');
          setNotices(dummyNotices);
        }
      } catch (error) {
        console.error("Failed to fetch notices:", error);
        setNotices(dummyNotices);
      }
    };

           // 첨부파일 목록 조회
    const fetchAttachments = async (noticeId: number) => {
             try {
         console.log(`Fetching attachments for notice ${noticeId}...`);
         console.log(`Current user:`, user);
         const attachmentList = await getAttachmentList({ noticeId });
                 console.log(`Raw attachment list for notice ${noticeId}:`, attachmentList);
         console.log(`Attachment list type:`, typeof attachmentList);
         console.log(`Is array:`, Array.isArray(attachmentList));
         console.log(`Attachment list stringified:`, JSON.stringify(attachmentList, null, 2));
        
        // attachmentList가 배열인지 확인하고, 배열이 아니면 빈 배열로 처리
        let attachmentArray: any[] = [];
        
                 if (Array.isArray(attachmentList)) {
           attachmentArray = attachmentList;
           console.log(`Notice ${noticeId} attachments is already an array:`, attachmentArray);
         } else if (attachmentList && typeof attachmentList === 'object') {
            // 백엔드에서 객체를 반환하는 경우, 객체의 키들을 확인
            console.log(`Notice ${noticeId} attachmentList object:`, attachmentList);
            console.log(`Notice ${noticeId} attachmentList object keys:`, Object.keys(attachmentList));
            console.log(`Notice ${noticeId} attachmentList object values:`, Object.values(attachmentList));
            
            // 객체가 비어있지 않다면 배열로 변환 시도
            if (Object.keys(attachmentList).length > 0) {
              // 만약 attachmentList가 { items: [...] } 형태라면
              if ((attachmentList as any).items && Array.isArray((attachmentList as any).items)) {
                attachmentArray = (attachmentList as any).items;
                console.log(`Notice ${noticeId} found items array:`, attachmentArray);
              } else if ((attachmentList as any).attachments && Array.isArray((attachmentList as any).attachments)) {
                // { notice_id: 1, attachments: [...] } 형태라면
                attachmentArray = (attachmentList as any).attachments;
                console.log(`Notice ${noticeId} found attachments array:`, attachmentArray);
              } else if ((attachmentList as any).data && Array.isArray((attachmentList as any).data)) {
                // { data: [...] } 형태라면
                attachmentArray = (attachmentList as any).data;
                console.log(`Notice ${noticeId} found data array:`, attachmentArray);
              } else {
                // 다른 형태의 객체라면 빈 배열로 처리
                attachmentArray = [];
                console.log(`Notice ${noticeId} no recognizable array found, using empty array`);
              }
            } else {
              console.log(`Notice ${noticeId} attachmentList object is empty`);
            }
          } else {
            console.log(`Notice ${noticeId} attachmentList is null/undefined/not object`);
          }
        
                 console.log(`Final attachmentArray for notice ${noticeId}:`, attachmentArray);
         console.log(`Final attachmentArray length:`, attachmentArray.length);
         if (attachmentArray.length > 0) {
           console.log(`First attachment example:`, attachmentArray[0]);
         }
        
                                   // 백엔드 API 응답에 맞게 필드명 변환 (snake_case)
          const normalizedAttachments = attachmentArray.map(att => ({
            id: att.attachment_id || att.id, // attachment_id가 우선, 없으면 id
            original_filename: att.original_filename || att.fileName,
            file_size: att.file_size || att.fileSize,
            file_type: att.file_type || att.fileType,
            url: att.s3_url || att.url, // s3_url이 우선, 없으면 url
            key: att.key,
            bucket: att.bucket,
            created_at: att.uploaded_at || att.created_at || att.createdAt,
            updated_at: att.updated_at || att.updatedAt
          }));
        
        console.log(`Normalized attachments for notice ${noticeId}:`, normalizedAttachments);
        setAttachments(normalizedAttachments);
     } catch (error) {
       console.error('첨부파일 목록 조회 실패:', error);
       setAttachments([]);
     }
   };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(prev => [...prev, ...fileArray]);
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handlePublish = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    const noticeData = {
      title,
      content,
      important,
      author_id: user.id,
    };

    try {
      if (editingNotice) {
        await updateNotice(editingNotice.notice_id, {
          title,
          content,
          important,
        });
        alert("공지사항이 성공적으로 수정되었습니다.");
        resetForm();
        fetchNotices();
            } else {
                 const response = await createNotice(noticeData);
         const newNoticeId = response.notice_id || response.id;
         setCreatedNoticeId(newNoticeId);
         
                   // 선택된 파일이 있으면 첨부파일 업로드
          if (selectedFiles.length > 0) {
            await handleUploadAttachments(newNoticeId);
            alert("공지사항과 첨부파일이 성공적으로 게시되었습니다.");
          } else {
            alert("공지사항이 성공적으로 게시되었습니다.");
          }
          
          // 폼 초기화 및 목록 반드시 새로고침
          resetForm();
          await fetchNotices(); // await 추가하여 확실히 완료되도록
       }
    } catch (error) {
      console.error("Failed to publish notice:", error);
      alert("공지사항 처리에 실패했습니다.");
    }
  };

           const handleUploadAttachments = async (noticeId?: number) => {
      const targetNoticeId = noticeId || createdNoticeId || editingNotice?.notice_id;
      if (!targetNoticeId || selectedFiles.length === 0) {
        alert("업로드할 파일을 선택해주세요.");
        return;
      }

      const finalNoticeId = targetNoticeId; // TypeScript 타입 안전성을 위해

         setUploading(true);
     setUploadProgress({});
     setUploadStatus({});

                   try {
               for (const file of selectedFiles) {
                       // 1. Presigned URL 발급 요청
            const presignedResponse = await getPresignedUrl({
              noticeId: finalNoticeId,
              request: {
                filename: file.name,
                content_type: file.type || 'application/octet-stream',
                content_length: file.size,
              }
            });

                     // 2. S3에 직접 PUT 업로드
           setUploadProgress(prev => ({ ...prev, [file.name]: 25 }));
           setUploadStatus(prev => ({ ...prev, [file.name]: 'S3 업로드 중...' }));
          
                     // presigned URL을 유연하게 처리
           const uploadUrl = presignedResponse.upload_url || 
                            presignedResponse.presignedUrl || 
                            presignedResponse.presigned_url || 
                            presignedResponse.url;
           
           if (!uploadUrl) {
             throw new Error('Presigned URL not found in response');
           }
           
           console.log('Presigned URL response:', presignedResponse);
           console.log('Using upload URL:', uploadUrl);
           console.log('File being uploaded:', file.name, file.size, file.type);
           
                       // S3 PUT 업로드 (presign 응답의 file_type과 동일한 Content-Type 사용)
            const s3Response = await fetch(uploadUrl, {
              method: 'PUT',
              body: file,
              headers: {
                'Content-Type': presignedResponse.file_type || file.type,
              },
              // Authorization 헤더 제거 (S3 PUT에는 사용하지 않음)
            });
           
           if (!s3Response.ok) {
             throw new Error(`S3 upload failed: ${s3Response.status} ${s3Response.statusText}`);
           }
           
           // ETag 추출 (업로드 완료 알림에 사용)
           const etag = s3Response.headers.get('ETag')?.replace(/"/g, '');
          
                     setUploadProgress(prev => ({ ...prev, [file.name]: 75 }));
           setUploadStatus(prev => ({ ...prev, [file.name]: '업로드 완료 처리 중...' }));

                               // 3. 업로드 완료 콜백 (s3_key는 stored_filename 그대로 사용)
            const uploadCompleteData = {
              noticeId: finalNoticeId,
              fileData: {
                key: presignedResponse.stored_filename || '', // stored_filename을 s3_key로 사용
                filename: file.name,
                content_type: file.type || 'application/octet-stream',
                content_length: file.size,
                etag: etag,
              }
            };
            console.log('Calling uploadComplete with data:', uploadCompleteData);
            
            try {
              const uploadResult = await uploadComplete(uploadCompleteData);
              console.log('Upload complete result:', uploadResult);
            } catch (uploadCompleteError) {
              console.error('Upload complete failed for file:', file.name, uploadCompleteError);
              throw new Error(`Upload complete failed for ${file.name}: ${uploadCompleteError}`);
            }

                     setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
           setUploadStatus(prev => ({ ...prev, [file.name]: '✅ 업로드 완료' }));
        }

               alert("첨부파일 업로드가 완료되었습니다.");
        
                 // 모든 파일의 upload-complete가 끝난 뒤 반드시 리패치 진행
         console.log('All files upload-complete finished, starting mandatory refetch...');
         
         try {
           // 1. 즉시 첫 번째 리패치
           console.log('Immediate refetch...');
           await fetchAttachments(finalNoticeId);
           await fetchNotices();
           
           // 2. 2초 후 두 번째 리패치 (백엔드 처리 시간 고려)
           console.log('Waiting 2 seconds for backend processing...');
           await new Promise(resolve => setTimeout(resolve, 2000));
           await fetchAttachments(finalNoticeId);
           await fetchNotices();
           
           // 3. 5초 후 세 번째 리패치 (백엔드 지연 고려)
           console.log('Waiting 5 more seconds and final refetch...');
           await new Promise(resolve => setTimeout(resolve, 5000));
           await fetchAttachments(finalNoticeId);
           await fetchNotices();
           
           console.log('All refetch completed successfully');
           
           // 4. 성공 알림 표시
           const uploadedFiles = selectedFiles.map(f => f.name).join(', ');
           alert(`✅ 첨부파일 업로드 완료!\n\n업로드된 파일:\n${uploadedFiles}\n\n데이터가 새로고침되었습니다.`);
           
         } catch (refetchError) {
           console.error('Refetch failed:', refetchError);
           alert('업로드는 완료되었지만 데이터 새로고침에 실패했습니다. 페이지를 새로고침해주세요.');
         }
        
        // 4. 파일 선택 초기화
        setSelectedFiles([]);
        setUploadProgress({});
        setUploadStatus({});
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
    } catch (error) {
      console.error('첨부파일 업로드 실패:', error);
      alert('첨부파일 업로드에 실패했습니다.');
         } finally {
       setUploading(false);
       setUploadProgress({});
       setUploadStatus({});
     }
  };

           const handleNoticeClick = async (notice: GetNotice) => {
        setViewingNotice(notice);
        setEditingNotice(null);
        setTitle("");
        setContent("");
        setImportant(false);
        setSelectedFiles([]);
        
        // 해당 공지사항의 첨부파일 목록 로드
        await fetchAttachments(notice.notice_id);
      };

      const handleEditClick = async (notice: GetNotice) => {
        setEditingNotice(notice);
        setViewingNotice(null);
        setTitle(notice.title);
        setContent(notice.content);
        setImportant(notice.important);
        setSelectedFiles([]); // 편집 시 첨부파일 초기화
        
        // 해당 공지사항의 첨부파일 목록 로드
        await fetchAttachments(notice.notice_id);
      };

           const resetForm = () => {
        setEditingNotice(null);
        setViewingNotice(null);
        setTitle("");
        setContent("");
        setImportant(false);
        setSelectedFiles([]);
        setCreatedNoticeId(null);
        setAttachments([]);
        setUploading(false);
        setUploadProgress({});
        setUploadStatus({});
        setDeletingNoticeId(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      };

     const handleDelete = async (id: number) => {
     if (window.confirm("정말로 이 공지사항을 삭제하시겠습니까?")) {
       try {
         await deleteNotice(id);
         alert("공지사항이 삭제되었습니다.");
         fetchNotices();
       } catch (error) {
         console.error("Failed to delete notice:", error);
         alert("공지사항 삭제에 실패했습니다.");
       }
     }
   };

       // 첨부파일 다운로드
         const handleDownloadAttachment = async (attachment: FileInfo) => {
       try {
         console.log('Downloading attachment:', attachment);
         console.log('Attachment ID:', attachment.id);
         console.log('Attachment ID type:', typeof attachment.id);
         console.log('Attachment ID value:', attachment.id);
         
         if (!attachment.id || attachment.id === undefined || attachment.id === null) {
           console.error('Attachment ID is undefined or null');
           console.error('Full attachment object:', attachment);
           alert('첨부파일 ID가 없어 다운로드할 수 없습니다.');
           return;
         }
         
         console.log('Calling downloadAttachment with ID:', attachment.id);
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
        console.error('Attachment data:', attachment);
        alert('파일 다운로드에 실패했습니다.');
      }
    };

   // 첨부파일 삭제
   const handleDeleteAttachment = async (attachment: FileInfo) => {
     if (!window.confirm('정말로 이 파일을 삭제하시겠습니까?')) return;

     try {
       await deleteAttachment({ attachmentId: attachment.id });
       
       // 현재 공지사항의 첨부파일 목록 새로고침
       const currentNoticeId = createdNoticeId || editingNotice?.notice_id;
       if (currentNoticeId) {
         await fetchAttachments(currentNoticeId);
       }
       
       // 전체 공지사항 목록도 새로고침
       await fetchNotices();
     } catch (error) {
       console.error('파일 삭제 실패:', error);
       alert('파일 삭제에 실패했습니다.');
     }
   };

  return (
    <S.Container>
             <S.FormSection>
         <S.FormTitle>
           {editingNotice ? "✍️ 공지사항 수정" : viewingNotice ? "📖 공지사항 상세보기" : "✍️ 새 공지사항 작성"}
         </S.FormTitle>
                 <S.InputGroup>
           <S.Label>제목 *</S.Label>
           <S.Input
             placeholder="공지사항 제목을 입력하세요..."
             value={viewingNotice ? viewingNotice.title : title}
             onChange={(e) => setTitle(e.target.value)}
             readOnly={!!viewingNotice}
             style={viewingNotice ? { backgroundColor: '#f5f5f5', cursor: 'default' } : {}}
           />
         </S.InputGroup>
         <S.InputGroup>
           <S.Label>중요도</S.Label>
           <S.Select
             value={viewingNotice ? (viewingNotice.important ? "중요" : "일반") : (important ? "중요" : "일반")}
             onChange={(e) => setImportant(e.target.value === "중요")}
             disabled={!!viewingNotice}
             style={viewingNotice ? { backgroundColor: '#f5f5f5', cursor: 'default' } : {}}
           >
             <option>일반</option>
             <option>중요</option>
           </S.Select>
         </S.InputGroup>
         <S.InputGroup>
           <S.Label>내용 *</S.Label>
           <S.Textarea
             placeholder="공지사항 내용을 입력하세요..."
             value={viewingNotice ? viewingNotice.content : content}
             onChange={(e) => setContent(e.target.value)}
             readOnly={!!viewingNotice}
             style={viewingNotice ? { backgroundColor: '#f5f5f5', cursor: 'default', minHeight: '200px' } : {}}
           />
         </S.InputGroup>
                 {!viewingNotice && (
           <S.InputGroup>
             <S.Label>첨부파일</S.Label>
             <S.FileInput>
               <span>파일을 선택하거나 드래그하세요 (최대 10MB) - 공지사항 작성 시 자동으로 업로드됩니다</span>
               <S.FileButton onClick={handleFileButtonClick}>📎 파일선택</S.FileButton>
             </S.FileInput>
             <input
               ref={fileInputRef}
               type="file"
               multiple
               onChange={handleFileSelect}
               style={{ display: 'none' }}
               accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
             />
             {selectedFiles.length > 0 && (
               <S.FileList>
                 {selectedFiles.map((file, index) => (
                   <S.FileItem key={index}>
                     <S.FileInfo>
                       <S.FileName>{file.name}</S.FileName>
                       <S.FileSize>{(file.size / 1024 / 1024).toFixed(2)} MB</S.FileSize>
                     </S.FileInfo>
                     {uploadProgress[file.name] && (
                       <div style={{ marginTop: '4px' }}>
                         <div style={{ 
                           width: '100%', 
                           height: '4px', 
                           backgroundColor: '#e0e0e0', 
                           borderRadius: '2px',
                           marginBottom: '2px'
                         }}>
                           <div style={{ 
                             width: `${uploadProgress[file.name]}%`, 
                             height: '100%', 
                             backgroundColor: uploadProgress[file.name] === 100 ? '#4CAF50' : '#2196F3',
                             borderRadius: '2px',
                             transition: 'width 0.3s ease'
                           }} />
                         </div>
                         <div style={{ 
                           fontSize: '11px', 
                           color: uploadProgress[file.name] === 100 ? '#4CAF50' : '#2196F3',
                           fontWeight: 'bold'
                         }}>
                           {uploadStatus[file.name] || `${uploadProgress[file.name]}%`}
                         </div>
                       </div>
                     )}
                     <S.RemoveFileButton onClick={() => removeFile(index)}>
                       ❌
                     </S.RemoveFileButton>
                   </S.FileItem>
                 ))}
               </S.FileList>
             )}
           </S.InputGroup>
         )}
                 <S.ButtonSection>
           {editingNotice && (
             <S.CancelButton onClick={resetForm}>취소</S.CancelButton>
           )}
                       {viewingNotice && (
              <S.CancelButton onClick={resetForm}>닫기</S.CancelButton>
            )}
           {!viewingNotice && (
             <S.PublishButton onClick={handlePublish}>
               {editingNotice ? "💾 수정하기" : "📝 공지사항 작성"}
             </S.PublishButton>
           )}
         </S.ButtonSection>
         
                                                {/* 첨부파일 목록 표시 */}
         {attachments?.length > 0 && (
           <S.InputGroup>
             <S.Label>첨부된 파일 목록</S.Label>
             <div style={{ 
               border: '1px solid #ddd', 
               borderRadius: '4px', 
               padding: '10px',
               backgroundColor: '#f9f9f9'
             }}>
                               {attachments.map((attachment, index) => (
                  <div key={attachment.id} style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '5px 0',
                                         borderBottom: index < (attachments?.length || 0) - 1 ? '1px solid #eee' : 'none'
                  }}>
                                         <div>
                       <span style={{ fontWeight: 'bold' }}>{attachment.original_filename}</span>
                       <span style={{ color: '#666', marginLeft: '10px' }}>
                         ({(attachment.file_size / 1024 / 1024).toFixed(2)} MB)
                       </span>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <span style={{ color: '#888', fontSize: '12px' }}>
                         {new Date(attachment.created_at).toLocaleDateString()}
                       </span>
                       <button
                         onClick={() => handleDownloadAttachment(attachment)}
                         style={{
                           background: '#4CAF50',
                           color: 'white',
                           border: 'none',
                           borderRadius: '4px',
                           padding: '4px 8px',
                           fontSize: '12px',
                           cursor: 'pointer'
                         }}
                       >
                         📥 다운로드
                       </button>
                       <button
                         onClick={() => handleDeleteAttachment(attachment)}
                         style={{
                           background: '#f44336',
                           color: 'white',
                           border: 'none',
                           borderRadius: '4px',
                           padding: '4px 8px',
                           fontSize: '12px',
                           cursor: 'pointer'
                         }}
                       >
                         🗑️ 삭제
                       </button>
                     </div>
                  </div>
                ))}
             </div>
           </S.InputGroup>
         )}
       </S.FormSection>
      <S.ListSection>
                 <S.ListTitle>
           📋 기존 공지사항 관리
                       <button 
              onClick={() => {
                fetchNotices();
                resetForm();
              }}
              style={{
                marginLeft: '10px',
                padding: '4px 8px',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              🔄 공지사항 작성
            </button>
         </S.ListTitle>
                 {notices.map((notice) => (
           <S.NoticeCard 
             key={notice.notice_id}
             onClick={() => handleNoticeClick(notice)}
             style={{ cursor: 'pointer' }}
           >
             <S.NoticeTitle>
               {notice.important && <S.ImportantBadge>중요</S.ImportantBadge>}
               {notice.title}
             </S.NoticeTitle>
                         <S.NoticeInfo>
               <span>
                 {new Date(notice.created_at).toLocaleDateString()} 작성
               </span>
               <span>•</span>
               <span>조회 {notice.view_count}회</span>
               <S.StatusBadge>게시중</S.StatusBadge>
             </S.NoticeInfo>
             
                                                        {/* 첨부파일 정보 표시 */}
               {(notice.attachments?.length || 0) > 0 ? (
                <div style={{ 
                  marginTop: '8px', 
                  padding: '8px', 
                  backgroundColor: '#f5f5f5', 
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                                     <span style={{ color: '#666', fontWeight: 'bold' }}>📎 첨부파일:</span>
                                       {notice.attachments?.map((attachment, index) => (
                     <span key={attachment.id} style={{ marginLeft: '8px', color: '#888' }}>
                       {attachment.original_filename}
                                               {(attachment as any).url || (attachment as any).s3_url && (
                          <a
                            href={(attachment as any).url || (attachment as any).s3_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: '#2196F3',
                              textDecoration: 'none',
                              marginLeft: '4px'
                            }}
                          >
                            🔗
                          </a>
                        )}
                                               {index < (notice.attachments?.length || 0) - 1 ? ', ' : ''}
                     </span>
                   ))}
                </div>
              ) : (
                <div style={{ 
                  marginTop: '8px', 
                  padding: '8px', 
                  backgroundColor: '#f9f9f9', 
                  borderRadius: '4px',
                  fontSize: '12px',
                  color: '#999'
                }}>
                  첨부파일 없음
                </div>
              )}
                         <S.ActionButtons onClick={(e) => e.stopPropagation()}>
               <S.EditButton onClick={() => handleEditClick(notice)}>
                 ✏️ 편집
               </S.EditButton>
               <S.DeleteButton onClick={() => handleDelete(notice.notice_id)}>
                 🗑️ 삭제
               </S.DeleteButton>
             </S.ActionButtons>
          </S.NoticeCard>
        ))}
      </S.ListSection>
    </S.Container>
  );
};

export default NoticeManage;

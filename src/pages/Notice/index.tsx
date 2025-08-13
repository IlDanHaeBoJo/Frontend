import React, { useState, useEffect } from "react";
import * as S from "./style";
import { getStudentNotices } from "../../apis/notice";
import { getAttachmentList, downloadAttachment } from "../../apis/attachment";
import type { GetNotice } from "../../types/notice";
import { dummyNotices } from "../../types/notice";

const Notice = () => {
  const [notices, setNotices] = useState<GetNotice[]>([]);
  const [selectedNotice, setSelectedNotice] = useState<GetNotice | null>(null);
  const [selectedNoticeAttachments, setSelectedNoticeAttachments] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const data = await getStudentNotices();
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
                  if (Object.keys(attachments).length > 0) {
                    if ((attachments as any).items && Array.isArray((attachments as any).items)) {
                      attachmentArray = (attachments as any).items;
                    } else if ((attachments as any).attachments && Array.isArray((attachments as any).attachments)) {
                      attachmentArray = (attachments as any).attachments;
                    } else if ((attachments as any).data && Array.isArray((attachments as any).data)) {
                      attachmentArray = (attachments as any).data;
                    }
                  }
                }
                
                return {
                  ...notice,
                  attachments: attachmentArray.map(att => ({
                    id: att.attachment_id || att.id,
                    original_filename: att.original_filename || att.fileName,
                    file_size: att.file_size || att.fileSize,
                    file_type: att.file_type || att.fileType
                  }))
                };
                             } catch (error) {
                 console.error(`Failed to fetch attachments for notice ${notice.notice_id}:`, error);
                 console.error("CORS or network error for attachments. Skipping attachments for this notice.");
                 return {
                   ...notice,
                   attachments: []
                 };
               }
            })
          );
          
          setNotices(noticesWithAttachments);
          setSelectedNotice(noticesWithAttachments[0]);
          // 첫 번째 공지사항의 첨부파일도 로드
          await fetchAttachments(noticesWithAttachments[0].notice_id);
        } else {
          setNotices(dummyNotices);
          setSelectedNotice(dummyNotices[0]);
        }
             } catch (error) {
         console.error("Failed to fetch notices:", error);
         console.error("CORS or network error detected. Please check backend CORS settings.");
         alert("공지사항을 불러오는데 실패했습니다. 백엔드 서버를 확인해주세요.");
         setNotices(dummyNotices);
         setSelectedNotice(dummyNotices[0]);
       }
    };

    fetchNotices();
  }, []);

  // 첨부파일 다운로드
  const handleDownloadAttachment = async (attachment: any) => {
    try {
      console.log('Downloading attachment:', attachment);
      console.log('Attachment ID:', attachment.id);
      
      if (!attachment.id) {
        console.error('Attachment ID is undefined or null');
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

  // 첨부파일 목록 조회
  const fetchAttachments = async (noticeId: number) => {
    try {
      console.log(`Fetching attachments for notice ${noticeId}...`);
      const attachmentList = await getAttachmentList({ noticeId });
      console.log(`Raw attachment list for notice ${noticeId}:`, attachmentList);
      
      // attachmentList가 배열인지 확인하고, 배열이 아니면 빈 배열로 처리
      let attachmentArray: any[] = [];
      
      if (Array.isArray(attachmentList)) {
        attachmentArray = attachmentList;
      } else if (attachmentList && typeof attachmentList === 'object') {
        if (Object.keys(attachmentList).length > 0) {
          if ((attachmentList as any).items && Array.isArray((attachmentList as any).items)) {
            attachmentArray = (attachmentList as any).items;
          } else if ((attachmentList as any).attachments && Array.isArray((attachmentList as any).attachments)) {
            attachmentArray = (attachmentList as any).attachments;
          } else if ((attachmentList as any).data && Array.isArray((attachmentList as any).data)) {
            attachmentArray = (attachmentList as any).data;
          }
        }
      }
      
      // 백엔드 API 응답에 맞게 필드명 변환 (snake_case)
      const normalizedAttachments = attachmentArray.map(att => ({
        id: att.attachment_id || att.id,
        original_filename: att.original_filename || att.fileName,
        file_size: att.file_size || att.fileSize,
        file_type: att.file_type || att.fileType,
        url: att.s3_url || att.url,
        key: att.key,
        bucket: att.bucket,
        created_at: att.uploaded_at || att.created_at || att.createdAt,
        updated_at: att.updated_at || att.updatedAt
      }));
      
      console.log(`Normalized attachments for notice ${noticeId}:`, normalizedAttachments);
      setSelectedNoticeAttachments(normalizedAttachments);
    } catch (error) {
      console.error('첨부파일 목록 조회 실패:', error);
      setSelectedNoticeAttachments([]);
    }
  };

  if (!selectedNotice) {
    return <div>공지사항을 불러오는 중입니다...</div>;
  }

  return (
    <S.Wrapper>
      <S.Container>
        <S.NoticeDetails>
          <S.Title>{selectedNotice.title}</S.Title>
          <S.Date>
            {new Date(selectedNotice.created_at).toLocaleDateString()}
          </S.Date>
          <S.Divider />
          <S.Content>
            {selectedNotice.content.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </S.Content>
          
          {/* 첨부파일 표시 */}
          {selectedNoticeAttachments && selectedNoticeAttachments.length > 0 && (
            <S.Attachments>
              <S.AttachmentsTitle>📎 첨부파일</S.AttachmentsTitle>
                             {selectedNoticeAttachments.map((attachment, index) => (
                 <S.AttachmentFile key={attachment.id || index}>
                   <S.FileIcon>📄</S.FileIcon>
                   <S.FileName>{attachment.original_filename}</S.FileName>
                   <span style={{ 
                     color: '#666', 
                     fontSize: '12px', 
                     marginLeft: '8px' 
                   }}>
                     ({(attachment.file_size / 1024 / 1024).toFixed(2)} MB)
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
                       cursor: 'pointer',
                       marginLeft: '8px'
                     }}
                   >
                     📥 다운로드
                   </button>
                 </S.AttachmentFile>
               ))}
            </S.Attachments>
          )}
        </S.NoticeDetails>
        <S.NoticeList>
          {notices.map((notice) => (
            <S.NoticeItem
              key={notice.notice_id}
              active={selectedNotice.notice_id === notice.notice_id}
              onClick={async () => {
                setSelectedNotice(notice);
                await fetchAttachments(notice.notice_id);
              }}
            >
              <S.NoticeItemTitleWrapper>
                {notice.important && <S.Badge>중요</S.Badge>}
                <S.NoticeItemTitle>{notice.title}</S.NoticeItemTitle>
              </S.NoticeItemTitleWrapper>
              <S.NoticeItemDate>
                {new Date(notice.created_at).toLocaleDateString()}
              </S.NoticeItemDate>
              {/* 첨부파일 정보 표시 */}
              {(notice.attachments?.length || 0) > 0 && (
                <div style={{ 
                  marginTop: '4px', 
                  fontSize: '11px',
                  color: '#666'
                }}>
                  📎 첨부파일 {notice.attachments?.length}개
                </div>
              )}
            </S.NoticeItem>
          ))}
        </S.NoticeList>
      </S.Container>
    </S.Wrapper>
  );
};

export default Notice;

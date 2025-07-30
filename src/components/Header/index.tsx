import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./styles";

interface HeaderProps {
  userRole: "student" | "admin";
}

const Header: React.FC<HeaderProps> = ({ userRole }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
    setIsDropdownOpen(false);
  };

  const handleLogoutClick = () => {
    // In a real app, you'd handle logout logic here (e.g., clearing tokens)
    navigate("/login");
    setIsDropdownOpen(false);
  };

  const isAdmin = userRole === "admin";

  return (
    <S.HeaderContainer>
      <S.Logo onClick={() => navigate("/")}>
        🏥 MediCPX {isAdmin && <S.AdminBadge>관리자</S.AdminBadge>}
      </S.Logo>
      <S.Menu>
        {isAdmin ? (
          <>
            <S.MenuButton
              isActive={location.pathname === "/evaluation"}
              onClick={() => navigate("/evaluation")}
              isAdmin={isAdmin}
            >
              사용자 관리
            </S.MenuButton>
            <S.MenuButton
              isActive={location.pathname === "/notice-manage"}
              onClick={() => navigate("/notice-manage")}
              isAdmin={isAdmin}
            >
              공지사항
            </S.MenuButton>
          </>
        ) : (
          <>
            <S.MenuButton
              isActive={location.pathname === "/practice"}
              onClick={() => navigate("/practice")}
            >
              실습
            </S.MenuButton>
            <S.MenuButton
              isActive={location.pathname === "/result"}
              onClick={() => navigate("/result")}
            >
              기록
            </S.MenuButton>
            <S.MenuButton
              isActive={location.pathname === "/notice"}
              onClick={() => navigate("/notice")}
            >
              공지사항
            </S.MenuButton>
          </>
        )}
      </S.Menu>
      <S.UserProfile onClick={toggleDropdown}>
        <S.Avatar isAdmin={isAdmin}>{isAdmin ? "👨‍🏫" : "👤"}</S.Avatar>
        <S.Username>{isAdmin ? "김교수" : "홍길동"}</S.Username>
        <S.DropdownIcon>▼</S.DropdownIcon>
        {isDropdownOpen && (
          <S.DropdownMenu>
            <>
              <S.DropdownItem onClick={handleMyPageClick}>
                👤 마이페이지
              </S.DropdownItem>
              <S.DropdownDivider />
            </>
            <S.DropdownItem onClick={handleLogoutClick}>
              🚪 로그아웃
            </S.DropdownItem>
          </S.DropdownMenu>
        )}
      </S.UserProfile>
    </S.HeaderContainer>
  );
};

export default Header;

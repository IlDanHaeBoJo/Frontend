import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./styles";
import { api } from "../../apis";
import {
  getRefreshToken,
  clearAccessToken,
  clearRefreshToken,
} from "../../store/tokenManager";
import { useUser } from "../../store/UserContext";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser, setIsAuthenticated, isAuthenticated } = useUser();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
    setIsDropdownOpen(false);
  };

  const handleLogoutClick = async () => {
    const refreshToken = getRefreshToken();
    try {
      if (refreshToken) {
        await api.post("/auth/logout", { refresh_token: refreshToken });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearAccessToken();
      clearRefreshToken();
      setUser(null);
      setIsAuthenticated(false);
      alert("로그아웃 되었습니다.");
      navigate("/login");
      setIsDropdownOpen(false);
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <S.HeaderContainer>
        <S.Logo onClick={() => navigate("/login")}>🏥 MediCPX</S.Logo>
      </S.HeaderContainer>
    );
  }

  const isAdmin = user.role === "admin";

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
              학생 관리
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
              isActive={
                location.pathname === "/practice" ||
                location.pathname === "/practice-progress"
              }
              onClick={() => navigate("/practice")}
            >
              실습
            </S.MenuButton>
            <S.MenuButton
              isActive={location.pathname.startsWith("/result")}
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
        <S.Username>{user.name}</S.Username>
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

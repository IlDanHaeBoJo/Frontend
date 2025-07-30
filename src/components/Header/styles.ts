import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 90px;
  background-color: #ffffff;
  border-bottom: 1px solid #d9e5ff;
`;

export const Logo = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #3366cc;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AdminBadge = styled.span`
  background-color: #cc3333;
  color: #ffffff;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 700;
`;

export const Menu = styled.nav`
  display: flex;
  gap: 10px;
`;

export const MenuButton = styled.button<{
  isActive: boolean;
  isAdmin?: boolean;
}>`
  padding: 10px 20px;
  font-family: "Inter", sans-serif;
  font-weight: ${({ isActive }) => (isActive ? "700" : "500")};
  font-size: 16px;
  color: ${({ isActive, isAdmin }) =>
    isActive ? "#ffffff" : isAdmin ? "#808080" : "#8080b2"};
  background-color: ${({ isActive, isAdmin }) =>
    isActive
      ? isAdmin
        ? "#cc3333"
        : "#3366cc"
      : isAdmin
      ? "#f2f2f2"
      : "#fafaff"};
  border: 1px solid
    ${({ isActive, isAdmin }) =>
      isActive
        ? isAdmin
          ? "#cc3333"
          : "#3366cc"
        : isAdmin
        ? "#e6e6e6"
        : "#e5ebfa"};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ isActive, isAdmin }) =>
      isActive
        ? isAdmin
          ? "#a32929"
          : "#254e99"
        : isAdmin
        ? "#e6e6e6"
        : "#e5ebfa"};
  }
`;

export const UserProfile = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 15px;
  background-color: #fafcff;
  border: 1px solid #e5ebfa;
  border-radius: 20px;
  cursor: pointer;
`;

export const Avatar = styled.div<{ isAdmin?: boolean }>`
  width: 28px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background-color: ${({ isAdmin }) => (isAdmin ? "#cc3333" : "#3366cc")};
  color: #ffffff;
  border-radius: 14px;
  font-size: 16px;
`;

export const Username = styled.span`
  font-family: "Inter", sans-serif;
  font-weight: 500;
  font-size: 15px;
  color: #33334d;
`;

export const DropdownIcon = styled.span`
  font-size: 12px;
  color: #9999b2;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 200px;
  background-color: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  z-index: 10;
`;

export const DropdownItem = styled.div`
  padding: 10px 20px;
  font-family: "Inter", sans-serif;
  font-size: 16px;
  color: #1a1a1a;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

export const DropdownDivider = styled.div`
  height: 1px;
  background-color: #e6e6e6;
  margin: 5px 0;
`;

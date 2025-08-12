import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo>🏥 MediCPX</Logo>
        <Copyright>© 2024 MediCPX, Inc.</Copyright>
        <FooterLinks>
          <FooterLink href="#">Terms</FooterLink>
          <FooterLink href="#">Privacy</FooterLink>
          <FooterLink href="#">Security</FooterLink>
          <FooterLink href="#">Status</FooterLink>
          <FooterLink href="#">Docs</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  padding: 40px 16px 30px;
  border-top: 1px solid #e5edff;
  background-color: #fcfcff;
`;

const FooterContent = styled.div`
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
  gap: 50px;
  align-items: center;
  width: 1200px;
  min-width: 720px;
  margin: 0 auto;
`;

const Logo = styled.h1`
  font-size: 14px;
  font-weight: 700;
  color: #3366cc;
`;

const Copyright = styled.p`
  font-size: 14px;
  color: #666666;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const FooterLink = styled.a`
  font-size: 14px;
  color: #666666;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

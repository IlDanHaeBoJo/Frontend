import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import youtubeIcon from "../../assets/youtube.svg";
import instagramIcon from "../../assets/instagram.svg";
import githubIcon from "../../assets/github.svg";

const Footer = () => {
  return (
    <FooterContainer id="footer">
      <Inner>
        <FTop>
          <FLeft>
            <FLogoContainer>
              {/* <FLogo>
                <img src={logo} className="logo-im" alt="MediCPX Logo" />
              </FLogo> */}
              <FLogoText>MediCPX</FLogoText>
            </FLogoContainer>
            <FInfo>
              <InfoAddr>서울특별시 동대문구 전농동 295 KT전농교육장</InfoAddr>
              <InfoCs>
                <li>대표전화 1234-5678 (평일 09시~18시)</li>
              </InfoCs>
            </FInfo>
          </FLeft>
          <FRight>
            <LinkGo>
              <Link to="/">HOME</Link>
            </LinkGo>
            <LinkSns>
              <a
                href="https://www.youtube.com/playlist?list=PL_WCuvyChN3giYr6Xa2gWMOvRjDUrfb0a"
                target="_blank"
              >
                <img src={youtubeIcon} alt="Youtube" />
              </a>
              <a
                href="https://instagram.com/aivlestory?igshid=YmMyMTA2M2Y="
                target="_blank"
              >
                <img src={instagramIcon} alt="Instagram" />
              </a>
              <a
                href="https://github.com/orgs/IlDanHaeBoJo/repositories"
                target="_blank"
              >
                <img src={githubIcon} alt="Github" />
              </a>
            </LinkSns>
          </FRight>
        </FTop>
        <FBtm>
          <FMenu>
            <Link to="/privacy" className="point">
              개인정보처리방침
            </Link>
            <a>저작권 정책</a>
          </FMenu>
          <FCopy>Copyright© 2025 MediCPX. All rights reserved.</FCopy>
        </FBtm>
      </Inner>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  padding: 40px 16px 30px;
  border-top: 1px solid #e5edff;
  background-color: #fcfcff;
  color: #666;
`;

const Inner = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

const FTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const FLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 15px;
`;

const FLogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FLogo = styled.div`
  img {
    height: 40px;
  }
`;

const FLogoText = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

const FInfo = styled.div``;

const InfoAddr = styled.p`
  margin: 0 0 10px 0;
`;

const InfoCs = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  strong {
    font-weight: 700;
  }
`;

const LinkGo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
  a {
    color: #666;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const LinkSns = styled.div`
  display: flex;
  gap: 10px;
  a {
    display: block;
    width: 24px;
    height: 24px;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const FBtm = styled.div`
  width: 100%;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e5edff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FMenu = styled.div`
  display: flex;
  gap: 20px;
  a {
    color: #666;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
    &.point {
      font-weight: 700;
      color: #333;
    }
  }
`;

const FCopy = styled.p`
  margin: 0;
  font-size: 14px;
`;

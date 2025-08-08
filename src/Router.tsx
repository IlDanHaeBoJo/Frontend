import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { api } from "./apis";
import Layout from "./components/Layout";
import { PracticeProvider } from "./store/PracticeContext";
import Login from "./pages/Login";
import Practice from "./pages/Practice";
import PracticeProgress from "./pages/PracticeProgress";
import Registration from "./pages/Registration";
import Result from "./pages/Result";
import Notice from "./pages/Notice";
import MyPage from "./pages/MyPage";
import Evaluation from "./pages/Evaluation";
import NoticeManage from "./pages/NoticeManage";

const Router = () => {
  const handleMeClick = async () => {
    try {
      const response = await api.get("/auth/me");
      console.log("User data:", response.data);
      alert(`Welcome, ${response.data.username}!`);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      alert("Failed to fetch user data. Are you logged in?");
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <PracticeProvider>
              <Layout />
            </PracticeProvider>
          }
        >
          <Route
            path="/"
            element={
              <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h1>여긴 뭐하징</h1>
                <Link to="/login">로그인 페이지로 이동</Link>
                <br />
                <br />
                <button onClick={handleMeClick}>내 정보 가져오기</button>
              </div>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice-progress" element={<PracticeProgress />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/result" element={<Result />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/notice-manage" element={<NoticeManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

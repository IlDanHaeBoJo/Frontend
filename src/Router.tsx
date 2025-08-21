import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { api } from "./apis";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Practice from "./pages/Practice";
import PracticeProgress from "./pages/PracticeProgress";
import Registration from "./pages/Registration";
import Result from "./pages/Result";
import Notice from "./pages/Notice";
import MyPage from "./pages/MyPage";
import Evaluation from "./pages/Evaluation";
import NoticeManage from "./pages/NoticeManage";
import HomePage from "./pages/Home";
import PrivacyPolicy from "./pages/Footer/PrivacyPolicy";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice-progress" element={<PracticeProgress />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/result" element={<Result />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/notice-manage" element={<NoticeManage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

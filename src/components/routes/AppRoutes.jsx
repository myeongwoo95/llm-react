import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROLES } from "../../constants/roles";
import SignIn from "../../pages/auth/SignIn";
import SignUp from "../../pages/auth/SignUp";
import MainPage from "../../pages/MainPage";
import NotFound from "../../pages/NotFound";
import Unauthorized from "../../pages/Unauthorized";
import FindAccount from "../../pages/auth/FindAccount";
import NewChatArea from "../../pages/chat/NewChatArea";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} initial={true} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/findaccount" element={<FindAccount />} />

      <Route
        path="/chat/newchatarea"
        element={
          <ProtectedRoute>
            <NewChatArea />
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

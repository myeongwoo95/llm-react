import React from "react";
import { Route, Routes } from "react-router-dom";
import { ROLES } from "../../constants/roles";
import SignIn from "../../pages/auth/SignIn";
import SignUp from "../../pages/auth/SignUp";
import MainPage from "../../pages/MainPage";
import NotFound from "../../pages/NotFound";
import PostList from "../../pages/post/PostList";
import Unauthorized from "../../pages/Unauthorized";

import PostWrite from "../../pages/post/PostWrite";
import ProtectedRoute from "./ProtectedRoute";
import PostDetail from "../../pages/post/PostDetail";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} initial={true} />
      <Route path="/SignIn" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />

      <Route path="/PostDetail/:postId" element={<PostDetail />} />
      <Route path="/PostList" element={<PostList />} />
      
      <Route
        path="/PostWrite"
        element={
          <ProtectedRoute allowedRoles={[ROLES.USER]}>
            <PostWrite />
          </ProtectedRoute>
        }
      />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "./component/LoginForm";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

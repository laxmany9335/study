import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Forget from "./pages/Forget";
import ResendEmail from "./pages/ResendEmail";
import VerifyEmail from "./pages/VerifyEmail";
import UpdatePassword from "./pages/UpdatePassword";

const App = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        {/* make a route */}
      <Route  path="verify-email" element={  <VerifyEmail />}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forget />} />
        <Route path="/update-password/:id" element={<UpdatePassword/>}/>
        <Route path="/resend-email" element={<ResendEmail />} />
      </Routes>
    </div>
  );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home"
const App = () => {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col front-inter">
      <Routes>
        <Route path="/" element ={ <Home/>}/>
      </Routes>
    </div>
  );
};

export default App;

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { Routeconstant } from "./Routeconstant";
import Layout from "../layout/Layout";
import About from "../pages/About";

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={Routeconstant.HOME} replace={true} />}
        />
        <Route path="/" element={<Layout />}>
          <Route path={Routeconstant.LOGIN} element={<Login />}></Route>
          <Route path={Routeconstant.HOME} element={<Home />}></Route>
          <Route path={Routeconstant.ABOUT} element={<About />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Index;

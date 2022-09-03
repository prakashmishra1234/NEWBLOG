import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import { Routeconstant } from "./Routeconstant";
import Layout from "../layout/Layout";

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
          <Route path={Routeconstant.REGISTER} element={<Register />}></Route>
          <Route path={Routeconstant.HOME} element={<Home />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Index;

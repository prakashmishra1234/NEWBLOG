import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import { Routeconstant } from "./Routeconstant";

const Index = () => {
  return (
    <Routes>
      <Route path={Routeconstant.LOGIN} element={<Login />}></Route>
      <Route path={Routeconstant.REGISTER} element={<Register />}></Route>
      <Route path={Routeconstant.HOME} element={<Home />}></Route>
    </Routes>
  );
};

export default Index;

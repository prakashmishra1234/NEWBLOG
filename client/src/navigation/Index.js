import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import { Routeconstant } from "./Routeconstant";
import Layout from "../layout/Layout";
import About from "../pages/About";
import { ProtectedRoutes, PublicRoutes } from "./ProtectedRoutes";

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={Routeconstant.HOME} replace={true} />}
        />
        <Route path="/" element={<Layout />}>
          <Route
            path={Routeconstant.HOME}
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path={Routeconstant.ABOUT}
            element={
              <ProtectedRoutes>
                <About />
              </ProtectedRoutes>
            }
          ></Route>
          <Route
            path={Routeconstant.LOGIN}
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Index;

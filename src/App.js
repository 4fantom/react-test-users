import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import RoutePaths from "./components/helpers/RoutePaths";

const HomePage = lazy(() => import("./components/home/Home"));
const UsersPage = lazy(() => import("./components/users/Users"));
const EditPage = lazy(() => import("./components/users/EditUser"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route exact path={RoutePaths.root} element={<HomePage />} />
          <Route exact path={RoutePaths.users} element={<UsersPage />} />
          <Route exact path={RoutePaths.edit} element={<EditPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

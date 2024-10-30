import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import SignUp from "./pages/signUp";
import FirstPage from "./pages/firstPage";
import AdmPage from "./pages/admPage";

function RoutesWeb() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signUp" Component={SignUp} />
        <Route path="/" Component={FirstPage} />
        <Route path="/admin" Component={AdmPage} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesWeb;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import SignUp from "./pages/signUp";

function RoutesWeb() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" Component={Login} />
            <Route path="/signUp" Component={SignUp} />
        </Routes>
      </BrowserRouter>
    );
  }
  
  export default RoutesWeb;
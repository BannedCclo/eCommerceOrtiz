import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import SignUp from "./pages/signUp";
import FirstPage from "./pages/firstPage";
import AdmPage from "./pages/admPage";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import AdmOrders from "./pages/admOrders";

function RoutesWeb() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signUp" Component={SignUp} />
        <Route path="/" Component={FirstPage} />
        <Route path="/admin" Component={AdmPage} />
        <Route path="/cart" Component={Cart} />
        <Route path="/orders" Component={Orders} />
        <Route path="/admOrders" Component={AdmOrders} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesWeb;

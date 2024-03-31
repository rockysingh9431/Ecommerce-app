import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/styles/bootstrap.custom.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./assets/styles/index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./slice_store/store";
import reportWebVitals from "./reportWebVitals";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRouter from "./components/PrivateRouter";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Homescreen from "./screens/Homescreen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Homescreen />}></Route>
      <Route path="/product/:id" element={<ProductScreen />}></Route>
      <Route path="/cart" element={<CartScreen />}></Route>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="/register" element={<RegisterScreen />}></Route>

      <Route path="" element={<PrivateRouter />}>
        <Route path="/shipping" element={<ShippingScreen />}></Route>
        <Route path="/payment" element={<PaymentScreen />}></Route>
        <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
        <Route path="/order/:id" element={<OrderScreen />}></Route>
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

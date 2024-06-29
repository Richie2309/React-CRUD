import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.js";
import HomeScreen from "./screens/HomeScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import AdminLogin from "./screens/AdminLogin.jsx";
import AdminHome from "./screens/AdminHome.jsx";
import AdminPrivateRoute from "./components/AdminPrivateRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      {/* Private Route */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      {/* Route for AdminLogin */}
      <Route path="/admin/login" element={<AdminLogin />} />
      {/* Private Route for admin */}
      <Route path="" element={<AdminPrivateRoute />}>
        <Route path="/admin/home" element={<AdminHome />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

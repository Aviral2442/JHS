import { BrowserRouter as Router, Routes, Route, Navigate, RouteObject } from "react-router";
import { lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoutes";
import AppLayout from "../layout/AppLayout";


// AUTH PAGES
const SignIn = lazy(() => import("../views/admin/AuthPages/SignIn"));
const SignUp = lazy(() => import("../views/admin/AuthPages/SignUp"));
const NotFound = lazy(() => import("../views/admin/OtherPage/NotFound"));

// OTHER PAGES
const UserProfiles = lazy(() => import("../views/admin/UserProfiles"));
const Videos = lazy(() => import("../views/admin/UiElements/Videos"));
const Images = lazy(() => import("../views/admin/UiElements/Images"));
const Alerts = lazy(() => import("../views/admin/UiElements/Alerts"));
const Badges = lazy(() => import("../views/admin/UiElements/Badges"));
const Avatars = lazy(() => import("../views/admin/UiElements/Avatars"));
const Buttons = lazy(() => import("../views/admin/UiElements/Buttons"));
const LineChart = lazy(() => import("../views/admin/Charts/LineChart"));
const BarChart = lazy(() => import("../views/admin/Charts/BarChart"));
const Calendar = lazy(() => import("../views/admin/Calendar"));
const BasicTables = lazy(() => import("../views/admin/Tables/BasicTables"));
const FormElements = lazy(() => import("../views/admin/Forms/FormElements"));
const Blank = lazy(() => import("../views/admin/Blank"));
const Home = lazy(() => import("../views/admin/Dashboard/Home"));



const authRoutes: RouteObject[] = [
    { path: "/", element: <Navigate to="/admin/auth/sign-in" replace /> },
    { path: "/admin/auth/sign-in", element: <SignIn /> },
    { path: "/admin/auth/sign-up", element: <SignUp /> },
    { path: "*", element: <Navigate to="/" replace /> },
];


// All Routes
const OtherRoutes: RouteObject[] = [
    { path: "/admin", element: <Home /> },
    { path: "/admin/profile", element: <UserProfiles /> },
    { path: "/admin/calendar", element: <Calendar /> },
    { path: "/admin/blank", element: <Blank /> },
    { path: "/admin/form-elements", element: <FormElements /> },
    { path: "/admin/basic-tables", element: <BasicTables /> },
    { path: "/admin/alerts", element: <Alerts /> },
    { path: "/admin/avatars", element: <Avatars /> },
    { path: "/admin/badge", element: <Badges /> },
    { path: "/admin/buttons", element: <Buttons /> },
    { path: "/admin/images", element: <Images /> },
    { path: "/admin/videos", element: <Videos /> },
    { path: "/admin/line-chart", element: <LineChart /> },
    { path: "/admin/bar-chart", element: <BarChart /> },
    { path: "*", element: <NotFound /> },
];


const allRoutes: RouteObject[] = [
  {
        element: (
      <ProtectedRoute isAuthenticated={!!localStorage.getItem("token")}>
      {/* <ProtectedRoute isAuthenticated={true}> */}
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/" replace />,
      },
      ...authRoutes,
      ...OtherRoutes
    ],
  },
];


export const routes: RouteObject[] = [...allRoutes];

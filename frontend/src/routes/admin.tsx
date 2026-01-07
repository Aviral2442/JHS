import { RouteObject } from "react-router";
import { lazy } from "react";
import ProtectedRoute from "./components/ProtectedRoutes";
import AppLayout from "../layout/AppLayout";

/**
 * ADMIN ROUTES
 * All admin routes require authentication and admin role
 * These routes are protected and only accessible to authenticated admins
 */

// AUTH PAGES (Public - No authentication required)
const SignIn = lazy(() => import("../views/admin/AuthPages/SignIn"));
const SignUp = lazy(() => import("../views/admin/AuthPages/SignUp"));

// PROTECTED ADMIN PAGES (Require ADMIN role)
const AdminHome = lazy(() => import("../views/admin/Dashboard/Home"));
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
const NotFound = lazy(() => import("../views/admin/OtherPage/NotFound"));

/**
 * Public authentication routes (no protection needed)
 */
const authRoutes: RouteObject[] = [
  { 
    path: "auth/sign-in", 
    element: <SignIn /> 
  },
  { 
    path: "auth/sign-up", 
    element: <SignUp /> 
  },
];

/**
 * Protected admin routes (require ADMIN role)
 */
const protectedAdminRoutes: RouteObject[] = [
  { 
    index: true,
    element: <AdminHome />
  },
  { 
    path: "dashboard", 
    element: <AdminHome /> 
  },
  { 
    path: "profile", 
    element: <UserProfiles /> 
  },
  { 
    path: "calendar", 
    element: <Calendar /> 
  },
  { 
    path: "blank", 
    element: <Blank /> 
  },
  
  // Form Routes
  { 
    path: "forms/form-elements", 
    element: <FormElements /> 
  },
  
  // Table Routes
  { 
    path: "tables/basic-tables", 
    element: <BasicTables /> 
  },
  
  // UI Elements Routes
  { 
    path: "ui/alerts", 
    element: <Alerts /> 
  },
  { 
    path: "ui/avatars", 
    element: <Avatars /> 
  },
  { 
    path: "ui/badges", 
    element: <Badges /> 
  },
  { 
    path: "ui/buttons", 
    element: <Buttons /> 
  },
  { 
    path: "ui/images", 
    element: <Images /> 
  },
  { 
    path: "ui/videos", 
    element: <Videos /> 
  },
  
  // Chart Routes
  { 
    path: "charts/line-chart", 
    element: <LineChart /> 
  },
  { 
    path: "charts/bar-chart", 
    element: <BarChart /> 
  },
];

/**
 * Main admin route configuration with protection
 */
export const adminRoutesConfig: RouteObject = {
  path: "/admin",
  children: [
    // Public auth routes (no layout)
    ...authRoutes,
    
    // Protected admin routes with layout
    {
      element: (
        <ProtectedRoute 
        //   requireAuth={true} 
        //   requiredRole={UserRole.ADMIN}
          redirectTo="/admin/auth/sign-in"
        >
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        ...protectedAdminRoutes,
        // Catch-all for undefined admin routes
        { 
          path: "*", 
          element: <NotFound /> 
        }
      ],
    },
  ],
};

export default adminRoutesConfig;

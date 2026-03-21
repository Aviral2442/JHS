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

const BlogList = lazy(() => import("../views/admin/blog"));
const AddBlog = lazy(() => import("../views/admin/blog/components/AddBlog"));

const ConsumerList = lazy(() => import("../views/admin/consumer"));
const ConsumerDetail = lazy(() => import("../views/admin/consumer/components/ConsumerDetail"));

const VendorList = lazy(() => import("../views/admin/vendor"));
const AddVendor = lazy(() => import("../views/admin/vendor/components/AddVendor"));
const VendorDetail = lazy(() => import("../views/admin/vendor/components/VendorDetail"));

const BookingListPage = lazy(() => import("../views/admin/booking"));
const AddBooking = lazy(() => import("../views/admin/booking/components/AddBooking"));
const BookingDetail = lazy(() => import("../views/admin/booking/components/BookingDetail"));

// categories 
const CLOneList = lazy(() => import("../views/admin/categories/categoryLevel1"));
const AddCLOne = lazy(() => import("../views/admin/categories/categoryLevel1/components/AddCLOne"));
const CLTwoList = lazy(() => import("../views/admin/categories/categoryLevel2"));
const AddCLTwo = lazy(() => import("../views/admin/categories/categoryLevel2/components/AddCLTwo"));
const CLThreeList = lazy(() => import("../views/admin/categories/categoryLevel3"));
const AddCLThree = lazy(() => import("../views/admin/categories/categoryLevel3/components/AddCLThree"));

// Service routes
const CleaningServiceList = lazy(() => import("../views/admin/services"));
const InteriorDesignServiceList = lazy(() => import("../views/admin/services/components/InteriorDesignServiceList"));
const PestControlServiceList = lazy(() => import("../views/admin/services/components/PestControlServiceList"));
const FurnitureServiceList = lazy(() => import("../views/admin/services/components/FurnitureServiceList"));
const AddService = lazy(() => import("../views/admin/services/components/AddService"));

// Transaction routes
const RazorpayTransList = lazy(() => import("../views/admin/transaction/components/RazorpayTransList"));
const ConsumerTransList = lazy(() => import("../views/admin/transaction/components/ConsumerTransList"));
const VendorTransList = lazy(() => import("../views/admin/transaction/components/VendorTransList"));

// Admin Users Routes
const AdminList = lazy(() => import("../views/admin/adminUser"));

// Contact Form Routes
const ContactFormList = lazy(() => import("../views/admin/contactForm"));

// Role Based Access Control Routes
const RoleList = lazy(() => import("../views/admin/roleBaseAccessControl/components/RoleList"));
const ModuleList = lazy(() => import("../views/admin/roleBaseAccessControl/components/ModuleList"));
const OperationList = lazy(() => import("../views/admin/roleBaseAccessControl/components/OperationList"));
const PermissionDetail = lazy(() => import("../views/admin/roleBaseAccessControl/components/PermissionDetail"));

// const partnerList = lazy(() => import("../views/admin/Tables/partner"));

/**
 * Public authentication routes (no protection needed)
 */
const authRoutes: RouteObject[] = [

];

/**
 * Protected admin routes (require ADMIN role)
 */
const protectedAdminRoutes: RouteObject[] = [
  {
    index: true,
    element: <AdminHome />,
  },
  {
    path: "/admin/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/admin/auth/sign-up",
    element: <SignUp />,
  },
  {
    path: "dashboard",
    element: <AdminHome />,
  },
  {
    path: "profile",
    element: <UserProfiles />,
  },
  {
    path: "calendar",
    element: <Calendar />,
  },
  {
    path: "blank",
    element: <Blank />,
  },

  // Form Routes
  {
    path: "/admin/form-elements",
    element: <FormElements />,
  },

  // Table Routes
  {
    path: "/admin/basic-tables",
    element: <BasicTables />,
  },

  // UI Elements Routes
  {
    path: "ui/alerts",
    element: <Alerts />,
  },
  {
    path: "ui/avatars",
    element: <Avatars />,
  },
  {
    path: "ui/badges",
    element: <Badges />,
  },
  {
    path: "ui/buttons",
    element: <Buttons />,
  },
  {
    path: "ui/images",
    element: <Images />,
  },
  {
    path: "ui/videos",
    element: <Videos />,
  },

  // Chart Routes
  {
    path: "charts/line-chart",
    element: <LineChart />,
  },
  {
    path: "charts/bar-chart",
    element: <BarChart />,
  },
  {
    path: "/admin/blog",
    element: <BlogList />,
  },
  {
    path: "/admin/blog/add",
    element: <AddBlog />,
  },
  {
    path: "/admin/blog/edit/:blogId",
    element: <AddBlog />,
  },
  {
    path: "/admin/category/level-one",
    element: <CLOneList />,
  },
  {
    path: "/admin/category/level-one/add",
    element: <AddCLOne />,
  },
  {
    path: "/admin/category/level-one/edit/:catLvl1Id",
    element: <AddCLOne />,
  },
  {
    path: "/admin/category/level-two",
    element: <CLTwoList />,
  },
  {
    path: "/admin/category/level-two/add",
    element: <AddCLTwo />,
  },
  {
    path: "/admin/category/level-two/edit/:catLvl2Id",
    element: <AddCLTwo />,
  },
  {
    path: "/admin/category/level-three",
    element: <CLThreeList />,
  },
  {
    path: "/admin/category/level-three/add",
    element: <AddCLThree />,
  },
  {
    path: "/admin/category/level-three/edit/:catLvl3Id",
    element: <AddCLThree />,
  },
  {
    path: "/admin/consumer",
    element: <ConsumerList />,
  },
  {
    path: "/admin/consumer/detail/:consumerId",
    element: <ConsumerDetail />,
  },
  {
    path: "/admin/vendor",
    element: <VendorList />,
  },
  {
    path: "/admin/vendor/add",
    element: <AddVendor />,
  },
  {
    path: "/admin/vendor/edit/:vendorId",
    element: <AddVendor />,
  },
  {
    path: "/admin/vendor/detail/:vendorId",
    element: <VendorDetail />,
  },
  {
    path: "/admin/booking",
    element: <BookingListPage />,
  },
  {
    path: "/admin/booking/add",
    element: <AddBooking />,
  },
  {
    path: "/admin/booking/edit/:bookingId",
    element: <AddBooking />,
  },
  {
    path: "/admin/booking/detail/:bookingId",
    element: <BookingDetail />,
  },
  {
    path: "/admin/services/manage-cleaning-service",
    element: <CleaningServiceList />,
  },
  {
    path: "/admin/services/manage-interior-design-service",
    element: <InteriorDesignServiceList />,
  },
  {
    path: "/admin/services/manage-pest-control-service",
    element: <PestControlServiceList />,
  },
  {
    path: "/admin/services/manage-furniture-service",
    element: <FurnitureServiceList />,
  },
  {
    path: "/admin/services/add",
    element: <AddService />,
  },
  {
    path: "/admin/transactions/razorpay",
    element: <RazorpayTransList />,
  },
  {
    path: "/admin/transactions/consumer",
    element: <ConsumerTransList />,
  },
  {
    path: "/admin/transactions/vendor",
    element: <VendorTransList />,
  },
  {
    path: "/admin/admin-users",
    element: <AdminList />,
  },
  {
    path: "/admin/contact-forms",
    element: <ContactFormList />,
  },
  {
    path: "/admin/roles",
    element: <RoleList />,
  },
  {
    path: "/admin/modules",
    element: <ModuleList />,
  },
  {
    path: "/admin/operations",
    element: <OperationList />,
  },
  {
    path: "/admin/permissions/:roleId",
    element: <PermissionDetail />,
  }
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
          element: <NotFound />,
        },
      ],
    },
  ],
};

export default adminRoutesConfig;
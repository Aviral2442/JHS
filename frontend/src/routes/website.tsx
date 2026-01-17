import { RouteObject, Navigate } from "react-router";
import { lazy } from "react";
import WebsiteLayout from "../layout/WebsiteLayout";

const HomePage = lazy(() => import("../views/pages/Home"));
const AboutPage = lazy(() => import("../views/pages/about"));
const ContactPage = lazy(() => import("../views/pages/contact"));
const ServicesPage = lazy(() => import("../views/pages/services"));
const BlogPage = lazy(() => import("../views/pages/blog"));
const BlogDetailPage = lazy(() => import("../views/pages/blogDetail"));
const CartPage = lazy(() => import("../views/pages/cart"));
const CheckoutPage = lazy(() => import("../views/pages/checkout"));
const SignIn = lazy(() => import("../views/pages/auth/sign-in"));
const SignUp = lazy(() => import("../views/pages/auth/sign-up"));
const CategoryPage = lazy(() => import("../views/pages/category"));
const CookiePolicyPage = lazy(() => import("../views/pages/PolicyPages/CookiePolicyPage"));
const PolicyComponents = lazy(() => import("../views/pages/PolicyPages/PolicyComponents"));
const PolicyHubPage = lazy(() => import("../views/pages/PolicyPages/PolicyHubPage"));
const PrivacyPolicyPage = lazy(() => import("../views/pages/PolicyPages/PrivacyPolicyPage"));
const ReturnPolicyPage = lazy(() => import("../views/pages/PolicyPages/ReturnPolicyPage"));
const ShippingPolicyPage = lazy(() => import("../views/pages/PolicyPages/ShippingPolicyPage"));
const TermsOfServicePage = lazy(() => import("../views/pages/PolicyPages/TermsOfServicePage"));
const OrderPage = lazy(() => import("../views/pages/order"));
const OrderDetailPage = lazy(() => import("../views/pages/orderDetail"));

const websiteRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
    index: true
  },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/services", element: <ServicesPage /> },
  { path: "/blog", element: <BlogPage /> },
  { path: "/blog/service-cleaning-tips", element: <BlogDetailPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/category", element: <CategoryPage /> },
  { path: "/cookies", element: <CookiePolicyPage /> },
  { path: "/policies/components", element: <PolicyComponents /> },
  { path: "/policies/hub", element: <PolicyHubPage /> },
  { path: "/privacy", element: <PrivacyPolicyPage /> },
  { path: "/returns", element: <ReturnPolicyPage /> },
  { path: "/shipping", element: <ShippingPolicyPage /> },
  { path: "/terms", element: <TermsOfServicePage /> },
  { path: "/order", element: <OrderPage /> },
  { path: "/order-detail", element: <OrderDetailPage /> },
];


export const websiteRoutesConfig: RouteObject = {
  element: <WebsiteLayout />,
  children: [
    ...websiteRoutes,
    // Catch-all for undefined routes - redirect to home
    {
      path: "*",
      element: <Navigate to="/" replace />
    }
  ],
};

export default websiteRoutesConfig;

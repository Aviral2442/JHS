# Routing Architecture Documentation

## Overview

This application uses a **secure, role-based routing architecture** with clear separation between public website routes and protected admin routes. The system is designed for easy management, scalability, and security.

## 📁 File Structure

```
src/
├── routes/
│   ├── index.tsx          # Main router - combines all routes
│   ├── admin.tsx          # Admin routes (protected)
│   ├── website.tsx        # Public website routes
│   └── components/
│       └── ProtectedRoutes.tsx  # Route protection wrapper
├── utils/
│   └── auth.ts           # Authentication utilities
├── layout/
│   ├── AppLayout.tsx     # Admin panel layout
│   └── WebsiteLayout.tsx # Public website layout
└── views/
    ├── admin/            # Admin pages
    └── pages/            # Public pages
```

## 🔐 Security Features

### 1. **Authentication Check**
- Validates user is logged in
- Checks JWT token expiration
- Redirects to sign-in if not authenticated

### 2. **Role-Based Authorization**
- Three user roles: `ADMIN`, `USER`, `GUEST`
- Hierarchical permission system
- Admin routes require `ADMIN` role

### 3. **Protected Routes**
- All admin routes wrapped in `ProtectedRoute` component
- Automatic redirection for unauthorized access
- Token validation on every route change

## 🛣️ Route Configuration

### Public Routes (`website.tsx`)

**Path:** `/`  
**Layout:** `WebsiteLayout`  
**Protection:** None (accessible to all)

```typescript
Routes:
- /                 → Home page
- /about            → About page (add as needed)
- /contact          → Contact page (add as needed)
```

### Admin Routes (`admin.tsx`)

**Path:** `/admin/*`  
**Layout:** `AppLayout`  
**Protection:** Requires authentication + ADMIN role

#### Public Auth Routes (No Protection)
```typescript
- /admin/auth/sign-in    → Sign in page
- /admin/auth/sign-up    → Sign up page
```

#### Protected Admin Routes (ADMIN role required)
```typescript
Dashboard:
- /admin                 → Admin dashboard
- /admin/dashboard       → Admin dashboard

Profile:
- /admin/profile         → User profiles

Forms:
- /admin/forms/form-elements  → Form elements

Tables:
- /admin/tables/basic-tables  → Basic tables

UI Elements:
- /admin/ui/alerts       → Alerts
- /admin/ui/avatars      → Avatars
- /admin/ui/badges       → Badges
- /admin/ui/buttons      → Buttons
- /admin/ui/images       → Images
- /admin/ui/videos       → Videos

Charts:
- /admin/charts/line-chart    → Line chart
- /admin/charts/bar-chart     → Bar chart

Other:
- /admin/calendar        → Calendar
- /admin/blank           → Blank page
```

## 🔑 Authentication Utilities (`auth.ts`)

### Functions

#### `isAuthenticated(): boolean`
Checks if user is logged in and token is valid

#### `getUserRole(): UserRole`
Returns current user's role (ADMIN, USER, or GUEST)

#### `hasRole(requiredRole: UserRole): boolean`
Checks if user has required role or higher

#### `isAdmin(): boolean`
Quick check if user is admin

#### `setAuthData(token, role, userData?)`
Stores authentication data after login

#### `clearAuthData()`
Removes all auth data (logout)

#### `getAuthToken(): string | null`
Retrieves stored auth token

#### `getUserData(): any`
Retrieves stored user data

### Example Usage

```typescript
import { setAuthData, UserRole, isAdmin } from './utils/auth';

// After successful login
setAuthData(token, UserRole.ADMIN, { name: 'John Doe', email: 'john@example.com' });

// Check if user is admin
if (isAdmin()) {
  // Allow admin actions
}

// Logout
clearAuthData();
```

## 🛡️ ProtectedRoute Component

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | Required | Components to render if authorized |
| `requireAuth` | boolean | `true` | Whether authentication is required |
| `requiredRole` | UserRole | `USER` | Minimum role required |
| `redirectTo` | string | `/admin/auth/sign-in` | Where to redirect if unauthorized |

### Example Usage

```typescript
<ProtectedRoute 
  requireAuth={true} 
  requiredRole={UserRole.ADMIN}
  redirectTo="/admin/auth/sign-in"
>
  <AdminDashboard />
</ProtectedRoute>
```

## 📝 Adding New Routes

### Adding a Public Website Route

1. Create your page component in `src/views/pages/`
2. Add to `routes/website.tsx`:

```typescript
const NewPage = lazy(() => import("../views/pages/NewPage"));

const websiteRoutes: RouteObject[] = [
  // ... existing routes
  { path: "/new-page", element: <NewPage /> },
];
```

### Adding a Protected Admin Route

1. Create your page component in `src/views/admin/`
2. Add to `routes/admin.tsx`:

```typescript
const NewAdminPage = lazy(() => import("../views/admin/NewAdminPage"));

const protectedAdminRoutes: RouteObject[] = [
  // ... existing routes
  { path: "/admin/new-page", element: <NewAdminPage /> },
];
```

## 🔄 Route Flow

### Public Route Access
```
User visits / → WebsiteLayout → HomePage (No check)
```

### Admin Route Access (Authenticated)
```
User visits /admin 
  → Check authentication ✓
  → Check role (ADMIN) ✓
  → AppLayout → AdminHome
```

### Admin Route Access (Not Authenticated)
```
User visits /admin 
  → Check authentication ✗
  → Redirect to /admin/auth/sign-in
```

### Admin Route Access (Wrong Role)
```
User visits /admin 
  → Check authentication ✓
  → Check role (USER, but needs ADMIN) ✗
  → Redirect to /unauthorized
```

## 🎨 Layouts

### `AppLayout` (Admin Panel)
- Sidebar navigation
- Header with user dropdown
- Backdrop for mobile
- Responsive design

### `WebsiteLayout` (Public Website)
- Clean public-facing design
- No sidebar
- Optional header/footer

## 🚨 Error Pages

- **404 Not Found** - Invalid route
- **403 Unauthorized** - Insufficient permissions
  - Displays when user lacks required role
  - Options to go back, go home, or logout

## 🔧 Configuration

### Environment Variables (if needed)
```env
VITE_API_URL=http://localhost:3000
VITE_TOKEN_KEY=auth_token
```

### Storage Keys
```typescript
AUTH_TOKEN_KEY = 'auth_token'
USER_ROLE_KEY = 'user_role'
USER_DATA_KEY = 'user_data'
```

## 📊 Best Practices

1. **Always use lazy loading** for route components
2. **Clear auth data** on logout
3. **Validate tokens** on critical operations
4. **Use role hierarchy** for permission checks
5. **Keep routes organized** by feature/module
6. **Document new routes** in this README

## 🔐 Security Checklist

- ✅ Protected routes require authentication
- ✅ Admin routes require ADMIN role
- ✅ JWT token expiration check
- ✅ Automatic redirect on unauthorized access
- ✅ Role-based authorization
- ✅ Centralized auth utilities
- ✅ Secure token storage
- ✅ Clear separation of public/private routes

## 🚀 Development Workflow

### Starting Development
```bash
npm run dev
```

### Testing Routes
1. Test public routes without login
2. Test admin login flow
3. Test protected routes with authentication
4. Test role-based access
5. Test unauthorized access handling

## 📖 Additional Resources

- React Router Documentation: https://reactrouter.com/
- JWT Authentication: https://jwt.io/
- Role-Based Access Control: https://en.wikipedia.org/wiki/Role-based_access_control

---

**Last Updated:** January 2026  
**Version:** 1.0.0

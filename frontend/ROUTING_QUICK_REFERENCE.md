# Quick Reference Guide - Routing System

## 🚀 Quick Start

### For Developers
1. **Public pages** go in `src/views/pages/`
2. **Admin pages** go in `src/views/admin/`
3. **Public routes** defined in `src/routes/website.tsx`
4. **Admin routes** defined in `src/routes/admin.tsx`

## 📋 Common Tasks

### Add a New Public Page

```typescript
// 1. Create component: src/views/pages/About.tsx
// 2. Add to routes/website.tsx:

const AboutPage = lazy(() => import("../views/pages/About"));

const websiteRoutes: RouteObject[] = [
  // ... existing
  { path: "/about", element: <AboutPage /> },
];
```

### Add a New Admin Page

```typescript
// 1. Create component: src/views/admin/Settings.tsx
// 2. Add to routes/admin.tsx:

const Settings = lazy(() => import("../views/admin/Settings"));

const protectedAdminRoutes: RouteObject[] = [
  // ... existing
  { path: "/admin/settings", element: <Settings /> },
];
```

### Implement Login

```typescript
import { setAuthData, UserRole } from '../utils/auth';

const handleLogin = async (email: string, password: string) => {
  // Call your API
  const response = await loginAPI(email, password);
  
  // Store auth data
  setAuthData(
    response.token, 
    UserRole.ADMIN,
    { name: response.user.name, email: response.user.email }
  );
  
  // Navigate to admin
  navigate('/admin');
};
```

### Implement Logout

```typescript
import { clearAuthData } from '../utils/auth';
import { useNavigate } from 'react-router';

const handleLogout = () => {
  clearAuthData();
  navigate('/admin/auth/sign-in');
};
```

### Check User Permissions

```typescript
import { isAdmin, hasRole, UserRole } from '../utils/auth';

// Simple admin check
if (isAdmin()) {
  // Show admin features
}

// Check specific role
if (hasRole(UserRole.USER)) {
  // User has at least USER role
}
```

## 🗺️ Route Structure

```
Website (Public)
├── /                    → Home
├── /about               → About
└── /contact             → Contact

Admin (Protected)
├── /admin/auth/
│   ├── sign-in         → Login (Public)
│   └── sign-up         → Register (Public)
│
├── /admin              → Dashboard (Protected)
├── /admin/profile      → Profile (Protected)
│
├── /admin/forms/
│   └── form-elements   → Forms (Protected)
│
├── /admin/tables/
│   └── basic-tables    → Tables (Protected)
│
├── /admin/ui/
│   ├── alerts          → Alerts (Protected)
│   ├── buttons         → Buttons (Protected)
│   └── ...             → Other UI (Protected)
│
└── /admin/charts/
    ├── line-chart      → Line Chart (Protected)
    └── bar-chart       → Bar Chart (Protected)
```

## 🔑 User Roles

```typescript
enum UserRole {
  ADMIN = 'admin',  // Full access to admin panel
  USER = 'user',    // Regular user access
  GUEST = 'guest'   // No access
}
```

## 🛡️ Protection Levels

| Route Type | Auth Required | Role Required | Example |
|-----------|---------------|---------------|---------|
| Public Website | ❌ | ❌ | `/`, `/about` |
| Auth Pages | ❌ | ❌ | `/admin/auth/sign-in` |
| Admin Pages | ✅ | ADMIN | `/admin`, `/admin/profile` |

## 📦 Key Files

| File | Purpose |
|------|---------|
| `routes/index.tsx` | Main router combining all routes |
| `routes/admin.tsx` | Admin routes with protection |
| `routes/website.tsx` | Public website routes |
| `routes/components/ProtectedRoutes.tsx` | Route protection wrapper |
| `utils/auth.ts` | Authentication utilities |
| `layout/AppLayout.tsx` | Admin panel layout |
| `layout/WebsiteLayout.tsx` | Public website layout |

## 🐛 Troubleshooting

### "Access Denied" Page Shows
- **Cause:** User doesn't have required role
- **Fix:** Ensure user is assigned ADMIN role on login

### Redirect Loop to Sign-In
- **Cause:** Token expired or invalid
- **Fix:** Check token expiration logic in `utils/auth.ts`

### Route Not Found
- **Cause:** Route not registered
- **Fix:** Add route to appropriate file (`admin.tsx` or `website.tsx`)

### Layout Not Showing
- **Cause:** Route not wrapped in layout
- **Fix:** Ensure route is in children of layout route

## 💡 Tips

1. **Always use lazy loading** for better performance
2. **Keep related routes together** (e.g., all form routes under `/admin/forms/`)
3. **Use descriptive paths** (e.g., `/admin/ui/buttons` not `/admin/btn`)
4. **Test protection** after adding new admin routes
5. **Document new routes** in ROUTING_DOCUMENTATION.md

## 🔗 Quick Links

- Full Documentation: `ROUTING_DOCUMENTATION.md`
- Admin Routes: `src/routes/admin.tsx`
- Website Routes: `src/routes/website.tsx`
- Auth Utilities: `src/utils/auth.ts`

---

**Need Help?** Check the full documentation in `ROUTING_DOCUMENTATION.md`

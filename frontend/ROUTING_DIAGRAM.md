# Routing Architecture Diagram

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Application Entry                         │
│                          (App.tsx)                               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Main Router                                 │
│                    (routes/index.tsx)                            │
│                                                                   │
│  Combines:                                                        │
│  - Admin Routes (protected)                                       │
│  - Website Routes (public)                                        │
│  - Error Routes (403, 404)                                        │
└──────────────┬──────────────────────────────┬───────────────────┘
               │                              │
               ▼                              ▼
    ┌──────────────────┐           ┌──────────────────┐
    │  Admin Routes    │           │ Website Routes   │
    │ (admin.tsx)      │           │ (website.tsx)    │
    └──────────────────┘           └──────────────────┘
```

## Detailed Route Flow

### Public Website Routes

```
User Request
     │
     ▼
┌────────────────────────────┐
│   Website Route Check      │
│  (routes/website.tsx)      │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│   WebsiteLayout            │
│   - No Sidebar             │
│   - Public Header          │
└────────────┬───────────────┘
             │
             ▼
┌────────────────────────────┐
│   Render Page              │
│   - Home                   │
│   - About                  │
│   - Contact                │
└────────────────────────────┘
```

### Admin Routes (Protected)

```
User Request (/admin/*)
     │
     ▼
┌─────────────────────────────────┐
│   Admin Route Check             │
│   (routes/admin.tsx)            │
└─────────────┬───────────────────┘
              │
              ▼
        Is Auth Route?
        (sign-in/sign-up)
              │
         ┌────┴────┐
         │         │
        YES        NO
         │         │
         ▼         ▼
    ┌────────┐  ┌──────────────────────┐
    │ Render │  │  ProtectedRoute      │
    │  Page  │  │  Component Check     │
    └────────┘  └──────┬───────────────┘
                       │
                       ▼
                 Authenticated?
                       │
                  ┌────┴────┐
                  │         │
                 YES        NO
                  │         │
                  ▼         ▼
            Has ADMIN    ┌──────────────┐
              Role?      │  Redirect to │
                  │      │   Sign-In    │
             ┌────┴────┐ └──────────────┘
             │         │
            YES        NO
             │         │
             ▼         ▼
    ┌────────────┐  ┌──────────────┐
    │ AppLayout  │  │  Redirect to │
    │ - Sidebar  │  │ Unauthorized │
    │ - Header   │  └──────────────┘
    └─────┬──────┘
          │
          ▼
    ┌────────────┐
    │ Render Page│
    │ (Dashboard)│
    └────────────┘
```

## Component Interaction Diagram

```
┌───────────────────────────────────────────────────────────────┐
│                          App.tsx                               │
│                      useRoutes(routes)                         │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            ▼
              ┌─────────────────────────────┐
              │     routes/index.tsx         │
              │  - adminRoutesConfig         │
              │  - websiteRoutesConfig       │
              │  - errorRoutes               │
              └──────────┬──────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │  Admin   │   │ Website  │   │  Error   │
   │  Routes  │   │  Routes  │   │  Routes  │
   └────┬─────┘   └────┬─────┘   └────┬─────┘
        │              │              │
        ▼              ▼              ▼
   ┌──────────┐   ┌──────────┐   ┌──────────┐
   │Protected │   │  Public  │   │   403    │
   │  Route   │   │  Access  │   │   404    │
   └────┬─────┘   └────┬─────┘   └──────────┘
        │              │
        ▼              ▼
   ┌──────────┐   ┌──────────┐
   │ AppLayout│   │ Website  │
   │          │   │  Layout  │
   └────┬─────┘   └────┬─────┘
        │              │
        ▼              ▼
   ┌──────────┐   ┌──────────┐
   │  Admin   │   │  Public  │
   │  Pages   │   │  Pages   │
   └──────────┘   └──────────┘
```

## Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Login Flow                           │
└─────────────────────────────────────────────────────────────┘

User → /admin/auth/sign-in
         │
         ▼
    ┌─────────────────┐
    │  SignIn Page    │
    │  (Public)       │
    └────────┬────────┘
             │ Submit credentials
             ▼
    ┌─────────────────┐
    │   Auth API      │
    │   (Backend)     │
    └────────┬────────┘
             │ Return token + role
             ▼
    ┌─────────────────────────────┐
    │   setAuthData()             │
    │   - Store token             │
    │   - Store role (ADMIN)      │
    │   - Store user data         │
    └────────┬────────────────────┘
             │
             ▼
    ┌─────────────────┐
    │  Navigate to    │
    │   /admin        │
    └────────┬────────┘
             │
             ▼
    ┌─────────────────┐
    │  ProtectedRoute │
    │  validates auth │
    └────────┬────────┘
             │ ✓ Authenticated
             │ ✓ Has ADMIN role
             ▼
    ┌─────────────────┐
    │  Admin Dashboard│
    │  (AppLayout)    │
    └─────────────────┘
```

## File Structure with Dependencies

```
src/
│
├── App.tsx ──────────────────────┐
│                                 │
├── routes/                       │
│   ├── index.tsx ────────────────┤ (Main Router)
│   │   ├── adminRoutesConfig ────┼──┐
│   │   └── websiteRoutesConfig ──┼──┼──┐
│   │                             │  │  │
│   ├── admin.tsx ────────────────┘  │  │
│   │   ├── ProtectedRoute ──────────┼──┼──┐
│   │   ├── AppLayout ───────────────┼──┼──┼──┐
│   │   └── UserRole ────────────────┼──┼──┼──┼──┐
│   │                                │  │  │  │  │
│   ├── website.tsx ─────────────────┘  │  │  │  │
│   │   └── WebsiteLayout ──────────────┼──┼──┼──┼──┐
│   │                                   │  │  │  │  │
│   └── components/                     │  │  │  │  │
│       └── ProtectedRoutes.tsx ────────┘  │  │  │  │
│           ├── isAuthenticated ────────────┼──┼──┼──┼──┐
│           ├── hasRole ─────────────────────┼──┼──┼──┼──┤
│           └── UserRole ────────────────────┘  │  │  │  │
│                                               │  │  │  │
├── utils/                                      │  │  │  │
│   └── auth.ts ─────────────────────────────────┘  │  │  │
│       ├── isAuthenticated()                       │  │  │
│       ├── hasRole()                               │  │  │
│       ├── getUserRole()                           │  │  │
│       ├── setAuthData()                           │  │  │
│       └── clearAuthData()                         │  │  │
│                                                   │  │  │
├── layout/                                         │  │  │
│   ├── AppLayout.tsx ───────────────────────────────┘  │  │
│   │   ├── AppSidebar                                  │  │
│   │   ├── AppHeader                                   │  │
│   │   └── Outlet                                      │  │
│   │                                                   │  │
│   └── WebsiteLayout.tsx ──────────────────────────────┘  │
│       └── Outlet                                         │
│                                                          │
└── views/                                                │
    ├── admin/ ───────────────────────────────────────────┘
    │   ├── Dashboard/Home.tsx
    │   ├── AuthPages/
    │   │   ├── SignIn.tsx
    │   │   └── SignUp.tsx
    │   └── ...
    │
    └── pages/ ───────────────────────────────────────────┘
        ├── Home/index.tsx
        ├── Unauthorized.tsx
        └── ...
```

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                    Authorization Flow                         │
└──────────────────────────────────────────────────────────────┘

Request
   │
   ▼
┌─────────────────┐
│ Route Matching  │
└────────┬────────┘
         │
         ▼
   Is Protected?
         │
    ┌────┴────┐
    │         │
   NO        YES
    │         │
    ▼         ▼
 Render  ┌──────────────────┐
  Page   │ ProtectedRoute   │
         │   Component      │
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────┐
         │  Check Storage   │
         │  - auth_token    │
         │  - user_role     │
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────┐
         │ isAuthenticated()│
         └────────┬─────────┘
                  │
             ┌────┴────┐
             │         │
            NO        YES
             │         │
             ▼         ▼
        Redirect   ┌──────────────┐
         to       │  hasRole()   │
        Sign-In    │  Check       │
                   └────┬─────────┘
                        │
                   ┌────┴────┐
                   │         │
                  NO        YES
                   │         │
                   ▼         ▼
              Redirect   Render
                to       Page
            Unauthorized
```

## Legend

```
┌─────┐
│ Box │  = Component/File
└─────┘

   │     = Flow/Connection
   ▼     = Direction

  ┌─┐
  │?│   = Decision Point
  └─┘

  ✓     = Success/Pass
  ✗     = Fail/Redirect
```

---

**Visual Guide Version:** 1.0.0  
**Last Updated:** January 2026

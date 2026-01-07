# Integration Checklist

## 🔄 Steps to Integrate the New Routing System

### Phase 1: Immediate Integration

- [x] ✅ Authentication utilities created (`src/utils/auth.ts`)
- [x] ✅ Protected route component updated
- [x] ✅ Admin routes separated and protected
- [x] ✅ Website routes created
- [x] ✅ Main router updated
- [x] ✅ Unauthorized page created
- [x] ✅ Documentation completed

### Phase 2: Update Authentication Pages

#### Update SignIn Component

**File:** `src/views/admin/AuthPages/SignIn.tsx`

Add these imports:
```typescript
import { setAuthData, UserRole } from '../../../utils/auth';
import { useNavigate } from 'react-router';
```

Update login handler:
```typescript
const navigate = useNavigate();

const handleLogin = async (formData) => {
  try {
    // Your API call
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store authentication data
      setAuthData(
        data.token,
        data.user.role || UserRole.ADMIN,
        data.user
      );
      
      // Navigate to admin dashboard
      navigate('/admin');
    }
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

- [ ] Update SignIn.tsx with new auth logic

#### Update SignUp Component

**File:** `src/views/admin/AuthPages/SignUp.tsx`

Similar updates as SignIn:
```typescript
import { setAuthData, UserRole } from '../../../utils/auth';
import { useNavigate } from 'react-router';

const navigate = useNavigate();

const handleSignUp = async (formData) => {
  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      setAuthData(
        data.token,
        data.user.role || UserRole.USER,
        data.user
      );
      navigate('/admin');
    }
  } catch (error) {
    console.error('Sign up failed:', error);
  }
};
```

- [ ] Update SignUp.tsx with new auth logic

### Phase 3: Update Header/Navigation

#### Update UserDropdown Component

**File:** `src/components/header/UserDropdown.tsx`

Add logout functionality:
```typescript
import { clearAuthData, getUserData } from '../../utils/auth';
import { useNavigate } from 'react-router';

const UserDropdown = () => {
  const navigate = useNavigate();
  const userData = getUserData();

  const handleLogout = () => {
    clearAuthData();
    navigate('/admin/auth/sign-in');
  };

  return (
    <div>
      {/* User info */}
      <div>{userData?.name || 'User'}</div>
      
      {/* Logout button */}
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
```

- [ ] Add logout handler to UserDropdown
- [ ] Display user info from getUserData()

#### Update AppHeader Component

**File:** `src/layout/AppHeader.tsx`

Optional - Add role display:
```typescript
import { getUserRole, isAdmin } from '../utils/auth';

const AppHeader = () => {
  const userRole = getUserRole();
  const adminAccess = isAdmin();

  return (
    <header>
      {/* Existing header content */}
      
      {/* Optional: Show admin badge */}
      {adminAccess && (
        <span className="badge">Admin</span>
      )}
    </header>
  );
};
```

- [ ] Add role indicators if desired

### Phase 4: Update Sidebar Navigation

#### Update AppSidebar Component

**File:** `src/layout/AppSidebar.tsx`

Update navigation links to match new routes:
```typescript
const sidebarLinks = [
  { path: '/admin', label: 'Dashboard', icon: 'dashboard' },
  { path: '/admin/profile', label: 'Profile', icon: 'user' },
  { path: '/admin/calendar', label: 'Calendar', icon: 'calendar' },
  
  // Forms
  { path: '/admin/forms/form-elements', label: 'Form Elements', icon: 'form' },
  
  // Tables
  { path: '/admin/tables/basic-tables', label: 'Tables', icon: 'table' },
  
  // UI Elements
  { path: '/admin/ui/alerts', label: 'Alerts', icon: 'bell' },
  { path: '/admin/ui/buttons', label: 'Buttons', icon: 'click' },
  { path: '/admin/ui/badges', label: 'Badges', icon: 'badge' },
  
  // Charts
  { path: '/admin/charts/line-chart', label: 'Line Chart', icon: 'chart' },
  { path: '/admin/charts/bar-chart', label: 'Bar Chart', icon: 'bar-chart' },
];
```

- [ ] Update sidebar navigation links
- [ ] Verify all links use new route structure

### Phase 5: Backend Integration

#### API Endpoints Required

**Authentication Endpoints:**
```
POST /api/auth/login
  Request: { email, password }
  Response: { token, user: { id, name, email, role } }

POST /api/auth/register
  Request: { name, email, password }
  Response: { token, user: { id, name, email, role } }

GET /api/auth/me (with token)
  Response: { user: { id, name, email, role } }

POST /api/auth/logout (optional)
  Request: { token }
  Response: { message: 'Logged out' }
```

- [ ] Ensure backend returns `role` in auth responses
- [ ] Backend validates JWT tokens
- [ ] Backend includes role in JWT payload

#### JWT Token Structure

Ensure your JWT includes:
```json
{
  "sub": "user_id",
  "email": "user@example.com",
  "role": "admin",
  "iat": 1234567890,
  "exp": 1234567890
}
```

- [ ] JWT includes role claim
- [ ] JWT includes expiration
- [ ] Backend validates role on protected endpoints

### Phase 6: Testing

#### Manual Testing

**Public Routes:**
- [ ] Visit `/` - should show homepage without login
- [ ] Visit `/about` (if created) - should be accessible

**Authentication Flow:**
- [ ] Visit `/admin` without login - should redirect to `/admin/auth/sign-in`
- [ ] Sign in with valid credentials - should redirect to `/admin`
- [ ] Token should be stored in localStorage
- [ ] User role should be stored

**Admin Routes:**
- [ ] After login, visit `/admin` - should show dashboard
- [ ] Visit `/admin/profile` - should be accessible
- [ ] Visit `/admin/forms/form-elements` - should be accessible
- [ ] All admin pages should have sidebar and header

**Authorization:**
- [ ] Login with non-admin user - should redirect to `/unauthorized`
- [ ] Change role in localStorage to 'user' - should block admin access

**Logout:**
- [ ] Click logout - should clear localStorage
- [ ] After logout, visit `/admin` - should redirect to sign-in
- [ ] Token should be removed from storage

**Error Pages:**
- [ ] Visit invalid route - should show 404
- [ ] Access admin without proper role - should show 403

#### Automated Testing (Optional)

Create test file: `src/routes/__tests__/auth.test.ts`
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { 
  setAuthData, 
  clearAuthData, 
  isAuthenticated, 
  isAdmin,
  UserRole 
} from '../utils/auth';

describe('Authentication', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should authenticate user', () => {
    setAuthData('token123', UserRole.ADMIN, { name: 'Test' });
    expect(isAuthenticated()).toBe(true);
  });

  it('should check admin role', () => {
    setAuthData('token123', UserRole.ADMIN);
    expect(isAdmin()).toBe(true);
  });

  it('should clear auth data', () => {
    setAuthData('token123', UserRole.ADMIN);
    clearAuthData();
    expect(isAuthenticated()).toBe(false);
  });
});
```

- [ ] Write unit tests for auth utilities
- [ ] Test route protection
- [ ] Test role-based access

### Phase 7: Production Considerations

#### Security Enhancements

- [ ] Move from localStorage to httpOnly cookies (recommended)
- [ ] Implement CSRF protection
- [ ] Add rate limiting on login attempts
- [ ] Implement refresh token mechanism
- [ ] Add secure password requirements

#### Performance

- [ ] Verify all routes use lazy loading
- [ ] Check bundle sizes
- [ ] Test route loading performance

#### Monitoring

- [ ] Add analytics for route access
- [ ] Log unauthorized access attempts
- [ ] Monitor authentication failures

### Phase 8: Documentation Updates

- [ ] Update project README with routing info
- [ ] Document environment variables
- [ ] Create onboarding guide for new developers
- [ ] Document API integration points

## ⚡ Quick Start Commands

### Development
```bash
cd frontend
npm install
npm run dev
```

### Testing Routes
```bash
# Visit these URLs:
http://localhost:5173/                    # Public homepage
http://localhost:5173/admin               # Admin (requires auth)
http://localhost:5173/admin/auth/sign-in  # Login page
```

### Troubleshooting
```bash
# Clear browser cache and localStorage
# Then try accessing routes again

# Check for TypeScript errors
npm run type-check

# Check for lint errors
npm run lint
```

## 📞 Support

If you encounter issues:

1. Check **ROUTING_DOCUMENTATION.md** for detailed info
2. Check **ROUTING_QUICK_REFERENCE.md** for common tasks
3. Check **ROUTING_DIAGRAM.md** for visual flow
4. Review console for errors
5. Verify localStorage contains auth data after login

## 🎉 Completion

Once all checkboxes are complete:
- ✅ Routing system is fully integrated
- ✅ Authentication is working
- ✅ Admin panel is protected
- ✅ Public website is accessible
- ✅ System is ready for production

---

**Last Updated:** January 2026  
**Status:** Ready for Integration

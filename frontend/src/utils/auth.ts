/**
 * Authentication Utility Functions
 * Centralized authentication and authorization logic
 */

// User roles enum
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// Auth token key
const AUTH_TOKEN_KEY = 'auth_token';
// const USER_ROLE_KEY = 'user_role';
// const USER_DATA_KEY = 'user_data';

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (!token) return false;
  
  // Check if token is expired (if JWT)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expiry;
  } catch {
    // If not a JWT or parsing fails, just check if token exists
    return !!token;
  }
};

/**
 * Get user role from storage
 */
// export const getUserRole = (): UserRole => {
//   const role = localStorage.getItem(USER_ROLE_KEY);
//   return (role as UserRole) || UserRole.GUEST;
// };

/**
 * Check if user has required role
 */
// export const hasRole = (requiredRole: UserRole): boolean => {
//   const userRole = getUserRole();
  
//   // Role hierarchy: ADMIN > USER > GUEST
//   const roleHierarchy = {
//     [UserRole.ADMIN]: 3,
//     [UserRole.USER]: 2,
//     [UserRole.GUEST]: 1
//   };
  
//   return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
// };

/**
 * Check if user is admin
 */
// export const isAdmin = (): boolean => {
//   return getUserRole() === UserRole.ADMIN;
// };

/**
 * Set authentication data
 */
// export const setAuthData = (token: string, role: UserRole, userData?: any): void => {
//   localStorage.setItem(AUTH_TOKEN_KEY, token);
//   localStorage.setItem(USER_ROLE_KEY, role);
//   if (userData) {
//     localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
//   }
// };

/**
 * Get user data from storage
 */
// export const getUserData = (): any => {
//   const userData = localStorage.getItem(USER_DATA_KEY);
//   return userData ? JSON.parse(userData) : null;
// };

/**
 * Clear all authentication data
 */
// export const clearAuthData = (): void => {
//   localStorage.removeItem(AUTH_TOKEN_KEY);
//   localStorage.removeItem(USER_ROLE_KEY);
//   localStorage.removeItem(USER_DATA_KEY);
// };

/**
 * Get auth token
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

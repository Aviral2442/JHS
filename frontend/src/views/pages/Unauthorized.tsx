import { useNavigate } from "react-router";
// import { clearAuthData } from "../../utils/auth";

/**
 * Unauthorized Page
 * Displayed when a user tries to access a route they don't have permission for
 */
const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

//   const handleLogout = () => {
//     clearAuthData();
//     navigate("/admin/auth/sign-in");
//   };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-900" style={{ backgroundColor: 'var(--background-alt)' }}>
      <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <div className="text-6xl font-bold mb-4" style={{ color: 'var(--sky-blue)' }}>403</div>
          <h1 className="text-3xl font-bold dark:text-white mb-2" style={{ color: 'var(--black-color)' }}>
            Access Denied
          </h1>
          <p className="dark:text-gray-400 mb-6" style={{ color: 'var(--gray-color)' }}>
            You don't have permission to access this page. Please contact your administrator
            if you believe this is an error.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full px-6 py-3 text-white font-medium rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--sky-blue)' }}
          >
            Go Back
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full px-6 py-3 dark:bg-gray-700 dark:text-white font-medium rounded-lg transition-colors"
            style={{ backgroundColor: 'var(--background-alt)', color: 'var(--black-color)' }}
          >
            Go to Homepage
          </button>
          
          {/* <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Logout
          </button> */}
        </div>

        <div className="mt-8 pt-6 border-t dark:border-gray-700" style={{ borderColor: 'var(--background-alt)' }}>
          <p className="text-sm dark:text-gray-400" style={{ color: 'var(--gray-color)' }}>
            If you need access to admin features, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

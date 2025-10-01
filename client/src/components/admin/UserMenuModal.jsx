import React from "react";
const UserMenuModal = ({
  user,
  users,
  showUserMenu,
  setShowUserMenu,
  activeTab,
  setActiveTab,
  setConfirmUser,
  logout,
}) => {
  if (!user || !showUserMenu) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="w-96 max-w-full bg-white rounded-2xl shadow-2xl p-6 animate-fade-in relative">
        {/* Close Button */}
        <button
          onClick={() => setShowUserMenu(false)}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* User Info */}
        <div className="text-center mb-6 pt-2">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <p className="text-lg font-semibold text-gray-900">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>

        {/* Tabs - Only for Admin */}
        {user.role === "admin" && (
          <>
            <div className="flex space-x-1 mb-6 p-1 bg-gray-100 rounded-lg">
              <button
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === "customer"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("customer")}
              >
                Customers
              </button>
              <button
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                  activeTab === "employee"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
                onClick={() => setActiveTab("employee")}
              >
                Employees
              </button>
            </div>

            {/* Tab Content */}
            <div className="max-h-64 overflow-y-auto space-y-2 mb-4">
              {activeTab === "customer" &&
                users
                  .filter((u) => u.role === "customer")
                  .map((u) => (
                    <div
                      key={u.email}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <span className="font-medium text-gray-900">{u.name}</span>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        onClick={() => setConfirmUser(u)}
                      >
                        Promote
                      </button>
                    </div>
                  ))}

              {activeTab === "employee" &&
                users
                  .filter((u) => u.role === "employee")
                  .map((u) => (
                    <div
                      key={u.email}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <span className="font-medium text-gray-900">{u.name}</span>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Employee
                      </span>
                    </div>
                  ))}
            </div>
          </>
        )}

        {/* Logout Button */}
        <button
          onClick={() => {
            logout();
            setShowUserMenu(false);
          }}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-xl font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserMenuModal;

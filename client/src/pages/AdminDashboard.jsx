import React, { useState } from "react";
import { 
  Package, ClipboardList, CalendarDays, BarChart2, LogOut, 
  Pill, Warehouse, Calendar, TrendingUp, Users, Search,
  ChevronDown, Bell, Menu, X, Filter, MoreVertical, Eye, Edit, Trash2
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const { logout, users, promoteUser } = useAuth();
  const [confirmUser, setConfirmUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-md shadow-lg"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
        fixed lg:static w-80 bg-gradient-to-b from-indigo-800 to-purple-900 text-white flex flex-col z-40
        transition-transform duration-300 ease-in-out h-full shadow-xl`}>
        <div className="p-6 border-b border-indigo-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-lg mr-3">
              <Pill className="w-6 h-6 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-bold">PharmaAdmin</h1>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          <SidebarButton
            icon={<Users className="mr-3 w-5 h-5" />}
            label="User Management"
            active={activeTab === "users"}
            onClick={() => {
              setActiveTab("users");
              setSidebarOpen(false);
            }}
            badge={users?.filter(u => u.role === "customer").length}
          />

          <SidebarButton
            icon={<Package className="mr-3 w-5 h-5" />}
            label="Product Management"
            active={activeTab === "products"}
            onClick={() => {
              setActiveTab("products");
              setSidebarOpen(false);
            }}
          />

          <SidebarButton
            icon={<ClipboardList className="mr-3 w-5 h-5" />}
            label="Inventory Management"
            active={activeTab === "inventory"}
            onClick={() => {
              setActiveTab("inventory");
              setSidebarOpen(false);
            }}
          />

          <SidebarButton
            icon={<CalendarDays className="mr-3 w-5 h-5" />}
            label="Appointments"
            active={activeTab === "appointments"}
            onClick={() => {
              setActiveTab("appointments");
              setSidebarOpen(false);
            }}
          />

          <SidebarButton
            icon={<BarChart2 className="mr-3 w-5 h-5" />}
            label="Revenue Stats"
            active={activeTab === "revenue"}
            onClick={() => {
              setActiveTab("revenue");
              setSidebarOpen(false);
            }}
          />
        </nav>

        <div className="p-6 border-t border-indigo-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center mr-3">
              <span className="font-semibold">A</span>
            </div>
            <div>
              <p className="font-medium">Admin User</p>
              <p className="text-xs text-indigo-200">admin@example.com</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex items-center justify-center w-full px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Exit
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">

        {/* Dashboard Content */}
        <div className="p-4 lg:p-6">
          {activeTab === "users" && (
            <UserManagement
              users={users}
              setConfirmUser={setConfirmUser}
            />
          )}
          {activeTab === "products" && <ProductManagement />}
          {activeTab === "inventory" && <InventoryManagement />}
          {activeTab === "appointments" && <AppointmentManagement />}
          {activeTab === "revenue" && <RevenueStats />}
        </div>
      </main>

      {/* Popup Confirm Promote */}
      {confirmUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-96 max-w-full mx-4">
            <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Promote User</h3>
            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to promote <strong>{confirmUser.name}</strong> to employee?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setConfirmUser(null)}
                className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  promoteUser(confirmUser.email);
                  setConfirmUser(null);
                }}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ======= Component con ======= */
function SidebarButton({ icon, label, active, onClick, badge }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-200 ${
        active 
          ? "bg-white text-indigo-700 shadow-md" 
          : "text-indigo-100 hover:bg-indigo-700 hover:text-white"
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className={`px-2 py-1 text-xs rounded-full ${
          active ? "bg-indigo-100 text-indigo-700" : "bg-indigo-600 text-white"
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

/* === Quản lý người dùng === */
function UserManagement({ users, setConfirmUser }) {
  const [filterRole, setFilterRole] = useState("customer");
  const filteredUsers = users.filter((u) => u.role === filterRole);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">User Management</h2>
        <p className="text-gray-600">Manage customer and employee accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-800">{users?.length || 0}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Customers</p>
              <p className="text-2xl font-bold text-gray-800">
                {users?.filter(u => u.role === "customer").length || 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Employees</p>
              <p className="text-2xl font-bold text-gray-800">
                {users?.filter(u => u.role === "employee").length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex space-x-2 mb-4 md:mb-0">
            <button
              onClick={() => setFilterRole("customer")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                filterRole === "customer"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Customers
            </button>
            <button
              onClick={() => setFilterRole("employee")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                filterRole === "employee"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Employees
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </button>
            <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200">
              <Users className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of birth</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((u, i) => (
                  <tr key={u.id || i} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {u.fullName ? u.fullName.charAt(0).toUpperCase() : 'U'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{u.fullName || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{u.gmail || u.email || 'No email'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.gender || 'Not specified'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.dateOfBirth || 'Not specified'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.phoneNumber || 'Not specified'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        u.role === 'employee' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {u.role || 'customer'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {u.role === "customer" ? (
                          <button
                            onClick={() => setConfirmUser(u)}
                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-xs"
                          >
                            Promote
                          </button>
                        ) : (
                          <span className="text-gray-400 text-xs italic">---</span>
                        )}
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-indigo-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Users className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      There are no users in this category.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* === Các component còn lại === */
function ProductManagement() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Pill className="mr-2 w-6 h-6" />
          Product Management
        </h2>
        <p className="text-gray-600">Manage pharmaceutical products and inventory</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
        <Package className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Product Management</h3>
        <p className="mt-2 text-sm text-gray-500">
          This section is under development. Check back soon!
        </p>
      </div>
    </div>
  );
}

function InventoryManagement() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Warehouse className="mr-2 w-6 h-6" />
          Inventory Management
        </h2>
        <p className="text-gray-600">Track and manage product stock levels</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
        <Warehouse className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Inventory Management</h3>
        <p className="mt-2 text-sm text-gray-500">
          This section is under development. Check back soon!
        </p>
      </div>
    </div>
  );
}

function AppointmentManagement() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <Calendar className="mr-2 w-6 h-6" />
          Appointment Management
        </h2>
        <p className="text-gray-600">Schedule and manage customer appointments</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
        <Calendar className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Appointment Management</h3>
        <p className="mt-2 text-sm text-gray-500">
          This section is under development. Check back soon!
        </p>
      </div>
    </div>
  );
}

function RevenueStats() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <TrendingUp className="mr-2 w-6 h-6" />
          Revenue Statistics
        </h2>
        <p className="text-gray-600">View sales performance and revenue analytics</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
        <TrendingUp className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">Revenue Statistics</h3>
        <p className="mt-2 text-sm text-gray-500">
          This section is under development. Check back soon!
        </p>
      </div>
    </div>
  );
}

export default AdminDashboard;
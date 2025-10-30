import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import UserDashboardLayout from "./layouts/UserDashboardLayout";
import AdminRoute from "./router/AdminRoute";

import Home from "./modules/Dashboard/Home";
import ManageTemplates from "./modules/Templates/Manage/ManageTemplates";
import ApiKeys from "./modules/ApiKeys/Manage/ApiKeys";
import SMTP from "./modules/SMTP/Manage/SMTP";
import LogsList from "./modules/Logs/LogsList";
import SendTestOtp from "./modules/TestOTP/Send/SendTestOtp";
import { Settings } from "./modules/Settings";
import Login from "./modules/auth/Login";
import Register from "./modules/auth/Register";
import ForgotPass from "./modules/auth/ForgotPass";
import ProtectedRoute from "./router/ProtectedRoute";
import LandingPage from "./modules/Landing/LandingPage";
import AdminDashboard from "./modules/admin/Dashboard/AdminDashboard";
import PlansManagement from "./modules/admin/Manage/PlansManagement";

import CreateTemplate from "./modules/Templates/create/CreateTemplate";
import EditTemplate from "./modules/Templates/Edit/EditTemplate";
import ViewTemplate from "./modules/Templates/View/ViewTemplate";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page - Public */}
          <Route path="/" element={<LandingPage />} />

          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPass />} />

          {/* Protected User Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="templates" element={<ManageTemplates />} />
            <Route path="templates/create" element={<CreateTemplate />} />
            <Route path="templates/edit/:id" element={<EditTemplate />} />
            <Route path="templates/view/:id" element={<ViewTemplate />} />
            <Route path="apikeys" element={<ApiKeys />} />
            <Route path="smtp" element={<SMTP />} />
            <Route path="logs" element={<LogsList />} />
            <Route path="test-otp" element={<SendTestOtp />} />

            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/plans"
            element={
              <AdminRoute>
                <PlansManagement />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

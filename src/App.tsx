import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CheckEmail from "./pages/auth/CheckEmail";
import NewPassword from "./pages/auth/NewPassword";

// Student Pages
import StudentDashboard from "./pages/students/Dashboard";
import MyComplaints from "./pages/students/MyComplaints";
import KnowledgeBase from "./pages/students/KnowledgeBase";
import Settings from "./pages/students/Settings";
import SubmitComplaint from "./pages/students/SubmitComplaint";
import ComplaintDetail from "./pages/students/ComplaintDetail";

// Staff Pages
import StaffDashboard from "./pages/staff/Dashboard";
import MyTickets from "./pages/staff/MyTickets";
import TicketDetail from "./pages/staff/TicketDetail";
import DepartmentTasks from "./pages/staff/DepartmentTasks";
import ResolvedIssues from "./pages/staff/ResolvedIssues";
import Analytics from "./pages/staff/Analytics";
import StaffSettings from "./pages/staff/Settings";
import CreateTicket from "./pages/staff/CreateTicket";
import StudentHistory from "./pages/staff/StudentHistory";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminComplaints from "./pages/admin/Complaints";
import AdminComplaintDetail from "./pages/admin/ComplaintDetail";
import AdminUsers from "./pages/admin/Users";
import AdminCreateUser from "./pages/admin/CreateUser";
import AdminReports from "./pages/admin/Reports";
import AdminSettings from "./pages/admin/Settings";

// Components
import ScrollToTop from "./components/layout/ScrollToTop";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/new-password" element={<NewPassword />} />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/complaints"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <MyComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/complaints/:id"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <ComplaintDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/submit"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <SubmitComplaint />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/kb"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <KnowledgeBase />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/settings"
          element={
            <ProtectedRoute allowedRoles={["STUDENT"]}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Staff Routes*/}
        <Route
          path="/staff/dashboard"
          element={
            <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]}>
              <StaffDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/tasks"
          element={
            <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]}>
              <DepartmentTasks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/tasks/create"
          element={
            <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]}>
              <CreateTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/resolved"
          element={
            <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]}>
              <ResolvedIssues />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/reports"
          element={
            <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]}>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/settings"
          element={
            <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]}>
              <StaffSettings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/tickets"
          element={
            <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]}>
              <MyTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/tickets/:id"
          element={
            <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]}>
              <TicketDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staff/students/:studentId/history"
          element={
            <ProtectedRoute allowedRoles={["STAFF", "ADMIN"]}>
              <StudentHistory />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints/:id"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminComplaintDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/create"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminCreateUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminSettings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

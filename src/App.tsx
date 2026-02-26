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
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route
          path="/student/dashboard/complaints"
          element={<MyComplaints />}
        />
        <Route path="/student/dashboard/submit" element={<SubmitComplaint />} />
        <Route path="/student/dashboard/kb" element={<KnowledgeBase />} />
        <Route path="/student/dashboard/settings" element={<Settings />} />

        {/* Staff Routes */}
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/tasks" element={<DepartmentTasks />} />
        <Route path="/staff/tasks/create" element={<CreateTicket />} />
        <Route path="/staff/resolved" element={<ResolvedIssues />} />
        <Route path="/staff/reports" element={<Analytics />} />
        <Route path="/staff/settings" element={<StaffSettings />} />
        <Route path="/staff/tickets" element={<MyTickets />} />
        <Route path="/staff/tickets/:id" element={<TicketDetail />} />
        <Route
          path="/staff/students/:studentId/history"
          element={<StudentHistory />}
        />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaints />} />
        <Route
          path="/admin/complaints/:id"
          element={<AdminComplaintDetail />}
        />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/create" element={<AdminCreateUser />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </Router>
  );
};

export default App;

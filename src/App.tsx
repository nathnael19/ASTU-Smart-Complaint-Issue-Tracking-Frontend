import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import CheckEmail from "./pages/auth/CheckEmail";
import NewPassword from "./pages/auth/NewPassword";
import StudentDashboard from "./pages/students/Dashboard";
import MyComplaints from "./pages/students/MyComplaints";
import KnowledgeBase from "./pages/students/KnowledgeBase";
import Settings from "./pages/students/Settings";
import SubmitComplaint from "./pages/students/SubmitComplaint";
import StaffDashboard from "./pages/staff/Dashboard";
import MyTickets from "./pages/staff/MyTickets";
import TicketDetail from "./pages/staff/TicketDetail";
import DepartmentTasks from "./pages/staff/DepartmentTasks";
import StudentHistory from "./pages/staff/StudentHistory";
import ScrollToTop from "./components/layout/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route
          path="/student/dashboard/complaints"
          element={<MyComplaints />}
        />
        <Route path="/student/dashboard/submit" element={<SubmitComplaint />} />
        <Route path="/student/dashboard/kb" element={<KnowledgeBase />} />
        <Route path="/student/dashboard/settings" element={<Settings />} />
        <Route path="/staff/dashboard" element={<StaffDashboard />} />
        <Route path="/staff/tasks" element={<DepartmentTasks />} />
        <Route path="/staff/tickets" element={<MyTickets />} />
        <Route path="/staff/tickets/:id" element={<TicketDetail />} />
        <Route
          path="/staff/students/:studentId/history"
          element={<StudentHistory />}
        />
      </Routes>
    </Router>
  );
};

export default App;

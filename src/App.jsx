import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CollegeProvider } from "./contexts/CollegeContext";

// Main Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Student Dashboard
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentOverview from "./pages/student/StudentOverview";
import StudentProfile from "./pages/student/StudentProfile";
import StudentCourses from "./pages/student/StudentCourses";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentProgress from "./pages/student/StudentProgress";
import StudentMessages from "./pages/student/StudentMessages";
import StudentAttendance from "./pages/student/StudentAttendance";

// Teacher Dashboard
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import TeacherOverview from "./pages/teacher/TeacherOverview";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import TeacherAttendance from "./pages/teacher/TeacherAttendance";

// Coordinator Dashboard
import CoordinatorDashboard from "./pages/coordinator/CoordinatorDashboard";
import CoordinatorOverview from "./pages/coordinator/CoordinatorOverview";
import CoordinatorReports from "./pages/coordinator/CoordinatorReports";
import CoordinatorAttendance from "./pages/coordinator/CoordinatorAttendance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <CollegeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Student Dashboard Routes */}
              <Route path="/student" element={<StudentDashboard />}>
                <Route index element={<Navigate to="/student/overview" replace />} />
                <Route path="overview" element={<StudentOverview />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="courses" element={<StudentCourses />} />
                <Route path="assignments" element={<StudentAssignments />} />
                <Route path="progress" element={<StudentProgress />} />
                <Route path="attendance" element={<StudentAttendance />} />
                <Route path="messages" element={<StudentMessages />} />
              </Route>

              {/* Teacher Dashboard Routes */}
              <Route path="/teacher" element={<TeacherDashboard />}>
                <Route index element={<Navigate to="/teacher/overview" replace />} />
                <Route path="overview" element={<TeacherOverview />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="courses" element={<TeacherCourses />} />
                <Route path="assignments" element={<StudentAssignments />} />
                <Route path="attendance" element={<TeacherAttendance />} />
                <Route path="students" element={<TeacherStudents />} />
              </Route>

              {/* Coordinator Dashboard Routes */}
              <Route path="/coordinator" element={<CoordinatorDashboard />}>
                <Route index element={<Navigate to="/coordinator/overview" replace />} />
                <Route path="overview" element={<CoordinatorOverview />} />
                <Route path="users" element={<TeacherStudents />} />
                <Route path="courses" element={<TeacherCourses />} />
                <Route path="assignments" element={<StudentAssignments />} />
                <Route path="attendance" element={<CoordinatorAttendance />} />
                <Route path="reports" element={<CoordinatorReports />} />
                <Route path="settings" element={<StudentProfile />} />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CollegeProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
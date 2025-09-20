import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { User, BookOpen, FileText, Users, BarChart3, Calendar } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const TeacherDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const sidebarItems = [
  { icon: BarChart3, label: 'Overview', path: '/overview' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
  { icon: FileText, label: 'Assignments', path: '/assignments' },
  { icon: Calendar, label: 'Attendance', path: '/attendance' },
  { icon: Users, label: 'Students', path: '/students' },
  { icon: Calendar, label: 'Upload Event', path: '/upload-event' }
  ];

  return (
    <div className="dashboard-layout bg-background min-h-screen">
      <Sidebar 
        items={sidebarItems}
        collapsed={sidebarCollapsed}
        basePath="/teacher"
        className={`fixed top-0 left-0 h-screen z-30 responsive-sidebar ${isMobile ? 'shadow-2xl' : ''}`}
      />

      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      <div className="main-content" style={{ marginLeft: isMobile ? 0 : 240, marginTop: 72 }}>
        <Navbar 
          title="Teacher Dashboard"
          className="bg-card/90 backdrop-blur-sm border-b border-border/50"
        />

        <main className="p-4 md:p-6 lg:p-8">
          <div className="fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { User, BookOpen, FileText, TrendingUp, MessageSquare, BarChart3, Calendar } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const StudentDashboard = () => {
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
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
    { icon: Calendar, label: 'Attendance', path: '/attendance' },
    { icon: MessageSquare, label: 'Teacher Contacts', path: '/messages' },
    { icon: Calendar, label: 'Events', path: '/events' }
  ];

  return (
    <div className="dashboard-layout bg-background min-h-screen">
      <Sidebar 
        items={sidebarItems}
        collapsed={sidebarCollapsed}
        basePath="/student"
        className={`responsive-sidebar ${isMobile ? 'shadow-2xl' : ''}`}
      />
      
      {/* Mobile Overlay */}
      {isMobile && !sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      
      <div className="main-content">
        <Navbar 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          showSidebarToggle={true}
          title="Student Dashboard"
          className="bg-card/90 backdrop-blur-sm border-b border-border/50"
        />
        
        <main className="p-4 md:p-6 lg:p-8">
          <div className="fade-in" style={{ marginTop: '64px' }}>
            <div className="card bg-card border-2 border-black shadow-2xl p-4">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
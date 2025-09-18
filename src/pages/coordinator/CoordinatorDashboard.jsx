import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Users, BookOpen, FileText, BarChart3, Settings, Calendar } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const CoordinatorDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarItems = [
    { icon: BarChart3, label: 'Overview', path: '/overview' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: BookOpen, label: 'Courses', path: '/courses' },
    { icon: FileText, label: 'Assignments', path: '/assignments' },
    { icon: Calendar, label: 'Attendance', path: '/attendance' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="dashboard-layout">
      <Sidebar 
        items={sidebarItems}
        collapsed={sidebarCollapsed}
        basePath="/coordinator"
      />
      
      <div className="main-content">
        <Navbar 
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          showSidebarToggle={true}
          title="Admin Dashboard"
        />
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
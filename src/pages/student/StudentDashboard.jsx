import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { User, BookOpen, FileText, TrendingUp, MessageSquare, BarChart3, Calendar } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const StudentDashboard = () => {
  const [showDomainDropdown, setShowDomainDropdown] = useState(false);
  // Domain selection state
  const allDomains = [
    'Machine Learning',
    'Artificial Intelligence',
    'IOT',
    'Data Science',
    'Blockchain',
    'Web Development',
    'Cybersecurity',
    'Cloud Computing',
    'Other'
  ];
  const [selectedDomains, setSelectedDomains] = useState(() => {
    const stored = localStorage.getItem('selectedDomains');
    return stored ? JSON.parse(stored) : [];
  });

  const handleDomainChange = (domain) => {
    let updated;
    if (selectedDomains.includes(domain)) {
      updated = selectedDomains.filter(d => d !== domain);
    } else {
      updated = [...selectedDomains, domain];
    }
    setSelectedDomains(updated);
    localStorage.setItem('selectedDomains', JSON.stringify(updated));
  };
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

  // Get registered domains for filtering
  const registeredDomains = JSON.parse(localStorage.getItem('studentRegisteredDomains') || '[]');

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

        <main className="p-5 md:p-6 lg:p-8">
          <div className="fade-in" style={{ marginTop: '64px' }}>
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-2xl font-bold text-primary ml-6">Select Domains</h2>
              <div className="relative">
                <button
                  className="bg-[hsl(var(--card))] dark:bg-[hsl(var(--card))] border-2 border-border shadow-lg px-15 py-3 rounded-lg flex items-center gap-1 text-primary font-medium w-full "
                  style={{ minWidth: '220px', maxWidth: '100%' }}
                  onClick={() => setShowDomainDropdown(v => !v)}
                >
                  {selectedDomains.length > 0
                    ? `Selected: ${selectedDomains.join(', ')}`
                    : 'Choose Domains'}
                  <span className="ml-2">▼</span>
                </button>
                {showDomainDropdown && (
                  <div className="absolute left-0 mt-2 w-64 bg-[hsl(var(--card))] dark:bg-[hsl(var(--card))] border-2 border-border shadow-xl p-4 z-50 rounded-lg">
                    {allDomains.map(domain => (
                      <label
                        key={domain}
                        className="flex items-center gap-2 cursor-pointer text-primary mb-2 rounded hover:bg-[hsl(var(--card-hover))] dark:hover:bg-[hsl(var(--card-hover))] transition-colors"
                        style={{ padding: '0.5rem' }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedDomains.includes(domain)}
                          onChange={() => handleDomainChange(domain)}
                          className="accent-primary w-5 h-5 rounded border border-primary focus:ring-2 focus:ring-primary"
                        />
                        <span className="font-medium text-[hsl(var(--foreground))] dark:text-[hsl(var(--foreground))]">{domain}</span>
                      </label>
                    ))}
                    <button
                      className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
                      onClick={() => {
                        localStorage.setItem('studentRegisteredDomains', JSON.stringify(selectedDomains));
                        setShowDomainDropdown(false);
                      }}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

            </div>
            <div className="card bg-card border-2 border-black shadow-2xl p-4 mt-4">
              {/* Pass selectedDomains to children via context or props if needed */}
              <Outlet context={{ selectedDomains: registeredDomains }} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
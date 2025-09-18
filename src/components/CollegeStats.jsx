import React from 'react';
import PropTypes from 'prop-types';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';
import { useCollege } from '../contexts/CollegeContext';

const StatsCard = ({ icon: Icon, title, value, change, changeType, color }) => (
  <div className="card p-6 hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-text-secondary text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
        <p className={`text-sm mt-2 ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
          {change} from last month
        </p>
      </div>
      <div className="p-3 rounded-full bg-gradient-to-br from-primary/20 to-primary/10">
        <Icon size={24} className="text-primary" />
      </div>
    </div>
  </div>
);

StatsCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  change: PropTypes.string.isRequired,
  changeType: PropTypes.oneOf(['positive', 'negative']).isRequired,
  color: PropTypes.string.isRequired,
};

const CollegeStats = () => {
  const { currentUser } = useCollege();

  // Mock data - in real app, this would come from an API based on college
  const getStatsForCollege = () => {
    const baseStats = {
      stanford: { students: 2150, teachers: 89, courses: 156, completion: 94 },
      mit: { students: 1890, teachers: 76, courses: 142, completion: 96 },
      harvard: { students: 2340, teachers: 95, courses: 168, completion: 93 },
      berkeley: { students: 3200, teachers: 124, courses: 189, completion: 91 },
      oxford: { students: 1650, teachers: 67, courses: 134, completion: 95 },
      cambridge: { students: 1580, teachers: 63, courses: 128, completion: 97 }
    };

    const collegeId = currentUser?.college?.id || 'stanford';
    return baseStats[collegeId] || baseStats.stanford;
  };

  const stats = getStatsForCollege();

  const statsData = [
    {
      icon: Users,
      title: 'Total Students',
      value: stats.students.toLocaleString(),
      change: '+8.2%',
      changeType: 'positive',
      color: '#3b82f6'
    },
    {
      icon: Users,
      title: 'Faculty Members',
      value: stats.teachers.toString(),
      change: '+3.1%',
      changeType: 'positive',
      color: '#10b981'
    },
    {
      icon: BookOpen,
      title: 'Active Courses',
      value: stats.courses.toString(),
      change: '+12.5%',
      changeType: 'positive',
      color: '#f59e0b'
    },
    {
      icon: TrendingUp,
      title: 'Completion Rate',
      value: `${stats.completion}%`,
      change: '+2.1%',
      changeType: 'positive',
      color: '#8b5cf6'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {currentUser?.college?.name || 'College'} Overview
          </h2>
          <p className="text-text-secondary mt-1">
            Real-time statistics and performance metrics
          </p>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border">
          <Award className="text-primary" size={20} />
          <span className="font-medium text-primary">Academic Year 2024-25</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {/* Recent activity items... */}
            <div className="flex items-center justify-between p-3 bg-zinc-100 rounded-lg">
              <div>
                <p className="font-medium">New Course: Advanced AI</p>
                <p className="text-sm text-text-secondary">Computer Science Department</p>
              </div>
              <span className="text-xs text-text-muted">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-100 rounded-lg">
              <div>
                <p className="font-medium">Assignment Submitted</p>
                <p className="text-sm text-text-secondary">Database Systems - 45 submissions</p>
              </div>
              <span className="text-xs text-text-muted">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-zinc-100 rounded-lg">
              <div>
                <p className="font-medium">New Faculty Joined</p>
                <p className="text-sm text-text-secondary">Dr. Sarah Johnson - Mathematics</p>
              </div>
              <span className="text-xs text-text-muted">1 day ago</span>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Quick action buttons... */}
            <button className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-lg border border-blue-200/20 hover:from-blue-500/20 hover:to-blue-600/20 transition-all">
              <BookOpen className="text-blue-600 mb-2" size={20} />
              <p className="text-sm font-medium">View Courses</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-lg border border-green-200/20 hover:from-green-500/20 hover:to-green-600/20 transition-all">
              <Users className="text-green-600 mb-2" size={20} />
              <p className="text-sm font-medium">Manage Users</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-200/20 hover:from-purple-500/20 hover:to-purple-600/20 transition-all">
              <TrendingUp className="text-purple-600 mb-2" size={20} />
              <p className="text-sm font-medium">View Reports</p>
            </button>
            <button className="p-4 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg border border-orange-200/20 hover:from-orange-500/20 hover:to-orange-600/20 transition-all">
              <Award className="text-orange-600 mb-2" size={20} />
              <p className="text-sm font-medium">Achievements</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeStats;
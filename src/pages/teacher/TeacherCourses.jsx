import { useState } from 'react';
import { Plus, Edit, Trash2, Users, Clock, BarChart3 } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import ProgressBar from '../../components/ProgressBar';

const TeacherCourses = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const courses = [
    {
      id: 1,
      title: 'Advanced Web Development',
      description: 'Learn modern web development with React, Node.js, and MongoDB',
      students: 156,
      lessons: 24,
      assignments: 8,
      completionRate: 78,
      status: 'active',
      startDate: '2024-01-15',
      endDate: '2024-05-15'
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      description: 'Master the basics of JavaScript programming',
      students: 203,
      lessons: 16,
      assignments: 6,
      completionRate: 85,
      status: 'active',
      startDate: '2024-01-10',
      endDate: '2024-04-10'
    },
    {
      id: 3,
      title: 'React Masterclass',
      description: 'Deep dive into React.js and modern frontend development',
      students: 89,
      lessons: 20,
      assignments: 10,
      completionRate: 65,
      status: 'active',
      startDate: '2024-02-01',
      endDate: '2024-06-01'
    },
    {
      id: 4,
      title: 'Web Design Principles',
      description: 'Learn design principles and UI/UX best practices',
      students: 134,
      lessons: 12,
      assignments: 5,
      completionRate: 92,
      status: 'completed',
      startDate: '2023-09-01',
      endDate: '2023-12-15'
    }
  ];

  const recentActivity = [
    {
      type: 'assignment',
      course: 'Advanced Web Development',
      description: 'New assignment submitted by 12 students',
      time: '2 hours ago'
    },
    {
      type: 'question',
      course: 'JavaScript Fundamentals',
      description: 'Student question about async/await',
      time: '4 hours ago'
    },
    {
      type: 'completion',
      course: 'React Masterclass',
      description: '5 students completed Module 3',
      time: '1 day ago'
    }
  ];

  return (
    <div className="fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <Button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Create Course</span>
        </Button>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">4</div>
            <div className="text-text-secondary text-sm">Active Courses</div>
          </div>
        </Card>
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">582</div>
            <div className="text-text-secondary text-sm">Total Students</div>
          </div>
        </Card>
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">29</div>
            <div className="text-text-secondary text-sm">Assignments</div>
          </div>
        </Card>
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-info">78%</div>
            <div className="text-text-secondary text-sm">Avg Completion</div>
          </div>
        </Card>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                <p className="text-text-secondary text-sm mb-3">{course.description}</p>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm">
                  <Edit size={16} />
                </Button>
                <Button variant="ghost" size="sm" className="text-error hover:text-error">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-text-secondary mb-1">
                  <Users size={16} />
                  <span>Students</span>
                </div>
                <div className="font-semibold">{course.students}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-text-secondary mb-1">
                  <Clock size={16} />
                  <span>Lessons</span>
                </div>
                <div className="font-semibold">{course.lessons}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-text-secondary mb-1">
                  <BarChart3 size={16} />
                  <span>Assignments</span>
                </div>
                <div className="font-semibold">{course.assignments}</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-secondary">Completion Rate</span>
                <span className="text-sm font-medium">{course.completionRate}%</span>
              </div>
              <ProgressBar progress={course.completionRate} />
            </div>

            <div className="flex justify-between items-center">
              <span className={`text-xs px-2 py-1 rounded-full ${
                course.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-zinc-100 text-gray-800'
              }`}>
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
              <div className="flex space-x-2">
                <Button size="sm" variant="secondary">Analytics</Button>
                <Button size="sm">Manage</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card title="Recent Activity">
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4 p-3 border rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.type === 'assignment' ? 'bg-blue-500' :
                activity.type === 'question' ? 'bg-yellow-500' :
                'bg-green-500'
              }`} />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{activity.course}</p>
                    <p className="text-text-secondary text-sm">{activity.description}</p>
                  </div>
                  <span className="text-xs text-text-muted">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TeacherCourses;
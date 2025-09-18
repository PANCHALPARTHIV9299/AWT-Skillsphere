import { BookOpen, Clock, Users, Star } from 'lucide-react';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import Button from '../../components/Button';

const StudentCourses = () => {
  const courses = [
    {
      id: 1,
      title: 'Advanced Web Development',
      instructor: 'Dr. Sarah Johnson',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextDeadline: '2024-02-15',
      rating: 4.8,
      enrolled: 156
    },
    {
      id: 2,
      title: 'Database Management Systems',
      instructor: 'Prof. Michael Chen',
      progress: 60,
      totalLessons: 20,
      completedLessons: 12,
      nextDeadline: '2024-02-20',
      rating: 4.6,
      enrolled: 203
    },
    {
      id: 3,
      title: 'Machine Learning Fundamentals',
      instructor: 'Dr. Emily Watson',
      progress: 40,
      totalLessons: 30,
      completedLessons: 12,
      nextDeadline: '2024-02-25',
      rating: 4.9,
      enrolled: 89
    },
    {
      id: 4,
      title: 'Software Engineering Principles',
      instructor: 'Prof. David Kumar',
      progress: 90,
      totalLessons: 16,
      completedLessons: 14,
      nextDeadline: '2024-02-10',
      rating: 4.7,
      enrolled: 178
    }
  ];

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <Button variant="primary">Browse All Courses</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold mb-1">{course.title}</h3>
                <p className="text-text-secondary text-sm">by {course.instructor}</p>
              </div>
              <div className="flex items-center space-x-1 text-yellow-500">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-text-secondary">Progress</span>
                <span className="text-sm font-medium">{course.completedLessons}/{course.totalLessons} lessons</span>
              </div>
              <ProgressBar progress={course.progress} />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="flex items-center space-x-2 text-text-secondary">
                <Clock size={16} />
                <span>Due: {new Date(course.nextDeadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2 text-text-secondary">
                <Users size={16} />
                <span>{course.enrolled} enrolled</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button size="sm" className="flex-1">Continue Learning</Button>
              <Button variant="ghost" size="sm">View Details</Button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6" title="Course Statistics">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">4</div>
            <div className="text-text-secondary text-sm">Enrolled Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">56</div>
            <div className="text-text-secondary text-sm">Completed Lessons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">12</div>
            <div className="text-text-secondary text-sm">Pending Assignments</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-info">68%</div>
            <div className="text-text-secondary text-sm">Average Progress</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentCourses;
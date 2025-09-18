import { useState } from 'react';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useCollege } from '../../contexts/CollegeContext';

const StudentAttendance = () => {
  const { currentUser } = useCollege();
  const [selectedCourse, setSelectedCourse] = useState('all');

  const courses = [
    { id: 'cs101', name: 'Computer Science Fundamentals', code: 'CS 101', instructor: 'Dr. Smith' },
    { id: 'math201', name: 'Advanced Mathematics', code: 'MATH 201', instructor: 'Prof. Johnson' },
    { id: 'phys101', name: 'Physics I', code: 'PHYS 101', instructor: 'Dr. Brown' },
    { id: 'eng102', name: 'Technical Writing', code: 'ENG 102', instructor: 'Prof. Davis' }
  ];

  const attendanceData = [
    { date: '2024-01-15', course: 'cs101', status: 'present', time: '09:00 AM', duration: '2h' },
    { date: '2024-01-15', course: 'math201', status: 'present', time: '11:00 AM', duration: '1.5h' },
    { date: '2024-01-16', course: 'phys101', status: 'absent', time: '10:00 AM', duration: '2h' },
    { date: '2024-01-16', course: 'eng102', status: 'present', time: '02:00 PM', duration: '1h' },
    { date: '2024-01-17', course: 'cs101', status: 'late', time: '09:15 AM', duration: '1h 45m' },
    { date: '2024-01-17', course: 'math201', status: 'present', time: '11:00 AM', duration: '1.5h' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'absent': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'late': return <AlertCircle className="h-4 w-4 text-warning" />;
      default: return null;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      present: 'default',
      absent: 'destructive',
      late: 'secondary'
    };
    return (
      <Badge variant={variants[status] || 'outline'} className="capitalize">
        {status}
      </Badge>
    );
  };

  const calculateAttendancePercentage = (courseId) => {
    const filteredData = courseId && courseId !== 'all' 
      ? attendanceData.filter(record => record.course === courseId)
      : attendanceData;
    
    const total = filteredData.length;
    const present = filteredData.filter(record => record.status === 'present' || record.status === 'late').length;
    return total > 0 ? Math.round((present / total) * 100) : 0;
  };

  const filteredAttendance = selectedCourse === 'all' 
    ? attendanceData 
    : attendanceData.filter(record => record.course === selectedCourse);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Calendar className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-2xl font-bold">My Attendance</h1>
          <p className="text-text-secondary">
            Track your class attendance for {currentUser?.college?.name}
          </p>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Overall Attendance</p>
                <p className="text-2xl font-bold text-success">{calculateAttendancePercentage()}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Total Classes</p>
                <p className="text-2xl font-bold">{attendanceData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Classes Attended</p>
                <p className="text-2xl font-bold text-success">
                  {attendanceData.filter(r => r.status === 'present' || r.status === 'late').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Classes Missed</p>
                <p className="text-2xl font-bold text-destructive">
                  {attendanceData.filter(r => r.status === 'absent').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Filter and Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course-wise Attendance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedCourse === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setSelectedCourse('all')}
            >
              All Courses
            </Badge>
            {courses.map(course => (
              <Badge 
                key={course.id}
                variant={selectedCourse === course.id ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCourse(course.id)}
              >
                {course.code}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map(course => {
              const percentage = calculateAttendancePercentage(course.id);
              return (
                <div key={course.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{course.code}</p>
                      <p className="text-sm text-text-secondary">{course.name}</p>
                    </div>
                    <span className="text-sm font-medium">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredAttendance.slice().reverse().map((record, index) => {
              const course = courses.find(c => c.id === record.course);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-zinc-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="font-medium">{course?.code} - {course?.name}</p>
                      <p className="text-sm text-text-secondary">
                        {record.date} • {record.time} • {record.duration}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(record.status)}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAttendance;
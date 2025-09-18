import { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle, XCircle, AlertCircle, Plus, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useCollege } from '../../contexts/CollegeContext';

const TeacherAttendance = () => {
  const { currentUser } = useCollege();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceMode, setAttendanceMode] = useState('view');
  const [currentAttendance, setCurrentAttendance] = useState({});

  const courses = [
    { id: 'cs101', name: 'Computer Science Fundamentals', code: 'CS 101', students: 45 },
    { id: 'cs201', name: 'Data Structures', code: 'CS 201', students: 38 },
    { id: 'cs301', name: 'Database Systems', code: 'CS 301', students: 42 }
  ];

  const students = [
    { id: '1', name: 'John Smith', enrollNo: 'CS2021001', email: 'john@university.edu' },
    { id: '2', name: 'Jane Doe', enrollNo: 'CS2021002', email: 'jane@university.edu' },
    { id: '3', name: 'Mike Johnson', enrollNo: 'CS2021003', email: 'mike@university.edu' },
    { id: '4', name: 'Sarah Wilson', enrollNo: 'CS2021004', email: 'sarah@university.edu' },
    { id: '5', name: 'David Brown', enrollNo: 'CS2021005', email: 'david@university.edu' }
  ];

  const attendanceRecords = [
    { date: '2024-01-15', course: 'cs101', studentId: '1', status: 'present' },
    { date: '2024-01-15', course: 'cs101', studentId: '2', status: 'present' },
    { date: '2024-01-15', course: 'cs101', studentId: '3', status: 'absent' },
    { date: '2024-01-15', course: 'cs101', studentId: '4', status: 'late' },
    { date: '2024-01-15', course: 'cs101', studentId: '5', status: 'present' },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'absent': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'late': return <AlertCircle className="h-4 w-4 text-warning" />;
      default: return null;
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    setCurrentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = () => {
    console.log('Saving attendance:', currentAttendance);
    // Here you would typically save to database
    setAttendanceMode('view');
    setCurrentAttendance({});
  };

  const calculateAttendanceStats = (courseId) => {
    const courseRecords = attendanceRecords.filter(r => r.course === courseId);
    const total = courseRecords.length;
    const present = courseRecords.filter(r => r.status === 'present' || r.status === 'late').length;
    return { total, present, percentage: total > 0 ? Math.round((present / total) * 100) : 0 };
  };

  const getStudentAttendanceForDate = (studentId, date, courseId) => {
    const record = attendanceRecords.find(r => 
      r.studentId === studentId && r.date === date && r.course === courseId
    );
    return record?.status || 'not-marked';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Attendance Management</h1>
            <p className="text-text-secondary">
              Manage student attendance for {currentUser?.college?.name}
            </p>
          </div>
        </div>

        <Button 
          onClick={() => setAttendanceMode(attendanceMode === 'mark' ? 'view' : 'mark')}
          variant={attendanceMode === 'mark' ? 'default' : 'outline'}
        >
          <Plus className="h-4 w-4 mr-2" />
          {attendanceMode === 'mark' ? 'Cancel Marking' : 'Mark Attendance'}
        </Button>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(course => {
          const stats = calculateAttendanceStats(course.id);
          return (
            <Card key={course.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{course.code}</h3>
                  <Badge variant="outline">{course.students} students</Badge>
                </div>
                <p className="text-sm text-text-secondary mb-3">{course.name}</p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span>{stats.percentage}% attendance</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Attendance Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {attendanceMode === 'mark' ? 'Mark Attendance' : 'View Attendance'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.code} - {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-zinc-100"
              />
            </div>
          </div>

          {/* Student List */}
          {selectedCourse && (
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Student List</h4>
                {attendanceMode === 'mark' && (
                  <Button onClick={handleSaveAttendance} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save Attendance
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                {students.map(student => {
                  const currentStatus = attendanceMode === 'mark' 
                    ? currentAttendance[student.id] 
                    : getStudentAttendanceForDate(student.id, selectedDate, selectedCourse);

                  return (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-zinc-100 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-text-secondary">{student.enrollNo}</p>
                        </div>
                      </div>

                      {attendanceMode === 'mark' ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={currentStatus === 'present' ? 'default' : 'outline'}
                            onClick={() => handleAttendanceChange(student.id, 'present')}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={currentStatus === 'late' ? 'secondary' : 'outline'}
                            onClick={() => handleAttendanceChange(student.id, 'late')}
                          >
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Late
                          </Button>
                          <Button
                            size="sm"
                            variant={currentStatus === 'absent' ? 'destructive' : 'outline'}
                            onClick={() => handleAttendanceChange(student.id, 'absent')}
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Absent
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          {getStatusIcon(currentStatus)}
                          <Badge 
                            variant={
                              currentStatus === 'present' ? 'default' :
                              currentStatus === 'absent' ? 'destructive' :
                              currentStatus === 'late' ? 'secondary' : 'outline'
                            }
                            className="capitalize"
                          >
                            {currentStatus === 'not-marked' ? 'Not Marked' : currentStatus}
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherAttendance;
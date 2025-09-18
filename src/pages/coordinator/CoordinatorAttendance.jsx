import { useState } from 'react';
import { BarChart3, Calendar, Users, TrendingDown, TrendingUp, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useCollege } from '../../contexts/CollegeContext';

const CoordinatorAttendance = () => {
  const { currentUser } = useCollege();
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('month');

  const departments = [
    { id: 'cs', name: 'Computer Science', students: 450, avgAttendance: 87 },
    { id: 'ee', name: 'Electrical Engineering', students: 380, avgAttendance: 82 },
    { id: 'me', name: 'Mechanical Engineering', students: 420, avgAttendance: 85 },
    { id: 'ce', name: 'Civil Engineering', students: 350, avgAttendance: 89 }
  ];

  const teacherStats = [
    { name: 'Dr. Smith', department: 'Computer Science', courses: 3, avgAttendance: 92, trend: 'up' },
    { name: 'Prof. Johnson', department: 'Electrical Engineering', courses: 2, avgAttendance: 88, trend: 'up' },
    { name: 'Dr. Brown', department: 'Mechanical Engineering', courses: 4, avgAttendance: 85, trend: 'down' },
    { name: 'Prof. Davis', department: 'Civil Engineering', courses: 2, avgAttendance: 91, trend: 'up' }
  ];

  const studentAlerts = [
    { name: 'John Smith', department: 'CS', enrollNo: 'CS2021001', attendance: 45, status: 'critical' },
    { name: 'Sarah Wilson', department: 'EE', enrollNo: 'EE2021005', attendance: 68, status: 'warning' },
    { name: 'Mike Johnson', department: 'ME', enrollNo: 'ME2021008', attendance: 72, status: 'warning' },
  ];

  const overallStats = {
    totalStudents: departments.reduce((sum, dept) => sum + dept.students, 0),
    averageAttendance: Math.round(departments.reduce((sum, dept) => sum + dept.avgAttendance, 0) / departments.length),
    attendanceThisWeek: 89,
    attendanceLastWeek: 86
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 85) return 'text-success';
    if (percentage >= 75) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusBadge = (status) => {
    const variants = {
      critical: 'destructive',
      warning: 'secondary',
      good: 'default'
    };
    return variants[status] || 'outline';
  };

  const filteredDepartments = selectedDepartment === 'all' 
    ? departments 
    : departments.filter(dept => dept.id === selectedDepartment);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold">Attendance Analytics</h1>
            <p className="text-text-secondary">
              Monitor attendance across {currentUser?.college?.name}
            </p>
          </div>
        </div>

        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Total Students</p>
                <p className="text-2xl font-bold">{overallStats.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <BarChart3 className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Average Attendance</p>
                <p className="text-2xl font-bold text-success">{overallStats.averageAttendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">This Week</p>
                <p className="text-2xl font-bold">{overallStats.attendanceThisWeek}%</p>
                <p className="text-xs text-success">+3% from last week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Low Attendance Alerts</p>
                <p className="text-2xl font-bold text-warning">{studentAlerts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="semester">This Semester</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department-wise Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDepartments.map(department => (
              <div key={department.id} className="flex items-center justify-between p-4 bg-zinc-100 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{department.name}</h3>
                    <span className={`font-bold ${getStatusColor(department.avgAttendance)}`}>
                      {department.avgAttendance}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm text-text-secondary">{department.students} students</span>
                  </div>
                  <Progress value={department.avgAttendance} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Teacher Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Teacher Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {teacherStats.map((teacher, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-zinc-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{teacher.name}</p>
                    <p className="text-sm text-text-secondary">
                      {teacher.department} • {teacher.courses} courses
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`font-medium ${getStatusColor(teacher.avgAttendance)}`}>
                    {teacher.avgAttendance}%
                  </span>
                  {teacher.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-destructive" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Low Attendance Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Low Attendance Alerts
            <Badge variant="destructive">{studentAlerts.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {studentAlerts.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-zinc-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-text-secondary">
                      {student.enrollNo} • {student.department}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-destructive font-medium">{student.attendance}%</span>
                  <Badge variant={getStatusBadge(student.status)} className="capitalize">
                    {student.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoordinatorAttendance;
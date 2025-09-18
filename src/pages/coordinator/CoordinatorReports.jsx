import { TrendingUp, Users, BookOpen, Award, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import Card from '../../components/Card';
import Button from '../../components/Button';

const CoordinatorReports = () => {
  const userGrowthData = [
    { month: 'Jan', students: 120, teachers: 15, total: 135 },
    { month: 'Feb', students: 185, teachers: 22, total: 207 },
    { month: 'Mar', students: 250, teachers: 28, total: 278 },
    { month: 'Apr', students: 320, teachers: 35, total: 355 },
    { month: 'May', students: 410, teachers: 42, total: 452 },
    { month: 'Jun', students: 485, teachers: 48, total: 533 }
  ];

  const courseUsageData = [
    { course: 'Web Development', students: 156, completion: 78 },
    { course: 'JavaScript Fund.', students: 203, completion: 85 },
    { course: 'React Masterclass', students: 89, completion: 65 },
    { course: 'Database Systems', students: 134, completion: 72 },
    { course: 'Machine Learning', students: 67, completion: 58 }
  ];

  const skillProgressData = [
    { month: 'Jan', webDev: 45, backend: 35, database: 40, ml: 25 },
    { month: 'Feb', webDev: 55, backend: 45, database: 50, ml: 35 },
    { month: 'Mar', webDev: 65, backend: 55, database: 60, ml: 45 },
    { month: 'Apr', webDev: 75, backend: 65, database: 70, ml: 55 },
    { month: 'May', webDev: 85, backend: 75, database: 80, ml: 65 },
    { month: 'Jun', webDev: 88, backend: 82, database: 85, ml: 72 }
  ];

  const performanceDistribution = [
    { name: 'A Grade', value: 125, color: '#10b981' },
    { name: 'B Grade', value: 189, color: '#3b82f6' },
    { name: 'C Grade', value: 95, color: '#f59e0b' },
    { name: 'D Grade', value: 34, color: '#ef4444' }
  ];

  const activityData = [
    { day: 'Mon', logins: 245, submissions: 89, messages: 156 },
    { day: 'Tue', logins: 289, submissions: 112, messages: 178 },
    { day: 'Wed', logins: 267, submissions: 95, messages: 134 },
    { day: 'Thu', logins: 312, submissions: 145, messages: 201 },
    { day: 'Fri', logins: 298, submissions: 123, messages: 189 },
    { day: 'Sat', logins: 178, submissions: 67, messages: 98 },
    { day: 'Sun', logins: 145, submissions: 45, messages: 76 }
  ];

  const timeRanges = ['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'Last Year'];

  return (
    <div className="fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics & Reports</h1>
        <div className="flex space-x-2">
          <select className="form-select w-auto">
            {timeRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
          <Button variant="secondary">Export Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="stat">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">533</div>
              <div className="text-text-secondary text-sm">Total Users</div>
              <div className="text-success text-xs">+12% this month</div>
            </div>
            <Users className="text-primary" size={32} />
          </div>
        </Card>

        <Card variant="stat">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-success">48</div>
              <div className="text-text-secondary text-sm">Active Courses</div>
              <div className="text-success text-xs">+3 new courses</div>
            </div>
            <BookOpen className="text-success" size={32} />
          </div>
        </Card>

        <Card variant="stat">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-warning">1,234</div>
              <div className="text-text-secondary text-sm">Assignments</div>
              <div className="text-success text-xs">78% completion</div>
            </div>
            <Award className="text-warning" size={32} />
          </div>
        </Card>

        <Card variant="stat">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-info">92%</div>
              <div className="text-text-secondary text-sm">Satisfaction</div>
              <div className="text-success text-xs">+5% improvement</div>
            </div>
            <TrendingUp className="text-info" size={32} />
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="User Growth Trends">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="total" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="students" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="teachers" stackId="3" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Course Enrollment & Completion">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseUsageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" angle={-45} textAnchor="end" height={80} />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="students" fill="#3b82f6" name="Students" />
              <Bar yAxisId="right" dataKey="completion" fill="#10b981" name="Completion %" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Skill Development Progress">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={skillProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="webDev" stroke="#3b82f6" strokeWidth={2} name="Web Dev" />
              <Line type="monotone" dataKey="backend" stroke="#10b981" strokeWidth={2} name="Backend" />
              <Line type="monotone" dataKey="database" stroke="#f59e0b" strokeWidth={2} name="Database" />
              <Line type="monotone" dataKey="ml" stroke="#ef4444" strokeWidth={2} name="ML" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Performance Distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {performanceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {performanceDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card title="Weekly Platform Activity">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="logins" fill="#3b82f6" name="Logins" />
            <Bar dataKey="submissions" fill="#10b981" name="Submissions" />
            <Bar dataKey="messages" fill="#f59e0b" name="Messages" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Engagement Metrics">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-text-secondary">Daily Active Users</span>
              <span className="font-semibold">245</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Weekly Retention</span>
              <span className="font-semibold">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Course Completion Rate</span>
              <span className="font-semibold">72%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Avg. Session Duration</span>
              <span className="font-semibold">45 min</span>
            </div>
          </div>
        </Card>

        <Card title="Content Performance">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-text-secondary">Most Popular Course</span>
              <span className="font-semibold text-sm">JavaScript Fund.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Highest Completion</span>
              <span className="font-semibold text-sm">JavaScript Fund.</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Most Assignments</span>
              <span className="font-semibold text-sm">React Masterclass</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Best Rated</span>
              <span className="font-semibold text-sm">Web Development</span>
            </div>
          </div>
        </Card>

        <Card title="System Health">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-text-secondary">Uptime</span>
              <span className="font-semibold text-success">99.9%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Response Time</span>
              <span className="font-semibold">120ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Error Rate</span>
              <span className="font-semibold text-success">0.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Storage Used</span>
              <span className="font-semibold">68%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CoordinatorReports;
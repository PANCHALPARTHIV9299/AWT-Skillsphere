import { TrendingUp, Target, Award, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';

const StudentProgress = () => {
  const skillProgressData = [
    { month: 'Jan', webDev: 65, database: 45, ml: 30, softEng: 70 },
    { month: 'Feb', webDev: 75, database: 60, ml: 40, softEng: 85 },
    { month: 'Mar', webDev: 85, database: 70, ml: 55, softEng: 90 },
    { month: 'Apr', webDev: 90, database: 80, ml: 65, softEng: 95 },
    { month: 'May', webDev: 95, database: 85, ml: 75, softEng: 98 }
  ];

  const weeklyActivityData = [
    { day: 'Mon', hours: 4 },
    { day: 'Tue', hours: 6 },
    { day: 'Wed', hours: 3 },
    { day: 'Thu', hours: 8 },
    { day: 'Fri', hours: 5 },
    { day: 'Sat', hours: 7 },
    { day: 'Sun', hours: 2 }
  ];

  const courseDistribution = [
    { name: 'Web Development', value: 30, color: '#3b82f6' },
    { name: 'Database Systems', value: 25, color: '#10b981' },
    { name: 'Machine Learning', value: 20, color: '#f59e0b' },
    { name: 'Software Engineering', value: 25, color: '#ef4444' }
  ];

  const skills = [
    { name: 'Frontend Development', progress: 85, level: 'Advanced' },
    { name: 'Backend Development', progress: 70, level: 'Intermediate' },
    { name: 'Database Design', progress: 75, level: 'Intermediate' },
    { name: 'Machine Learning', progress: 60, level: 'Beginner' },
    { name: 'Software Testing', progress: 80, level: 'Advanced' },
    { name: 'Project Management', progress: 65, level: 'Intermediate' }
  ];

  const achievements = [
    {
      title: 'Web Development Master',
      description: 'Completed all web development courses with excellence',
      date: '2024-01-15',
      icon: Award,
      color: 'text-yellow-500'
    },
    {
      title: 'Database Expert',
      description: 'Achieved 95% score in database management final',
      date: '2024-01-10',
      icon: Target,
      color: 'text-blue-500'
    },
    {
      title: 'Consistent Learner',
      description: '30 days streak of daily learning activities',
      date: '2024-01-05',
      icon: Clock,
      color: 'text-green-500'
    }
  ];

  return (
    <div className="fade-in space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Progress Dashboard</h1>
        <div className="flex space-x-2">
          <select className="form-select w-auto">
            <option>Last 6 Months</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">76%</div>
            <div className="text-text-secondary text-sm">Overall Progress</div>
          </div>
        </Card>
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">18</div>
            <div className="text-text-secondary text-sm">Completed Courses</div>
          </div>
        </Card>
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">142</div>
            <div className="text-text-secondary text-sm">Study Hours</div>
          </div>
        </Card>
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-info">3.8</div>
            <div className="text-text-secondary text-sm">GPA</div>
          </div>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Skill Progress Over Time">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={skillProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="webDev" stroke="#3b82f6" strokeWidth={2} name="Web Dev" />
              <Line type="monotone" dataKey="database" stroke="#10b981" strokeWidth={2} name="Database" />
              <Line type="monotone" dataKey="ml" stroke="#f59e0b" strokeWidth={2} name="ML" />
              <Line type="monotone" dataKey="softEng" stroke="#ef4444" strokeWidth={2} name="Soft Eng" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Weekly Activity">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Skills and Course Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Skill Development">
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    skill.level === 'Advanced' ? 'bg-green-100 text-green-800' :
                    skill.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {skill.level}
                  </span>
                </div>
                <ProgressBar progress={skill.progress} />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Course Time Distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={courseDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {courseDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-text-secondary">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card title="Recent Achievements">
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
              <achievement.icon className={`${achievement.color} mt-1`} size={24} />
              <div className="flex-1">
                <h4 className="font-semibold">{achievement.title}</h4>
                <p className="text-text-secondary text-sm">{achievement.description}</p>
                <span className="text-xs text-text-muted">
                  {new Date(achievement.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudentProgress;
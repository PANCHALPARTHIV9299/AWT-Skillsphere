import { Calendar, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const StudentAssignments = () => {
  const assignments = [
    {
      id: 1,
      title: 'Web Development Final Project',
      course: 'Advanced Web Development',
      dueDate: '2024-02-15',
      status: 'pending',
      priority: 'high',
      description: 'Create a full-stack web application using React and Node.js',
      submittedDate: null,
      grade: null
    },
    {      
      id: 2,
      title: 'Database Design Assignment',
      course: 'Database Management Systems',
      dueDate: '2024-02-20',
      status: 'in-progress',
      priority: 'medium',
      description: 'Design and implement a normalized database schema',
      submittedDate: null,
      grade: null
    },
    {
      id: 3,
      title: 'ML Algorithm Implementation',
      course: 'Machine Learning Fundamentals',
      dueDate: '2024-02-25',
      status: 'not-started',
      priority: 'medium',
      description: 'Implement and compare three classification algorithms',
      submittedDate: null,
      grade: null
    },
    {
      id: 4,
      title: 'Software Requirements Document',
      course: 'Software Engineering Principles',
      dueDate: '2024-01-30',
      status: 'submitted',
      priority: 'high',
      description: 'Create comprehensive requirements documentation',
      submittedDate: '2024-01-28',
      grade: 'A-'
    },
    {
      id: 5,
      title: 'Code Review Exercise',
      course: 'Software Engineering Principles',
      dueDate: '2024-01-25',
      status: 'graded',
      priority: 'low',
      description: 'Review and provide feedback on peer code submissions',
      submittedDate: '2024-01-24',
      grade: 'B+'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'submitted':
      case 'graded':
        return <CheckCircle className="text-success" size={20} />;
      case 'pending':
        return <AlertCircle className="text-warning" size={20} />;
      case 'in-progress':
        return <Clock className="text-info" size={20} />;
      default:
        return <FileText className="text-text-muted" size={20} />;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pending': 'badge-warning',
      'in-progress': 'badge-info',
      'not-started': 'badge bg-zinc-100 text-gray-800',
      'submitted': 'badge-info',
      'graded': 'badge-success'
    };
    return badges[status] || 'badge';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-error';
      case 'medium':
        return 'border-l-4 border-warning';
      case 'low':
        return 'border-l-4 border-success';
      default:
        return '';
    }
  };

  const upcomingAssignments = assignments.filter(a => 
    ['pending', 'in-progress', 'not-started'].includes(a.status)
  );

  const completedAssignments = assignments.filter(a => 
    ['submitted', 'graded'].includes(a.status)
  );

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm">Filter</Button>
          <Button variant="ghost" size="sm">Sort by Due Date</Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">3</div>
            <div className="text-text-secondary text-sm">Pending</div>
          </div>
        </Card>
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-info">1</div>
            <div className="text-text-secondary text-sm">In Progress</div>
          </div>
        </Card>
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">2</div>
            <div className="text-text-secondary text-sm">Completed</div>
          </div>
        </Card>
        <Card variant="stat">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">B+</div>
            <div className="text-text-secondary text-sm">Avg Grade</div>
          </div>
        </Card>
      </div>

      {/* Upcoming Assignments */}
      <Card title="Upcoming Assignments" className="mb-6">
        <div className="space-y-4">
          {upcomingAssignments.map((assignment) => (
            <div key={assignment.id} className={`p-4 border rounded-lg ${getPriorityColor(assignment.priority)}`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(assignment.status)}
                  <div>
                    <h4 className="font-semibold">{assignment.title}</h4>
                    <p className="text-sm text-text-secondary">{assignment.course}</p>
                  </div>
                </div>
                <span className={`${getStatusBadge(assignment.status)} capitalize`}>
                  {assignment.status.replace('-', ' ')}
                </span>
              </div>
              
              <p className="text-sm text-text-secondary mb-3">{assignment.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <div className="flex items-center space-x-1">
                    <Calendar size={16} />
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm">View Details</Button>
                  {assignment.status !== 'submitted' && (
                    <Button variant="accent" size="sm">Submit</Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Completed Assignments */}
      <Card title="Completed Assignments">
        <div className="space-y-4">
          {completedAssignments.map((assignment) => (
            <div key={assignment.id} className="p-4 border rounded-lg bg-zinc-100/50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(assignment.status)}
                  <div>
                    <h4 className="font-semibold">{assignment.title}</h4>
                    <p className="text-sm text-text-secondary">{assignment.course}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {assignment.grade && (
                    <span className="bg-success text-white px-2 py-1 rounded text-sm font-medium">
                      {assignment.grade}
                    </span>
                  )}
                  <span className={`${getStatusBadge(assignment.status)} capitalize`}>
                    {assignment.status}
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm text-text-secondary">
                <span>Submitted: {assignment.submittedDate ? new Date(assignment.submittedDate).toLocaleDateString() : 'N/A'}</span>
                <Button variant="ghost" size="sm">View Feedback</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StudentAssignments;
import { Phone, Mail, Linkedin, ExternalLink } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const StudentMessages = () => {
  const teachers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Web Development Instructor',
      department: 'Computer Science',
      phone: '+1 (555) 123-4567',
      email: 'sarah.johnson@university.edu',
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      courses: ['Advanced React', 'Full Stack Development'],
      officeHours: 'Mon-Wed 2:00-4:00 PM',
      office: 'CS Building, Room 205'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      role: 'Database Systems Instructor',
      department: 'Computer Science',
      phone: '+1 (555) 123-4568',
      email: 'michael.chen@university.edu',
      linkedin: 'https://linkedin.com/in/michaelchen',
      courses: ['Database Design', 'SQL Advanced'],
      officeHours: 'Tue-Thu 1:00-3:00 PM',
      office: 'CS Building, Room 310'
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      role: 'Machine Learning Instructor',
      department: 'Computer Science',
      phone: '+1 (555) 123-4569',
      email: 'emily.watson@university.edu',
      linkedin: 'https://linkedin.com/in/emilywatson',
      courses: ['AI Fundamentals', 'Deep Learning'],
      officeHours: 'Mon-Fri 10:00-12:00 PM',
      office: 'CS Building, Room 415'
    },
    {
      id: 4,
      name: 'Prof. David Rodriguez',
      role: 'Software Engineering Instructor',
      department: 'Computer Science',
      phone: '+1 (555) 123-4570',
      email: 'david.rodriguez@university.edu',
      linkedin: 'https://linkedin.com/in/davidrodriguez',
      courses: ['Software Architecture', 'Agile Development'],
      officeHours: 'Wed-Fri 3:00-5:00 PM',
      office: 'CS Building, Room 120'
    }
  ];

  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold mb-6">Teacher Contact Information</h1>
      <p className="text-text-secondary mb-6">
        Connect with your instructors using their contact information below.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-lg">
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-text-primary">{teacher.name}</h3>
                <p className="text-primary font-medium">{teacher.role}</p>
                <p className="text-text-secondary text-sm">{teacher.department}</p>
                
                <div className="mt-4 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {teacher.courses.map((course, index) => (
                      <span key={index} className="badge badge-info text-xs">
                        {course}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-text-secondary">
                      <span className="font-medium w-20">Office:</span>
                      <span>{teacher.office}</span>
                    </div>
                    <div className="flex items-center text-text-secondary">
                      <span className="font-medium w-20">Hours:</span>
                      <span>{teacher.officeHours}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-text-muted" />
                    <a 
                      href={`tel:${teacher.phone}`}
                      className="text-primary hover:text-primary-hover transition-colors"
                    >
                      {teacher.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-text-muted" />
                    <a 
                      href={`mailto:${teacher.email}`}
                      className="text-primary hover:text-primary-hover transition-colors"
                    >
                      {teacher.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Linkedin size={16} className="text-text-muted" />
                    <a 
                      href={teacher.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-hover transition-colors flex items-center space-x-1"
                    >
                      <span>LinkedIn Profile</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => window.location.href = `mailto:${teacher.email}`}
                  >
                    Send Email
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => window.location.href = `tel:${teacher.phone}`}
                  >
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentMessages;
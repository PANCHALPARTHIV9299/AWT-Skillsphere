import { Phone, Mail, Linkedin, ExternalLink, MapPin, Clock } from 'lucide-react';
import Card from '../../components/Card';
import Button from '../../components/Button';

const TeacherStudents = () => {
  // Mock data for students with contact preferences
  const students = [
    {
      id: 1,
      name: 'John Smith',
      enrollNo: 'CS2024001',
      email: 'john.smith@student.edu',
      phone: '+1 (555) 987-6543',
      courses: ['Advanced React', 'Full Stack Development'],
      year: '3rd Year',
      gpa: '3.8',
      preferredContact: 'email',
      office: 'Student Center, Room 101',
      availability: 'Mon-Fri 9:00 AM - 5:00 PM'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      enrollNo: 'CS2024002',
      email: 'emma.johnson@student.edu',
      phone: '+1 (555) 987-6544',
      courses: ['Database Design'],
      year: '2nd Year',
      gpa: '3.9',
      preferredContact: 'phone',
      office: 'Student Center, Room 102',
      availability: 'Tue-Thu 10:00 AM - 3:00 PM'
    },
    {
      id: 3,
      name: 'Michael Brown',
      enrollNo: 'CS2024003',
      email: 'michael.brown@student.edu',
      phone: '+1 (555) 987-6545',
      courses: ['AI Fundamentals', 'Deep Learning'],
      year: '4th Year',
      gpa: '3.7',
      preferredContact: 'email',
      office: 'Student Center, Room 103',
      availability: 'Mon-Wed-Fri 1:00 PM - 4:00 PM'
    },
    {
      id: 4,
      name: 'Sarah Davis',
      enrollNo: 'CS2024004',
      email: 'sarah.davis@student.edu',
      phone: '+1 (555) 987-6546',
      courses: ['Software Architecture'],
      year: '3rd Year',
      gpa: '4.0',
      preferredContact: 'phone',
      office: 'Student Center, Room 104',
      availability: 'Daily 8:00 AM - 12:00 PM'
    }
  ];

  return (
    <div className="fade-in">
      <h1 className="text-2xl font-bold mb-6">Student Contact Information</h1>
      <p className="text-text-secondary mb-6">
        Connect with your students using their preferred contact methods.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {students.map((student) => (
          <Card key={student.id} className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-text-primary">{student.name}</h3>
                <p className="text-primary font-medium">{student.enrollNo}</p>
                <p className="text-text-secondary text-sm">{student.year} • GPA: {student.gpa}</p>
                
                <div className="mt-4 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {student.courses.map((course, index) => (
                      <span key={index} className="badge badge-success text-xs">
                        {course}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-text-secondary">
                      <MapPin size={14} className="mr-2" />
                      <span>{student.office}</span>
                    </div>
                    <div className="flex items-center text-text-secondary">
                      <Clock size={14} className="mr-2" />
                      <span>{student.availability}</span>
                    </div>
                    <div className="flex items-center text-text-secondary">
                      <span className="font-medium">Preferred Contact:</span>
                      <span className="ml-2 capitalize">{student.preferredContact}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone size={16} className="text-text-muted" />
                    <a 
                      href={`tel:${student.phone}`}
                      className="text-primary hover:text-primary-hover transition-colors"
                    >
                      {student.phone}
                    </a>
                    {student.preferredContact === 'phone' && (
                      <span className="badge bg-success text-white text-xs">Preferred</span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Mail size={16} className="text-text-muted" />
                    <a 
                      href={`mailto:${student.email}`}
                      className="text-primary hover:text-primary-hover transition-colors"
                    >
                      {student.email}
                    </a>
                    {student.preferredContact === 'email' && (
                      <span className="badge bg-success text-white text-xs">Preferred</span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => window.location.href = `mailto:${student.email}?subject=Regarding ${student.courses[0]}`}
                  >
                    Send Email
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => window.location.href = `tel:${student.phone}`}
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

export default TeacherStudents;
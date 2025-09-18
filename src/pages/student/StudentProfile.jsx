import { useState } from 'react';
import { Edit2, Save, X } from 'lucide-react';
import Button from '../../components/Button';
import Card from '../../components/Card';
import FormInput from '../../components/FormInput';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    enrollNo: 'STU2024001',
    phone: '+1 (555) 123-4567',
    gender: 'Male',
    dateOfBirth: '1998-05-15',
    role: 'Student'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false);
  };

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        {!isEditing ? (
          <Button
            variant="secondary"
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2"
          >
            <Edit2 size={16} />
            <span>Edit Profile</span>
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="accent"
              onClick={handleSave}
              className="flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Save</span>
            </Button>
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="flex items-center space-x-2"
            >
              <X size={16} />
              <span>Cancel</span>
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Personal Information">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <FormInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <FormInput
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <FormInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>

            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                label="Phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
              <FormInput
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </Card>

        <Card title="Academic Information">
          <div className="space-y-4">
            <FormInput
              label="Enrollment Number"
              name="enrollNo"
              value={formData.enrollNo}
              disabled={true}
            />
            
            <FormInput
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={!isEditing}
            />

            <FormInput
              label="Role"
              name="role"
              value={formData.role}
              disabled={true}
            />

            <div className="mt-6 p-4 bg-zinc-100 rounded-lg">
              <h4 className="font-semibold mb-2">Academic Status</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">Program:</span>
                  <p className="font-medium">Computer Science</p>
                </div>
                <div>
                  <span className="text-text-secondary">Year:</span>
                  <p className="font-medium">3rd Year</p>
                </div>
                <div>
                  <span className="text-text-secondary">GPA:</span>
                  <p className="font-medium">3.8/4.0</p>
                </div>
                <div>
                  <span className="text-text-secondary">Credits:</span>
                  <p className="font-medium">98/120</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StudentProfile;
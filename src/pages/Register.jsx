import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    enrollNo: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    college: '',
    userType: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ];

  const collegeOptions = [
    { value: 'stanford', label: 'Stanford University' },
    { value: 'mit', label: 'MIT - Massachusetts Institute of Technology' },
    { value: 'harvard', label: 'Harvard University' },
    { value: 'berkeley', label: 'UC Berkeley' },
    { value: 'oxford', label: 'Oxford University' },
    { value: 'cambridge', label: 'Cambridge University' }
  ];

  const userTypeOptions = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' },
    { value: 'admin', label: 'Administrator' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.enrollNo) newErrors.enrollNo = 'Enrollment number is required';
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.college) newErrors.college = 'College selection is required';
    if (!formData.userType) newErrors.userType = 'User type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 2000);
  };

  return (
    <div className="page-container py-12">
      <div className="max-w-2xl mx-auto">
        <div className="form-container fade-in">
          <div className="text-center mb-8">
            <UserPlus className="text-primary mx-auto mb-4" size={48} />
            <h1 className="text-2xl font-bold mb-2">Create Account</h1>
            <p className="text-text-secondary">Join SkillSphere and start your learning journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormInput
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                placeholder="Enter first name"
                required
              />
              
              <FormInput
                label="Middle Name"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                placeholder="Enter middle name"
              />
              
              <FormInput
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                placeholder="Enter last name"
                required
              />
            </div>

            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="Enter your email"
              required
            />

            <FormInput
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              placeholder="Create a password"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Enrollment Number"
                name="enrollNo"
                value={formData.enrollNo}
                onChange={handleInputChange}
                error={errors.enrollNo}
                placeholder="Enter enrollment number"
                required
              />

              <FormInput
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={errors.phone}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Gender"
                type="select"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                error={errors.gender}
                options={genderOptions}
                required
              />

              <FormInput
                label="Date of Birth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                error={errors.dateOfBirth}
                required
              />
            </div>

            <FormInput
              label="Select College/University"
              type="select"
              name="college"
              value={formData.college}
              onChange={handleInputChange}
              error={errors.college}
              options={collegeOptions}
              required
            />

            <FormInput
              label="I am a"
              type="select"
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              error={errors.userType}
              options={userTypeOptions}
              required
            />

            <Button 
              type="submit" 
              className="w-full" 
              loading={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link to="/" className="text-text-muted hover:text-primary transition-colors text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
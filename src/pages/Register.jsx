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
    if (!formData.userType) newErrors.userType = 'User type is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Save user to localStorage
    setTimeout(() => {
      setLoading(false);
      // Get existing users
      const users = localStorage.getItem('registeredUsers');
      const registeredUsers = users ? JSON.parse(users) : [];
      // Add new user
      registeredUsers.push({
        email: formData.email,
        password: formData.password,
        role: formData.userType,
        name: `${formData.firstName} ${formData.middleName} ${formData.lastName}`.trim(),
        enrollNo: formData.enrollNo,
        phone: formData.phone,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth
      });
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      navigate('/login');
    }, 1000);
  };

return (
  <div className="page-container py-12">
    <div className="w-full mx-auto px-4" style={{ maxWidth: '1450px' }}> {/* Significantly increased from 1320px to 1450px - much more noticeable difference */}
      <div className="form-container fade-in border-bg-card border border-border shadow-lg p-14 rounded-xl w-full" style={{ minHeight: '540px' }}> {/* Also increased padding from p-12 to p-14 and height */}
        <div className="text-center mb-9"> {/* Slightly increased margin */}
          <UserPlus className="text-primary mx-auto mb-4" size={50} /> {/* Slightly larger icon */}
          <h1 className="text-3xl font-bold mb-3">Create Account</h1> 
          <p className="text-text-secondary text-lg"> 
            Join SkillSphere and start your learning journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7"> {/* Slightly more spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7"> {/* Slightly increased gap */}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7"> {/* Slightly increased gap */}
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
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7"> {/* Slightly increased gap */}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7"> {/* Slightly increased gap */}
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

          <div className="max-w-md mx-auto"> {/* Back to medium width for user type */}
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
          </div>

          <Button type="submit" className="w-full py-4 bg-blue-600 text-white hover:bg-blue-700" loading={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-8 text-center"> {/* Increased margin from mt-6 to mt-8 */}
          <p className="text-text-secondary">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-text-muted hover:text-primary transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  </div>
);
};

export default Register;
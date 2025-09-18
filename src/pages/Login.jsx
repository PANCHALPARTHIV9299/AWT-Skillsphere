import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import { useCollege } from '../contexts/CollegeContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    college: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser, colleges } = useCollege();

  const collegeOptions = [
    { value: 'stanford', label: 'Stanford University' },
    { value: 'mit', label: 'MIT - Massachusetts Institute of Technology' },
    { value: 'harvard', label: 'Harvard University' },
    { value: 'berkeley', label: 'UC Berkeley' },
    { value: 'oxford', label: 'Oxford University' },
    { value: 'cambridge', label: 'Cambridge University' }
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

    if (!formData.college) {
      newErrors.college = 'College selection is required';
    }

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
      
      // Find selected college
      const selectedCollege = colleges.find(c => c.id === formData.college);
      
      // Determine user role and set current user
      const email = formData.email.toLowerCase();
      let role = 'student';
      
      if (email.includes('teacher')) {
        role = 'teacher';
      } else if (email.includes('admin') || email.includes('coordinator')) {
        role = 'admin';
      }
      
      if (selectedCollege) {
        setCurrentUser({
          id: '1',
          name: email.split('@')[0].replace(/[0-9]/g, '').replace(/\./g, ' '),
          email: formData.email,
          role,
          college: selectedCollege
        });
      }
      
      // Role-based routing
      if (role === 'student') {
        navigate('/student');
      } else if (role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/coordinator');
      }
    }, 1500);
  };

  return (
    <div className="page-container flex items-center justify-center py-12">
      <div className="form-container fade-in">
        <div className="text-center mb-8">
          <LogIn className="text-primary mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-text-secondary">Sign in to your SkillSphere account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Enter your password"
            required
          />

          <Button 
            type="submit" 
            className="w-full" 
            loading={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-secondary">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-text-muted hover:text-primary transition-colors text-sm">
            ← Back to Home
          </Link>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-zinc-100 rounded-lg border">
          <h4 className="font-medium mb-2 text-sm">Demo Credentials by College:</h4>
          <div className="text-xs text-text-secondary space-y-2">
            <div>
              <p className="font-medium text-primary">Stanford University:</p>
              <p><strong>Student:</strong> student@stanford.edu / password</p>
              <p><strong>Teacher:</strong> teacher@stanford.edu / password</p>
              <p><strong>Admin:</strong> admin@stanford.edu / password</p>
            </div>
            <div>
              <p className="font-medium text-primary">MIT:</p>
              <p><strong>Student:</strong> student@mit.edu / password</p>
              <p><strong>Teacher:</strong> teacher@mit.edu / password</p>
              <p><strong>Admin:</strong> admin@mit.edu / password</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
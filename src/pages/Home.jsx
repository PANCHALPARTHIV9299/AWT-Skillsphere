import { Link } from 'react-router-dom';
import { GraduationCap, Users, BookOpen, TrendingUp, Star, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Card from '../components/Card';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engage with dynamic courses designed for modern education",
      delay: "0s"
    },
    {
      icon: Users,
      title: "Collaborative Environment",
      description: "Connect with peers and instructors in real-time",
      delay: "0.2s"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics",
      delay: "0.4s"
    },
    {
      icon: Award,
      title: "Achievements",
      description: "Earn certificates and badges for your accomplishments",
      delay: "0.6s"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Students", icon: Users },
    { number: "500+", label: "Expert Teachers", icon: GraduationCap },
    { number: "1,000+", label: "Courses Available", icon: BookOpen },
    { number: "95%", label: "Success Rate", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-zinc-100">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animated-bg opacity-20"></div>
        <div className="absolute inset-0 hero-pattern"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-primary/20 rounded-full floating-element hidden lg:block"></div>
        <div className="absolute top-40 right-32 w-16 h-16 bg-accent/20 rounded-full floating-element hidden lg:block" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-primary/30 rounded-full floating-element hidden lg:block" style={{animationDelay: '4s'}}></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="bounce-in">
            <GraduationCap className="mx-auto h-20 w-20 text-primary mb-8 glow-effect" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6 text-balance">
              Welcome to <span className="text-primary">SkillSphere</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto text-balance">
              Revolutionizing education through innovative technology and personalized learning experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/register">
                <Button className="btn-primary text-lg px-8 py-4 glow-effect hover:scale-105 transition-all duration-500 ease-out">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="text-lg px-8 py-4 hover:scale-105 transition-all duration-500 ease-out">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Why Choose SkillSphere?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Experience the future of education with our cutting-edge platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="gradient-card text-center hover:scale-105 transition-all duration-700 ease-out"
                style={{animationDelay: feature.delay}}
              >
                <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-lg text-text-secondary">
              Join our growing community of learners and educators
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                variant="stat"
                className="text-center floating-card bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:scale-105 transition-all duration-600 ease-out"
                style={{animationDelay: `${index * 0.3}s`}}
              >
                <div>
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl md:text-3xl font-bold text-text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {stat.label}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-6 glow-effect" />
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
            Join SkillSphere today and unlock your potential with personalized learning experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="btn-primary text-lg px-8 py-4 glow-effect hover:scale-105 transition-all duration-500 ease-out">
                Start Learning Now
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-lg px-8 py-4 hover:scale-105 transition-all duration-500 ease-out">
                I'm Already a Member
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
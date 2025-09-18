import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="page-container flex items-center justify-center">
      <div className="text-center fade-in">
        <AlertCircle className="text-error mx-auto mb-6" size={80} />
        
        <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-text-secondary mb-8 max-w-md mx-auto">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="flex items-center space-x-2">
              <Home size={20} />
              <span>Go Home</span>
            </Button>
          </Link>
          
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="flex items-center space-x-2"
          >
            <span>Go Back</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
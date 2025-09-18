import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

// The CollegeContext is created without TypeScript generics.
const CollegeContext = createContext(undefined);

// The 'colleges' array is a standard JavaScript array of objects.
const colleges = [
  { id: 'stanford', name: 'Stanford University', code: 'STAN', theme: 'cardinal' },
  { id: 'mit', name: 'MIT - Massachusetts Institute of Technology', code: 'MIT', theme: 'tech' },
  { id: 'harvard', name: 'Harvard University', code: 'HARV', theme: 'crimson' },
  { id: 'berkeley', name: 'UC Berkeley', code: 'UCB', theme: 'blue' },
  { id: 'oxford', name: 'Oxford University', code: 'OXF', theme: 'navy' },
  { id: 'cambridge', name: 'Cambridge University', code: 'CAM', theme: 'light-blue' }
];

export const CollegeProvider = ({ children }) => {
  // Type annotations for the state hook are removed.
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <CollegeContext.Provider value={{ currentUser, setCurrentUser, colleges }}>
      {children}
    </CollegeContext.Provider>
  );
};

// PropTypes are added for runtime type checking, replacing the TypeScript interface.
CollegeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCollege = () => {
  const context = useContext(CollegeContext);
  if (context === undefined) {
    throw new Error('useCollege must be used within a CollegeProvider');
  }
  return context;
};
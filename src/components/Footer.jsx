import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-border py-8 mt-12">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-primary mb-4">SkillSphere</h3>
            <p className="text-text-secondary">
              Empowering students and educators through innovative skill development and learning management.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-text-secondary">
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-text-secondary">
              <p>Email: info@skillsphere.edu</p>
              <p>Phone: +1 (555) 123-4567</p>
              <p>Address: 123 Education St, Learning City</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-6 text-center text-text-secondary">
          <p>&copy; 2024 SkillSphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
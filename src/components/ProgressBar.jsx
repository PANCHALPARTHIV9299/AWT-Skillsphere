import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ progress, className, showPercentage }) => {
  // Ensure progress is clamped between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-2">
        {showPercentage && (
          <span className="text-sm text-text-secondary">{clampedProgress}%</span>
        )}
      </div>
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
};

// PropTypes for type-checking in JavaScript
ProgressBar.propTypes = {
  /**
   * The current progress value (0-100).
   */
  progress: PropTypes.number.isRequired,
  /**
   * Additional CSS classes for the container.
   */
  className: PropTypes.string,
  /**
   * Whether to display the percentage text.
   */
  showPercentage: PropTypes.bool,
};

// Default props for the component
ProgressBar.defaultProps = {
  className: '',
  showPercentage: true,
};

export default ProgressBar;
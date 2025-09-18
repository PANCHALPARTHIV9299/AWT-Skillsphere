import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const FormInput = forwardRef(
  ({ label, error, type, options, className, ...props }, ref) => {
    const inputId = `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="form-group">
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
        
        {type === 'select' && options ? (
          <select
            id={inputId}
            className={`form-select ${error ? 'border-error' : ''} ${className}`}
            ref={ref}
            {...props}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            type={type}
            className={`form-input ${error ? 'border-error' : ''} ${className}`}
            ref={ref}
            {...props}
          />
        )}
        
        {error && <div className="form-error">{error}</div>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'tel', 'date', 'select']),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  className: PropTypes.string,
};

FormInput.defaultProps = {
  error: null,
  type: 'text',
  options: [],
  className: '',
};

export default FormInput;
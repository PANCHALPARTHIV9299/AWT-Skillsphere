import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ children, className, title, variant, ...props }) => {
  const cardClass = variant === 'stat' ? 'stat-card' : 'card';

  return (
    <div className={`${cardClass} ${className}`} {...props}>
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

// PropTypes for type-checking
Card.propTypes = {
  /**
   * The content to be displayed inside the card.
   */
  children: PropTypes.node.isRequired,
  /**
   * Additional CSS classes to apply to the card.
   */
  className: PropTypes.string,
  /**
   * An optional title for the card.
   */
  title: PropTypes.string,
  /**
   * The visual style of the card.
   */
  variant: PropTypes.oneOf(['default', 'stat']),
};

// Default props for the component
Card.defaultProps = {
  className: '',
  title: null,
  variant: 'default',
};

export default Card;
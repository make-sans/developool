import React from 'react';
import propTypes from 'prop-types';

const ProfileLink = ({ iconName, name, value }) => {
  return (
    <div className="profile-field-group">
      <div className="d-inline-flex align-items-center">
        <i className={`fab fa-2x ${iconName}`} />
        <a
          href={value}
          className="px-2 m-0"
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      </div>
    </div>
  );
};

// require all properties
ProfileLink.propTypes = {
  iconName: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.string.isRequired
};

export default ProfileLink;

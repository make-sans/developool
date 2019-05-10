import React from 'react';
import propTypes from 'prop-types';

const ProfileLink = ({ iconName, name, value }) => {
  return (
    <div className="profile-field-group">
      <div className="d-inline-flex flex-column align-items-center">
        <a
          href={value}
          className="px-2 m-0"
          target="_blank"
          rel="noopener noreferrer"
          title={value}
        >
          <i className={`fab ${iconName}`} />
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

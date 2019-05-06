import React from "react";
import propTypes from 'prop-types';

const ProfileLink = ({ iconName, name, value }) => {
    return (
        <div className="profile-field-group">
            <div className="d-inline-flex align-items-center">
                <i className={`fab fa-2x ${iconName}`}></i>
                <h4 className="px-2 m-0"> {name} </h4>
                <a href={value} target="_blank" rel="noopener noreferrer">{value}</a>
            </div>
        </div>
    );
}

// require all properties
ProfileLink.propTypes = {
    iconName: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
};

export default ProfileLink;
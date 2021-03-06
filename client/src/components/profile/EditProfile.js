import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, editProfile } from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import ProfileFields from './ProfileFields/ProfileFields';
import { Link } from 'react-router-dom';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      interests: [],
      skills: [],
      education: [],
      pastExperience: [],
      projects: [],
      github: '',
      facebook: '',
      linkedin: '',
      twitter: '',
      instagram: ''
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onEditProfileSubmit = (e, state) => {
    e.preventDefault();
    // setup the edits
    const editedProfile = {
      firstName: state.firstName,
      lastName: state.lastName,
      interests: state.interests,
      skills: state.skills,
      education: state.education,
      pastExperience: state.pastExperience,
      projects: state.projects,
      github: state.github,
      facebook: state.facebook,
      linkedin: state.linkedin,
      twitter: state.twitter,
      instagram: state.instagram
    };
    this.props.editProfile(editedProfile, this.props.history);
  };
  render() {
    const { profile, loading } = this.props.profile;

    let profileContent;
    if (loading) {
      profileContent = <Spinner />;
    } else {
      if (!profile) {
        profileContent = (
          <div className="text-center mt-4">
            <h1 className="display-4 mb-3">
              You dont have a profile. Create one!
            </h1>
            <Link className="btn btn-primary" to="/create-profile">
              Create your profile
            </Link>
          </div>
        );
      } else {
        profileContent = (
          <React.Fragment>
            <h1 className="display-4 text-center">Edit your profile</h1>
            <p className="lead text-center" />
            <ProfileFields
              profile={profile}
              cancelRoute="/my-profile"
              onSubmit={this.onEditProfileSubmit}
            />
          </React.Fragment>
        );
      }
    }

    return (
      <div className="edit-profile p-3">
        <div className="row justify-content-center">
          <div className="col-md-8">{profileContent}</div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, editProfile }
)(EditProfile);

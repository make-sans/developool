import React, { Component } from 'react';
import ProfileFields from './ProfileFields/ProfileFields';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileById, createProfile } from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';

class CreateProfile extends Component {
  componentDidMount() {
    this.props.getProfileById(this.props.auth.user.id);
  }
  onSubmit = (e, state) => {
    e.preventDefault();
    const profileData = {
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
    this.props.createProfile(profileData, this.props.history);
  };
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (loading) {
      profileContent = <Spinner />;
    } else {
      if (!profile) {
        profileContent = (
          <React.Fragment>
            <h1 className="display-4 text-center">Create your profile</h1>
            <ProfileFields onSubmit={this.onSubmit} />;
          </React.Fragment>
        );
      } else {
        profileContent = (
          <div className="text-center mt-4">
            <h2 className="light">You already have a profile</h2>
            <p>If you want to update it, click on the button below</p>
            <Link to="edit-profile" className="btn btn-primary">
              Edit profile
            </Link>
          </div>
        );
      }
    }
    return (
      <div className="create-profile p-3">
        <div className="row justify-content-center">
          <div className="col-md-8">{profileContent}</div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getProfileById, createProfile }
)(CreateProfile);

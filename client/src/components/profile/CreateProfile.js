import React, { Component } from 'react';
import ProfileFields from './ProfileFields/ProfileFields';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileById, createProfile } from '../../actions/profileAction';
import Spinner from '../common/Spinner';

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
    console.log(profileData);
    this.props.createProfile(profileData, this.props.history);
  };
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (loading) {
      profileContent = <Spinner />;
    } else {
      if (!profile) {
        profileContent = <ProfileFields onSubmit={this.onSubmit} />;
      } else {
        console.log(profile);
        profileContent = <h2>You already have a profile</h2>;
      }
    }
    return (
      <div className="create-profile">
        <div className="row">
          <div className="col">
            <h1 className="display-4 text-center">Create your profile</h1>
            <p className="lead text-center" />
            {profileContent}
          </div>
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

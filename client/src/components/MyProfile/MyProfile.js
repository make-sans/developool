import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profileAction';
import { Link } from 'react-router-dom';
import ProfileData from '../profile/ProfileData/ProfileData';

class MyProfile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
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
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-2">
                <ProfileData profile={profile} />
                <Link
                  to="/edit-profile"
                  className="btn btn-primary mt-3 float-right"
                >
                  Edit your profile
                </Link>
              </div>
            </div>
          </div>
        );
      }
    }
    return <div className="profile">{profileContent}</div>;
  }
}
MyProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(MyProfile);

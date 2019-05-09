import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profileAction';
import ProfileData from '../profile/ProfileData/ProfileData';

class Profile extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (id === this.props.auth.user.id) {
      this.props.history.push('/my-profile');
    } else {
      this.props.getProfileById(id);
    }
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
            <h1 className="display-4 mb-3 text-muted">Profile not found</h1>
          </div>
        );
      } else {
        profileContent = (
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-2">
                <ProfileData profile={profile} />
              </div>
            </div>
          </div>
        );
      }
    }
    return <div className="profile">{profileContent}</div>;
  }
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);

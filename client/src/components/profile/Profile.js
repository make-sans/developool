import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import { connect } from 'react-redux'
import { getCurrentProfile, getProfileById } from '../../actions/profileAction'
import { Link } from 'react-router-dom';

class Profile extends Component {

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) {
      console.log('by id')
      this.props.getProfileById(id)
    }
    else {
      console.log('current');
      this.props.getProfileById(this.props.auth.user.id)
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;
    if (loading) {
      console.log('loading')
      profileContent = <Spinner />
    }
    else {
      if (!profile) {
        profileContent = (
          <div>
            <h1>You dont have a profile. Create one!</h1>
            <Link to='/create-profile'>Create your profile</Link>
          </div>
        )
      }
      else {
        profileContent = <p>Profile is loaded, will display it soon</p>
      }
    }
    return (
      <div>
        Profile page
        {profileContent}
      </div>
    )
  }
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors,
  auth: state.auth
})
export default connect(mapStateToProps, { getCurrentProfile, getProfileById })(Profile)
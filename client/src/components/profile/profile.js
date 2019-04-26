import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile, getProfileById } from '../../actions/profileAction'

class Profile extends Component {

  componentDidMount() {
    const { id } = this.props.match.params
    if (id) {
      console.log('by id')
      //this.props.getProfileById(id)
    }
    else {
      console.log('current');
      //this.props.getCurrentProfile()
    }
  }
  render() {
    return (
      <div>
        Profile page
      </div>
    )
  }
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  getProfileById: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})
export default connect(mapStateToProps, { getCurrentProfile, getProfileById })(Profile)
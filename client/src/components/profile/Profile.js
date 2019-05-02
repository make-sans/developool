import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../common/Spinner'
import { connect } from 'react-redux'
import { getCurrentProfile, getProfileById } from '../../actions/profileAction'
import { Link } from 'react-router-dom';
import InterestSkillList from '../project/InterestSkillList'

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
        profileContent =
          <div>
            <Link to='/edit-profile'>Edit your profile</Link>

            <p>{profile.firstName}</p>
            <p>{profile.lastName}</p>
            <p>Skills</p>
            <InterestSkillList
              list={profile.skills}
              customStyle={'skill-list-item'}
            />
            <p>Interests</p>
            <InterestSkillList
              list={profile.interests}
              customStyle={'interest-list-item'}
            />
            <p>Education</p>
            <table className='table'>
                        <thead>
                            <tr>
                                <th>Institute name</th>
                                <th>Degree</th>
                                <th>Field of study</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {profile.education.map((edu, i) => (
                                <tr key={i}>
                                    <td>{edu.instituteName}</td>
                                    <td>{edu.degree}</td>
                                    <td>{edu.fieldOfStudy}</td>
                                    <td>{edu.fromDate}</td>
                                    <td>{edu.endDate}</td>
                                    <td>{edu.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            <p>Experience</p>
            <table className='table'>
              <thead>
                <tr>
                  <th>Company name</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {profile.pastExperience.map((exp, i) => (
                  <tr key={i}>
                    <td>{exp.company}</td>
                    <td>{exp.title}</td>
                    <td>{exp.location}</td>
                    <td>{exp.fromDate}</td>
                    <td>{exp.endDate}</td>
                    <td>{exp.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>Github</p>
            <p>{profile.github}</p>
            <p>Facebook</p>
            <p>{profile.facebook}</p>
            <p>Linkedin</p>
            <p>{profile.linkedin}</p>
            <p>Twitter</p>
            <p>{profile.twitter}</p>
            <p>Instagram</p>
            <p>{profile.instagram}</p>
          </div>
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
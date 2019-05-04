import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { connect } from 'react-redux';
import { getCurrentProfile, getProfileById } from '../../actions/profileAction';
import { Link } from 'react-router-dom';
import InterestSkillList from '../project/InterestSkillList';
import ProfileLink from '../common/ProfileLink';

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
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-2">
                <h1 className="display-4 text-center">{profile.firstName} {profile.lastName}</h1>
                <Link to='/edit-profile' className="btn btn-primary align-self-center">Edit your profile</Link>

                <div className="profile-field-group">
                  <h3 className="font-weight-light">Skills</h3>
                  {profile.skills.length > 0 ? (<InterestSkillList
                    list={profile.skills}
                    customStyle={'skill-list-item'}
                  />) : (
                      <p className="text-muted">No skills added</p>
                    )}

                </div>

                <div className="profile-field-group">
                  <h3 className="font-weight-light">Interests</h3>
                  {profile.interests.length > 0 ? (<InterestSkillList
                    list={profile.interests}
                    customStyle={'interest-list-item'}
                  />) : (
                      <p className="text-muted">No interests added</p>
                    )}

                </div>
                <div className="profile-field-group">
                  <h3 className="font-weight-light">Education</h3>
                  {profile.education.length > 0 ? (<table className='table'>
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
                  </table>) : (
                      <p className="text-muted">No education added</p>
                    )}

                </div>

                <div className="profile-field-group">
                  <h3 className="font-weight-light">Experience</h3>
                  {profile.pastExperience.length > 0 ? (
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
                  ) : (
                      <p className="text-muted">No past experience added</p>
                    )}

                </div>

                {/* Profile links */}
                <ProfileLink name="Github" iconName="fa-github" value={profile.github || "None"} />
                <ProfileLink name="Facebook" iconName="fa-facebook-square" value={profile.facebook || "None"} />
                <ProfileLink name="LinkedIn" iconName="fa-linkedin" value={profile.linkedin || "None"} />
                <ProfileLink name="Twitter" iconName="fa-twitter-square" value={profile.twitter || "None"} />
                <ProfileLink name="Instagram" iconName="fa-instagram" value={profile.instagram || "None"} />
              </div>
            </div>

          </div>
      }
    }
    return (
      <div>
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
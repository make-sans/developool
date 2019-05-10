import React from 'react';
import InterestSkillList from '../../project/InterestSkillList';
import ProfileLink from '../../common/ProfileLink';
import Moment from 'react-moment';

export default function ProfileData(props) {
  const { profile } = props;
  return (
    <React.Fragment>
      <h1 className="display-4 text-center">
        {profile.firstName} {profile.lastName}
      </h1>
      <div className="row justify-content-center mb-4">
        {profile.github && (
          <div className="col-auto p-1">
            <ProfileLink
              name="Github"
              iconName="fa-github"
              value={profile.github}
            />
          </div>
        )}

        {profile.facebook && (
          <div className="col-auto p-1">
            <ProfileLink
              name="Facebook"
              iconName="fa-facebook-square"
              value={profile.facebook}
            />
          </div>
        )}
        {profile.linkedin && (
          <div className="col-auto p-1">
            <ProfileLink
              name="LinkedIn"
              iconName="fa-linkedin"
              value={profile.linkedin}
            />
          </div>
        )}
        {profile.twitter && (
          <div className="col-auto p-1">
            <ProfileLink
              name="Twitter"
              iconName="fa-twitter-square"
              value={profile.twitter}
            />
          </div>
        )}
        {profile.instagram && (
          <div className="col-auto p-1">
            <ProfileLink
              name="Instagram"
              iconName="fa-instagram"
              value={profile.instagram}
            />
          </div>
        )}
      </div>
      <div className="profile-field-group mb-4">
        <h3 className="font-weight-light">Skills</h3>
        {profile.skills.length > 0 ? (
          <InterestSkillList
            list={profile.skills}
            customStyle={'skill-list-item'}
          />
        ) : (
          <p className="text-muted">No skills added</p>
        )}
      </div>

      <div className="profile-field-group mb-4">
        <h3 className="font-weight-light">Interests</h3>
        {profile.interests.length > 0 ? (
          <InterestSkillList
            list={profile.interests}
            customStyle={'interest-list-item'}
          />
        ) : (
          <p className="text-muted">No interests added</p>
        )}
      </div>
      <div className="profile-field-group mb-4">
        <h3 className="font-weight-light">Education</h3>
        {profile.education.length > 0 ? (
          <table className="table">
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
                  <td>
                    <Moment format="DD/MM/YYYY">{edu.fromDate}</Moment>
                  </td>
                  <td>
                    <Moment format="DD/MM/YYYY">{edu.endDate}</Moment>
                  </td>
                  <td>{edu.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No education added</p>
        )}
      </div>

      <div className="profile-field-group mb-4">
        <h3 className="font-weight-light">Experience</h3>
        {profile.pastExperience.length > 0 ? (
          <table className="table">
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
                  <td>
                    <Moment format="DD/MM/YYYY">{exp.fromDate}</Moment>
                  </td>
                  <td>
                    <Moment format="DD/MM/YYYY">{exp.endDate}</Moment>
                  </td>
                  <td>{exp.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No past experience added</p>
        )}
      </div>
    </React.Fragment>
  );
}

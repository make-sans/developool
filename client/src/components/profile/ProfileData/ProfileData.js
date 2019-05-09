import React from 'react';
import InterestSkillList from '../../project/InterestSkillList';
import ProfileLink from '../../common/ProfileLink';

export default function ProfileData(props) {
  const { profile } = props;
  return (
    <React.Fragment>
      <h1 className="display-4 text-center">
        {profile.firstName} {profile.lastName}
      </h1>

      <div className="profile-field-group">
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

      <div className="profile-field-group">
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
      <div className="profile-field-group">
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
                  <td>{edu.fromDate}</td>
                  <td>{edu.endDate}</td>
                  <td>{edu.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted">No education added</p>
        )}
      </div>

      <div className="profile-field-group">
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
      {profile.github && (
        <ProfileLink
          name="Github"
          iconName="fa-github"
          value={profile.github}
        />
      )}
      {profile.facebook && (
        <ProfileLink
          name="Facebook"
          iconName="fa-facebook-square"
          value={profile.facebook}
        />
      )}
      {profile.linkedin && (
        <ProfileLink
          name="LinkedIn"
          iconName="fa-linkedin"
          value={profile.linkedin}
        />
      )}
      {profile.twitter && (
        <ProfileLink
          name="Twitter"
          iconName="fa-twitter-square"
          value={profile.twitter}
        />
      )}
      {profile.instagram && (
        <ProfileLink
          name="Instagram"
          iconName="fa-instagram"
          value={profile.instagram}
        />
      )}
    </React.Fragment>
  );
}

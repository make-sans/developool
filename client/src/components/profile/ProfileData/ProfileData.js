import React from 'react';
import InterestSkillList from '../../project/InterestSkillList';
import ProfileLink from '../../common/ProfileLink';
import Education from './Education';
import Experience from './Experience';

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
        <div className="row">
          {profile.education.length > 0 ? (
            profile.education.map((edu, i) => (
              <div key={i} className="col-md-6 mb-3">
                <Education edu={edu} />
              </div>
            ))
          ) : (
            <div className="col">
              <p className="text-muted">No education added</p>
            </div>
          )}
        </div>
      </div>

      <div className="profile-field-group mb-4">
        <h3 className="font-weight-light">Experience</h3>
        <div className="row">
          {profile.pastExperience.length > 0 ? (
            profile.pastExperience.map((exp, i) => (
              <div key={i} className="col-md-6 mb-3">
                <Experience exp={exp} />
              </div>
            ))
          ) : (
            <div className="col">
              <p className="text-muted">No past experience added</p>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

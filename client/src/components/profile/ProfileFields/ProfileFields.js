import React, { Component } from 'react';
import TextFieldGroup from '../../common/TextFieldGroup';
import InputGroup from '../../common/InputGroup';
import SuggestInput from '../../common/SuggestInput';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { SKILLS } from '../../../constants/Skills';
import { INTERESTS } from '../../../constants/Interests';
import ExperienceFields from './ExperienceFields';
import EducationFields from './EducationFields';
import validateURL from '../../../utils/validation/validateURL';

class ProfileFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      interests: [],
      skills: [],
      education: [],
      pastExperience: [],
      projects: [],
      github: '',
      facebook: '',
      linkedin: '',
      twitter: '',
      instagram: '',
      errors: { educationInput: {}, experienceInput: {} }
    };
  }
  componentDidMount() {
    const { profile } = this.props;
    if (profile) {
      //profile supplied - its an update
      //set state to profile values
      this.setState({
        firstName: profile.firstName,
        lastName: profile.lastName,
        interests: profile.interests,
        skills: profile.skills,
        education: profile.education,
        pastExperience: profile.pastExperience,
        projects: profile.projects,
        github: profile.github,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        twitter: profile.twitter,
        instagram: profile.instagram
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSkillSelected = (e, res) => {
    if (this.state.skills.indexOf(res.suggestion) === -1) {
      this.setState({ skills: [...this.state.skills, res.suggestion] });
    }
  };
  onInterestSelected = (e, res) => {
    if (this.state.interests.indexOf(res.suggestion) === -1) {
      this.setState({ interests: [...this.state.interests, res.suggestion] });
    }
  };
  removeSkill = (e, i) => {
    this.setState({
      skills: this.state.skills.filter(skill => skill !== e.target.innerText)
    });
  };
  removeInterest = (e, i) => {
    this.setState({
      interests: this.state.interests.filter(
        interest => interest !== e.target.innerText
      )
    });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // Education
  addEducation = (e, education) => {
    this.setState({
      education: [...this.state.education, education]
    });
  };

  removeEducation = i => {
    this.setState({
      education: this.state.education.filter((edu, j) => i !== j)
    });
  };

  // Experience
  addExperience = (e, experience) => {
    this.setState({
      pastExperience: [...this.state.pastExperience, experience]
    });
  };

  removeExperience = i => {
    this.setState({
      pastExperience: this.state.pastExperience.filter((exp, j) => i !== j)
    });
  };
  onFormSubmit = e => {
    e.preventDefault();
    let errors = validateURL([
      { name: 'facebook', url: this.state.facebook },
      { name: 'linkedin', url: this.state.linkedin },
      { name: 'github', url: this.state.github },
      { name: 'instagram', url: this.state.instagram },
      { name: 'twitter', url: this.state.twitter }
    ]);
    if (this.state.firstName.length === 0) {
      errors.firstName = 'First name is required';
    }
    if (this.state.lastName.length === 0) {
      errors.lastName = 'Last name is required';
    }
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
    } else {
      this.props.onSubmit(e, this.state);
    }
  };

  render() {
    const { errors } = this.state;
    const skillList = this.state.skills.map(skill => (
      <li
        key={skill}
        className="skill-list-item hover"
        onClick={this.removeSkill}
      >
        {skill}
      </li>
    ));
    const interestList = this.state.interests.map(interest => (
      <li
        key={interest}
        className="interest-list-item hover"
        onClick={this.removeInterest}
      >
        {interest}
      </li>
    ));
    return (
      <form
        onSubmit={e => this.onFormSubmit(e)}
        onKeyPress={event => {
          if (event.which === 13) {
            event.preventDefault();
          }
        }}
      >
        <TextFieldGroup
          label="First name"
          placeholder="First name"
          name="firstName"
          type="text"
          value={this.state.firstName}
          onChange={this.onChange}
          error={errors.firstName}
        />
        <TextFieldGroup
          label="Last name"
          placeholder="Last name"
          name="lastName"
          type="text"
          value={this.state.lastName}
          onChange={this.onChange}
          error={errors.lastName}
        />
        <div className="form-group">
          <label>Skills</label>
          <SuggestInput
            suggestions={SKILLS}
            onSelected={this.onSkillSelected}
            placeholder={'What skills do you have?'}
          />
          {errors.skills && (
            <div className="invalid-feedback d-block">{errors.skills}</div>
          )}
        </div>
        <ul className="skill-interest-list">{skillList}</ul>
        <div className="form-group">
          <label>Interests</label>
          <SuggestInput
            suggestions={INTERESTS}
            onSelected={this.onInterestSelected}
            placeholder={'What are your interests?'}
          />
          {errors.interests && (
            <div className="invalid-feedback d-block">{errors.interests}</div>
          )}
        </div>
        <ul className="skill-interest-list">{interestList}</ul>

        <EducationFields
          profile={this.props.profile}
          addEducation={this.addEducation}
          removeEducation={this.removeEducation}
        />
        <ExperienceFields
          profile={this.props.profile}
          addExperience={this.addExperience}
          removeExperience={this.removeExperience}
        />

        <div className="social mt-5">
          <InputGroup
            placeholder="Github Profile URL"
            name="github"
            icon="fab fa-github"
            value={this.state.github}
            onChange={this.onChange}
            error={errors.github}
          />
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
        </div>

        <div className="form-row mt-3 justify-content-end">
          <div className="col-auto">
            <Link
              to={this.props.cancelRoute || '/'}
              className="btn btn-secondary"
            >
              Cancel
            </Link>
          </div>
          <div className="col-auto">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
        </div>
      </form>
    );
  }
}

ProfileFields.propTypes = {
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {}
)(ProfileFields);

import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SuggestInput from '../common/SuggestInput';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SKILLS = [
  'C#',
  'JavaScript',
  'React.js',
  'Node.js',
  'Kotlin',
  'HTML/CSS'
];
const INTERESTS = ['Movies', 'Music', 'Sports', 'Anime', 'Games'];

class ProjectFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      publicDescription: '',
      privateDescription: '',
      interests: [],
      skills: [],
      private: false,
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.project) {
      const { project } = this.props;
      console.log('proejct supplied');

      this.setState({
        title: project.title,
        publicDescription: project.publicDescription,
        privateDescription: project.privateDescription,
        interests: project.interests,
        skills: project.skills,
        private: project.private
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
      <form onSubmit={e => this.props.onSubmit(e, this.state)}>
        <TextFieldGroup
          label="Title"
          placeholder="Project title"
          name="title"
          type="text"
          value={this.state.title}
          onChange={this.onChange}
          error={errors.title || errors.msg}
        />
        <TextAreaFieldGroup
          label="Description"
          placeholder="Description"
          name="publicDescription"
          type="text"
          value={this.state.publicDescription}
          onChange={this.onChange}
          error={errors.publicDescription}
        />
        <TextAreaFieldGroup
          label="Private description"
          placeholder="Private description"
          name="privateDescription"
          type="text"
          value={this.state.privateDescription}
          onChange={this.onChange}
          error={errors.privateDescription}
          info="Only members of the project will see this"
        />

        <div className="form-group">
          <label>Skills</label>
          <SuggestInput
            suggestions={SKILLS}
            onSelected={this.onSkillSelected}
            placeholder={'What skills are needed for this project?'}
          />
          {errors.skills && <div className="invalid-feedback d-block">{errors.skills}</div>}

        </div>
        <ul className="skill-interest-list">{skillList}</ul>
        <div className="form-group">
          <label>Interests</label>

          <SuggestInput
            suggestions={INTERESTS}
            onSelected={this.onInterestSelected}
            placeholder={'What interests are suitable for this project?'}
          />
          {errors.interests && <div className="invalid-feedback d-block">{errors.interests}</div>}

        </div>
        <ul className="skill-interest-list">{interestList}</ul>

        <div className="custom-control custom-checkbox">
          <input
            onChange={e => {
              this.onChange({
                target: {
                  name: e.target.name,
                  value: e.target.checked
                }
              });
            }}
            className="custom-control-input"
            type="checkbox"
            id="private"
            name="private"
            checked={this.state.private}
          />
          <label className="custom-control-label" htmlFor="private">
            Make it private
          </label>
        </div>
        <div className="form-row mt-3 justify-content-end">
          <div className="col-auto">
            <Link to={this.props.cancelRoute} className="btn btn-secondary">
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

ProjectFields.propTypes = {
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(
  mapStateToProps,
  {}
)(ProjectFields);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SuggestInput from '../common/SuggestInput';
import { createProject } from '../../actions/projectActions';

//constant suggestions, will change later
const SKILLS = [
  'C#',
  'JavaScript',
  'React.js',
  'Node.js',
  'Kotlin',
  'HTML/CSS'
];
const INTERESTS = ['Movies', 'Music', 'Sports', 'Anime', 'Games'];

class CreateProject extends Component {
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
  onCreateProjectSubmit = e => {
    e.preventDefault();
    const newProject = {
      title: this.state.title,
      publicDescription: this.state.publicDescription,
      privateDescription: this.state.privateDescription,
      interests: this.state.interests,
      skills: this.state.skills,
      private: this.state.private
    };
    this.props.createProject(newProject);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
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
  render() {
    const { errors } = this.state;
    const skillList = this.state.skills.map(skill => (
      <li
        key={skill}
        className="skill-interest-list-item"
        onClick={this.removeSkill}
      >
        {skill}
      </li>
    ));
    const interestList = this.state.interests.map(interest => (
      <li
        key={interest}
        className="skill-interest-list-item"
        onClick={this.removeInterest}
      >
        {interest}
      </li>
    ));
    return (
      <div className="create-project">
        <div className="container">
          <div className="row align-items-center mt-5">
            <div className="col-md-7 m-auto">
              <h1 className="display-4 text-center">Create a project</h1>
              <p className="lead text-center" />
              <form onSubmit={this.onCreateProjectSubmit}>
                <TextFieldGroup
                  placeholder="Project title"
                  name="title"
                  type="text"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="publicDescription"
                  type="text"
                  value={this.state.publicDescription}
                  onChange={this.onChange}
                  error={errors.publicDescription}
                />
                <TextAreaFieldGroup
                  placeholder="Private description"
                  name="privateDescription"
                  type="text"
                  value={this.state.privateDescription}
                  onChange={this.onChange}
                  error={errors.privateDescription}
                  info="Only members of the project will see this"
                />

                <div className="form-group">
                  <SuggestInput
                    suggestions={SKILLS}
                    onSelected={this.onSkillSelected}
                    placeholder={'What skills are needed for this project?'}
                  />
                </div>
                <ul className="skill-interest-list">{skillList}</ul>
                <div className="form-group">
                  <SuggestInput
                    suggestions={INTERESTS}
                    onSelected={this.onInterestSelected}
                    placeholder={
                      'What interests are suitable for this project?'
                    }
                  />
                </div>
                <ul className="skill-interest-list">{interestList}</ul>

                <div className="form-check">
                  <input
                    onChange={e => {
                      this.onChange({
                        target: {
                          name: e.target.name,
                          value: e.target.checked
                        }
                      });
                    }}
                    className="form-check-input"
                    type="checkbox"
                    id="private"
                    name="private"
                    checked={this.state.private}
                  />
                  <label className="form-check-label" htmlFor="private">
                    Make it private
                  </label>
                </div>

                <input
                  type="submit"
                  value="Create project"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProject }
)(CreateProject);

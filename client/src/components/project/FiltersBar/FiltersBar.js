import React, { Component } from 'react';
import { INTERESTS } from '../../../constants/Interests';
import { SKILLS } from '../../../constants/Skills';
import SuggestInput from '../../common/SuggestInput';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../common/TextFieldGroup'
import { filterProjects } from '../../../actions/projectActions';

class FiltersBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      interests: [],
      skills: [],
      private: '',
      public: ''
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    },
      () => this.props.filterProjects(this.buildParams()));
  };
  buildParams = () => {
    let params = {
      interests: this.state.interests,
      skills: this.state.skills,
      title: this.state.title
    };
    if (this.state.private) {
      params.private = this.state.private
    }
    if (this.state.public) {
      params.public = this.state.public
    }
    console.log(params);
    return params;
  };

  onInterestSelected = (e, res) => {
    if (this.state.interests.indexOf(res.suggestion) === -1) {
      this.setState(
        { interests: [...this.state.interests, res.suggestion] },
        () => this.props.filterProjects(this.buildParams())
      );
    }
  };
  removeInterest = (e, i) => {
    this.setState(
      {
        interests: this.state.interests.filter(
          interest => interest !== e.target.innerText
        )
      },
      () => this.props.filterProjects(this.buildParams())
    );
  };
  onSkillSelected = (e, res) => {
    if (this.state.skills.indexOf(res.suggestion) === -1) {
      this.setState({ skills: [...this.state.skills, res.suggestion] },
        () => this.props.filterProjects(this.buildParams()));
    }
  };
  removeSkill = (e, i) => {
    this.setState({
      skills: this.state.skills.filter(skill => skill !== e.target.innerText)
    },
      () => this.props.filterProjects(this.buildParams()));
  };
  render() {
    const interestList = this.state.interests.map(interest => (
      <li
        key={interest}
        className="interest-list-item hover"
        onClick={this.removeInterest}
      >
        {interest}
      </li>
    ));
    const skillList = this.state.skills.map(skill => (
      <li
        key={skill}
        className="skill-list-item hover"
        onClick={this.removeSkill}
      >
        {skill}
      </li>
    ));
    return (
      <div className='container-fluid'>
        <div className='mb-4 border p-4 rounded'>
          <p>Filters</p>
          <TextFieldGroup
            placeholder="Search by title..."
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.onChange}
          />
          <SuggestInput
            suggestions={INTERESTS}
            onSelected={this.onInterestSelected}
            placeholder={'Filter by interests'}
          />
          <ul className="skill-interest-list my-2">{interestList}</ul>
          <SuggestInput
            suggestions={SKILLS}
            onSelected={this.onSkillSelected}
            placeholder={'Filter by skills'}
          />
          <ul className="skill-interest-list my-2">{skillList}</ul>
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

            />
            <label className="custom-control-label" htmlFor="private">
              Show private projects
          </label>
          </div>
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
              id="public"
              name="public"

            />
            <label className="custom-control-label" htmlFor="public">
              Show public projects
          </label>
          </div>
        </div>
      </div>
    );
  }
}

FiltersBar.propTypes = {
  filterProjects: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});
export default connect(
  mapStateToProps,
  { filterProjects }
)(FiltersBar);

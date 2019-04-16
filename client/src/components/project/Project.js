import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProject } from '../../actions/projectActions';
import Spinner from '../common/Spinner';

class Project extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  renderSkillList = skills => {
    return skills.length > 0 ? (
      skills.map(skill => (
        <li key={skill} className="skill-interest-list-item">
          {skill}
        </li>
      ))
    ) : (
      <p>No skills</p>
    );
  };
  renderInterestList = interests => {
    return interests.length > 0 ? (
      interests.map(interest => (
        <li key={interest} className="skill-interest-list-item">
          {interest}
        </li>
      ))
    ) : (
      <p>No interests</p>
    );
  };

  render() {
    const { project, loading } = this.props.projects;
    let projectContent;

    if (project === null) {
      //getProject returned error
      projectContent = <div>Project not found</div>;
    } else if (Object.keys(project).length > 0) {
      //everything fine
      projectContent = (
        <div className="col">
          <h2>{project.title}</h2>
          <p>{project.publicDescription}</p>
          <p>Skills</p>
          <ul className="skill-interest-list">
            {this.renderSkillList(project.skills)}
          </ul>
          <p>Interests</p>
          <ul className="skill-interest-list">
            {this.renderInterestList(project.interests)}
          </ul>
        </div>
      );
    }

    return (
      <div className="container project mt-4">
        {loading ? <Spinner /> : <div className="row">{projectContent}</div>}
      </div>
    );
  }
}
Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects
});
export default connect(
  mapStateToProps,
  { getProject }
)(Project);

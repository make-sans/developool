import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projectActions';
import Spinner from '../common/Spinner';
import InterestSkillList from './InterestSkillList';
import FiltersBar from './FiltersBar/FiltersBar';

export class ListProjects extends Component {
  // get the data as soon as component is initialzied
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    // get the properties
    const { loading } = this.props;
    const projects = this.props.projects.projects;
    console.dir(projects);
    let projectsList;
    if (loading) {
      projectsList = <Spinner />;
    }
    if (projects.length <= 0) {
      projectsList = <div>No projects currently available to join :(</div>;
    } else {
      // map projects to list of projects with markup
      projectsList = projects.map(project => (
        <div className="card mb-4 shadow-sm rounded" key={project._id}>
          <div className="card-body">
            <h3 className="card-title font-weight-lighter">{project.title}</h3>
            <p className="card-text">{project.publicDescription}</p>
            <InterestSkillList
              list={project.skills}
              customStyle={'skill-list-item'}
            />
            <InterestSkillList
              list={project.interests}
              customStyle={'interest-list-item'}
            />
            <Link to={'/project/' + project._id} className="btn btn-primary">
              Project page
            </Link>
          </div>
        </div>
      ));
    }
    return (
      <div className="project-list">
        <div className="container-fluid my-4">
        <FiltersBar/>
          <div className="card-columns">{projectsList}</div>
        </div>
      </div>
    );
  }
}

ListProjects.propTypes = {
  getProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  projects: state.projects
});
export default connect(
  mapStateToProps,
  { getProjects }
)(ListProjects);

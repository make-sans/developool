import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProjects } from '../../actions/projectActions';
import Spinner from '../common/Spinner';
import FiltersBar from './FiltersBar/FiltersBar';
import ProjectCard from './ProjectCard';

export class UserProjects extends Component {
  // get the data as soon as component is initialzied
  componentDidMount() {
    this.props.getUserProjects();
  }

  render() {
    // get the properties
    const { loading } = this.props.projects;
    const projects = this.props.projects.projects;
    let projectsList;

    if (projects.length <= 0) {
      projectsList = (
        <div className="col text-center mt-5">
          <h1 className="display-4 text-black-50">No projects found</h1>
        </div>
      );
    } else {
      // map projects to list of projects with markup
      projectsList = projects.map(project => (
        <ProjectCard key={project._id} project={project} />
      ));
    }
    return (
      <div className="project-list p-3">
        <FiltersBar />
        {loading ? (
          <Spinner />
        ) : (
          <div className="card-columns">{projectsList}</div>
        )}
      </div>
    );
  }
}

UserProjects.propTypes = {
  getUserProjects: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  projects: state.projects
});
export default connect(
  mapStateToProps,
  { getUserProjects }
)(UserProjects);

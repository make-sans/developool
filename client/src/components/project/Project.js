import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getProject,
  deleteProject,
  joinProject,
  leaveProject
} from '../../actions/projectActions';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import InterestSkillList from './InterestSkillList';

class Project extends Component {
  componentDidMount() {
    this.props.getProject(this.props.match.params.id);
  }

  onDeleteProject = e => {
    if (window.confirm('Are you sure you want to delete this project?'))
      this.props.deleteProject(
        this.props.projects.project._id,
        this.props.history
      );
  };

  onJoinProject = e => {
    this.props.joinProject(this.props.projects.project._id);
  };
  onLeaveProject = e => {
    this.props.leaveProject(this.props.projects.project._id);
  };

  render() {
    const { project, loading } = this.props.projects;
    let projectContent;

    if (project === null) {
      //getProject returned error
      projectContent = (
        <div className="col text-center mt-5">
          <i class="fas fa-search-minus fa-7x text-black-50 mb-2" />
          <h1 className="display-4 text-black-50">Project not found</h1>
        </div>
      );
    } else if (Object.keys(project).length > 0) {
      //everything fine
      console.log(project);
      projectContent = (
        <div className="col border rounded p-3">
          <div className="project-header d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <h2 className="mr-2">{project.title}</h2>
              <p className="text-muted m-0 mr-3">{`· by ${
                project.ownerName
              }`}</p>
              {project.private ? (
                <div className="project-visibility private">
                  <i className="fas fa-lock pr-2" />
                  Private
                </div>
              ) : (
                <div className="project-visibility public">
                  <i className="fas fa-lock-open pr-2" />
                  Public
                </div>
              )}
            </div>

            <div className="dropdown align-self-start">
              <i
                className="fas fa-ellipsis-v"
                id="project-options"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              />
              <div className="dropdown-menu" aria-labelledby="project-options">
                {project.ownerId === this.props.auth.user.id ? (
                  <div>
                    <Link
                      to={`/project/edit/${project._id}`}
                      className="dropdown-item"
                    >
                      Edit project
                    </Link>
                    <div
                      href=""
                      onClick={this.onDeleteProject}
                      className="dropdown-item"
                    >
                      Delete project
                    </div>
                  </div>
                ) : (
                  <div> No available actions </div>
                )}
              </div>
            </div>
          </div>
          <p>{project.publicDescription}</p>

          <InterestSkillList
            list={project.skills}
            customStyle={'skill-list-item'}
          />
          <InterestSkillList
            list={project.interests}
            customStyle={'interest-list-item'}
          />
          <div className="row justify-content-end">
            <div className="col-auto">
              {project.members.some(memb => memb == this.auth.user.id) ? (
                <button
                  onClick={this.onLeaveProject}
                  className="btn btn-danger btn-block"
                >
                  Leave project
                </button>
              ) : (
                <button
                  onClick={this.onJoinProject}
                  className="btn btn-primary btn-block"
                >
                  Join project
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container mt-4">
        {loading ? <Spinner /> : <div className="row">{projectContent}</div>}
      </div>
    );
  }
}
Project.propTypes = {
  getProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  joinProject: PropTypes.func.isRequired,
  projects: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects
});
export default connect(
  mapStateToProps,
  { getProject, deleteProject, joinProject, leaveProject }
)(Project);

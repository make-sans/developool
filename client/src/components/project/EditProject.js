import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SuggestInput from '../common/SuggestInput';
import { getProject, editProject } from '../../actions/projectActions';
import Spinner from '../common/Spinner';
import ProjectFields from './ProjectFields';

class EditProject extends Component {
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
    this.props.getProject(this.props.match.params.id);
  }

  onEditProjectSubmit = (e, state) => {
    e.preventDefault();
    const newProject = {
      title: state.title,
      publicDescription: state.publicDescription,
      privateDescription: state.privateDescription,
      interests: state.interests,
      skills: state.skills,
      private: state.private
    };
    console.log(newProject);
    this.props.editProject(
      this.props.match.params.id,
      newProject,
      this.props.history
    );
  };
  render() {
    const { project, loading } = this.props.projects;
    let projectContent;
    // ecma 7+ check if project object is empty, null check won't do here because when the loading reducer is fired it returns an empty object
    //  which then throws an undefined when checking for project.owner.id
    if (Object.entries(project).length === 0 || project.owner.id !== this.props.auth.user.id) {
      //getProject returned error
      projectContent = (
        <div className="col text-center  mt-5">
          <i className="fas fa-search-minus fa-7x text-black-50 mb-2" />
          <h1 className="display-4 text-black-50">Project not found</h1>
        </div>
      );
    } else if (Object.keys(project).length > 0) {
      //everything fine
      projectContent = (
        <div className="col-md-7 m-auto p-4">
          <h1 className="display-4 text-center">Edit project</h1>
          <ProjectFields
            onSubmit={this.onEditProjectSubmit}
            project={project}
            cancelRoute={`/project/${project._id}`}
          />
        </div>
      );
    }
    return (
      <div className="container mt-4">
        {loading ? (
          <Spinner />
        ) : (
          <div className="row  mt-3 ">{projectContent}</div>
        )}
      </div>
    );
  }
}
EditProject.propTypes = {
  auth: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects
});
export default connect(
  mapStateToProps,
  { getProject, editProject }
)(EditProject);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import SuggestInput from '../common/SuggestInput';
import { getProject } from '../../actions/projectActions';
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
      title: this.state.title,
      publicDescription: this.state.publicDescription,
      privateDescription: this.state.privateDescription,
      interests: this.state.interests,
      skills: this.state.skills,
      private: this.state.private
    };
    // this.props.createProject(newProject, this.props.history);
  };
  render() {
    const { project, loading } = this.props.projects;
    let projectContent;
    if (project === null || project.ownerId !== this.props.auth.user.id) {
      //getProject returned error
      projectContent = <div>Project not found</div>;
    } else if (Object.keys(project).length > 0) {
      //everything fine
      projectContent = (
        <div className="col">
          <ProjectFields
            onSubmit={this.onEditProjectSubmit}
            project={project}
          />
        </div>
      );
    }
    return (
      <div className="container mt-4">
        <h1>Edit project</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="row border rounded p-3">{projectContent}</div>
        )}
      </div>
    );
  }
}
EditProject.propTypes = {
  auth: PropTypes.object.isRequired,
  projects: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  projects: state.projects
});
export default connect(
  mapStateToProps,
  { getProject }
)(EditProject);

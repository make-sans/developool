import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProject } from '../../actions/projectActions';
import ProjectFields from '../project/ProjectFields';

class CreateProject extends Component {
  onCreateProjectSubmit = (e, state) => {
    e.preventDefault();
    const newProject = {
      title: state.title,
      publicDescription: state.publicDescription,
      privateDescription: state.privateDescription,
      interests: state.interests,
      skills: state.skills,
      private: state.private
    };
    this.props.createProject(newProject, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    return (
      <div className="create-project p-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1 className="display-4 text-center">Create a project</h1>
            <p className="lead text-center" />
            <ProjectFields
              onSubmit={this.onCreateProjectSubmit}
              cancelRoute={'/'}
            />
          </div>
        </div>
      </div>
    );
  }
}
CreateProject.propTypes = {
  createProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { createProject }
)(CreateProject);

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
    console.log(newProject);
    this.props.createProject(newProject, this.props.history);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    return (
      <div className="create-project">
        <div className="container">
          <div className="row align-items-center mt-5">
            <div className="col-md-7 m-auto">
              <h1 className="display-4 text-center">Create a project</h1>
              <p className="lead text-center" />
              <ProjectFields onSubmit={this.onCreateProjectSubmit} />
            </div>
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

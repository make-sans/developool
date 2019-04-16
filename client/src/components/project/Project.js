import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProject } from '../../actions/projectActions';
import Spinner from '../common/Spinner';

class Project extends Component {
  componentDidMount() {
    console.log('didmount');
    this.props.getProject(this.props.match.params.id);
  }
  render() {
    const { loading, project } = this.props;
    let projectContent;
    if (loading) {
      projectContent = <Spinner />;
    }
    if (project === null) {
      projectContent = <div>Project not found</div>;
    } else {
      console.log(project);
      projectContent = (
        <div className="col">
          {/* <h2>{project.title}</h2>
          <p>{project.publicDescription}</p> */}
        </div>
      );
      return (
        <div className="container">
          <div className="row">{projectContent}</div>
        </div>
      );
    }
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

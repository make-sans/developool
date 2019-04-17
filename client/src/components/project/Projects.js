
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjects } from '../../actions/projectActions';
import Spinner from '../common/Spinner';


export class ListProjects extends Component {
    // get the data as soon as component is initialzied
    componentDidMount() {
        this.props.getProjects();
    }

    render() {
        // get the properties
        const { loading } = this.props;
        const projects = this.props.projects.projects;
        let projectsList;
        if (loading) {
            projectsList = <Spinner />;
        }
        if (projects === null) {
            projectsList = <div>No projects currently available to join :(</div>;
        }
        else {
            // map projects to list of projects with markup
            projectsList = projects.map(project => (
                <div className="project w-30 col-md-4" key={project._id}>
                    <div className="card m-2">
                        <div className="card-body">
                            <h5 className="card-title">{project.title}</h5>
                            <p className="card-text">{project.publicDescription}</p>
                            <p>{project.interests}</p>
                            <p>{project.skills}</p>
                            <Link to={'/project/'+ project._id} className="btn btn-primary">
                                Project page
                            </Link>
                        </div>
                    </div>
                </div>
            ));
        }
        return (
            <div className="project-list">
                <div className="container-fluid">
                    <div className="row">
                        {projectsList}
                    </div>
                </div>
            </div>
        );
    }
}

ListProjects.propTypes = {
    getProjects: PropTypes.func.isRequired,
    projects: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    projects: state.projects
});
export default connect(
    mapStateToProps,
    { getProjects }
)(ListProjects);
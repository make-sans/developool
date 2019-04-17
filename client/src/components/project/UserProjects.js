
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserProjects } from '../../actions/projectActions';
import Spinner from '../common/Spinner';


export class UserProjects extends Component {
    // get the data as soon as component is initialzied
    componentDidMount() {
        this.props.getUserProjects();
    }
    // render array into list items, if none found then display None
    renderList = list => {
        return list.length > 0 ? (list.map(listItem => (<li key={listItem} className="skill-interest-list-item">{listItem}</li>)))
            : <div className='font-italic text-muted'>None</div>;
    }

    render() {
        // get the properties
        const { loading } = this.props;
        const projects = this.props.projects.projects;
        let projectsList;
        if (loading) {
            projectsList = <Spinner />;
        }
        if (projects.length <=0) {
            projectsList = <div>You haven't created any projects :(</div>;
        }
        else {
            // map projects to list of projects with markup
            projectsList = projects.map(project => (
                <div className="card mb-4 shadow-sm rounded">
                    <div className="card-body">
                        <h3 className="card-title font-weight-lighter">{project.title}</h3>
                        <p className="card-text">{project.publicDescription}</p>
                        <p className="font-weight-bold">Skills</p>
                        <ul className="skill-interest-list">
                            {this.renderList(project.skills)}
                        </ul>
                        <p className="font-weight-bold">Interests</p>
                        <ul className="skill-interest-list">
                            {this.renderList(project.interests)}
                        </ul>
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
                        <div className="card-columns">
                            {projectsList}
                        </div>
                    </div>
            </div>
        );
    }
}

UserProjects.propTypes = {
    getUserProjects: PropTypes.func.isRequired,
    projects: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    projects: state.projects
});
export default connect(
    mapStateToProps,
    { getUserProjects }
)(UserProjects);
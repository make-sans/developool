import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

export class Navbar extends Component {
  // prepare navigation list items
  navbarLinks() {
    if (this.props.auth.isAuthenticated) {
      return [
        <li className="nav-item" key="secret">
          <Link className="nav-link" to="/create-project">
            Create Project
          </Link>
        </li>,
        <li className="nav-item" key="profile">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>,
        <li className="nav-item" key="signout" >
          <a href="" className="nav-link" onClick={this.props.logoutUser}>
            Sign out
            <i className="fas fa-sign-out-alt px-2" />
          </a>
        </li>
      ];
    }
    return [
      <li className="nav-item" key="projectsPub">
        <Link className="nav-link" to="/projects">
          Projects
      </Link>
      </li>,
      <li className="nav-item" key="signin">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>,
      <li className="nav-item" key="signup">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
    ];
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <Link className="navbar-brand" to="/">
          4th Sem Project
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li key="projects" className="nav-item">
              <Link className="nav-link" to="/projects">
                Projects
          </Link>
            </li>
            {this.navbarLinks()}</ul>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

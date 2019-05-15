import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

export class Navbar extends Component {
  // prepare navigation list items
  navbarLinks() {
    // when authenticated user
    if (this.props.auth.isAuthenticated) {
      return [
        <li
          className="nav-item"
          key="my-projects"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >
          <NavLink className="nav-link" to="/my-projects">
            My projects
          </NavLink>
        </li>,
        <li
          className="nav-item"
          key="create-project"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >
          <NavLink className="nav-link" to="/create-project">
            Create Project
          </NavLink>
        </li>,
        <li
          className="nav-item"
          key="profile"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >
          <NavLink className="nav-link" to="/my-profile">
            Profile
          </NavLink>
        </li>,
        <li
          className="nav-item"
          key="signout"
          data-toggle="collapse"
          data-target=".navbar-collapse.show"
        >
          <span className="nav-link hover" onClick={this.props.logoutUser}>
            Sign out
            <i className="fas fa-sign-out-alt px-2" />
          </span>
        </li>
      ];
    }
    return [
      <li
        className="nav-item"
        key="signin"
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
      >
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>,
      <li
        className="nav-item"
        key="signup"
        data-toggle="collapse"
        data-target=".navbar-collapse.show"
      >
        <NavLink className="nav-link" to="/register">
          Register
        </NavLink>
      </li>
    ];
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <NavLink className="navbar-brand" to="/">
          Developool
        </NavLink>
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
            <li
              key="home"
              className="nav-item"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <NavLink
                className="nav-link"
                exact
                to="/"
                activeClassName="active"
              >
                Home
              </NavLink>
            </li>
            <li
              key="projects"
              className="nav-item"
              data-toggle="collapse"
              data-target=".navbar-collapse.show"
            >
              <NavLink
                className="nav-link"
                to="/projects"
                activeClassName="active"
              >
                Projects
              </NavLink>
            </li>

            {this.navbarLinks()}
          </ul>
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

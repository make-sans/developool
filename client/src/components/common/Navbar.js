import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
class Navbar extends Component {
  navbarLinks() {
    if (this.props.auth.isAuthenticated) {
      return [
        <li key="secret">
          <Link to="/protected">Protected</Link>
        </li>,
        <li key="signout">
          <a href="" onClick={this.props.logoutUser}>
            Sign out
          </a>
        </li>
      ];
    }
    return [
      <li key="signin">
        <Link to="/login">Login</Link>
      </li>,
      <li key="signup">
        <Link to="/register">Register</Link>
      </li>
    ];
  }
  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <Link to="/">
            <span className="brand">Auth-app</span>
          </Link>
          <ul>{this.navbarLinks()}</ul>
        </div>
      </nav>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

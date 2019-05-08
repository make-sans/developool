import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

const PrivateRoute = ({ component: Component, auth, logoutUser, ...rest }) => {
  let isAuthenticated = false;
  //check for token
  if (localStorage.jwtToken) {
    const decoded = jwt_decode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;
    isAuthenticated = auth.isAuthenticated;

    if (decoded.exp < currentTime) {
      //logout
      logoutUser();
      isAuthenticated = false;
    }
  } else {
    //logout
    logoutUser();
  }

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(PrivateRoute);

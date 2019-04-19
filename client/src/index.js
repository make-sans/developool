import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import ErrorWrapperHOC from './components/common/ErrorWrapperHOC';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/profile/Profile';
import Projects from './components/project/Projects';
import UserProjects from './components/project/UserProjects';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import PrivateRoute from './components/common/PrivateRoute';
import Navbar from './components/common/Navbar';
import ConfirmEmail from './components/auth/ConfirmEmail';
import CreateProject from './components/create-project/CreateProject';
import EditProject from './components/project/EditProject';
import Project from './components/project/Project';

//check for token
if (localStorage.jwtToken) {
  //set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  console.log(decoded)
  //check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout
    store.dispatch(logoutUser());
    //clear current profile
    //store.dispatch(clearCurrentProfile());
  }
}
else {
  //logout
  store.dispatch(logoutUser());
  //clear current profile
  //store.dispatch(clearCurrentProfile());
}

ReactDOM.render(
  <Provider store={store}>
    <ErrorWrapperHOC>
      <Router>
        <Navbar />
        <div className="container-fluid">
          <Switch>
          <Route exact path="/confirm/:token" component={ConfirmEmail} />
          <Route exact path="/" component={App} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/projects" component={Projects} />
          <PrivateRoute
            exact
            path="/project/edit/:id"
            component={EditProject}
          />
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/my-projects" component={UserProjects} />
          <PrivateRoute exact path="/create-project" component={CreateProject} />
            <PrivateRoute exact path="/project/:id" component={Project} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </div>
      </Router>
    </ErrorWrapperHOC>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

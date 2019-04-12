import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { registerUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import EmailSent from './EmailSent';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/protected');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmitRegister = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    //call action to register
    this.props.registerUser(newUser);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-7 m-auto">
            {this.props.auth.emailSent ? (
              <EmailSent />
            ) : (
              <div>
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your account</p>
                <form onSubmit={this.onSubmitRegister}>
                  <TextFieldGroup
                    placeholder="Name"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    error={errors.username}
                  />
                  <TextFieldGroup
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                  />
                  <TextFieldGroup
                    placeholder="Confirm Password"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                  />
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
                <div className="text-center mt-2">
                  <p className="d-inline">Already registered? </p>
                  <Link className="text-dark underline" to="/login">
                    Login here
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
Register.propTypes = {
  //registerUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {
    registerUser
  }
)(Register);

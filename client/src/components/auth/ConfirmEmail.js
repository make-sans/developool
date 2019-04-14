import React, { Component } from 'react'
import { confirmEmail } from '../../actions/authActions';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';


class ConfirmEmail extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    else {
      this.props.confirmEmail(this.props.match.params.token)
    }
  }
  render() {
    const { emailConfirmed } = this.props.auth;
    const { errors } = this.props;
    if (emailConfirmed) {
      setTimeout(() => this.props.history.push('/login'), 2000);

      return <div className='text-center mt-5'>
        <h1 className="display-4">Email confirmed!</h1>
        <p className="lead">
          You can now log in
      </p>
      </div>
    }
    return (
      <div className='text-center mt-5'>
        <h1 className="display-4">Something went wrong</h1>
        <p className="lead">
          {errors.msg}
        </p>
      </div>
    )
  }
}

ConfirmEmail.propTypes = {
  confirmEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    confirmEmail
  }
)(ConfirmEmail);
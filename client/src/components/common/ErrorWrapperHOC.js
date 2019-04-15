import React, { Component } from 'react';
import { connect } from 'react-redux';
import ServerErrorMessage from './ServerErrorMessage';

class ErrorWrapperHOC extends Component {
  render() {
    if (this.props.errors.server_error) {
      return <ServerErrorMessage />;
    }

    return this.props.children;
  }
}
const mapStateToProps = state => ({
  errors: state.errors
});
export default connect(mapStateToProps)(ErrorWrapperHOC);

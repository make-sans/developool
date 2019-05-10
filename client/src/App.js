import React, { Component } from 'react';
import mainIll from './assets/img/undraw/undraw_programmer_imem.svg';
import joinProjectIll from './assets/img/undraw/undraw_mobile_testing_reah.svg';
import exploreProjectIll from './assets/img/undraw/undraw_search_2dfv.svg';
import { connect } from 'react-redux';
import './App.css';

class App extends Component {
  onRegisterButtonClick = () => {
    this.props.history.push('/register');
  };
  render() {
    const { isAuthenticated } = this.props.auth;

    // if (isAuthenticated) {
    //   return (
    //     <div className="container">
    //       <div className="row mt-4">
    //         <div className="col-md-">
    //           <h1>Welcome</h1>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
    return (
      <div className="App">
        <div className="row my-5 p-3">
          <div className="col-md-5 offset-md-1">
            <h1>The palace where ideas meet developers</h1>
            <p>
              Cras finibus ipsum non lacus euismod, in maximus sem auctor. Sed
              quam ex, mattis sodales eros nec, consectetur elementum leo.
              Nullam varius ultricies justo, et egestas risus tempor vitae.
              Nulla in turpis tristique, iaculis ex vel, tempor purus.
            </p>
          </div>
          <div className="col-md-6">
            <img className="img-fluid" src={mainIll} alt="" />
          </div>
        </div>
        <div className="row justify-content-around p-6 skew bg-light align-items-center">
          <div className="col-md-5 text-center skew-content">
            <img className="h-auto w-50" src={joinProjectIll} alt="" />
          </div>
          <div className="col-md-5 skew-content">
            <h3 className="semibold">Join a project</h3>
            <p>
              Cras finibus ipsum non lacus euismod, in maximus sem auctor. Sed
              quam ex, mattis sodales eros nec, consectetur elementum leo.
              Nullam varius ultricies justo, et egestas risus tempor vitae.
              Nulla in turpis tristique, iaculis ex vel, tempor purus.
            </p>
          </div>
        </div>
        <div className="row justify-content-around p-6">
          <div className="col-md-5 py-4">
            <h3 className="semibold">Explore project ideas</h3>
            <p>
              Cras finibus ipsum non lacus euismod, in maximus sem auctor. Sed
              quam ex, mattis sodales eros nec, consectetur elementum leo.
              Nullam varius ultricies justo, et egestas risus tempor vitae.
              Nulla in turpis tristique, iaculis ex vel, tempor purus.
            </p>
          </div>
          <div className="col-md-5 text-center">
            <img className="h-auto w-50" src={exploreProjectIll} alt="" />
          </div>
        </div>
        {!isAuthenticated && (
          <div className="row justify-content-center mb-5">
            <div className="col-auto">
              <button
                onClick={this.onRegisterButtonClick}
                className="btn btn-register"
              >
                Register now
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(App);

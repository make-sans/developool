import React, { Component } from 'react';
import mainIll from './assets/img/undraw/undraw_programmer_imem.svg';
import joinProjectIll from './assets/img/undraw/undraw_mobile_testing_reah.svg';
import exploreProjectIll from './assets/img/undraw/undraw_search_2dfv.svg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
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
        <div className="row my-5 justify-content-around p-3">
          <div className="col-md-5">
            <h1>The place where ideas meet developers</h1>
            <p>
              Cras finibus ipsum non lacus euismod, in maximus sem auctor. Sed
              quam ex, mattis sodales eros nec, consectetur elementum leo.
              Nullam varius ultricies justo, et egestas risus tempor vitae.
              Nulla in turpis tristique, iaculis ex vel, tempor purus.
            </p>
          </div>
          <div className="col-md-5">
            <img className="img-fluid" src={mainIll} alt="" />
          </div>
        </div>
        <div className="row justify-content-around p-6 skew bg-lightgrey align-items-center">
          <div className="col-md-5 skew-content order-md-2">
            <h3 className="semibold">Join a project</h3>
            <p className="m-0">
              Cras finibus ipsum non lacus euismod, in maximus sem auctor. Sed
              quam ex, mattis sodales eros nec, consectetur elementum leo.
              Nullam varius ultricies justo, et egestas risus tempor vitae.
              Nulla in turpis tristique, iaculis ex vel, tempor purus.
            </p>
            <Link to="/projects">See projects</Link>
          </div>
          <div className="col-md-5 text-center skew-content">
            <img
              className="h-auto w-50"
              src={joinProjectIll}
              alt="Join a project"
            />
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
            <img
              className="h-auto w-50"
              src={exploreProjectIll}
              alt="Explore ideas"
            />
          </div>
        </div>

        {!isAuthenticated && (
          <div className="row justify-content-around mb-5 align-items-center">
            <div className="col-auto">
              <Link className="btn btn-register" to="/register">
                Register now
              </Link>
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

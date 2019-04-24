import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row justify-content-center mt-4">
          <div className="col-7 text-center">
            <h2 className="display-4">Welcome to [4th-semester-project]</h2>
            <p className="lead">The palace where ideas meet developers</p>
          </div>
        </div>
        <div className="row justify-content-center mt-5 text-white bg-dark p-3">
          <div className="col-md-3 text-center">
            <i class="far fa-lightbulb fa-2x p-3" />
            <p>Explore ideas</p>
          </div>
          <div className="col-md-3 text-center">
            <i class="fas fa-share-alt fa-2x p-3" />
            <p>Share your idea</p>
          </div>
          <div className="col-md-3 text-center">
            <i class="fas fa-users fa-2x p-3" />
            <p>Join a project</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

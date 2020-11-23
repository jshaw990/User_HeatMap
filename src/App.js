import React, { useState, useEffect } from 'react';

import './App.css';

import Report from './components/Report/Report'
import { renderButton, checkSignedIn } from './utils';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const updateSignIn = (signedIn) => {
    setIsSignedIn(signedIn);
    if (!signedIn) {
      renderButton();
    }
  };

  const init = () => {
    checkSignedIn()
      .then((signedIn) => {
        updateSignIn(signedIn);
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignIn);
      })
      .catch((error) => {
        console.error(error)
        return
      });
  };

  useEffect(() => {
    window.gapi.load("auth2", init)
  });

  return (
    <div className="App">
      {!isSignedIn ? (
        <div>
          <h1>Google Analytics/Maps Heatmap</h1>
          <div id='signin-button'></div>
        </div>
      ) : (
        <div>
          <Report />
        </div>
      )}
    </div>
  );
}

export default App;
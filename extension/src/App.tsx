import React from 'react';
import logo from './logo.svg';
import './App.css';
import Helmet from 'react-helmet';
import Popup from './popup/popup';
import DefaultView from './views/default-view';
import SessionContextProvider from './contexts/session-context';

function App() {
  return (
    <div className="App">
      <Helmet>
        <title>Watch Party</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Paytone+One&display=swap" />
        <link rel="stylesheet" href="./App.css" />
      </Helmet>
      <SessionContextProvider>
        <Popup defaultView={ new DefaultView({}) }/>
      </SessionContextProvider>
    </div>
  );
}

export default App;

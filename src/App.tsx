import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Toast from './components/Toast';
import AppContainer from './container/AppContainer';

function App() {
  return (
    <BrowserRouter>
      <AppContainer />
      <Toast />
    </BrowserRouter>
  );
}

export default App;

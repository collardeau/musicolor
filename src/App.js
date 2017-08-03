import React from 'react';
import { compose } from 'recompose';
import Musicolor from './components/Musicolor';
import { AppContainer } from './components/styled';
import './App.css';

const App = compose()(props => {
  return (
    <AppContainer>
      <Musicolor />
    </AppContainer>
  );
});

export default App;

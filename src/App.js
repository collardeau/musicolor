import React from 'react';
import { compose } from 'recompose';
import MusicMaker from './components/MusicMaker';
// import Musicolor from './components/musicolor/Musicolor';
import { AppContainer } from './components/styled';
import './App.css';

const App = compose()(props => {
  return (
    <AppContainer>
      <MusicMaker />
    </AppContainer>
  );
});

export default App;

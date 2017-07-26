import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import './App.css';

const enhance = compose(
  withState('volume', 'setVolume', 0),
  withHandlers({
    mute: props => () => {
      props.setVolume(0);
    }
  })
);

const App = enhance(({ volume }) =>
  <div>
    Volume: {volume}
  </div>
);

export default App;

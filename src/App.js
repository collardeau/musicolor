import React from 'react';
import { compose, withState } from 'recompose';
import Oscillator from './components/Oscillator';
import Theramin from './components/Theramin';
import './App.css';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const PlayArea = ({ children, setGain }) =>
  <div onMouseEnter={() => setGain(0.5)} onMouseLeave={() => setGain(0)}>
    {children}
  </div>;

const App = compose(
  withState('gain', 'setGain', 0),
  withState('frequency', 'setFrequency', 110)
)(props => {
  const { gain, frequency, setGain, setFrequency } = props;
  return (
    <main>
      <Oscillator audioCtx={audioCtx} gain={gain} frequency={frequency} />
      <h3>Musicolor</h3>
      <PlayArea setGain={setGain}>
        <Theramin start={110} changeFrequency={setFrequency} />
      </PlayArea>
    </main>
  );
});

export default App;

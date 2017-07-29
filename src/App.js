import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import Oscillator from './components/Oscillator';
import Theramin from './components/Theramin';
import { AppContainer, Select } from './components/styled';
import './App.css';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const PlayArea = ({ children, setGain }) =>
  <div
    onMouseLeave={() => setGain(0)}
    style={{
      backgroundColor: '#ccc',
      padding: '0 1vw',
      margin: '2vh 0',
      width: '100%'
    }}
  >
    {children}
  </div>;

const NeutralZone = props =>
  <div
    style={{
      backgroundColor: '#ccc',
      height: `${props.small ? 1 : 10}vh`
    }}
  />;

const App = compose(
  withState('gain', 'setGain', 0),
  withState('frequency', 'setFrequency', 110),
  withState('colorViz', 'setColorViz', '#ccc'),
  withState('scale', 'setScale', 'chromatic'), // or 'major'
  withHandlers({
    changeTone: props => (hz, color) => {
      props.setFrequency(hz);
      props.setColorViz(color);
    }
  })
)(props => {
  const { gain, frequency, setGain, changeTone, setScale, scale, colorViz } = props;
  return (
    <AppContainer>
      <Oscillator audioCtx={audioCtx} gain={gain} frequency={frequency} />
      <h1>Musicolor</h1>
      <div>
        <Select
          onChange={e => {
            setScale(e.target.value);
          }}
        >
          <option value="chromatic">Chromatic Scale (All 12 notes)</option>
          <option value="major">Major Scale (7 notes)</option>
        </Select>
      </div>
      <PlayArea setGain={setGain}>
        <NeutralZone small />
        <div
          style={{
            backgroundColor: colorViz,
            height: '2px',
            margin: '2vh 0'
          }}
        />
        <NeutralZone />
        <Theramin
          unison={110}
          changeTone={changeTone}
          onEnter={() => setGain(0.5)}
          scale={scale}
        />
        <NeutralZone small />
      </PlayArea>
    </AppContainer>
  );
});

export default App;

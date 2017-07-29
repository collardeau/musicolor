import React from 'react';
import { compose, withState, withHandlers } from 'recompose';
import Oscillator from './components/Oscillator';
import Theramin from './components/Theramin';
import { AppContainer, Select } from './components/styled';
import './App.css';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

const PlayArea = ({ children, setGain, setColorViz }) =>
  <div
    onMouseLeave={() => {
      setGain(0);
      setColorViz('#ccc');
    }}
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
      height: `${props.small ? 1 : 3}vh`
    }}
  />;

const App = compose(
  withState('layout', 'setLayout', 'flat'),
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
  const {
    gain,
    frequency,
    setGain,
    changeTone,
    setScale,
    scale,
    colorViz,
    setColorViz,
    layout,
    setLayout
  } = props;
  return (
    <AppContainer>
      <Oscillator audioCtx={audioCtx} gain={gain} frequency={frequency} />
      <h1>Musicolor</h1>
      <div style={{ marginBottom: '1vh' }}>
        <Select
          onChange={e => {
            setLayout(e.target.value);
          }}
        >
          <option value="flat">Flat Layout</option>
          <option value="guitar">Guitar Layout</option>
        </Select>
      </div>
      <div>
        <Select
          onChange={e => {
            setScale(e.target.value);
          }}
        >
          <option value="chromatic">Chromatic Scale (All notes)</option>
          <option value="major">Major Scale (7 notes)</option>
        </Select>
      </div>
      <PlayArea setGain={setGain} setColorViz={setColorViz}>
        <NeutralZone small />
        {layout === 'guitar' &&
          <div>
            <Theramin
              unison={110}
              changeTone={changeTone}
              onEnter={() => setGain(0.5)}
              scale={scale}
              start={5}
              showMarkers={true}
            />{' '}
            <NeutralZone />
          </div>}
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
          showMarkers={layout === 'guitar'}
        />
        <NeutralZone small />
      </PlayArea>
    </AppContainer>
  );
});

export default App;

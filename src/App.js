import React from 'react';
import { compose, withProps } from 'recompose';
import './App.css';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();
const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();
gainNode.gain.value = 0;
oscillator.frequency.value = 110;
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.start();

const enhance = compose(
  withProps({
    changeTone: hz => {
      oscillator.frequency.value = hz;
    },
    changeGain: value => {
      gainNode.gain.value = value;
    },
    mute: () => {
      gainNode.gain.value = 0;
    }
  })
);

const App = enhance(({ changeTone, changeGain, mute }) =>
  <div>
    <h3>Theramin</h3>
    <div>Mouse from left to right for higher pitches</div>
    <div
      style={{
        width: '100vw',
        height: '100px',
        border: '1px solid black'
      }}
      onMouseEnter={e => {
        changeGain(0.2);
      }}
      onMouseMove={e => {
        changeTone(e.clientX);
      }}
      onMouseLeave={() => {
        mute();
      }}
    />
  </div>
);

export default App;

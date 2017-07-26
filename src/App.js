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
    <button
      onClick={() => {
        changeGain(0.3);
      }}
    >
      Start
    </button>
    <button
      onClick={() => {
        mute();
      }}
    >
      Mute
    </button>
    <button
      onClick={() => {
        changeTone(220);
      }}
    >
      Change Tone
    </button>
  </div>
);

export default App;

import Tone from 'tone';

const FMsynth = new Tone.AMSynth().toMaster();
const { Transport } = Tone;
Tone.Transport.loop = true;

function scheduleNote(note, duration, when) {
  Transport.schedule(time => {
    FMsynth.triggerAttackRelease(note, duration, time);
  }, when);
}

const notesList = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const isMajorInterval = (_, i) =>
  i === 0 || i === 2 || i === 4 || i === 5 || i === 7 || i === 9 || i === 11 || i === 12;

function getIntervals(musicKey = 'C', scale = 'major', octave = '4') {
  const index = notesList.findIndex(n => n === musicKey);
  return [...notesList.slice(index), ...notesList.slice(0, index)]
    .filter(isMajorInterval) // todo: for other scales too
    .map(n => n + octave)
    .reduce(
      (acc, next, i) => ({
        ...acc,
        [i + 1]: next
      }),
      {}
    );
}

const updateOctave = (num, note) =>
  !num ? note : note.replace(/.$/, +note.substr(-1) + num);

const q = (note, when, octave = 0) => {
  note = updateOctave(octave, note);
  scheduleNote(note, '4n', when);
};

const h = (note, when, octave = 0) => {
  note = updateOctave(octave, note);
  scheduleNote(note, '2n', when);
};

export function frere({ musicKey = 'C', scale = 'major', startOct = '4' } = {}) {
  const i = getIntervals(musicKey, scale, startOct);

  q(i[1], '0:0');
  q(i[2], '0:1');
  q(i[3], '0:2');
  q(i[1], '0:3');

  q(i[1], '1:0');
  q(i[2], '1:1');
  q(i[3], '1:2');
  q(i[1], '1:3');

  q(i[3], '2:0');
  q(i[4], '2:1');
  h(i[5], '2:2');

  q(i[3], '3:0');
  q(i[4], '3:1');
  h(i[5], '3:2');

  q(i[5], '4:0');
  q(i[6], '4:1');
  q(i[5], '4:2');
  q(i[4], '4:3');

  h(i[3], '5:0');
  h(i[1], '5:2');

  q(i[5], '6:0');
  q(i[6], '6:1');
  q(i[5], '6:2');
  q(i[4], '6:3');

  h(i[3], '7:0');
  h(i[1], '7:2');

  Tone.Transport.bpm.value = 120;
  Tone.Transport.loopEnd = '8m';
  return Tone.Transport;
}

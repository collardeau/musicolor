import Tone from 'tone';
import compose from 'ramda/src/compose';
import curry from 'ramda/src/curry';

// music utils
const notesList = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

const isMajorInterval = (_, i) =>
  i === 0 || i === 2 || i === 4 || i === 5 || i === 7 || i === 9 || i === 11 || i === 12;

export function getIntervals(musicKey = 'C', scale = 'major', octave = '4') {
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

const changeOctave = (num, note) =>
  !num ? note : note.replace(/.$/, +note.substr(-1) + num);

export const down = (note, num = 1) => changeOctave((num *= -1), note);
export const up = (note, num = 1) => changeOctave(num, note);

// tone utils
const FMsynth = new Tone.MonoSynth().toMaster();

const triggerNote = (time, event) => {
  FMsynth.triggerAttackRelease(event.note, event.dur, time);
};

export function makePart(noteSequence) {
  return new Tone.Part(
    triggerNote,
    noteSequence.reduce((acc, next, i) => {
      return [...acc, ...next];
    })
  );
}

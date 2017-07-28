import React from 'react';
import { compose, mapProps, withState } from 'recompose';

const Theramin = compose(
  withState('activeNote', 'setActiveNote', 0),
  mapProps(props => {
    const { start } = props;
    const intervalRatio = 1.059463636; // western music
    let notes = [];
    [...Array(13)].forEach((_, i) => {
      notes[i] = {
        hz: !i ? start : notes[i - 1].hz * intervalRatio
      };
    });
    const range = notes[notes.length - 1].hz - notes[0].hz;
    return {
      ...props,
      notes: notes.map(note => ({
        ...note,
        octaveRatio: 1 / range * note.hz - 1
      }))
    };
  })
)(props => {
  const { notes, setFrequency, onEnter, activeNote, setActiveNote } = props;
  return (
    <div
      onMouseEnter={onEnter}
      style={{
        display: 'flex',
        width: '100%',
        height: '7vh'
      }}
    >
      {notes.map((note, i) =>
        <div
          key={note.hz}
          onMouseMove={() => {
            setFrequency(note.hz);
            setActiveNote(i + 1);
          }}
          style={{
            borderRight: '1px solid #ccc',
            width: `${1 / 12 * 100}%`,
            textAlign: 'center',
            backgroundColor: `hsl(${note.octaveRatio * 360}, ${i + 1 === activeNote
              ? 50
              : 30}%, 50%)`,
            fontSize: '1.3em'
          }}
        >
          {i % 2 === 0 ? '.' : null}
        </div>
      )}
    </div>
  );
});

export default Theramin;

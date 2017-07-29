import React from 'react';
import { compose, mapProps, withState } from 'recompose';
import { StyledNote, StyledTheramin } from './styled';

const Theramin = compose(
  withState('activeNote', 'setActiveNote', 0),
  mapProps(props => {
    const { start, scale } = props;
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
      notes: notes.map((note, i) => ({
        ...note,
        octaveRatio: 1 / range * note.hz - 1,
        muted: scale === 'major' && (i === 1 || i === 3 || i === 6 || i === 8 || i === 10)
      }))
    };
  })
)(props => {
  const { notes, setFrequency, onEnter, activeNote, setActiveNote } = props;
  return (
    <StyledTheramin onMouseEnter={onEnter}>
      {notes.map((note, i) =>
        <StyledNote
          key={i}
          muted={note.muted}
          degree={note.octaveRatio * 360}
          isActive={activeNote === i + 1}
          onMouseMove={() => {
            if (!note.muted) {
              setFrequency(note.hz);
              setActiveNote(i + 1);
            }
          }}
        >
          {i % 2 === 0 ? '.' : null}
        </StyledNote>
      )}
    </StyledTheramin>
  );
});

export default Theramin;

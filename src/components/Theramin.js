import React from 'react';
import omit from 'ramda/src/omit';
import { compose, mapProps, withState, withHandlers } from 'recompose';
import { StyledNote, StyledTheramin } from './styled';

const Theramin = compose(
  withState('activeNote', 'setActiveNote', 0),
  withHandlers({
    changeNote: ({ setFrequency, setActiveNote }) => (hz, index) => {
      setFrequency(hz);
      setActiveNote(index);
    }
  }),
  mapProps(props => {
    const { start, scale } = props;
    const intervalRatio = 1.0594631; // western music
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
  }),
  mapProps(omit(['setFrequency', 'setActiveNote', 'start']))
)(props => {
  const { notes, onEnter, activeNote, changeNote } = props;
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
              changeNote(note.hz, i + 1);
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

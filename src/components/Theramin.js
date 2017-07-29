import React from 'react';
import omit from 'ramda/src/omit';
import { compose, mapProps, withState, withHandlers } from 'recompose';
import { StyledNote, StyledTheramin } from './styled';

const Theramin = compose(
  withState('activeNote', 'setActiveNote', 0),
  withHandlers({
    changeNote: ({ changeTone, setActiveNote }) => (hz, color) => {
      changeTone(hz, color);
    }
  }),
  mapProps(props => {
    // todo: withPropsOnChange? dont recalculate notes too many times
    const { unison, scale, start, activeNote } = props;
    const intervalRatio = 1.0594631; // western music
    let notes = [];
    [...Array(13)].forEach((_, i) => {
      notes[i] = {
        hz: !i ? unison : notes[i - 1].hz * intervalRatio
      };
    });
    const range = notes[notes.length - 1].hz - notes[0].hz;
    const neutralBg = 'hsl(0, 0%, 70%)';
    const getNoteColor = (note, i) => {
      if (note.muted) return neutralBg;
      const hue = note.octaveRatio * 360;
      const saturation = activeNote === i + 1 ? 50 : 30;
      const lightness = 50;
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };
    return {
      ...props,
      notes: notes
        .map((note, i) => ({
          ...note,
          octaveRatio: 1 / range * note.hz - 1,
          muted:
            scale === 'major' && (i === 1 || i === 3 || i === 6 || i === 8 || i === 10)
        }))
        .map((note, i) => ({
          ...note,
          color: getNoteColor(note, i)
        }))
        .slice(start)
    };
  }),
  mapProps(omit(['setFrequency', 'start']))
)(props => {
  const { notes, onEnter, activeNote, changeNote, setActiveNote } = props;
  return (
    <StyledTheramin onMouseEnter={onEnter}>
      {notes.map((note, i) =>
        <StyledNote
          key={i}
          color={note.color}
          onMouseMove={() => {
            if (!note.muted) {
              changeNote(note.hz, note.color);
              setActiveNote(i + 1);
            }
          }}
          onMouseLeave={() => {
            setActiveNote(0);
          }}
        >
          {i % 2 === 0 ? '.' : null}
        </StyledNote>
      )}
    </StyledTheramin>
  );
});

export default Theramin;

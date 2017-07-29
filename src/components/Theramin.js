import React from 'react';
import omit from 'ramda/src/omit';
import { compose, mapProps, withState, withHandlers } from 'recompose';
import { StyledNote, StyledTheramin } from './styled';

const Theramin = compose(
  withState('activeNote', 'setActiveNote', 0),
  withHandlers({
    changeNote: ({ changeTone }) => (hz, color) => {
      changeTone(hz, color);
    }
  }),
  mapProps(props => {
    // todo: withPropsOnChange? dont recalculate notes too many times
    const { unison, scale, start, activeNote } = props;
    const intervalRatio = 1.0594631; // western music
    let notes = [];
    [...Array(13)].forEach((_, i) => {
      const lastNote = notes[notes.length - 1];
      notes[i] = {
        hz: !i ? unison : lastNote.hz * intervalRatio,
        interval: i + 1
      };
    });
    const range = notes[notes.length - 1].hz - notes[0].hz;
    const neutralBg = 'hsl(0, 0%, 70%)';
    const getNoteColor = note => {
      if (note.muted) return neutralBg;
      const hue = note.octaveRatio * 360;
      const saturation = activeNote === note.interval + 1 ? 50 : 30;
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
            scale === 'major' &&
            (note.interval === 2 ||
              note.interval === 4 ||
              note.interval === 7 ||
              note.interval === 9 ||
              note.interval === 11)
        }))
        .map(note => ({
          ...note,
          color: getNoteColor(note)
        }))
        .slice(start || 0)
    };
  }),
  mapProps(omit(['setFrequency', 'start']))
)(props => {
  const { notes, onEnter, changeNote, setActiveNote } = props;
  return (
    <StyledTheramin onMouseEnter={onEnter}>
      {notes.map(note =>
        <StyledNote
          key={note.interval}
          color={note.color}
          onMouseMove={() => {
            if (!note.muted) {
              changeNote(note.hz, note.color);
              setActiveNote(note.interval + 1);
            }
          }}
          onMouseLeave={() => {
            setActiveNote(0);
          }}
        />
      )}
    </StyledTheramin>
  );
});

export default Theramin;

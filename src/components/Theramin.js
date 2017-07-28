import React from 'react';
import { compose, mapProps } from 'recompose';

const Theramin = compose(
  mapProps(props => {
    const { start } = props;
    const intervalRatio = 1.059463636; // western music
    let notes = [];
    [...Array(13)].forEach((_, i) => {
      notes[i] = {
        hz: !i ? start : notes[i - 1].hz * intervalRatio
      };
    });
    return {
      ...props,
      notes
    };
  })
)(props => {
  const { notes, changeFrequency } = props;
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '10vh'
      }}
    >
      {notes.map((note, i) =>
        <div
          key={note.hz}
          onMouseMove={() => {
            changeFrequency(note.hz);
          }}
          style={{
            border: '1px solid black',
            width: `${1 / 12 * 100}%`,
            textAlign: 'center'
          }}
        >
          {i + 1}
        </div>
      )}
    </div>
  );
});

export default Theramin;

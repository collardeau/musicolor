import curry from 'ramda/src/curry';

const prependMeasure = curry((measure, timing) => ({
  ...timing,
  time: measure + timing.time
}));

const withNote = curry((notes, timing, i) => ({
  ...timing,
  note: typeof notes === 'string' ? notes : notes[i]
}));

const strum = (startMeasure, notes, timing) =>
  timing.map(prependMeasure(startMeasure)).map(withNote(notes));

export const d_d_d_d_ = (measure = 0, notes) =>
  strum(measure, notes, [
    // timing
    { time: ':0', dur: '4n' },
    { time: ':1', dur: '4n' },
    { time: ':2', dur: '4n' },
    { time: ':3', dur: '4n' }
  ]);

export const d_d_dudu = (measure = 0, notes) =>
  strum(measure, notes, [
    { time: ':0', dur: '4n' },
    { time: ':1', dur: '4n' },
    { time: ':2', dur: '8n' },
    { time: ':2.5', dur: '8n' },
    { time: ':3', dur: '8n' },
    { time: ':3.5', dur: '8n' }
  ]);

export const _ud_dud_ = (measure = 0, notes) =>
  strum(measure, notes, [
    { time: ':0.5', dur: '8n' },
    { time: ':1', dur: '4n' },
    { time: ':2', dur: '8n' },
    { time: ':2.5', dur: '8n' },
    { time: ':3', dur: '4n' }
  ]);

export const d_du_ud_ = (measure = 0, notes) =>
  strum(measure, notes, [
    { time: ':0', dur: '4n' },
    { time: ':1', dur: '8n' },
    { time: ':1.5', dur: '4n' },
    { time: ':2.5', dur: '8n' },
    { time: ':3', dur: '4n' }
  ]);

export const d_dudu_u = (measure = 0, notes) =>
  strum(measure, notes, [
    { time: ':0', dur: '4n' },
    { time: ':1', dur: '8n' },
    { time: ':1.5', dur: '8n' },
    { time: ':2', dur: '8n' },
    { time: ':2.5', dur: '4n' },
    { time: ':3.5', dur: '4n' }
  ]);

export const dudu_ud_ = (measure = 0, notes) =>
  strum(measure, notes, [
    { time: ':0', dur: '8n' },
    { time: ':0.5', dur: '8n' },
    { time: ':1', dur: '8n' },
    { time: ':1.5', dur: '4n' },
    { time: ':2.5', dur: '8n' },
    { time: ':3', dur: '4n' }
  ]);

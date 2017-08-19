import Tone from 'tone';
import * as strums from './strums';
import { getIntervals, makePart, down, up } from './utils/toneUtils';

export function justLikeHeaven(
  { musicKey = 'A', scale = 'major', startOct = '4', bpm = 151 } = {},
  ints = getIntervals(musicKey, scale, startOct)
) {
  const { d_d_d_d_, d_d_dudu, _ud_dud_, d_du_ud_, d_dudu_u, dudu_ud_ } = strums;

  const countDown = makePart([
    d_d_d_d_(0, [down(ints[1]), ints[1], down(ints[1]), up(ints[1])])
  ]);

  const verse = makePart([
    d_d_dudu(0, ints[1]),
    _ud_dud_(1, ints[5]),
    d_d_dudu(2, ints[2]),
    _ud_dud_(3, ints[4])
  ]);

  const melodyAsc = makePart([
    d_du_ud_(0, [up(ints[3]), up(ints[3]), up(ints[2]), up(ints[2]), up(ints[1])]),
    d_du_ud_(1, [ints[7], ints[7], ints[6], ints[6], ints[5]]),
    d_dudu_u(2, [ints[4], ints[4], ints[4], ints[3], ints[4], ints[2]]),
    dudu_ud_(3, [ints[2], ints[2], ints[2], ints[1], ints[1], ints[2]])
  ]);

  verse.loop = 2;
  verse.loopEnd = '4m';

  countDown.start('0m');
  verse.start('1m').stop('9m');
  melodyAsc.start('9m').stop('13m');
  melodyAsc.start('13m');

  Tone.Transport.bpm.value = bpm;
  return {
    play: () => {
      Tone.Transport.start('+1');
    }
  };
}

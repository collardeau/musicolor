import { compose, withState, lifecycle } from 'recompose';

const Oscillator = compose(
  withState('oscillator', 'setOscillator', null),
  withState('gainNode', 'setGainNode', null),
  lifecycle({
    componentDidMount() {
      // console.log('oscillator mounts');
      const { audioCtx, setGainNode, setOscillator, gain, frequency } = this.props;
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      gainNode.gain.value = gain || 0;
      oscillator.frequency.value = frequency || 110;
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      setOscillator(oscillator);
      setGainNode(gainNode);
    },
    componentDidUpdate(prevProps) {
      const { gain, frequency, oscillator, gainNode } = this.props;
      if (prevProps.frequency !== frequency) {
        oscillator.frequency.value = frequency;
      }
      if (prevProps.gain !== gain) {
        gainNode.gain.value = gain;
      }
    },
    componentWillUnmount() {
      const { oscillator } = this.props;
      oscillator.stop();
      // todo: more clean up, disconnect from audioCtx
    }
  })
)(() => {
  return null;
});

export default Oscillator;

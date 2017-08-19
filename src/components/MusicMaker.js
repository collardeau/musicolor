import React from 'react';
import { compose, lifecycle } from 'recompose';
import { justLikeHeaven } from '../songs';

const MusicMaker = compose(
  lifecycle({
    componentDidMount() {
      justLikeHeaven({ bpm: 151 }).play();
    }
  })
)(props => {
  return <div>Playing melody</div>;
});

export default MusicMaker;

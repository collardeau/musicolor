import React from 'react';
import { compose, lifecycle } from 'recompose';
import { frere } from '../songs';

const MusicMaker = compose(
  lifecycle({
    componentDidMount() {
      frere({
        musicKey: 'C'
      })
        .start('+0.2')
        .stop('8m');
    }
  })
)(props => {
  return <div>Playing melody</div>;
});

export default MusicMaker;

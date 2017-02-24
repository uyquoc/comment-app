import React from 'react';
import ReactDOM from 'react-dom';
import Voting from '../components/voting.jsx';

const pair = ['Trainspotting', '28 Days Later'];

ReactDOM.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);
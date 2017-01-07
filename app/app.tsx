import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Me from './Me';

const rootEl = document.getElementById('app');

ReactDOM.render(
    <Me />,
    rootEl
);
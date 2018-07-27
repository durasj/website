import 'core-js/es6/array';
import 'core-js/es6/promise';

import React from 'react';
import ReactDOM from 'react-dom';

import Me from './Me';

const rootEl = document.getElementById('app');

ReactDOM.render(
    <Me />,
    rootEl,
);

import 'core-js/features/array';
import 'core-js/features/object';
import 'core-js/features/promise';

import React from 'react';
import ReactDOM from 'react-dom';

import Me from './Me';

const rootEl = document.getElementById('app');

ReactDOM.render(
    <Me />,
    rootEl,
);

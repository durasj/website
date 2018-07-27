import React from 'react';
import ReactDOM from 'react-dom';

jest.mock('react-dom', () => ({ render: jest.fn() }));

import Me from './Me';

expect.extend({
    toBeNull(received) {
        const pass = received === null;
        if (pass) {
            return {
                message: () => `expected ${received} to be null`,
                pass: true,
            };
        } else {
            return {
                message: () => `expected ${received} to be null`,
                pass: false,
            };
        }
    },
});

interface IExtendedExpect extends jest.Expect {
    toBeNull: () => {}
}

it('Renders Me element', () => {
    require('./app');

    expect(ReactDOM.render).toHaveBeenLastCalledWith(
        <Me />,
        (expect as IExtendedExpect).toBeNull(),
    );
});

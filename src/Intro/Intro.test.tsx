import React from 'react';
import renderer from 'react-test-renderer';

import Intro from '../Intro';

it('Renders Intro properly', () => {
    const component = renderer.create(
        <Intro />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

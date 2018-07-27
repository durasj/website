import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';

import mockProjects from '../../testing/mockProjects';
import Tile from '../Tile';

it('Renders barebones tile properly', () => {
    const project = mockProjects[0];
    const component = renderer.create(
        <Tile id={project.id} title={project.title} onOpen={() => {}} />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

it('Renders full-fledged tile properly', () => {
    const project = mockProjects[0];
    const component = renderer.create(
        <Tile
            id={project.id}
            title={project.title}
            color={project.color}
            description={project.description}
            period={project.period}
            skills={project.skills}
            photos={project.photos}
            onOpen={() => {}}
        />,
    );

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
});

it('Calls onOpen when clicked', () => {
    /*window.dispatchEvent = jest.fn();
    history.pushState = jest.fn();*/
    const project = mockProjects[0];
    const handleOpen = jest.fn();

    const component = mount(
        <Tile id={project.id} title={project.title} onOpen={handleOpen} />,
    );

    jest.useFakeTimers();
    component.simulate('click', { preventDefault: () => undefined });
    jest.runAllTimers();

    expect(handleOpen).toHaveBeenCalled();
    /*expect(history.pushState).toHaveBeenCalledWith({}, 'Something', '/123');
    expect(window.dispatchEvent).toHaveBeenCalled();*/
});

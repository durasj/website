import { mount } from 'enzyme';
import React, { MouseEvent } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import mockProjects from '../../testing/mockProjects';
import List from '../List';

it('Renders lists', () => {
    const projects = mockProjects;
    const renderer = new ShallowRenderer();

    const output = renderer.render(
        <List
            projects={projects}
            olderCommercial={false}
            olderNoncommercial={false}
            onToggleOlderCommercial={() => {}}
            onToggleOlderNoncommercial={() => {}}
            onOpen={() => {}}
        />,
    );

    expect(output).toMatchSnapshot();
});

it('Renders lists with commercial archived items', () => {
    const projects = mockProjects;
    const renderer = new ShallowRenderer();

    const output = renderer.render(
        <List
            projects={projects}
            olderCommercial={true}
            olderNoncommercial={false}
            onToggleOlderCommercial={() => {}}
            onToggleOlderNoncommercial={() => {}}
            onOpen={() => {}}
        />,
    );

    expect(output).toMatchSnapshot();
});

it('Renders lists with noncommercial archived items', () => {
    const projects = mockProjects;
    const renderer = new ShallowRenderer();

    const output = renderer.render(
        <List
            projects={projects}
            olderCommercial={false}
            olderNoncommercial={true}
            onToggleOlderCommercial={() => {}}
            onToggleOlderNoncommercial={() => {}}
            onOpen={() => {}}
        />,
    );

    expect(output).toMatchSnapshot();
});

it('Renders lists with all archived items', () => {
    const projects = mockProjects;
    const renderer = new ShallowRenderer();

    const output = renderer.render(
        <List
            projects={projects}
            olderCommercial={true}
            olderNoncommercial={true}
            onToggleOlderCommercial={() => {}}
            onToggleOlderNoncommercial={() => {}}
            onOpen={() => {}}
        />,
    );

    expect(output).toMatchSnapshot();
});

it('Calls onToggleOlder when toggle button is clicked', () => {
    const projects = mockProjects;
    const handleToggleOlderCommercial = jest.fn();
    const handleToggleOlderNoncommercial = jest.fn();
    const component = mount(
        <List
            projects={projects}
            olderCommercial={true}
            olderNoncommercial={true}
            onToggleOlderCommercial={handleToggleOlderCommercial}
            onToggleOlderNoncommercial={handleToggleOlderNoncommercial}
            onOpen={() => {}}
        />,
    );

    component.find('.controls button').first().simulate('click');
    expect(handleToggleOlderCommercial).toHaveBeenCalled();

    component.find('.controls button').last().simulate('click');
    expect(handleToggleOlderNoncommercial).toHaveBeenCalled();
});

it('Calls onOpen when tile is clicked', () => {
    const projects = mockProjects;
    const handleOpening = jest.fn();
    const component = mount(
        <List
            projects={projects}
            olderCommercial={true}
            olderNoncommercial={true}
            onToggleOlderCommercial={() => {}}
            onToggleOlderNoncommercial={() => {}}
            onOpen={handleOpening}
        />,
    );

    jest.useFakeTimers();
    component.find(`a[href="/${projects[0].id}"]`).simulate('click');
    jest.runAllTimers();

    expect(handleOpening).toHaveBeenCalledWith(projects[0].id);
});

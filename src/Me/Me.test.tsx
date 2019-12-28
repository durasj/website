import { mount } from 'enzyme';
import IJSDOM from 'jsdom';
import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import mockProjects from '../../testing/mockProjects';
jest.mock('../content.json', () => mockProjects);
import Me from '../Me';

declare var jsdom: IJSDOM.JSDOM;

it('Renders without project opened', () => {
    window.location.replace = jest.fn();
    const renderer = ShallowRenderer.createRenderer();

    const output = renderer.render(
        <Me />,
    );

    expect(output).toMatchSnapshot();
});

it('Renders with project opened', () => {
    const project = mockProjects[0];
    window.scrollTo = jest.fn();
    const renderer = ShallowRenderer.createRenderer();
    jsdom.reconfigure({ url: 'http://localhost/' + project.id});

    const output = renderer.render(
        <Me />,
    );

    expect(output).toMatchSnapshot();
});

it('Redirects to 404 if project was not found', () => {
    window.location.assign = jest.fn();
    const renderer = ShallowRenderer.createRenderer();
    jsdom.reconfigure({ url: 'http://localhost/404' });

    renderer.render(
        <Me />,
    );

    expect(window.location.assign).toHaveBeenCalled();
});

it('Goes back in history when project is opened and closed from list', () => {
    window.scrollTo = jest.fn();
    history.back = jest.fn();

    const component = mount(
        <Me />,
    );

    jest.useFakeTimers();
    component.find('.list a').first().simulate('click');
    jest.runAllTimers();
    component.update();

    component.find('.detail .header .close').simulate('click');
    jest.runAllTimers();

    expect(history.back).toHaveBeenCalled();
});

it('Pushes new empty state when directly opened detail is closed', () => {
    const project = mockProjects[0];
    window.scrollTo = jest.fn();
    jsdom.reconfigure({ url: 'http://localhost/' + project.id});
    history.pushState = jest.fn();

    const component = mount(
        <Me />,
    );

    jest.useFakeTimers();
    component.find('.detail .header .close').simulate('click');
    jest.runAllTimers();

    expect(history.pushState).toHaveBeenCalledWith({}, '', '/');
});

it('Adds and removes event listener', () => {
    window.scrollTo = jest.fn();
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    const component = mount(
        <Me />,
    );

    expect(window.addEventListener).toHaveBeenCalledWith(
        'popstate',
        expect.anything(),
    );

    component.unmount();

    expect(window.removeEventListener).toHaveBeenCalledWith(
        'popstate',
        expect.anything(),
    );
});

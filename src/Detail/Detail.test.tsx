import { mount } from 'enzyme';
import { LuminousGallery } from 'luminous-lightbox';
import React from 'react';
import renderer from 'react-test-renderer';

import mockProjects from '../../testing/mockProjects';
import Detail from '../Detail';

beforeEach(() => {
    LuminousGallery.mockClear();
});

it('Renders with all info', () => {
    const project = mockProjects[0];
    window.scrollTo = jest.fn();

    const component = renderer.create(
        <Detail project={project} onClose={() => {}} />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('Renders without photos, skills and period', () => {
    const project = {
        ...mockProjects[0],
        skills: undefined,
        period: undefined,
        photos: undefined,
    };
    window.scrollTo = jest.fn();

    const component = renderer.create(
        <Detail project={project} onClose={() => {}} />,
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('Scrolls up on mount', () => {
    const project = mockProjects[0];
    window.scrollTo = jest.fn();

    renderer.create(
        <Detail project={project} onClose={() => {}} />,
    );

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
});

it('Calls onClose when closed', () => {
    const project = mockProjects[0];
    const handleClosing = jest.fn();
    window.scrollTo = jest.fn();

    const component = mount(
        <Detail project={project} onClose={handleClosing} />,
    );

    jest.useFakeTimers();
    component.find('.close').simulate('click', { preventDefault: () => undefined });
    jest.runAllTimers();

    expect(handleClosing).toHaveBeenCalled();
});

it('Creates and destroys lightbox gallery', () => {
    const project = mockProjects[0];
    window.scrollTo = jest.fn();
    const component = mount(
        <Detail project={project} onClose={() => {}} />,
    );

    expect(LuminousGallery.mock.instances.length).toBe(1);
    const mockGalleryInstance = LuminousGallery.mock.instances[0];

    component.unmount();

    expect(mockGalleryInstance.destroy).toHaveBeenCalled();
});

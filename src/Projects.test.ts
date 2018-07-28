import mockProjects from '../testing/mockProjects';
jest.mock('./content.json', () => mockProjects);
import { Projects } from './Projects';

it('Exports projects', () => {
    expect(Array.isArray(Projects) && Projects.length > 0).toBeTruthy();
    expect(Projects).toContainEqual(expect.objectContaining(mockProjects[0]));
});

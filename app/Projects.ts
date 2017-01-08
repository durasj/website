import projects from './content.json';

export interface IProject {
    id: string,
    title: string,
    size?: string,
    color?: string,
    description?: string,
    period?: string,
    skills?: string[],
    photos?: {src: string, caption: string}[],
    animation?: string,
    content?: string
}

export const Projects: IProject[] = (<any>projects);

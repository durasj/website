import projects from './content.json';

interface IPhoto {
    src: string;
    caption: string;
}

export interface IProject {
    id: string,
    title: string,
    type: string | 'commercial' | 'noncommercial',
    archived: boolean,
    size?: string,
    color?: string,
    description?: string,
    period?: string,
    skills?: string[],
    photos?: IPhoto[],
    content?: string,
    link?: string,
    linkLabel?: string,
}

export const Projects: IProject[] = projects;

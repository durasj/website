interface Photo {
    src: string;
    caption: string;
}

export interface Project {
    id: string,
    title: string,
    type: string | 'commercial' | 'noncommercial',
    archived: boolean,
    period: string,
    size?: string,
    color?: string,
    description?: string,
    skills?: string[],
    photos?: Photo[],
    content?: string,
    link?: string,
    linkLabel?: string,
}

export type Projects = Project[];

import React, { MouseEvent, PureComponent, ReactElement } from 'react';

import { IProject } from 'Projects';
import Tile from '../Tile';

export default class List extends PureComponent<{
    projects: IProject[],
    olderCommercial: boolean,
    olderNoncommercial: boolean,
    onToggleOlderCommercial: (event: MouseEvent<HTMLButtonElement>) => void,
    onToggleOlderNoncommercial: (event: MouseEvent<HTMLButtonElement>) => void,
    onOpen: (projectId: string) => void,
}, {}> {
    constructor(props) {
        super(props);
    }

    public render(): ReactElement<{}> {
        const commercialTiles = this.props.projects
            .filter((project) => project.type === 'commercial'
                    && (!project.archived || this.props.olderCommercial))
            .map(this.tileRender.bind(this));

        const noncommercialTiles = this.props.projects
            .filter((project) => project.type === 'noncommercial'
                    && (!project.archived || this.props.olderNoncommercial))
            .map(this.tileRender.bind(this));

        const olderCommercialLabel =
            this.props.olderCommercial ? 'Hide older' : 'Show older';
        const olderNoncommercialLabel =
            this.props.olderNoncommercial ? 'Hide older' : 'Show older';

        return (
            <div className="list">
                <h2>Commercial experience</h2>
                {commercialTiles}

                <div className="controls aligned-center">
                    <button
                        className="button button-clear"
                        onClick={this.props.onToggleOlderCommercial}
                    >{olderCommercialLabel}</button>
                </div>

                <h2>Non-commercial / Open-source</h2>
                {noncommercialTiles}

                <div className="controls aligned-center">
                    <button
                        className="button button-clear"
                        onClick={this.props.onToggleOlderNoncommercial}
                    >{olderNoncommercialLabel}</button>
                </div>
            </div>
        );
    }

    private tileRender(project, index) {
        const classes = ['item', (project.size || 'is-half')];
        const handleOpening = this.openProject.bind(this, project.id);

        return (
            <div key={index} className={classes.join(' ')}>
                <Tile
                    id={project.id}
                    title={project.title}
                    color={project.color}
                    description={project.description}
                    period={project.period}
                    skills={project.skills}
                    photos={project.photos}
                    onOpen={handleOpening}
                >
                    {project.content}
                </Tile>
            </div>
        );
    }

    private openProject(projectId: string) {
        this.props.onOpen(projectId);
    }
}

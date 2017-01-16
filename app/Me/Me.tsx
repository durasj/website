import React from 'react';

import Detail from '../Detail';
import Intro from '../Intro';
import Tile from '../Tile';

import { Projects } from '../Projects';

export default class Me extends React.Component<{}, {opened: string}> {
    constructor(props: {}) {
        super(props);

        this.routing(true);
        setTimeout(() => {
            addEventListener('popstate', this.routing.bind(this));
        });
    }

    public render(): React.ReactElement<{}> {
        const tiles = Projects.map((project, index) => {
            const classes = ['column', (typeof project.size !== 'undefined' ? project.size : 'is-half')];

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
                        animation={project.animation}
                    >
                        {project.content}
                    </Tile>
                </div>
            );
        });

        const bodyContent = (this.state.opened === undefined) ? (
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-multiline is-gapless">
                        {tiles}
                    </div>
                </div>
            </div>
        ) : (
            <Detail project={this.getOpenedProject()}/>
        );

        return (
            <section className={'hero is-fullheight' + (!this.state.opened ? ' is-light ' : ' ') + 'is-bold'}>
                {this.state.opened === undefined ? <Intro /> : ''}
                {bodyContent}

                <div className="hero-foot has-text-centered">
                    Jakub Duras, Web developer, jakub@duras.me
                </div>
            </section>
        );
    }

    private routing(initial = false) {
        const openedId = this.currentlyOpenedFromUrl();

        if (openedId !== undefined) {
            const openedProject = Projects.find((project) => project.id === openedId);

            if (openedProject === undefined) {
                location.href = '/404.html';
            }
        }

        if (initial === true) {
            this.state = {
                opened: openedId,
            };
        } else {
            if (openedId !== this.state.opened) {
                this.setState({ opened: openedId });
            }
        }
    }

    private currentlyOpenedFromUrl() {
        const projectId = location.pathname.substr(1) || location.hash.substr(1);

        return (projectId.length > 0) ? projectId : undefined;
    }

    private open(tileId: string) {
        location.hash = '#' + tileId;
    }

    private getOpenedProject() {
        return Projects.find((project) => project.id === this.state.opened);
    }
}

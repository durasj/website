import React from 'react';

import Detail   from '../Detail';
import Intro    from '../Intro';
import Tile     from '../Tile';

import { Projects } from '../Projects';

export default class Me extends React.Component<{}, {opened: string}> {
    constructor(props: {}) {
        super(props);

        this.state = {
            opened: this.currentlyOpenedFromHash(),
        };

        setTimeout(() => {
            addEventListener("hashchange", () => {
                const currentlyOpened = this.currentlyOpenedFromHash();

                if (currentlyOpened !== this.state.opened) {
                    this.setState({ opened: currentlyOpened });
                }
            });
        });
    }

    public render(): React.ReactElement<{}> {
        const tiles = Projects.map((project, index) => {
            const classes = ["column", (typeof project.size !== "undefined" ? project.size : 'is-half')];

            return (
                <div key={index} className={classes.join(' ')}>
                    <Tile
                        title={project.title}
                        color={project.color}
                        description={project.description}
                        period={project.period}
                        skills={project.skills}
                        photos={project.photos}
                        animation={project.animation}

                        onClick={this.open.bind(this, project.id)}
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
            <section className={"hero is-fullheight" + (!this.state.opened ? " is-light " : " ") + "is-bold"}>
                {this.state.opened === undefined ? <Intro /> : ''}
                {bodyContent}

                <div className="hero-foot has-text-centered">
                    Jakub Duras, Web developer, jakub@duras.me
                </div>
            </section>
        );
    }

    private currentlyOpenedFromHash() {
        const projectId = location.hash.substr(1);

        return (projectId.length > 0) ? projectId : undefined;
    }

    private open(tileId: string) {
        location.hash = '#' + tileId;
    }

    private getOpenedProject() {
        return Projects.find(project => project.id === this.state.opened);
    }
}

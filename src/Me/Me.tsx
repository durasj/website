import React, { Component, ReactElement } from 'react';

import Detail from '../Detail';
import Footer from '../Footer';
import Intro from '../Intro';
import List from '../List';

import { Projects } from '../Projects';

interface IState {
    opened: string,
    openedFromList: boolean,
    olderCommercial: boolean,
    olderNoncommercial: boolean,
}

export default class Me extends Component<{}, IState> {
    private handleRouting: EventListener;
    private handleToggleOlderCommercial;
    private handleToggleOlderNoncommercial;
    private handleOpening;
    private handleClosing;

    constructor(props: {}) {
        super(props);

        this.handleToggleOlderCommercial = this.toggleOlder.bind(this, true);
        this.handleToggleOlderNoncommercial = this.toggleOlder.bind(this, false);
        this.handleRouting = this.routing.bind(this);
        this.handleOpening = this.openProject.bind(this);
        this.handleClosing = this.closeDetail.bind(this);

        this.routing(true);
    }

    public componentWillMount() {
        if (typeof window === 'undefined') {
            return; // SSR support
        }

        window.addEventListener('popstate', this.handleRouting);
    }

    public componentWillUnmount() {
        if (typeof window === 'undefined') {
            return; // SSR support
        }

        window.removeEventListener('popstate', this.handleRouting);
    }

    public shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }

    public render(): ReactElement<{}> {
        const bodyContent = (this.state.opened === undefined) ? (
            <List
                projects={Projects}
                olderCommercial={this.state.olderCommercial}
                olderNoncommercial={this.state.olderNoncommercial}
                onToggleOlderCommercial={this.handleToggleOlderCommercial}
                onToggleOlderNoncommercial={this.handleToggleOlderNoncommercial}
                onOpen={this.handleOpening}
            />
        ) : (
            <Detail
                project={this.getOpenedProject()}
                onClose={this.handleClosing}
            />
        );

        return (
            <div className='container'>
                {this.state.opened === undefined ? <Intro /> : null}

                {bodyContent}

                <Footer />
            </div>
        );
    }

    private routing(initial = false) {
        let openedId = this.currentlyOpenedFromUrl();

        if (openedId !== undefined) {
            const openedProject = Projects.find((project) => project.id === openedId);

            if (openedProject === undefined) {
                location.assign('/404.html');
                openedId = undefined;
            }
        }

        if (initial === true) {
            this.state = {
                opened: openedId,
                openedFromList: false,
                olderCommercial: false,
                olderNoncommercial: false,
            };
        } else {
            if (openedId !== this.state.opened) {
                this.setState({
                    ...this.state,
                    opened: openedId,
                    openedFromList: !this.state.opened && openedId !== undefined,
                });
            }
        }
    }

    private currentlyOpenedFromUrl() {
        if (typeof window === 'undefined') {
            return; // SSR support
        }

        const projectId = location.pathname.substr(1);

        return (projectId.length > 0) ? projectId : undefined;
    }

    private getOpenedProject() {
        return Projects.find((project) => project.id === this.state.opened);
    }

    private toggleOlder(commercial: boolean) {
        if (commercial) {
            this.setState(
                { ...this.state, olderCommercial: !this.state.olderCommercial },
            );
        } else {
            this.setState(
                { ...this.state, olderNoncommercial: !this.state.olderNoncommercial },
            );
        }
    }

    private openProject(projectId) {
        const openedProject = Projects.find((project) => project.id === projectId);

        history.pushState(
            {},
            openedProject.title,
            '/' + openedProject.id,
        );
        this.routing();
    }

    private closeDetail() {
        if (this.state.openedFromList) {
            history.back();
        } else {
            history.pushState({}, '', '/');
            this.routing();
        }
    }
}

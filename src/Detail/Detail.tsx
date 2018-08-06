import { LuminousGallery } from 'luminous-lightbox';
import React, { Component, EventHandler, MouseEvent, ReactElement } from 'react';

import DocumentTitle from 'react-document-title';

import { IProject } from '../Projects';

interface IProps {
    project: IProject,
    onClose: () => void,
}

export default class Detail extends Component<IProps, { closing: boolean }> {
    private handleClosing: EventHandler<MouseEvent<HTMLElement>>;
    private gallery;

    constructor(props: IProps) {
        super(props);

        this.state = { closing: false };

        this.handleClosing = this.close.bind(this);
    }

    public componentDidMount() {
        window.scrollTo(0, 0);

        this.gallery = new LuminousGallery(
            document.querySelectorAll('.gallery a'),
            {},
            {
                caption: (trigger) => (
                    trigger.querySelector('img').getAttribute('alt')
                ),
            },
        );
    }

    public componentWillUnmount() {
        this.gallery.destroy();
    }

    public shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }

    public render(): ReactElement<{project: IProject}> {
        const documentTitle = this.props.project.title + ' | ' + 'Jakub Duras';
        const skillsList = this.props.project.skills ? (
            this.props.project.skills.map(
                (skill) => <span key={skill} className="skill">{skill}</span>,
            )
        ) : undefined;
        const period = this.props.project.period ? (
            <div className="period">{this.props.project.period}</div>
        ) : undefined;
        const skills = skillsList ? (
            <div className="skills">
                {skillsList}
            </div>
        ) : undefined;
        const photos = this.props.project.photos;
        const gallery = photos !== undefined ? (
            photos.map(
                (photo) => (
                    <a key={photo.src} href={photo.src}>
                        <img src={photo.src} alt={photo.caption} />
                    </a>
                ),
            )
        ) : undefined;
        const link = this.props.project.link ? (
            <a
                href={this.props.project.link}
                className="link button button-outline"
            >{this.props.project.linkLabel}</a>
        ) : undefined;

        return (
            <div className={"detail" + (this.state.closing ? ' closing' : '')}>
                <div className="header">
                    <div>
                        <DocumentTitle title={documentTitle} />
                        <h1 className="title">{this.props.project.title}</h1>
                    </div>

                    <span className="close" onClick={this.handleClosing}>&times;</span>
                </div>
                <div className="body">
                    <div className="gallery">
                        {gallery}
                    </div>

                    <div className="content">
                        <h2>Description</h2>
                        <div
                            className="typography"
                            dangerouslySetInnerHTML={{__html: this.props.project.content}}
                        />
                        {skills}

                        <div className="bottom">
                            {link}
                            {period}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private close() {
        this.setState({ closing: true });

        setTimeout(this.props.onClose, 350);
    }
}

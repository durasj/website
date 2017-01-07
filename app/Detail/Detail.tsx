import React from 'react';

import ImageGallery from '../../node_modules/react-image-gallery/build/image-gallery';

import { IProject } from '../Projects';

export default class Detail extends React.Component<{project: IProject}, {}> {
    protected static propTypes = {
        project: React.PropTypes.object.isRequired,
    };

    private _imageGallery;
    private images;

    constructor(props: {project: IProject}) {
        super(props);

        if (this.props.project.photos !== undefined) {
            this.images = this.props.project.photos.map(photo => {
                return {
                    original: photo.src,
                    thumbnail: photo.src,
                    originalAlt: photo.caption,
                    thumbnailAlt: photo.caption,
                };
            });
        }
    }

    public render(): React.ReactElement<{project: IProject}> {
        const skillsList = this.props.project.skills ? this.props.project.skills.join(', ') : undefined;
        const period = this.props.project.period ? (
            <div className="period">Made in: {this.props.project.period}</div>
        ) : undefined;
        const skills = skillsList ? (
            <div>
                Skills learned/practised: <span className="skills">{skillsList}</span>
            </div>
        ) : undefined;
        const gallery = this.images !== undefined ? (
            <ImageGallery
                ref={i => this._imageGallery = i}
                items={this.images}
                showNav={false}
                showPlayButton={false}
            />
        ) : undefined;

        return (
            <div id="detail">
                <div className={"section is-" + (this.props.project.color || 'bluegrey')}>
                    <div className="container">
                        <div className="columns is-mobile">
                            <div className="column">
                                <h1 className="title is-3">{this.props.project.title}</h1>
                                <h2 className="subtitle">{this.props.project.description}</h2>
                            </div>
                            <div className="column is-narrow">
                                <span className="close" onClick={this.close.bind(this)}>&times;</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section">
                    <div className="container">
                        <div className="columns">
                            <div
                                className="column content"
                                dangerouslySetInnerHTML={{__html: this.props.project.content}}
                            />
                            <div className="column is-one-quarter meta">
                                {period}

                                {skills}
                            </div>
                        </div>

                        {gallery}
                    </div>
                </div>
            </div>
        );
    }

    protected close() {
        location.hash = '#';
    }
}

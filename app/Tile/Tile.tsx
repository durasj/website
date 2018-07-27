import React, { Component, EventHandler, MouseEvent, ReactElement, RefObject } from 'react';

interface ITileProps {
    id: string;
    title: string;
    color?: string;
    description?: string;
    period?: string;
    skills?: string[];
    photos?: Array<{src: string, caption: string}>;
    onOpen: () => void;
};

export default class Tile extends Component<ITileProps, {
    opening: 'called' | 'animating',
}> {
    private handleOpening: EventHandler<MouseEvent<HTMLElement>>;
    private tileRef: RefObject<HTMLAnchorElement>;

    constructor(props: ITileProps) {
        super(props);

        this.state = {
            opening: null,
        };
        this.handleOpening = this.openTile.bind(this);
        this.tileRef = React.createRef();
    }

    public shouldComponentUpdate(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    }

    public render(): ReactElement<ITileProps> {
        const tileColorCl   = "is-" + this.props.color;
        const description   = this.props.description ? <p>{this.props.description}</p> : "";
        const period        = this.props.period ? this.props.period : "";
        const skills        = this.props.skills ? '#' + this.props.skills.join(' #') : "";
        const classes       = ["tile", tileColorCl];
        let photo;

        if (this.props.photos) {
            classes.push("tile-photo");
            const style = {
                backgroundImage: "url(" + this.props.photos[0].src + ")",
            };
            photo = <div className="photo" style={style} />;
        }

        // Animation code
        let ghostStyle;
        if (this.state.opening) {
            const tileEl = this.tileRef.current;
            const tileBoundingRect = tileEl.getBoundingClientRect();
            ghostStyle = {
                width: tileBoundingRect.width,
                height: tileBoundingRect.height,
                top: tileBoundingRect.top,
                left: tileBoundingRect.left,
            };

            if (this.state.opening === 'animating') {
                const scaleX = (document.body.clientWidth + 16) / tileBoundingRect.width;
                const scaleY = (document.body.clientHeight + 16) / tileBoundingRect.height;
                const translateX = - ((tileBoundingRect.left) + 8);
                const translateY = - ((tileBoundingRect.top) + 8);
                ghostStyle.transform = `matrix(${scaleX}, 0, 0, ${scaleY}, ${translateX}, ${translateY})`;
            }
        }
        const ghostElement =
            this.state.opening ? <div className={'tile-ghost ' + tileColorCl} style={ghostStyle} /> : '';

        return (
            <a href={'/' + this.props.id} onClick={this.handleOpening}>
                <article ref={this.tileRef} className={classes.join(' ')}>
                    {photo}
                    <div className="content">
                        <h3 className="title">{this.props.title}</h3>
                        <span className="meta">{period} {skills}</span>
                        {description}
                    </div>
                </article>
                {ghostElement}
            </a>
        );
    }

    private openTile(ev) {
        ev.preventDefault();

        this.setState({ opening: 'called' });

        setTimeout(() => this.setState({ opening: 'animating' }));

        setTimeout(this.props.onOpen, 300);
    }
}

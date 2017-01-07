import React from "react";

interface ITileProps {
    title: string,
    color?: string,
    description?: string,
    period?: string,
    // tslint:disable-next-line:semicolon
    skills?: string[],
    photos?: {src: string, caption: string}[],
    animation?: string,
    onClick?: React.EventHandler<React.MouseEvent<HTMLElement>>
};

export default class Tile extends React.Component<ITileProps, {}> {
    protected static propTypes = {
        title: React.PropTypes.string.isRequired,
        color: React.PropTypes.string,
        description: React.PropTypes.string,
        period: React.PropTypes.string,
        skills: React.PropTypes.array,
        photos: React.PropTypes.array,
        animation: React.PropTypes.string,
        onClick: React.PropTypes.func,
    };

    protected static defaultProps = {
        color: "bluegrey",
        animation: "backgroundZoomOut",
    };

    constructor(props: ITileProps, context?: any) {
        super(props);
    }

    public render(): React.ReactElement<ITileProps> {
        const tileColorCl   = "is-" + this.props.color;
        const animationCl   = "an-" + this.props.animation;
        const description   = this.props.description ? <p>{this.props.description}</p> : "";
        const period        = this.props.period ? <span className="period">{this.props.period}</span> : "";
        let classes         = ["tile", tileColorCl, animationCl];
        let photo;

        if (this.props.photos) {
            classes.push("tile-photo");
            const style = {
                backgroundImage: "url(" + this.props.photos[0].src + ")",
            };
            photo = <div className="photo" style={style} />;
        }

        return (
            <article className={classes.join(" ")} onClick={this.props.onClick}>
                {photo}
                <div className="content">
                    <h2 className="title">{this.props.title}{period}</h2>
                    {description}
                </div>
            </article>
        );
    }
}

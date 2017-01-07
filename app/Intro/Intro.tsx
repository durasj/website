import React from 'react';

export default class Intro extends React.Component<{}, {}>
{
    constructor(props: {}) {
        super(props);
    }

    render(): React.ReactElement<{}> {
        return (
            <div id="intro">
                <div>
                    Hi, I am <h1>Jakub, Web developer</h1>
                </div>
            </div>
        );
    }
}

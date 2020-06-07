import React, { PureComponent, ReactElement } from 'react';

import DocumentTitle from '../DocumentTitle';

export default class Intro extends PureComponent<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    public render(): ReactElement<{}> {
        return (
            <div className="intro">
                <DocumentTitle title="Jakub Duras - Software Developer" />
                <img src="icons/favicon.svg" alt="Lambda Jakub Duras logo" width="160px" height="160px" />
                <div className="introduction">
                    Hi, I am <h1>Jakub, Software developer</h1>
                </div>
            </div>
        );
    }
}

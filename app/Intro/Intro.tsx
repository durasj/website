import React from 'react';

import DocumentTitle from 'react-document-title';

export default class Intro extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    public render(): React.ReactElement<{}> {
        return (
            <div id="intro">
                <DocumentTitle title="Jakub Duras - Mobile and Web App Developer" />
                <div>
                    Hi, I am <h1>Jakub, Web developer</h1>
                </div>
            </div>
        );
    }
}

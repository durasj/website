import React, { PureComponent, ReactElement } from 'react';

export default class Footer extends PureComponent<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    public render(): ReactElement<{}> {
        const email = atob('amFrdWJAZHVyYXMubWU=');
        const mobileNumber = atob('KzQyMSA5MTcgNDMyIDk3NA==');

        return (
            <footer>
                <h2>Contact</h2>

                <p>Feel free to get in touch with me.</p>

                <div className="items">
                    <div className="item email">
                        <img src="icons/lnr-envelope.svg" alt="Envelope icon" /> <a href={'mailto:' + email}>{email}</a>
                    </div>

                    <div className="item github">
                        <img src="icons/lnr-code.svg" alt="Code icon" /> <a href="https://github.com/durasj">@durasj</a>
                    </div>

                    <div className="item mobile">
                        <img src="icons/lnr-phone-handset.svg" alt="Handset icon" /> {mobileNumber}
                    </div>

                    <div className="item location">
                        <img src="icons/lnr-map-marker.svg" alt="Map marker icon" /> Slovakia
                    </div>
                </div>

                <div className="copyright">
                    {/* tslint:disable-next-line:max-line-length*/}
                    Copyright Jakub Ďuraš. Code of this website is licensed under the MIT License and available at <a href="https://github.com/durasj/website">GitHub</a>.
                </div>
            </footer>
        );
    }
}

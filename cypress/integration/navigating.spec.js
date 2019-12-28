const projects = require('../../src/content.json');

describe('Navigating projects', () => {
    it('Is possible by having a list of projects on the homepage', () => {
        cy.visit('/');
        const withoutArchived = projects.filter((project) => !project.archived).length;

        cy.get('.list').should('contain', 'Commercial experience');
        cy.get('.list').find('h2:contains("Commercial experience") + .item').should('exist');
        cy.get('.list').should('contain', 'Non-commercial / Open-source');
        cy.get('.list').find('h2:contains("Non-commercial / Open-source") + .item').should('exist');
        cy.get('.list > .item').should('have.length', withoutArchived);
    });

    it('Is possible for commercial archived by expanding a list of projects on the homepage', () => {
        cy.visit('/');
        const withoutArchived = projects.filter((project) => !project.archived).length;

        cy.get('.list > .controls button').first().click();
        cy.get('.list > .item').should('have.length.above', withoutArchived);

        cy.get('.list > .controls button').first().click();
        cy.get('.list > .item').should('have.length', withoutArchived);
    });

    it('Is possible for noncommercial archived by expanding a list of projects on the homepage', () => {
        cy.visit('/');
        const withoutArchived = projects.filter((project) => !project.archived).length;

        cy.get('.list > .controls button').last().click();
        cy.get('.list > .item').should('have.length.above', withoutArchived);

        cy.get('.list > .controls button').last().click();
        cy.get('.list > .item').should('have.length', withoutArchived);
    });

    it('Can be done by opening from homepage and closing using button', () => {
        cy.visit('/');
        const project = projects.find(
            (project) => project.type === 'commercial' && project.archived === false
        );

        cy.get(`.list .item a[href="/${project.id}"]`).click();
        cy.get('.header').should('contain', project.title);
        cy.url().should('contain', '/' + project.id);

        cy.get('.header .close').click();
        cy.get('.intro').contains('Hi');
        cy.url().should('not.contain', '/' + project.id);
    });

    it('Can be done by opening one archived project after another', () => {
        cy.visit('/');
        const project = projects.filter(
            (project) => project.type === 'commercial' && project.archived === true
        );

        cy.get('.list > .controls button').first().click();

        cy.get(`.list .item a[href="/${project[0].id}"]`).click();
        cy.get('.header').should('contain', project[0].title);
        cy.url().should('contain', '/' + project[0].id);

        cy.get('.header .close').click();

        cy.get(`.list .item a[href="/${project[1].id}"]`).click();
        cy.get('.header').should('contain', project[1].title);
        cy.url().should('contain', '/' + project[1].id);
    });

    it('Is pleasant because of scrolling up when opening a project', () => {
        cy.visit('/');
        const project = projects.find(
            (project) => project.type === 'commercial' && project.archived === false
        );

        cy.scrollTo('center');

        cy.get(`.list .item a[href="/${project.id}"]`).click();

        cy.url().should('contain', '/' + project.id)
            .then(() => cy.window())
            .then(($window) => {
                expect($window.scrollY).to.equal(0);
            });
    });

    it('Is pleasant because user can go back in history', () => {
        cy.visit('/');
        const project = projects.find(
            (project) => project.type === 'commercial' && project.archived === false
        );

        cy.visit('/' + project.id);
        cy.go('back');

        cy.get('.intro').should('contain', 'Hi');
    });

    it('Can be done by visiting a URL', () => {
        const project = projects.find(
            (project) => project.type === 'commercial' && project.archived === false
        );

        cy.visit('/' + project.id);

        cy.get('.header').should('contain', project.title);
    });
});

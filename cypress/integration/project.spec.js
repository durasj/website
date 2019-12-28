const projects = require('../../src/content.json');

describe('Project', function() {
    it('Contains correct title', function() {
        const project = projects[0];
        cy.visit(`/${project.id}`);

        cy.get('.header').should('contain', project.title);
    });

    it('Contains correct content and meta info', function() {
        const project = projects[0];
        cy.visit(`/${project.id}`);

        cy.get('.typography').invoke('html').should(
            'contain',
            Cypress.$(project.content).html(),
        );
        cy.get('.skills').should('contain', project.skills[0]);
        cy.get('.period').should('contain', project.period);
    });

    it('Contains photos', function() {
        const project = projects[0];
        cy.visit(`/${project.id}`);

        cy.get('.gallery')
            .find('img[src^="/content"]')
            .should('have.length', project.photos.length);
    });

    it('Contains link', function() {
        const project = projects.find((project) => project.link);
        cy.visit(`/${project.id}`);

        cy.get(`a.link[href="${project.link}"]`)
            .should('contain', project.linkLabel);
    });

    it('Photos can be opened in a lightbox', function() {
        const project = projects[0];
        const firstPhoto = project.photos[0];
        cy.visit(`/${project.id}`);

        cy.get('.gallery')
            .find(`img[src="${firstPhoto.src}"]`)
            .first()
            .click();
        cy.get('.lum-lightbox.lum-open')
            .find(`img[src="${firstPhoto.src}"]`)
            .should('exist');
    });
});

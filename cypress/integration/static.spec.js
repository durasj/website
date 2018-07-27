const projects = require('../../app/content.json');

const email = atob('amFrdWJAZHVyYXMubWU=');
const number = atob('KzQyMSA5MTcgNDMyIDk3NA==');
const githubLink = 'https://github.com/durasj';
const githubHandler = '@durasj';
const location = 'Slovakia';

describe('Static information', () => {
    it('On homepage contains name and role', () => {
        cy.visit('/');

        cy.get('.intro').should('contain', 'Jakub');
        cy.get('.intro').should('contain', 'Web developer');
    });

    it('On homepage contains contact details', () => {
        cy.visit('/');

        cy.get('footer').should('contain', email);
        cy.get('footer').find('a[href="' + githubLink + '"]').should('contain', githubHandler);
        cy.get('footer').should('contain', number);
        cy.get('footer').should('contain', location);
    });

    it('On project contains contact details', () => {
        const project = projects[0];
        cy.visit(`/${project.id}`);

        cy.get('footer').should('contain', email);
        cy.get('footer').find('a[href="' + githubLink + '"]').should('contain', githubHandler);
        cy.get('footer').should('contain', number);
        cy.get('footer').should('contain', location);
    });
});

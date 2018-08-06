const projects = require('../../app/content.json');

const email = String.fromCharCode(106, 97, 107, 117, 98, 64, 100, 117, 114, 97, 115, 46, 109, 101);
const number = String.fromCharCode(43, 52, 50, 49, 32, 57, 49, 55, 32, 52, 51, 50, 32, 57, 55, 52);
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

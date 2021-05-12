import selectors from '../support/selectors.js';
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.overwrite('type', (originalFn, subject, str, options) => { 
    if (str !== '') {
      return originalFn(subject, str, options)
    }
  
    return subject
  })
  
Cypress.Commands.add('register', (data) => {
    cy.get(selectors.nameInput).type(data.name)
    cy.get(selectors.surnameInput).type(data.surname)
    cy.get(selectors.emailInput).type(data.email)
    cy.get(selectors.ageInput).type(data.age)

    cy.get(selectors.submitButton).click()
    });


 //   cy.get(“a”).contains(“Register”).click();
 //   cy.contains(“Registration”).should(“be.visible”);
 //   cy.get(‘input[id="username"]’)
 //       .type(data.username)
 //       .should(“have.value”, data.username);
 //   cy.get(‘input[id="email"]’)
 //       .type(data.email)
 //       .should(“have.value”, data.email);
 //   cy.get(‘input[id="password"]’).type(data.password);
 //   cy.get(‘input[id="password2"]’).type(data.password);
 //   cy.get(‘input[type="submit"]’).contains(“Register”).click();
 //   cy.get(“.alert-info”).should(
  //      “contain”,
//       “Congratulations, you are now registered”
//    );

//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

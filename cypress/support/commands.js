import selectors from '../support/selectors.js';

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
})
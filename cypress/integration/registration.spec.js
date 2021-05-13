import selectors from '../support/selectors.js';
import registrationData from '../fixtures/registration.data.json'


describe('Registration form', () => {

    beforeEach(() => {
        cy.visit('https://coffeemug.z33.web.core.windows.net')
    })
    it('Should be able to successfully create an account', () => {

        cy.register({
            name: registrationData.name,
            surname: registrationData.surname,
            email: registrationData.email,
            age: registrationData.age
        });

        cy.get(selectors.registrationForm).should('contain', 'Success Submit')
    });

    it('Should be able to create an account putting only the required data', () => {

        cy.register({
            name: registrationData.name,
            surname: '',
            email: registrationData.email,
            age: ''
        });

        cy.get(selectors.registrationForm).should('contain', 'Success Submit')
    });

    it('Should be unable to register a new account using the too short name and surname', () => {

        cy.register({
            name: registrationData.nameTooShort,
            surname: registrationData.surnameTooShort,
            email: registrationData.email,
            age: registrationData.age,
        });

        cy.get(selectors.registrationForm).should('not.contain', 'Success Submit')
        cy.get(selectors.nameErrorLabel).should('contain', 'Too Short!')
        cy.get(selectors.surnameErrorLabel).should('contain', 'Too Short!')
    });

    it('Should be unable to register a new account using the too long name and surname', () => {

        cy.register({
            name: registrationData.nameTooLong,
            surname: registrationData.surnameTooLong,
            email: registrationData.email,
            age: registrationData.age,
        });

        cy.get(selectors.registrationForm).should('not.contain', 'Success Submit')
        cy.get(selectors.nameErrorLabel).should('contain', 'Too Long!')
        cy.get(selectors.surnameErrorLabel).should('contain', 'Too Long!')
    });

    it('Should be unable to register a new account without putting the data', () => {
        cy.get(selectors.submitButton).click()

        cy.get(selectors.registrationForm).should('not.contain', 'Success Submit')
        cy.get(selectors.nameErrorLabel).should('contain', 'Required')
        cy.get(selectors.emailErrorLabel).should('contain', 'Required')
    });

    it('Should be unable to register a new account using negative number in the age input', () => {

        cy.register({
            name: registrationData.name,
            surname: registrationData.surname,
            email: registrationData.email,
            age: registrationData.negativeAge,
        });

        cy.get(selectors.registrationForm).should('not.contain', 'Success Submit')
        cy.get(selectors.ageErrorLabel).should('contain', 'age must be a positive number')
    });

    it('Should be unable to register a new account using letters in the age input', () => {

        cy.register({
            name: registrationData.name,
            surname: registrationData.surname,
            email: registrationData.email,
            age: registrationData.ageLetters,
        });

        cy.get(selectors.registrationForm).should('not.contain', 'Success Submit')
        cy.get(selectors.ageErrorLabel).should('contain', 'age must be a `number` type, but the final value was: `NaN`')
    });

    it('Should be unable to create an account using an incorrect email address', () => {

        cy.register({
            name: registrationData.name,
            surname: registrationData.surname,
            email: registrationData.incorrectEmail,
            age: registrationData.age,
        });

        cy.get(selectors.registrationForm).should('not.contain', 'Success Submit')
        cy.get(selectors.emailErrorLabel).should('contain', 'Invalid email')
    });

    it('Should be unable to register a new account using special characters', () => {

        cy.register({
            name: registrationData.specialCharacters,
            surname: registrationData.specialCharacters,
            email: registrationData.email,
            age: registrationData.age,
        });

        cy.get(selectors.registrationForm).should('not.contain', 'Success Submit')
    });

    it('Should be unable to register a new account using numbers', () => {

        cy.register({
            name: registrationData.number,
            surname: registrationData.number,
            email: registrationData.email,
            age: registrationData.age,
        });

        cy.get(selectors.registrationForm).should('not.contain', 'Success Submit')
    });
});
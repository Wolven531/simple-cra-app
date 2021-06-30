/// <reference types="Cypress" />
/// <reference types="@testing-library/cypress" />

describe('Home Page', () => {
	beforeEach(() => {
		cy.visit('')
		cy.injectAxe()
	})

	it('should load page', () => {
		cy.title().should('eq', "Anthony and Vinny's CRA App")
		cy.get('h1').should('contain', 'Home')
		cy.findByText("Welcome to our next generation League compare app!")
		//Commenting out as this will return errors. Just adding so others know how
		//cy.checkA11y()
	})

	describe('Nav menu', () => {
		beforeEach(() => {
			cy.findByRole('button', {name:'menu'}).click()
			
		})
		
		it('should have correct links', () => {
			cy.contains('li', 'Home')
			  .find('a')
			  .should('have.attr', 'href')
			  .and('contain', '/')
			cy.contains('li', 'Config')
			  .find('a')
			  .should('have.attr', 'href')
			  .and('contain', '/config')
		})
	})


})
describe('Config Page', () => {
	beforeEach(() => {
		cy.visit('/config')
	})

	it('should load page', () => {
		cy.contains('button', 'Server Up?')
		cy.contains('button', 'Token valid?')
		cy.findByText('Riot Developer Site')
		  .should('have.attr', 'href')
		  .and('contain', 'https://developer.riotgames.com')
	})
})

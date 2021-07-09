describe('Search User Page', () => {
	beforeEach(() => {
		cy.visit('/ThisWillNeverBeAPage')
		cy.injectAxe()
	})

	it('should load page', () => {
		cy.get('h1').should('contain', 'Page Not Found')
		cy.get('h5').should(
			'contain',
			'Page not found. How did you even get here?'
		)
	})

	describe('nav manu', () => {
		beforeEach(() => {
			cy.findByRole('menuitem').click()
		})

		it('should appear', () => {
			cy.findByRole('menu').find('li').should('have.lengthOf', 4)
		})
	})
})

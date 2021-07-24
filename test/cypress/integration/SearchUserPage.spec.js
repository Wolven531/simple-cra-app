describe('Search User Page', () => {
	beforeEach(() => {
		cy.visit('/search')
		cy.injectAxe()
	})

	it('should load page', () => {
		cy.get('h1').should('contain', 'Search Users Page')
	})

	describe('nav menu', () => {
		beforeEach(() => {
			cy.findByRole('menuitem').click()
		})

		it('should appear', () => {
			cy.findByRole('menu').find('li').should('have.lengthOf', 4)
		})
	})
})

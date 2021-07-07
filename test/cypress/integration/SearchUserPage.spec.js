describe('Search User Page', () => {
	beforeEach(() => {
		cy.visit('/search-users')
		cy.injectAxe()
	})

	it('should load page', () => {
		cy.get('h1').should('contain', 'Search Users Page')
	})

	describe('nav manu', () => {
		beforeEach(() => {
			cy.findByRole('button', { name: 'menu' }).click()
		})

		it('should appear', () => {
			cy.findByRole('menu').find('li').should('have.lengthOf', 4)
		})
	})
})

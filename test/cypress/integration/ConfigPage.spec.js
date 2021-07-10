describe('Config Page', () => {
	beforeEach(() => {
		cy.visit('/config')
		cy.injectAxe()
	})

	it('should load page', () => {
		cy.get('h1').should('contain', 'Config Page')
		cy.contains('button', 'Server Up?')
		cy.contains('button', 'Token valid?')
		cy.findByText('Riot Developer Site')
			.should('have.attr', 'href')
			.and('contain', 'https://developer.riotgames.com')
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

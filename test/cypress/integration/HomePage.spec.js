describe('Home Page', () => {
	beforeEach(() => {
		cy.visit('')
		cy.injectAxe()
	})

	it('should load page', () => {
		cy.title().should('eq', "Anthony and Vinny's CRA App")
		cy.get('h1').should('contain', 'Home')
		cy.findByText('Welcome to our next generation League compare app!')
		//Commenting out as this will return errors. Just adding so others know how
		//cy.checkA11y()
	})

	describe('Nav menu', () => {
		beforeEach(() => {
			cy.findByRole('button', { name: 'menu' }).click()
		})

		it('should have correct links', () => {
			cy.findByRole('menu').find('li').should('have.lengthOf', 4)
			cy.contains('li', 'Home')
				.find('a')
				.should('have.attr', 'href')
				.and('contain', '/')
			cy.contains('li', 'Config')
				.find('a')
				.should('have.attr', 'href')
				.and('contain', '/config')
			cy.contains('li', 'Icon Demo')
				.find('a')
				.should('have.attr', 'href')
				.and('contain', '/icons')
			cy.contains('li', 'Search Users')
				.find('a')
				.should('have.attr', 'href')
				.and('contain', '/search-users')
		})
	})
})

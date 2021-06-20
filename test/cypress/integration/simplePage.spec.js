describe('Simple Page', ()=>{
    beforeEach(()=>{
        cy.visit('');
    })

    it('should load page', ()=>{
        cy.title().should('eq', "Anthony and Vinny's CRA App");
        cy.get('h2').should('contain', 'Simple CRA App');
        cy.findByText("Welcome to Anthony and Vinny's Simple CRA App®!")
    })

    describe('config Page', ()=>{
        beforeEach(()=>{
            cy.get('a[href*="/config"]').click();
        })

        it('should load page', ()=>{
            cy.contains('button', 'Server Up?');
            cy.contains('button', 'Token valid?');
        })
    })
})

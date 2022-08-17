class basketPage{

    elements={
        roomDeatil: ()=> cy.get('.room').find('span').eq(0),
        totalPrice: () => cy.contains('Total price (inc tax) ').find('span'),
        dateDeatils: () => cy.get('.dates').find('span').eq(0),
        countInBasket: () => cy.get('#basket_count'),
        confirmBookingLink: () => cy.get('a').contains('Confirm booking'),
        hotelName: () => cy.get('.basket-item-hotel-heading').find('h2')


        
        

    }
    successfulPageLoad()
    {
       cy.contains('Your basket').scrollIntoView().should('be.visible');
       cy.get('[data-text=Choose]').scrollIntoView().should('be.visible').should('have.attr','class').should('contain','completed');
       cy.get('[data-text=Confirm]').scrollIntoView().should('be.visible').should('have.attr','class').should('contain','active');
    }
    clickConfirmBooking()
    {
        this.elements.confirmBookingLink().scrollIntoView().should('be.visible').click();
    }
    
}
module.exports= new basketPage();

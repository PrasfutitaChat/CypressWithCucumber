class searchResultPage{

    elements={
        firstBookNowButton: ()=> cy.contains('Book Now',{timeout:7000}).eq(0),
        firstHotelName: () => cy.get('.mod-hotelRooms-rates').eq(0).find('h2'),
        hotelImage: ()=> cy.get('.js-magnific-gallery').find('img'),
        perNightCostofFirstSearchResult: ()=> cy.get('.mod-hotelRooms-rates').eq(0).find('.nightPrice > span'),
        totalCostofFirstSearchResult: ()=> cy.get('.mod-hotelRooms-rates').eq(0).contains('Total stay (inc tax').parent().find('span').eq(1).find('span')
        

    }
    successfulPageLoad(imageName)
    {
        this.elements.hotelImage().scrollIntoView().should('be.visible').should('have.attr','src').and('contain',imageName);
    }
    selectFirstSearchResult()
    {
        this.elements.firstBookNowButton().scrollIntoView().should('be.visible').click({ timeout: 10000 });
    }
}
module.exports= new searchResultPage();

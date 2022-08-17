class searchPage{

    elements={
        logo: ()=> cy.get('.logoLarge',{timeout:7000}),
        searchBox: ()=> cy.get('#react-s_query'),
        datePicker: ()=> cy.get('#checkin-checkout-follow'),
        searchButton: ()=> cy.get('#s_search')

    }
    successfulPageLoad()
    {
        this.elements.logo().should('have.attr','src').and('contain','MMS_Logo_Tavel_Club_large');
    }
    typeInSearchBox(name)
    {
        this.elements.searchBox().scrollIntoView().should('be.visible').type(name);
    }
    selectDate(startDate,endDate)
    {
        this.elements.datePicker().scrollIntoView().should('be.visible').click();
        cy.contains('August 2022').parent().parent().contains(startDate).click();
        cy.contains('August 2022').parent().parent().contains(endDate).click();
    }
    performSearch()
    {
        this.elements.searchButton().scrollIntoView().should('be.visible').click();

    }



}

module.exports= new searchPage();
import {Given, When, And, Then} from "cypress-cucumber-preprocessor/steps";


import searchPage from "../../page-object/searchPage"
import searchResultPage from "../../page-object/searchResultPage"
import basketPage from "../../page-object/basketPage"


function findRandom(max) {
  const  random = Math. floor(Math. random() * max)+1 ;//Finds number between 1 - max.
    console. log(random)
    return random;
    }


beforeEach(() => {
    
       
    cy.intercept({
        method: 'GET',
        url: 'basket/json'
    }).as('LoginPageSuccessfulLoad');
       
    

   })

Given("user navigates to baseurl",()=>{
    cy.visit(String(Cypress.env('baseURL')));
    cy.wait('@LoginPageSuccessfulLoad').its('response.statusCode').should('eq', 200);
    searchPage.successfulPageLoad();
   
    
})
When("user enters city as {string} in the search bar",(city)=>{
    searchPage.typeInSearchBox(city); 
     

})
And("user click on the tag as suggested destinations" ,()=>{
    cy.get('.enterTrigger').click();

})

And("user click on check-in date {string} and check-out date {string} to enter dates",(checkInDate,checkOutDate)=>{
    searchPage.selectDate(checkInDate,checkOutDate); 

})

And("user click on the search button",() =>{
    searchPage.performSearch();
    cy.url().should('include',"london").and('include',"29").and('include',"30");
})

And("user click on select rooms button on any hotel except first and last",()=>{
    searchResultPage.elements.allHotelList().then(($ele) => {
        const len=$ele.find('.hotelcard-bttns-rates').length;
        cy.log("Number of hotels in search result"+len);
        const num=findRandom(len-2);
        cy.log(`Index ${num} will be chosen as hotel`);
        cy.wrap($ele.find('h2>a')).eq(num).invoke('text').as("hotelName");
        cy.wrap($ele.find('.hotelcard-bttns-rates')).eq(num).click();
        
    })


Then("User should be on Get A Room page of the selected hotel",function(){
    cy.log(this.hotelName);
    cy.get('.hotelpage-headingcontent-titleinner').find('h1').as("hotelNameHeader").should('contain.text',this.hotelName);

})    
})



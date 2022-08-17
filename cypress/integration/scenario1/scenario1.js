import {Given, When, And, Then} from "cypress-cucumber-preprocessor/steps";


import searchPage from "../../page-object/searchPage"
import searchResultPage from "../../page-object/searchResultPage"
import basketPage from "../../page-object/basketPage"
import checkoutPage from "../../page-object/checkoutPage"

beforeEach(() => {
    
       
    cy.intercept({
        method: 'GET',
        url: 'basket/json'
    }).as('LoginPageSuccessfulLoad');
       
    

   })

Given("User opens the hotel booking url",()=>{
    cy.visit(String(Cypress.env('baseURL')));
    cy.wait('@LoginPageSuccessfulLoad').its('response.statusCode').should('eq', 200);
    searchPage.successfulPageLoad();
   
    
})

When("User clicks the search panel, provides HotelName {string},CheckIn_date {string} and CheckOut_date {string}", (hotelName,checkInDate,checkoutDate)=>{
    searchPage.typeInSearchBox(hotelName); 
    searchPage.selectDate(checkInDate,checkoutDate); 
    cy.wrap(hotelName).as("hotelName");
    cy.wrap(checkInDate).as("checkInDate");
    cy.wrap(checkoutDate).as("checkoutDate");



})



And("User clicks on search button",function(){
    searchPage.performSearch();
    cy.url().should('include',this.hotelName).and('include',this.checkInDate).and('include',this.checkoutDate); 
    searchResultPage.successfulPageLoad('berns-hotel-stockholm-sweden.jpeg'); //datadriven
   
    searchResultPage.elements.firstHotelName().then(($ele) => {
        const txt=$ele.text();
        return txt;
    }).as("roomName");

    searchResultPage.elements.perNightCostofFirstSearchResult().invoke('text').as("perNightCost");

    searchResultPage.elements.totalCostofFirstSearchResult().invoke('text').as("totalCost");





})

And("User selects the first hotel, verifies whether the selected basket detail showing the hotel name, room name with price and then confirms booking",function(){
    searchResultPage.selectFirstSearchResult();  
    cy.url().should('include','basket');
    basketPage.successfulPageLoad();
    
    basketPage.elements.hotelName().should('contain.text','Berns Hotel'); // data driven
    basketPage.elements.roomDeatil().should('contain.text',this.roomName);
    basketPage.elements.totalPrice().should('contain.text',this.totalCost);
    basketPage.elements.dateDeatils().should('contain.text',this.checkInDate).and('contain.text',this.checkoutDate);
    
    //basketPage.elements.countInBasket().should('have.text',1);
    basketPage.clickConfirmBooking();
    cy.url().should('include','uk/mrandmrs/booking/stepTwo');

  

})

And("User navigates to payment page, enter necessary personal details like FirstName {string}, LastName {string}, PhoneNum {string}, Email {string}", function(firstName,lastName,phoneNumber,emailID){
    checkoutPage.successfulPageLoad();
    checkoutPage.enterPersonalDetails(firstName,lastName,phoneNumber,emailID);
    checkoutPage.typeSpecialRequest("n/a");
   
    




})
And("User provides address deatils lile AddressLine1 {string}, AddressLine2 {string}, City {string}, PostCode {string}, Country {string}",function(addressLine1,addressLine2,city,postCode,country){
    checkoutPage.enterAddress(addressLine1,addressLine2,city,postCode,country);
})

And("User enters payment details with NameOnCard {string}, CardType {string}, invalid CardNumber {}, ExpiryDate {}, CVV {} and clicks PayNow button",function(nameOnCard,cardType,cardNumber,expiryDate,CVV){
     checkoutPage.enterCardDeatils(nameOnCard,cardNumber,expiryDate,CVV,cardType);
    
    checkoutPage.clickPayNowButton();
})
Then("User verifies proper invalid card number error message in payment portal" ,()=>{
    checkoutPage.verifyErrorInvalidCardNumber();
})




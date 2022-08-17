class checkoutPage{

    elements={
        fisrtNameInput: ()=> cy.get("[name='firstName']",{timeout:6000}),
        lastNameInput: () => cy.get("[name='lastName']",{timeout:6000}),
        phoneNumberInput: () => cy.get("[name='defaultPhoneNumber']",{timeout:6000}),
        emailnput: () => cy.get("[name='defaultEmail']",{timeout:6000}),
        specialRequestTextArea: () => cy.get("[name=specialRequests]",{timeout:6000}),
        postCodeLookupSearchBox: () => cy.contains('Search by postcode'),
        postCodeSearchButton: () => cy.contains('Search'),
        nameOnCardInput: ()=> cy.get('.card-number-types > :nth-child(1) > .c-form__field > .c-form__label',{timeout:6000}),
        cardNumberInput: ()=> cy.get('[type=tel]').eq(1),
        selectCardTypeDropDown: () => cy.get('select').eq(2),
        expiryDateInput: ()=> cy.get('[type=tel]').eq(2),
        cvvInput: ()=> cy.get('[type=tel]').eq(3),
        enterAddressManuallyLink: ()=> cy.contains('Enter address manually',{timeout:6000}),
        addressLine1: ()=> cy.get('#billingaddress1',{timeout:6000}),
        addressLine2: ()=> cy.get('#billingaddress2'),
        addressCity: ()=> cy.get('#billingcity',{timeout:6000}),
        addressPostalCode: ()=> cy.get('#billingpostcode'),
        addressCountry: ()=> cy.get('select[name=billingcountry]',{timeout:6000}),
        payNowButton: ()=> cy.get('.p-paymentButton'),
        cardNumberIncorrectMessage: () => cy.get('.pageErrors > div',{timeout:8000})
    }
    successfulPageLoad()
    {
       cy.get('[data-text=Choose]').scrollIntoView().should('be.visible').should('have.attr','class').should('contain','completed');
       cy.get('[data-text=Confirm]').scrollIntoView().should('be.visible').should('have.attr','class').should('contain','completed');
       cy.get('[data-text=Pay]').scrollIntoView().should('have.attr','class').should('contain','active');
    }

  
    typeSpecialRequest(note)
    {
        this.elements.specialRequestTextArea().scrollIntoView().should('be.visible').type(note);
    }

    enterPersonalDetails(firstName,lastName,phoneNumber,email)
    {
        this.elements.fisrtNameInput().scrollIntoView().should('be.visible').type(firstName,{timeout:6000});
        this.elements.lastNameInput().scrollIntoView().should('be.visible').type(lastName);
        this.elements.phoneNumberInput().scrollIntoView().should('be.visible').type(phoneNumber);
        this.elements.emailnput().scrollIntoView().should('be.visible').type(email);

    }
    
   
    enterCardDeatils(fullName,cardNumber,expiryDate,cvv,card)
    {
        this.elements.nameOnCardInput().scrollIntoView().should('be.visible').type(fullName);
        this.elements.selectCardTypeDropDown().scrollIntoView().should('be.visible').select(card);
        this.elements.cardNumberInput().scrollIntoView().should('be.visible').type(cardNumber);
        this.elements.expiryDateInput().scrollIntoView().should('be.visible').type(expiryDate);
        this.elements.cvvInput().scrollIntoView().should('be.visible').type(cvv);
     }
    enterAddress(addressLine1,addressLine2,city,postCode,country)
    {
        this.elements.enterAddressManuallyLink().scrollIntoView().should('be.visible').click();
        this.elements.addressLine1().scrollIntoView().should('be.visible').type(addressLine1);
        this.elements.addressLine2().scrollIntoView().should('be.visible').type(addressLine2);
        this.elements.addressCity().scrollIntoView().should('be.visible').type(city);
        this.elements.addressPostalCode().scrollIntoView().should('be.visible').type(postCode);
        this.elements.addressCountry().scrollIntoView().should('be.visible').select(country);


    }
    clickPayNowButton()
    {
        this.elements.payNowButton().scrollIntoView().should('be.visible').click();
    }
    verifyErrorInvalidCardNumber()
    {
        this.elements.cardNumberIncorrectMessage().scrollIntoView().should('be.visible').should('contain.text','Your card number is incorrect.');
    }


   
    
}
module.exports= new checkoutPage();

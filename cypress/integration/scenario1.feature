Feature: Hotel booking process journey




#1st Hotel booking process negative path with invalid card number
  Scenario: Unsuccessful hotel booking with invalid card number
    Given User opens the hotel booking url
    When User clicks the search panel, provides HotelName "berns",CheckIn_date "29" and CheckOut_date "30"
    And User clicks on search button
    And User selects the first hotel, verifies whether the selected basket detail showing the hotel name, room name with price and then confirms booking
    And User navigates to payment page, enter necessary personal details like FirstName "Pras", LastName "Chak", PhoneNum "9876569870", Email "abc@gmail.com"
    And User provides address deatils lile AddressLine1 "Towe1, 17-G", AddressLine2 "South city complex", City "Kolkata", PostCode "700068", Country "India"
    And User enters payment details with NameOnCard "Prasfutita", CardType "VISA", invalid CardNumber "1234123412341234", ExpiryDate "11/26", CVV "123" and clicks PayNow button
    Then User verifies proper invalid card number error message in payment portal

  



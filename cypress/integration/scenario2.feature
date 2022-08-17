Feature: Scenario till Get A Room page





Scenario: Scenario till Get A Room page
Given user navigates to baseurl
When user enters city as "london" in the search bar
And user click on the tag as suggested destinations
And user click on check-in date "29" and check-out date "30" to enter dates
And user click on the search button
And user click on select rooms button on any hotel except first and last
Then User should be on Get A Room page of the selected hotel
    
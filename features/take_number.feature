Feature: The ability to takea  number

Scenario: User takes a number
Given a user
And no number
When the user takes a number
Then they are given the key for the number
And the number is added to the queue
And the number has not left
And the number is not skipped
And the number is not serviced

Scenario: Get a number from the terminal
When a number is taken from the terminal
Then the number is displayed
And the number id is displayed
And the number is added to the queue
And the number has not left
And the number is not skipped
And the number is not serviced
Feature: The ability to see the current number, and the estimated wait time

Scenario: Show current number
Given a number
When the number becomes current
Then the current number is shown

Scenario: Show estimated wait time
Given {5} numbers
And a start time of now
And a end time of {5} minutes later
When I view the estimated wait time
Then the average time per number should be {5} minutes
And the estimated wait time should be {25} minutes

@Admin
Scenario: Show average time of service
Given a line manager
And {5} numbers
And a start time of now
And an end time of {5} minutes later
When I view the average time per number
Then the average should be {5} miutes
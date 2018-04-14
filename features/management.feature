Feature: The ability to manage the line

Scenario: Pull next number
Given a unserviced number
When I pull the next number
Then the number should become the current number
And the pulled time is saved

Scenario: Mark done
Given a current number
When I mark the number done
Then the number becomes serviced
And the serviced time is saved

Scenario: Start accepting
Given the line is not accepting numbers
When I start accepting numbers
Then the start accepting time is saved

Scenario: Stop accepting
Given the line is accepting numbers
When I stop accepting numbers
Then the stop accepting time is saved

Scenario: Restart accepting
Given the line has stopped accepting numbers
When I start accepting numbers
Then the start accepting time is saved
And the stop accepting time is deleted

Scenario: Reset the queue
Given {5} numbers
When I reset the queue
Then the queue should have 0 numbers
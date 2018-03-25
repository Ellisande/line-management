Feature: Things a user can do when they have a number

Scenario: Leave the queue
Given a user
And a number
When the user leaves the queue
Then the number should indicate the number left the queue
And the time they left should be saved

Scenario: Can skip when next
Given a user
And a number
When the number becomes next
Then the user has the option to skip

Scenario: Can skip when current
Given a user
And a number
When the number becomes the current number
Then the user has the option to skip

Scenario: Skipping your number
Given a user
And a number
And the number is next
When the user skips the number
Then the number should be marked skipped
And the time they skipped should be saved

Scenario: On the way when next
Given a user
And a number
When the number becomes next
Then the user has the option to say they're on the way

Scenario: On the way when current
Given a user
And a number
When the number becomes the current number
Then the user has the option to say they're on the way

Scenario: Countdown
Given a user
And a number
When the number becomes next
Then the user is shown a count down timer
And the timer is equal to the average ticket time

Scenario: Can't take another number
Given a user
And a number
When the user takes a number
Then an error is returned


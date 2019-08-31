# Manual Test Plan

## Creating a Task

### Add a new task

1. Go to the "Tasks" section
2. Click on the + sign besides the Task List title
3. Verify a form appears that allows to enter Name, Reference and Description
4. Attempt to submit the form with empty fields
   - The ADD button is disabled
5. Fill out the name and reference
   - The ADD button is now enabled
6. Click the ADD button.
7. Verify a new entry on the task list has been generated
8. Repeat the operation by creating a new task with a description
9. Verify a new entry on the task list has been generated and when you mouse over the task name the description appears as tooltip

## Updating a task

### Select new status

1. Go to the "Tasks" section
2. Click on the three dots besides the task name for any task. If none is created please follow the instructions above to do so
3. Select a new value from the dropdown list
4. Refresh the page and repeat steps 1 and 2 selecting the same task as before.
5. Verify that the status that was selected is the one that is recorded in the database

### Advancing a task

1. Go to the "Tasks" section
2. Click on the three dots besides the task name for any task. If none is created please follow the instructions above to do so
3. Click on the arrow buttons
4. Verify that the task status advances to the next status in the following order:
   - Todo
   - In Progress
   - Done
   - Archived
5. Refresh the page and verify that the status that was selected is the one that is recorded in the database

## Deleting a task

1. Go to the "Tasks" section
2. Click on the trash can icon beside a task. If none is available please follow the instructions above to create one.
3. Verify that the task disappears from the list

## Starting the timer

1. Go to the "Tasks" section
2. Click on the Start button
3. Verify the timer starts counting and that it counts 1 second each second.
   - Automated tests make sure that the timer advances correctly at the minute and the hour.
4. Click on Pause button
5. Verify the timer stops
6. Click on Resume button
7. Verify the timer resumes from the same value it was before
8. CLick on Stop
9. Verify the timer stops and no option for Resume is offered
10. Click on Start again.
11. Verify the timer starts from the beginning.

## Adding time to a task

1. Go to the "Tasks" section
2. Create a new task
3. Click the stopwatch icon to mark it as active
4. Verify that above the timer you have now the task details.
5. Start the timer
6. After some time, Stop or Pause the timer
7. Verify a new button called Add Time To Task appears
8. Click this button
9. Verify the timer stops and the Stop and Pause buttons return to its original state
10. Verify that the task now has an entry for the date of today and the time it was on the timer

## Updating the settings

1. Go to the "Settings" section
2. Change the counting type and timer type
3. Go to the "Timer" section
4. Start the timer
5. Verify the timer is counting the same direction as selected on settings and that the timer amount is the one that was selected.

## Graphical reports

1. Add several tasks and times, either manually or via script to the database
2. Navigate to the "Reports" section
3. Verify that 2 pie charts and 2 line charts appears there and that the details match the ones you just recorded.
4. Click on the three dots of one of the charts and select the remove option
5. Verify that the chart disappear and the remainign ones move to keep themselves in order.

## Responsiveness

1.  Nagivate to any of the routes "Task", "Reports", "Settings"
2.  Verify by using different devices or your browser sizing feature that all pages are responsive and redimension correctly for different sizes

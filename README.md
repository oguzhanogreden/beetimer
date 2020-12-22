# Beetimer

## To-do

- [x] Extend Alarm model with audio alarm type. 
- [x] Make reminders minimally adjustable in ReminderComponent
    - [x] Input for duration and play sound state should be bound to relevant attributes of the component
    - [x] ReminderService needs a method for setting up a reminder and keeps track of reminders
- [x] Use the modeled reminder object in ReminderService
- [x] Alert service should have alertForReminder() method so that Reminder object properties can be read.
- [ ] Make UI minimally presentable
    - [x] timer and reminder cards should have uniform layout
    - [ ] remove redundant buttons
        - [x] remove timer start/pause buttons
        - [ ] remove toggle reminder button: toggle by default
    - [ ] find a better place & size for timer display
    - [ ] highlight timer-reminder pairs
    - [ ] 'disable' reminder card if timer is off.

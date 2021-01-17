# Re-Meet 

![](https://i.imgur.com/NVP0Dn5.png)
- [Devpost Submission to HackTheNorth](https://devpost.com/software/re-meet)
- [Demo Video](https://youtu.be/mhKG6pGqiTg)
- [Live Site - https://re-meet.herokuapp.com/](https://re-meet.herokuapp.com/)

## Note:
Please allow popups and wait for two Gooogle O'Auth popups.

Try it out here with the following credentials: [Live Site - https://re-meet.herokuapp.com/](https://re-meet.herokuapp.com/)
(Due to Google's verification process, we are no able to open it to the public. Please use the credentials below to test.)

## Credentials
username: remeet123@gmail.com

password: meetings123!


Try joining these test groups:
- nb3g3AKXS1
- 56SknLQvgc

Feedback appreciated!

## Inspiration

Re:Meet was inspired by the desire to know when certain individuals are online at a moment's notice. Reconnect with friends, co-workers, and peers with a simple one click and authorization to your Google calendar.

Rather than needing to add multiple Google calendars, sharing your own multiple times, or needing to be within the same organization, Re:Meet simplifies the process and offers a slick Discord-inspired UI to instantly see when everyone else is busy.

Create or join other groups using a unique group id. Toggle different calendar views while on the go! Gone are the days where we need to continuously create new When2Meets. Start today, and sync that Google calendar and start planning!

## What it does
Re:Meet allows the user to have a single sign in via Google O'Auth and utilizes Google's Calendar API in order to fetch all the times that the user current has scheduled. It displays it all on a calendar. The user can then complete the following:
- Create a group / Invite friends to the group
- Join a group via unique group id
- View all added members of the group / View all calendar events in the group
- Enjoy live updates as changes are updated in real time
- Leave groups 
- Toggle Different Views
- Mobile friendly!

## How I built it
We built it using a React front end, Material UI, and Firebase backend. For the calendar, we utilized Full Calendar and made use of Google Calendar's API.
.
## Challenges I ran into
- Deciding on a topic
- Switching topic (lol) - we scrapped out the first project idea
- Working with Async (await Promise.all)
- Synchronizing relevant information in database (had to make use of multiple connections)
- Making a demo video last minute and uploading it 15 mins before the deadline


## Accomplishments that I'm proud of
- Deployed useful and usable application within 24hours
- Mobile friendly
- Use of full calendar API and google calendar API
- synchronization of data
- Getting the video uploaded on time

.
## What I learned
- Async Issues / Debugging
- Google Calendar API
- Syncing data and combining data from multiple API calls
- Full Calendar API


## What's next for Re:Meet
- Better UI polishes
- Available/ Unavailable Status updates
- Moderation tools for owners of groups
- Further theme customization / dark mode/ custom themes
- Integration with more than just Google Calendar and other productivity apps (MS Outlook Calendar, Notion, Trello)



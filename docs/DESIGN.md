# UCSB Bike Design Docuement

## Architecture Diagram

![Lab6PT1Diagram](https://user-images.githubusercontent.com/56051313/119193971-3fb92d00-ba37-11eb-8245-699bc4a1c890.png)

## Architecture Description

- Frontend:
  - There are four pages: Map, Lost and Found, Forum, and Profile Page
  - Map: Users can see the Map with markers of recent bike crashes. Users have the ability to call CSO or make a report themselves.
  - Lost and Found: Users are able to view a variety of lost/found items around the bike trails and respond to them.
  - Forum: Users are able to converse with fellow commuters about anything related to the bike trails. There are announcements, lost and found, crash, and others.
  - Profile: Users are able to keep track of their school schedules, recent activity posts, and edit their blurb.
- Backend:
  - Our web app must interact with our backend to retrieve posts/comments made in Lost and Found and Forums
  - Our web app also needs to save user information to the backend.
- Database:
  - MongoDB
  - Stores our forum posts (with comment arrays) and user information
- User authentication:
  - Google OAUTH for @ucsb.edu students only

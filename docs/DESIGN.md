# UCSB Bike Design Document

## High-level Architecture Diagram

![Lab6PT1Diagram](https://user-images.githubusercontent.com/56051313/119194521-0f25c300-ba38-11eb-821e-ba5239b92ff3.png)

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

## Software Architecture Design 
* More Detailed SW Architecture Design: Describe the main modules in your SW Design in more detail

## Design Process 

Design Process Documentation Section: This is where you can satisfy the point a) from the first grading bullet above: Document your design process by summarizing important team decisions referring to specific meetings logged in your GitHub repo.

## User Interface and User Experience Considerations 
### UI Design 
* Home Page: User can interact with the map 
![image](https://user-images.githubusercontent.com/60118889/119941548-9b0e8200-bf45-11eb-84c3-4c0c70962e50.png)

* Lost and Found Page: User can add items that they've lost 
![image](https://user-images.githubusercontent.com/60118889/119937969-7d8ae980-bf40-11eb-9691-25457b72a6a2.png)

* Forum Page: Users are able to interact with each other by adding posts to the forum 
    * Basic Layout: Overview of all the posts and button to create post 
![image](https://user-images.githubusercontent.com/60118889/119940510-2555e680-bf44-11eb-94ed-7d3c37ae0fd0.png)

* About Us Page: information about the dev team (will be updated with our actual pics soon) 
![image](https://user-images.githubusercontent.com/60118889/119940278-ce501180-bf43-11eb-9ed9-9443dd737a91.png)

* Profile Page: contains user's information, such as name, email, etc, as well as their schedule and post history. 
![image](https://user-images.githubusercontent.com/60118889/119940638-58987580-bf44-11eb-979b-e217d076c912.png)

### User Experience 
* Forum Page: 
    * Create Post: Form to create post 
![image](https://user-images.githubusercontent.com/60118889/119940578-428ab500-bf44-11eb-8c86-e6b0ddaeae41.png)
    * View Post: How the post looks after it's been created as well as button to comment on post 
![image](https://user-images.githubusercontent.com/60118889/119940608-4ddde080-bf44-11eb-9546-5969339e0f73.png)

* Lost and Found: 
    * Form Validation 
![image](https://user-images.githubusercontent.com/60118889/119938222-ec684280-bf40-11eb-8d02-1cd07df150e2.png)

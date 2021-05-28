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

## Software Architecture Design and Design Process

### Stage I: Homepage/Maps
For our webapp, we decided to start by brainstorming how the homepage should look to the user. We knew that since the bike map is the focus of our webapp, the map had to be included on our home page. We used Google Jamboard to draw out roughly how we want the front page to look like and which components we want on it.

<img width="997" alt="Screen Shot 2021-05-28 at 12 13 12 AM" src="https://user-images.githubusercontent.com/28207372/119944746-803e0c80-bf49-11eb-9938-b0aa08a4ebb3.png">

After making the design decision that the map should be on the home page, we looked at several different map platforms such as Google Maps, Leaflet, and MapBox. With further research into the features that each platform would provide, we narrowed our decision down to choosing between Google Maps and Leaflet. We made a spreadsheet to document the pros and cons of each platform. 

<img width="1175" alt="Screen Shot 2021-05-28 at 12 18 29 AM" src="https://user-images.githubusercontent.com/28207372/119945387-3c97d280-bf4a-11eb-837a-93ff1ced1653.png">

We then individually tried setting up the different maps on different branches. One of us set up an API key to use for Google Maps, and the other set up a Leaflet map. Both are shown below:

Google Maps:
<img width="650" alt="Screen Shot 2021-05-28 at 12 19 58 AM" src="https://user-images.githubusercontent.com/28207372/119945536-723cbb80-bf4a-11eb-9306-0d99234e6e34.png">

Leaflet:
<img width="257" alt="Screen Shot 2021-05-28 at 1 02 34 PM" src="https://user-images.githubusercontent.com/28207372/120036430-faf04180-bfb4-11eb-90e2-9153f468cd18.png">


Because of the amount of npm packages available to support Google Maps development in React and the overall strength of the developer community around this platform, we made the design decision to continue working with Google Maps.


### Stage II: Forum page
We then made design decisions regarding the Forum tab of our webapp. We discussed which categories of posts users should be able to create. There were two different visions of how the Forum page could be set up:

Either
<img width="1048" alt="Screen Shot 2021-05-28 at 12 28 51 AM" src="https://user-images.githubusercontent.com/28207372/119946625-af557d80-bf4b-11eb-8599-17adf6798fbb.png">

Or:
<img width="1048" alt="Screen Shot 2021-05-28 at 12 29 15 AM" src="https://user-images.githubusercontent.com/28207372/119946681-bda39980-bf4b-11eb-9518-fe858b7dd12d.png">

The first option is what we incorporated into the dropdown menu, and we set up the overall Forum page design roughly off of the second image, with the final product looking like this:

<img width="1018" alt="Screen Shot 2021-05-28 at 12 34 34 AM" src="https://user-images.githubusercontent.com/28207372/119947326-7bc72300-bf4c-11eb-868d-10e0f406b2d6.png">

There were also considerations made on how a post should look once it has been created, and here's how the design looked:

<img width="1038" alt="Screen Shot 2021-05-28 at 12 40 53 AM" src="https://user-images.githubusercontent.com/28207372/119948114-5dadf280-bf4d-11eb-9b08-06906fb26b3c.png">

We implemented this design, and it ended up looking like this:

<img width="947" alt="Screen Shot 2021-05-28 at 12 40 10 AM" src="https://user-images.githubusercontent.com/28207372/119948030-44a54180-bf4d-11eb-8fc1-33e402ebced2.png">

With making these design decisions for each separate page, we realized that a lot of our design decisions were centered around the considerations of how a page should look after an user performs an EVENT. As in, what should happen if a user clicks a button? Creates a new post? Comments on a post? Clicks on post? Signs in? etc.

### Stage III: Lost and Found Page
We made design decisions for the Lost and Found Page, with the following considerations: 
* Users should only be able to make a post for lost and found if they are signed in to the website (which they need to be a UCSB student or staff member to do so).
* Users should be able to add an image and description of the item they have lost and the time the item was posted should be included on the card. 
* Once the item has been found, the user should be able to close the post

Pictured below: User can create post if signed in

<img width="900" alt="Screen Shot 2021-05-28 at 1 08 10 AM" src="https://user-images.githubusercontent.com/28207372/119951762-2d685300-bf51-11eb-8144-72856f7b5f15.png">

Pictured below: User cannot create post if not signed in (the "create post" button is greyed out):

<img width="962" alt="Screen Shot 2021-05-28 at 1 08 56 AM" src="https://user-images.githubusercontent.com/28207372/119951876-48d35e00-bf51-11eb-84bb-c2b417a6d7ed.png">

The same design decision was applied to the Forum posts.For both the Forum and Lost and Found, part of the design component was that database functionality is necessary to store the posts and comments. Schemas were created in MongoDB as part of the backend implementation. 

### Stage IV: Profile page
As part of a user's profile, we decided to include their profile picture (linked to their UCSB account), a bio, and the ability to add their schedule using the times of the day and a dropdown menu of UCSB buildings where classes are held (this feature is still under construction). When we implement the alerting system, having this dropdown menu will be useful to calcuate the distance between an user's current location and their next class. The profile page also contains the history of the items the user previously published in Lost&Found. 

<img width="931" alt="Screen Shot 2021-05-28 at 1 12 24 AM" src="https://user-images.githubusercontent.com/28207372/119952349-c4cda600-bf51-11eb-9ad2-1a759943202b.png">

[add tech stack decisions]

# User Interface and User Experience Considerations 
## UI Design 

### Home Page: User can interact with the map and report crashes or call the CSO

![image](https://user-images.githubusercontent.com/60118889/119941548-9b0e8200-bf45-11eb-84c3-4c0c70962e50.png)

### Lost and Found Page: User can publish a card with information about an item they lost

![image](https://user-images.githubusercontent.com/60118889/119937969-7d8ae980-bf40-11eb-9691-25457b72a6a2.png)

### Forum Page: Users are able to create posts to discuss with each other in four different categories (Announcements, Crash Report, Lost and Found, Other)
* Basic Layout: Overview of all the posts and button to create post. Can view comments on post as well. Need to be signed in to create a post. 

![image](https://user-images.githubusercontent.com/60118889/119940510-2555e680-bf44-11eb-94ed-7d3c37ae0fd0.png)

### About Us Page: Information about the dev team (will be updated with our actual pics soon) 

![image](https://user-images.githubusercontent.com/60118889/119940278-ce501180-bf43-11eb-9ed9-9443dd737a91.png)

### Profile Page: contains user's information, such as name, email, etc, as well as their schedule and post history. 

![image](https://user-images.githubusercontent.com/60118889/119940638-58987580-bf44-11eb-979b-e217d076c912.png)

## User Experience 

### Forum Page: 
* Create Post: If the user is logged in, they can click on the "create post" button and see a form to create a post.
* The user can close a post if the issue they posted about got resolved.


![image](https://user-images.githubusercontent.com/60118889/119940578-428ab500-bf44-11eb-8c86-e6b0ddaeae41.png)

 * View Post: How the post looks after it's been created as well as button to comment on post 
![image](https://user-images.githubusercontent.com/60118889/119940608-4ddde080-bf44-11eb-9546-5969339e0f73.png)

### Lost and Found: 
* Form Validation (need to enter something in all fields to publish a lost and found card.

![image](https://user-images.githubusercontent.com/60118889/119938222-ec684280-bf40-11eb-8d02-1cd07df150e2.png)

The user is not required to do any activities on our webapp in a particular order. They can independently publish a Forum post or a Lost and Found post without accessing the map to report a crash or see where crashes have happened in the day. 

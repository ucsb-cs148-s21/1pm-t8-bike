# UCSB Bike Design Document

## High-level Architecture Diagram

![image](https://user-images.githubusercontent.com/60118889/121272150-16dbc900-c87a-11eb-82d9-bb254fc0c72c.png)

## Architecture Description

- Frontend:
  - There are five pages: Map, Lost and Found, Forum, About Us, and Profile Page
  - Map: Users can see the Google Map with markers of recent bike crashes and bike rack markers on campus. Users have the ability to call CSO or make a report themselves. Users will also be able to see what time they should leave for their next class by clicking on the button indicating their mode of transport to their classes. They can also see past and future classes on the Map page. 
  - Lost and Found: Users are able to view a variety of posts about lost/found items around the bike trails and respond to them. They can close the post once the item has been found. 
  - Forum: Users are able to converse with fellow commuters about anything related to the bike trails. There are announcements, lost and found, crash, and others.
  - Profile: Users are able to keep track of their school schedules, recent activity posts, and edit their bio blurb.
- Backend:
  - Our web app must interact with our backend to retrieve posts/comments made in Lost and Found and Forums
  - Our web app also needs to save user information to the backend.
- Database:
  - MongoDB
  - Stores our forum posts (with comment arrays) and user information
  - Stores bike rack marker locations permanently in the database, and crash marker locations temporarily. 
  - Stores information about a user's class schedule
- User authentication:
  - Google OAUTH for @ucsb.edu students only

## Software Architecture Design and Design Process

Tech stack Decisions: For our tech stack, we used React, Node.js, and MongoDB. The reason we used React is because it is an extremely popular frontend framework with a strong online community and tutorials to aid in development. Many of our team members had some experience in Javascript/HTML/CSS which made it convenient to ramp up with as a new technology. Node.js is a javascript backend and again had many resources for a team of members with limited full stack development experience. We decided to use MongoDB after watching a MERN stack video and understanding that the MERN stack allows a smooth 3-tier connection between the web, server, and database (working particularly well with Node.js). 

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

In terms of the features we implemented on the map page, we made the following decisions. We decided to make the Google Map show up on one half of the whole page, and the user travel alert feature on the other half of the page. This way, both main functionalities of the page are viewed equally. On the map, we decided to put bike rack markers all over the UCSB campus portion. The markers are a bike parking icon. For the crash markers, we decided that they should show up once the "report a crash" button is pressed. The crash markers have a hazard sign icon. If an user hovers over the crash marker, they can see the time a crash was reported. 

For the alerting feature, we wanted an user's most upcoming class to show up at the top, since that is the class for which they'd want to know what time to start commuting towards. We thought it would be useful to include the user's past and future classes on the side as well, just so they would remember which classes are coming next in the day and which ones already passed. 

After including these two features in the page, it ended up looking as follows:

<img width="1313" alt="Screen Shot 2021-06-08 at 2 22 47 AM" src="https://user-images.githubusercontent.com/28207372/121159861-6da4bc80-c800-11eb-97eb-c28be6ce98c5.png">

We also made several stylistic designs for the colors and animations that different elements on the page should have. For example, on the navbar at the top of the page, we added a logo of a person biking since it represents the type of user the app was made for. We also added a favicon to the tab of the website. When an user hovers over a tab in the navbar to navigate to it, the tab turns a different color. We did this because it is more interactive for the user to see right before they click on the tab. 

When no tabs are hovered over:
<img width="1049" alt="Screen Shot 2021-06-08 at 2 25 12 AM" src="https://user-images.githubusercontent.com/28207372/121160244-c411fb00-c800-11eb-9295-41c7bdda6669.png">

When a tab is hovered over, about to click:
<img width="1050" alt="Screen Shot 2021-06-08 at 2 25 49 AM" src="https://user-images.githubusercontent.com/28207372/121160325-d8ee8e80-c800-11eb-969d-ca3def1d04bf.png">

The home page primarily uses the colors blue, green, and white. We decided to use these colors because they match closely with the color scheme presented on Google Maps. 

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

In terms of the final iteration of the forums page, we made the buttons and flags all show up to match the Google Maps related color scheme that we used on the home page. 

<img width="1095" alt="Screen Shot 2021-06-08 at 2 31 08 AM" src="https://user-images.githubusercontent.com/28207372/121161188-96798180-c801-11eb-8b30-fa00211e7118.png">


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

In the final iteration of the Lost and Found page, we decided to organize Lost and Found cards in a grid fashion rather than by row, because we felt it would look more appealing to fill up the page from right to left with these small crads rather than having all cards show up left-justified in rows. 

<img width="780" alt="Screen Shot 2021-06-08 at 2 33 55 AM" src="https://user-images.githubusercontent.com/28207372/121161578-fbcd7280-c801-11eb-9a5d-b0ba92116314.png">


### Stage IV: Profile page
As part of a user's profile, we decided to include their profile picture (linked to their UCSB account), a bio, and the ability to add their schedule using day and time options and a dropdown menu of UCSB buildings where classes are held. The class locations' coordinates are stored in the database so the alerting system can access them to calculate travel time. The profile page also contains the history of the items the user previously published in Lost & Found. 

<img width="931" alt="Screen Shot 2021-05-28 at 1 12 24 AM" src="https://user-images.githubusercontent.com/28207372/119952349-c4cda600-bf51-11eb-9ad2-1a759943202b.png">

### Stage V: About Us page
The About Us page gives information at the top about the goal of our website. It then shows a picture, role, and short intro for each member of the developer team.

# User Interface and User Experience Considerations 
## UI Design 

### Home Page: 
* User can see the Google Map zoomed in and centered on UCSB/Isla Vista. They can see the locations of all the bike racks on and off campus, indicated by markers with bike parking icons. The user also sees a "Call CSO" and "Report a Crash" button, which are two safety features provided by this page of the app. The user also sees a "I'm biking" and "I'm walking" button for them to choose their mode of transportation, as well as a refresh button to update their list of most upcoming classes, past and future classes. 

Started with this:
![image](https://user-images.githubusercontent.com/60118889/119941548-9b0e8200-bf45-11eb-84c3-4c0c70962e50.png)

Ended at this:
<img width="1179" alt="Screen Shot 2021-06-08 at 2 40 49 AM" src="https://user-images.githubusercontent.com/28207372/121162615-f0c71200-c802-11eb-901e-6f2e90810ce5.png">


### Lost and Found Page: 
* This page contains a list of all lost items to date, organized in grid format for easy left-to-right readibility.

Started with this:
![image](https://user-images.githubusercontent.com/60118889/119937969-7d8ae980-bf40-11eb-9691-25457b72a6a2.png)

Ended at this:
<img width="789" alt="Screen Shot 2021-06-08 at 2 42 01 AM" src="https://user-images.githubusercontent.com/28207372/121162819-1c49fc80-c803-11eb-8cd7-c2ea3ce65d79.png">


### Forum Page: 
* Basic Layout: Overview of all the posts and button to create post. Can view comments on post as well. Need to be signed in to create a post. 
* Users are able to see and filter existing posts in four different categories (Announcements, Crash Report, Lost and Found, Other)

Started with this:
![image](https://user-images.githubusercontent.com/60118889/119940510-2555e680-bf44-11eb-94ed-7d3c37ae0fd0.png)

Ended at this:
<img width="977" alt="Screen Shot 2021-06-08 at 2 42 15 AM" src="https://user-images.githubusercontent.com/28207372/121162845-24a23780-c803-11eb-9585-306c1ccd26cd.png">


### About Us Page: 
* Information about the dev team

### Profile Page: 
* Contains user's information, such as name, email, etc, as well as a form to add their schedule, then see their schedule and past post history. 

![image](https://user-images.githubusercontent.com/60118889/119940638-58987580-bf44-11eb-979b-e217d076c912.png)

<img width="1152" alt="Screen Shot 2021-06-08 at 2 43 51 AM" src="https://user-images.githubusercontent.com/28207372/121163098-5ddaa780-c803-11eb-9a20-bd4996e3226b.png">

## User Experience 

### Home Page (Map Page): 
* User can zoom in and out of Google Map to see the location of bike rack markers. 
* They can click the "Report a Crash" button, and a crash marker will appear over their current location (consent to share location with the website is asked for before this marker is placed).
* For a user who is simply looking at the map, they can navigate throughout the map, and if they hover over a crash marker they will see a black window containing the date and time a crash was reported. 
* They can call a CSO by clicking the "CALL CSO" button
* Users can click the button for biking/walking based on what they are doing, and then see the travel time from their location to their upcoming class, and when they should leave, both listed on the right side of the page.

### Forum Page: 
* Create Post: If the user is logged in, they can click on the "create post" button and see a form to create a post.
* Once an item is found, the user can close the post and it will be cached in their profile page.

![image](https://user-images.githubusercontent.com/60118889/119940578-428ab500-bf44-11eb-8c86-e6b0ddaeae41.png)

 * View Post: How the post looks after it's been created as well as button to comment on post 
![image](https://user-images.githubusercontent.com/60118889/119940608-4ddde080-bf44-11eb-9546-5969339e0f73.png)

### Lost and Found Page: 
* User can publish a card with information about an item they lost
* Form Validation (need to enter something in all fields to publish a lost and found card.

![image](https://user-images.githubusercontent.com/60118889/119938222-ec684280-bf40-11eb-8d02-1cd07df150e2.png)
The user is not required to do any activities on our webapp in a particular order. They can independently publish a Forum post or a Lost and Found post without accessing the map to report a crash or see where crashes have happened in the day. 

### Profile Page
* User can add their schedule using a dropdown menu of UCSB buildings and the times and days of their classes
* User can delete a class from their schedule by pressing the "x" on the class card

# Bike Map

# Table of Contents
* [Target User Group](#target-user-group)
* [Purpose](#purpose)
* [Type of Users](#type-of-users)
* [Product Features](#product-features)
  * [Map](#map-home-page)
  * [Lost and Found](#lost-and-found)
    * [Changing Status](#changing-status)
    * [Creating a New Post](#adding-a-new-post)
  * [Forum](#forum)
    * [Viewing a Post](#viewing-a-forum-post)
    * [Creating a New Post](#creating-a-forum-post)
    * [Comments](#comments)
  * [Profile](#profile)
    * [Adding a Class](#adding-a-class)
    * [Deleting a Class](#deleting-a-class)
    * [Post History](#post-history)
  
# Target User Group
* UCSB students who regularly commute on campus seeking the best time to depart for each class

# Purpose
* THe UCSB Bike Map focuses on sharing new information about the bike paths in order to alert UCSB users on the optimal time for leaving to and from classes and make commuting feel more of a community. This app will display recent bike crashes that occur on the bike path in order to inform the user of potential delays in the daily commute on campus. It will also provide an estimated commute time between buildings and alert the user on the most optimal time for departure based on their user inputted schedule. There will also be a way to report lost/found items that were dropped while commuting.

# General Outline
* Gaucho Bike Map has 5 tabs that enhance the user's experience and can change depending on the type of user. The tabs are: HomePage/Map, Lost and Found, Forum, About Us, and Profile. 
*
# Type of Users
* There are two kinds of users that will use this website. The first kind of users are users who are not logged into their UCSB Google account, referred to as "Guest Users." Guest users only have the ability to view posts and the marked map. Guest users can benefit from this website by being able to view crash reports on the Home Page or just to browse the forum. 
* Guest User's Perspective of Home Page:
![image](https://user-images.githubusercontent.com/56051313/121294936-0ee44f00-c8a3-11eb-9873-79113b993087.png)

* The second kind of users are users who are logged in, or registered users. Registered users have much more features available to them, such as the ability to create/edit/delete posts and comments, unlocked the Profile tab, and can create crash markers. Registered users are also able to view any upcoming classes and the time it takes to commute on the Home Page.
* Registered User's Perspective of Home Page:
![image](https://user-images.githubusercontent.com/56051313/121295064-494dec00-c8a3-11eb-8300-6069a05504bb.png)

# Product Features

## Map (Home Page)
* This is our Home Page and the first page that users will see when opening up our website.
* On this page, users will see a map, and above it 'Report Crash' and 'Call CSO' button. If you are logged in, on the right of this, users can view their daily itinerary, which displays your upcoming class followed by an estimated travel time and a recommended time to leave based on whether you select 'I'm biking!' or 'I'm walking'. The default mode is set to biking and users may click 'Refresh' whenever they'd like to recieve the most recent time calculations. Below the upcoming class, users can view a list of their future classes that day followed by a list of already past classes. In order to fill your itinerary with classes, reference the schedule section of the profile page.

* Map (Home Page) Layout
![image](https://user-images.githubusercontent.com/56051313/121295064-494dec00-c8a3-11eb-8300-6069a05504bb.png)
* Class Schedule and Estimated Commute Time
![image](https://user-images.githubusercontent.com/56051313/121298143-3853a980-c8a8-11eb-91d2-b8c6af7f1638.png)

* Biking vs. Walking Estimated Times
![bikevswalk](https://user-images.githubusercontent.com/56051313/121302902-3d682700-c8af-11eb-879d-d8c91ee7eac0.png)

* The map will show all recent bike crashes and all bike racks on campus in the form of markers.
* When you click on the 'Report Crash' Button, it will create a new marker on the map at your current location.
* When you click on the 'Call CSO' Button, it will call CSO so as to request their help on campus.
![dddd](https://user-images.githubusercontent.com/56051313/121298677-1eff2d00-c8a9-11eb-8471-a71df9276a4a.png)

## Lost and Found
* Here, users are able to view Lost/Found Items that were encountered around campus. Any Lost and Found post with an attached image will be displayed and all Lost and Found posts will display the title, author, short description, and time of posting. Clicking on a post will redirect you to the corresponding Forum post page where comments and responses may be made by other users.
![image](https://user-images.githubusercontent.com/56051313/121298776-4c4bdb00-c8a9-11eb-9b4a-c60ba9eca97e.png)

### Changing Status
* Lost and Found posts are capable of being closed by the user so that others can know that an item has been returned/found.
![image](https://user-images.githubusercontent.com/56051313/121299462-4efb0000-c8aa-11eb-9fb0-9255a94c77b3.png)

### Adding a New Post
* Logged in users are able to create a new Lost and Found post and/or add comments to existing posts.
  * Creating a New Lost and Found Post, Click on the 'Create Post' button:
  ![image](https://user-images.githubusercontent.com/56051313/121299079-b8c6da00-c8a9-11eb-96bc-420c0086cfe1.png)
  * This is where you can submit a post. Title, Description are required but image is optional.
  ![image](https://user-images.githubusercontent.com/56051313/121298931-8321f100-c8a9-11eb-909f-9449c28d6c23.png)

## Forum
* Here, this is a broader section of posts where users can discuss about anything related to commuting. This could include further discussions of specific crashes/incidents, announcements, or other off-topic conversations. Forums will also include the Lost and Found posts from the Lost and Found page.
* Logged in users are able to create a post and/or add comments to existing posts. The ability to edit/delete a post/comment is always available to the author, and similarly to the Lost & Found posts, the author may always change the status of a post from "OPEN" to "CLOSED" in order to notify other users.
* Main Page of Forum:
![image](https://user-images.githubusercontent.com/56051313/121300018-1c9dd280-c8ab-11eb-9faa-46f97c4ba7ea.png)

### Viewing a Forum Post
* Every post will display its title,author,date,description, and/or image. Underneath the post are the comments.
* If you are the owner of the post, three additional buttons will appear: 'Edit' 'Delete' and 'Change Status'
![forumcompared](https://user-images.githubusercontent.com/56051313/121300503-c5e4c880-c8ab-11eb-9cd9-057e97f3b1b9.png)

### Creating a Forum Post
* If you are logged in, click on the "Create New Post" button to be redirected to the Create-Post page
![createnewforumpost](https://user-images.githubusercontent.com/56051313/121301232-bb76fe80-c8ac-11eb-9f35-2091578ab0c3.png)

### Comments
* If you are logged in, you can add comments to anyone's posts. You can also have the option of editing/deleting them afterwards
![image](https://user-images.githubusercontent.com/56051313/121301453-11e43d00-c8ad-11eb-914f-10282b4ff8bd.png)

## Profile
* Only logged in users can view this page, where personal information such as your name, email, and profile pic are displayed.
* On this page, users are able to add classes to their schedule and view their L&F/Forum post history. Any classes added to the schedule will appear within the daily itinerary on the Map (Home Page) whenever the user has class on that current day.
* Every class consists of a title, location (selected from a dropdown of all UCSB buildings), days of the week, and a time interval.
* Users also have their own 'bio' which they can update at any time.

* Profile Page Layout:
![image](https://user-images.githubusercontent.com/56051313/121301692-6edff300-c8ad-11eb-8604-7790817da109.png)

### Adding a Class
* Here, you can add classes that you would want the HomePage to encorporate it into the 'Travel Time' and 'Recommended Time to Leave' outcomes.
* You must insert a name, location, days, and time in order to successfully submit. After submit, the inputs do not clear but rest assure that the class has been added.
![image](https://user-images.githubusercontent.com/56051313/121302098-05acaf80-c8ae-11eb-8b5a-bd3eb1004405.png)


### Deleting a Class
* Delete a class by clicking on the small 'x' at the top right corner of the class
![image](https://user-images.githubusercontent.com/56051313/121302151-1c530680-c8ae-11eb-95cc-28e61c17c912.png)

### Post History
* The very last section of the Profile Page is the History. History contains all of your created posts from Lost and Found and Forum for easy access.
* There is a convenient "Change Status" button for if you would to change it from Profile.
![image](https://user-images.githubusercontent.com/56051313/121302246-43113d00-c8ae-11eb-8b05-cb4c346300af.png)



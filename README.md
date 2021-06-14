# Project: Gaucho Bike Map 
A map of UCSB's bike path that has features such as lost and found, forum, and crash reports. Users can request an estimated travel time to their destination and an optimal time for departure. Bikers are able to also see nearby available bike racks and report crashes. Walkers are able to view/report/claim lost and found items that are found on the bike paths.

# Team info: 
* Anika Arora, github id: AnikaArora 
* Rukmini Bapat, github id: minibapat
* Calvin Dougher, github id: calvitronic 
* Yvonne Liu, github id: yvonneliu0201 

# User Roles
* Bikers
* Walkers

# User Permissions
* @ucsb.edu users only can view/create/respond to posts and access map functionality
* non @ucsb.edu can view posts and access map functionality

# Tech Stack: 
* React frontend 
* Node.js backend 
* MongoDB
* Heroku 

# Dependencies
* Google OAuth
* Google Maps
* Google Distance Matrix
* Google Cloud

# [Deployment Instructions](./docs/DEPLOY.md)

# [User Manual](./docs/MANUAL.md)

# [Design Doc](./docs/DESIGN.md)

# Functionality
* First, login to your ucsb gmail account. There are four tabs to the website: Map, Lost & Found (L&F), Forum, Profile.
* In the landing page, Map: Can view map of UCSB/IV with markers designating bike rack locations, report crashes, and view a custom itinerary for the day based on your course schedule, updating the user on estimated travel times depending on whether you are walking or biking, as well as providing the recommended time to leave for the upcoming class so as to be on-time. Can also conveniently call CSO with the click of a button.
* In Lost and Found：Can create a new L&F card (if ucsb user), view L&F card along with any attached images, as well as respond to L&F cards. Report any lost items including bikes.
* In Forum: Posts can be crash reports, L&F, anouncements, or other posts related to the bike path. Users can create a new post (if ucsb user), view posts, and respond to posts via comments.
* In Profile: When logged in, users can view personal info, such as your name, email, and profile picture. Users are able to update their schedule of courses for the quarter and can view a history of their L&F/forum posts, where they have the option to change the OPEN/CLOSED status of their posts.

# Known Problems
* N/A

# Deployment 
https://cs148-bikeproject.herokuapp.com/

# Final Presentation Video Link
https://youtu.be/R8szhhHcQyo

# Changes after Final Release
* Deleted the following garbage files: data.js, Map(old).js, Forum_Post_OLD.js, alerts.js.
* Minimal resizing and touching up styling of Map (Home Page).


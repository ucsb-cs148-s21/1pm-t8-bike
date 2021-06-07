# Project: Gaucho Bike Map 
A map of UCSB's bike path that has features such as lost and found, forum, and crash reports. Users can request an estimated travel time to their destination and an optimal time for departure. Bikers are able to also see nearby available bike racks and report crashes. Walkers are able to view/report/claim lost and found items that are found on the bike paths.

# Links:
* https://cs148-bikeproject.herokuapp.com/

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
* Google Cloud

# [Deployment Instructions](./docs/DEPLOY.md)

# Functionality
* First, login to your ucsb gmail account. There are four tabs to the website: Map, Lost & Found (L&F), Forum, Profile
* In Map tab: Can track bike route for L&F purposes, report crashes, and get alerts on when to leave for class. Can call CSO from this page.
* In Lost and Found Tab： Can create a new L&F card (if ucsb user), view L&F card, respond to L&F cards (if ucsb user). Report lost items including bikes.
* In Forums: Posts can be crash reports, L&F, or other bike related post. User can create a new post (if ucsb user), view posts, respond to posts (if ucsb user).
* Profile: Can view profile info, such as name, email, and picture.

# Known Problems
* N/A

# Deployment 
https://cs148-bikeproject.herokuapp.com/

# Changes after Final Release
* Deleted the following garbage files: data.js, Map(old).js, Forum_Post_OLD.js, alerts.js.

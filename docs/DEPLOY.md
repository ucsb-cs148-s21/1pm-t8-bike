# Prerequisites
* git v2.24+
* npm v6.14+
* Node.js v14.16+ 

# Installation Steps
* Update/Install git
* Clone repo: git clone git@github.com:ucsb-cs148-s21/1pm-t8-bike.git
* Enter repo: cd 1pm-t8-bike/
* Install npm: npm install
* Install google-map-react: npm install google-map-react
* Install Node.js: https://nodejs.org/en/download/
* Setup .env environment file: 

1. REACT_APP_AUTH_CLIENT_ID = '425045287491-hopbavpi7dkcan749qnkdr2avfn5gj6c.apps.googleusercontent.com'
  * Follow these instructions: In your .env file, add this line: **REACT_APP_AUTH_CLIENT_ID = '425045287491-hopbavpi7dkcan749qnkdr2avfn5gj6c.apps.googleusercontent.com'**. Now, the map should be able to render properly on the page. This API key is enabled for users to be able to access the map and its features. 

2. REACT_APP_GOOGLE_KEY = 'AIzaSyD6uJFBrWLVwIr8NuiOqgCOHZCvOOxb3MA'
  * Follow these instructions: In your .env file, add this line: **REACT_APP_GOOGLE_KEY = 'AIzaSyD6uJFBrWLVwIr8NuiOqgCOHZCvOOxb3MA'**. Now, the map should be able to render properly on the page. This API key is enabled for users to be able to access the map and its features.

3. REACT_APP_DISTANCE_KEY = 'AIzaSyBagPLQYd_ild9r_JDJ6DHcGNyWJ2J17to'
  * Follow these instructions: In your .env file, add this line: **REACT_APP_DISTANCE_KEY = 'AIzaSyBagPLQYd_ild9r_JDJ6DHcGNyWJ2J17to'**. Now, features related to travel time should function properly. This API key is enabled for users to be able to recieve travel time estimates.

4. GOOGLE_APPLICATION_CREDENTIALS = 'bike-testing-1-838db3985ce6.json'
  * Follow these instructions: In your .env file, add this line: **GOOGLE_APPLICATION_CREDENTIALS = 'bike-testing-1-838db3985ce6.json'**. Now, images should load correctly and save to the cloud. This API key is enabled for users to be able to view upload images of lost and found items.
 
5. ATLAS_URI = 'mongodb+srv://demo:t8-bike@t8-bike.owqjk.mongodb.net/myFirstDatabase?retryWrites=true&w=m'
  * Follow these instructions: In your .env file, add this line: **ATLAS_URI = 'mongodb+srv://demo:t8-bike@t8-bike.owqjk.mongodb.net/myFirstDatabase?retryWrites=true&w=m'**. Now, the map should be able to render properly on the page. This API key is enabled for users to be able to access the map and its features. 

6. REACT_APP_SERVER_URI = http://localhost:3001
* Run: npm run build
* Run: npm run server
* Done!

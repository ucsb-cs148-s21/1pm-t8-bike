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
 
3. ATLAS_URI = <MongoDB URI>
  * Follow these instructions: Go to the MongoDB website, create a new account, and create a new project. Then proceed to create a new cluster, selecting the aws cloud provider and nearest region geographically. Finally, create it specifying the free tier so that no one has to pay. Proceed to whitelist your connection IP address and then create a MongoDB User. Now in order to connect to the cluster, simply select Connect your Application, and copy the given code into the .env file, replacing the username and password fields with their respective values based on your MongoDB User. Detailed instructions can be followed referencing the first 9 minutes of https://youtu.be/7CqJlxBYj-M.

 4. REACT_APP_SERVER_URI = http://localhost:3001
* Run: npm run build
* Run: npm run server
* Done!

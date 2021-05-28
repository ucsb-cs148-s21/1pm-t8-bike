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
1. REACT_APP_AUTH_CLIENT_ID = <Google OAuth ID>
  * Follow these instructions: Go to the Google API Credentials website, sign in with your Google account, and create a new project. Within the Credentials tabs, select Create Credentials, then choose the OAuth client ID option. Once you have created the credential, update its list of URIs to include the webpage address hosting the app. Finally, you should be able to copy the client ID and paste it into the .env file.
2. REACT_APP_GOOGLE_KEY = <Google Map Key>
  * Follow these instructions: 
3. ATLAS_URI = <MongoDB URI>
  * Follow these instructions: Go to the MongoDB website, create a new account, and create a new project. Then proceed to create a new cluster, selecting the aws cloud provider and nearest region geographically. Finally, create it specifying the free tier so that no one has to pay. Proceed to whitelist your connection IP address and then create a MongoDB User. Now in order to connect to the cluster, simply select Connect your Application, and copy the given code into the .env file, replacing the username and password fields with their respective values based on your MongoDB User. Detailed instructions can be followed referencing the first 9 minutes of https://youtu.be/7CqJlxBYj-M.
4. REACT_APP_SERVER_URI = http://localhost:3001
* Run: npm run build
* Run: npm run server
* Done!

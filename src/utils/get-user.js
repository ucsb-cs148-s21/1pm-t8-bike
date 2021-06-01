import axios from 'axios';

export default function getUser() {
  if (window.gapi === undefined || window.gapi.auth2 === undefined) {
    return null;
  }

  const authInstance = window.gapi.auth2.getAuthInstance();
  const isSignedIn = authInstance.isSignedIn.get();

  if (isSignedIn === false) {
    return null;
  }

  const profile = authInstance.currentUser.get().getBasicProfile();
  const user = {
    ID: profile.getId(),
    fullName: profile.getName(),
    givenName: profile.getGivenName(),
    familyName: profile.getFamilyName(),
    imageUrl: profile.getImageUrl(),
    email: profile.getEmail(),
    signOut: authInstance.signOut,
  };

  //add user to database if they dne
  axios.get(`/users/${user.email}/exists`) //get request
  .then(res => {return user;})

  return user;
}

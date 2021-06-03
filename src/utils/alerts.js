export default function alertTimes() {
    if (window.gapi === undefined || window.gapi.auth2 === undefined) {
      return null;
    }
  
    const authInstance = window.gapi.auth2.getAuthInstance();
    const isSignedIn = authInstance.isSignedIn.get();
  
    if (isSignedIn === false) {
      return null;
    }
}
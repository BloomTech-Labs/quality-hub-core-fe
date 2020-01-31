import auth0 from "auth0-js";

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_CLIENT_ID,
      redirectUri: "http://localhost:3000/callback",
      audience: "https://explorequality.auth0.com/userinfo",
      responseType: "token id_token",
      scope: "openid email"
    });

    this.authFlag = "isLoggedIn";

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  isAuthenticated() {
    return JSON.parse(localStorage.getItem(this.authFlag));
  }

  setSession(authResult) {
    this.idToken = authResult.idToken;
    localStorage.setItem(this.authFlag, JSON.stringify(true));
  }

  signIn() {
    this.auth0.authorize();
  }

  signOut() {
    localStorage.setItem(this.authFlag, JSON.stringify(false));
    this.auth0.logout({
      returnTo: "http://localhost:3000",
      clientID: "LUft9iOEONnQilP8mFDdmiBHdNljGJ2u"
    });
  }

  getIdToken() {
    return this.idToken;
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResults) => {
      console.log("AUTH RESULTS", authResults);
      if (authResults && authResults.idToken) {
        let expiresAt = JSON.stringify(
          authResults.expiresIn * 1 + new Date().getTime()
        );
        // localStorage.setItem("access_token", authResults.accessToken);
        localStorage.setItem("token", authResults.idToken);
        localStorage.setItem("email", authResults.idTokenPayload.email);

        localStorage.setItem(
          "loginCount",
          authResults.idTokenPayload["http://logins"]
        );

        localStorage.setItem("expires_at", expiresAt);
        localStorage.setItem("id", authResults.idTokenPayload.sub);

        // if (localStorage.getItem("loginCount") > 1) {
        //   //GO HERE ON SIGN IN
        //   console.log("REDIRECTING FROM AUTH0 SIGN IN");
        //   this.props.history.replace("/");
        // } else {
        //   //GO HERE ON SIGN UP
        //   console.log("REDIRECTING FROM AUTH0 SIGN UP");
        //   this.props.history.replace("/signup");
        // }
      } else {
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    console.log("AUTH RESULT", authResult);
    this.idToken = authResult.idToken;
    console.log("setSession()", this.idToken);
    // set the time that the id token will expire at
    this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
  }

  logout() {
    this.auth0.logout({
      returnTo: "http://localhost:3000",
      clientID: process.env.REACT_APP_CLIENT_ID
    });
  }

  silentAuth() {
    if (this.isAuthenticated()) {
      return new Promise((resolve, reject) => {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            localStorage.removeItem(this.authFlag);
            return reject(err);
          }
          this.setSession(authResult);
          resolve();
        });
      });
    }
  }

  isAuthenticated() {
    // Check whether the current time is past the token's expiry time
    return new Date().getTime() < this.expiresAt;
  }
}

const auth = new Auth();

export default auth;

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import loading from "./loading.svg";
import auth from "./Auth";

// client
import { client } from '../../../index.js'

class Callback extends Component {

  
  
  async componentDidMount() {
    await auth.handleAuthentication();

    client.resetStore();

    this.props.history.replace("/");
    // if (localStorage.getItem("loginCount") > 1) {
    //   //GO HERE ON SIGN IN
    //   console.log("REDIRECTING FROM AUTH0 SIGN IN");
    //
    // } else {
    //   //GO HERE ON SIGN UP
    //   console.log("REDIRECTING FROM AUTH0 SIGN UP");
    //   this.props.history.replace("/signup");
    // }

    // if(localStorage.getItem('token'))
  }

  render() {
    const style = {
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "white"
    };

    return (
      <div style={style}>
        <img src={loading} alt="loading" />
      </div>
    );
  }
}

export default withRouter(Callback);


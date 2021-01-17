import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import firebase from "../firebase/firebase";
import googleLogin from "../assets/btn_google_signin_dark_normal_web@2x.png";
import { useHistory } from "react-router-dom";

export const Login = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  const gapi = window.gapi;
  /* 
    Update with your own Client Id and Api key 
  */
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    const db = firebase.firestore();
    const provider = new firebase.auth.GoogleAuthProvider();
    const user = await firebase.auth().signInWithPopup(provider);
    const profile = user.additionalUserInfo.profile;
    const userProfile = await db
      .collection("profiles")
      .doc(profile.email)
      .get();
    const profileData = userProfile.data();
    console.log(userProfile);

    let profileDetails;
    if (profileData) {
      profileDetails = { ...profileData };
    } else {
      profileDetails = {
        email: profile.email,
        name: profile.name,
        picture: profile.picture,
        groups: [],
      };
    }

    await gapi.load("client:auth2", async () => {
      console.log("loaded client");

      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      await gapi.client.load("calendar", "v3", () => console.log("bam!"));
      await gapi.auth2.getAuthInstance().signIn();
      const response = await gapi.client.calendar.events.list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      });
      const events = response.result.items;
      if (events.length) {
        profileDetails.events = events.map((event) => ({
          start: event.start.dateTime ?? event.start.date,
          end: event.end.dateTime ?? event.end.date,
        }));
      } else {
        profileDetails.events = [];
      }
      return db
        .collection("profiles")
        .doc(profile.email)
        .set(profileDetails)
        .then(() => history.push("/calendar"));
    });
  };

  const handleLogout = async () => {
    setLoading(true);
    await firebase.auth().signOut();
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : isLoggedIn ? (
        <button style={{ width: 100, height: 50 }} onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <img
          src={googleLogin}
          alt="login"
          onClick={handleLogin}
          style={{ width: 200, cursor: "pointer" }}
        />
      )}
    </>
  );
};

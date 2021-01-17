import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import firebase from "../firebase/firebase";
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from "../pages/Login";

export const useUserData = () => {
  const [state, dispatch] = useContext(UserContext);

  const getData = async () => {
    const db = firebase.firestore();
    const { email } = firebase.auth().currentUser;
    const userRef = db.collection("profiles").doc(email);
    const groupRef = db.collection("groups");
    const doc = await userRef.get();
    const { events, groups, name, picture } = doc.data();
    let result;
    if (groups.length) {
      const groupResult = await groupRef.get();
      let set = new Set();
      result = groupResult.docs
        .map((elem) => elem.data())
        .filter((group) => {
          if (!set.has(group.id) && groups.includes(group.id)) {
            set.add(group.id);
            return true;
          } else {
            return false;
          }
        });
    } else {
      result = [];
    }
    dispatch({
      type: "SET_USER",
      payload: { name, email, events, groups: result, picture },
    });
    if (!state.selectedGroup) {
      dispatch({
        type: "SET_SELECTED_GROUP",
        payload: result[0],
      });
    }
  };

  const refreshData = async () => {
    const db = firebase.firestore();
    const { email } = firebase.auth().currentUser;
    const userRef = db.collection("profiles").doc(email);
    const raw = await userRef.get();
    const profileData = raw.data();

    const gapi = window.gapi;
    await gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });
    await gapi.client.load("calendar", "v3", () => console.log("bam!"));
    const response = await gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      orderBy: "startTime",
    });
    const events = response.result.items;
    if (events.length) {
      profileData.events = events.map((event) => ({
        start: event.start.dateTime ?? event.start.date,
        end: event.end.dateTime ?? event.end.date,
      }));
    } else {
      profileData.events = [];
    }

    await db.collection("profiles").doc(email).set(profileData);
    await getData();
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getData();
      }
    });
  }, []);

  return { userData: state.currentUser, getData, refreshData };
};

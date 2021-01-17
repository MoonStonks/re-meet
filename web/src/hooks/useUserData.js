import { useEffect, useState } from "react";
import firebase from "../firebase/firebase";

export const useUserData = () => {
  const [userData, setUserData] = useState({
    events: [],
    groups: [],
  });

  const getData = async () => {
    const db = firebase.firestore();
    const { email } = firebase.auth().currentUser;
    const userRef = db.collection("profiles").doc(email);
    const groupRef = db.collection("groups");
    const doc = await userRef.get();
    const { events, groups } = doc.data();
    let result;
    if (groups.length) {
      const groupResult = await groupRef.get();
      result = groupResult.docs
        .map((elem) => elem.data())
        .filter((group) => groups.includes(group.id));
    } else {
      result = [];
    }
    setUserData({ events, groups: result });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getData();
      }
    });
  }, []);

  return userData;
};

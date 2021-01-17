import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import firebase from "../firebase/firebase";

export const useUserData = () => {
  const [state, dispatch] = useContext(UserContext);
  // const [userData, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   events: [],
  //   groups: [],
  //   picture: "",
  // });

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
      result = groupResult.docs
        .map((elem) => elem.data())
        .filter((group) => groups.includes(group.id));
    } else {
      result = [];
    }
    dispatch({
      type: "SET_USER",
      payload: { name, email, events, groups: result, picture },
    });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        getData();
      }
    });
  }, []);

  return { userData: state.currentUser, getData };
};

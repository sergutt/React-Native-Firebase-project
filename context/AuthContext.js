import React, { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { Keyboard } from "react-native";

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const auth = getAuth();
  const [userID, setUserID] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Listen for authentication state to change.
    onAuthStateChanged(auth, (user) => {
      if (user != null) {
        setUserID(user.uid);
      } else {
        setUserID("");
      }
    });
  }, []);

  const dispatchUserEvent = (action, payload) => {
    Keyboard.dismiss();
    setLoading(true);
    switch (action) {
      case "REGISTER":
        createUserWithEmailAndPassword(auth, payload.email, payload.password)
          .then((data) => {
            const db = getDatabase();
            const reference = ref(db, "profiles/" + data.user.uid);
            set(reference, {
              firstName: payload.firstName,
              bio: "Edit me!",
            });
            setLoading(false);
          })
          .catch((err) => setLoading(false));
        break;
      case "LOGIN":
        signInWithEmailAndPassword(auth, payload.email, payload.password)
          .then((res) => setLoading(false))
          .catch((err) => setLoading(false));
        break;
      default:
        break;
    }
  };

  return (
    <AuthContext.Provider
      value={{ userID, auth, dispatchUserEvent, loading, setLoading }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

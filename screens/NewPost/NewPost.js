import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Alert,
} from "react-native";
import styles from "./styles";
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { AuthContext } from "../../context/AuthContext";

const NewPost = (props) => {
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");

  const { userID, auth, loading, setLoading } = useContext(AuthContext);

  // Create a new post reference with an auto-generated id
  const db = getDatabase();
  const postListRef = ref(db, "posts/");
  const userRef = ref(db, "profiles/" + userID);
  const newPostRef = push(postListRef);

  //retrieves first name of user from database once
  useEffect(() => {
    onValue(
      userRef,
      (snapshot) => {
        if (snapshot.val() !== null) {
          setFirstName(snapshot.val().firstName);
        } else {
          setFirstName("");
        }
      },
      { onlyOnce: true }
    );
    return () => {};
  }, []);

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  const onSubmit = (message) => {
    if (message === "") {
      return;
    }

    setLoading(true);

    set(newPostRef, {
      name: firstName,
      user: auth.currentUser.email,
      message: message,
      time: formatAMPM(new Date()),
    })
      .then((res) => {
        setLoading(false);
        props.navigation.goBack();
        Alert.alert("Success!", "Post is uploaded.", [{ text: "OK" }]);
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert("Error", err, [{ text: "OK" }]);
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" color="#FFF" />
        </View>
      ) : (
        <></>
      )}
      <TextInput
        style={styles.input}
        onChangeText={setMessage}
        value={message}
        placeholder="What's on your cabesa?"
      ></TextInput>
      <Button onPress={() => onSubmit(message)} title="Submit" />
    </View>
  );
};

export default NewPost;

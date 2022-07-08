import { getDatabase, ref, onValue, update } from "firebase/database";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Pressable,
  ActivityIndicator,
  Text,
  TextInput,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const Profile = (props) => {
  const [firstName, setFirstName] = useState("");
  const [bio, setBio] = useState("");
  const [isTextChange, setTextChange] = useState(false);

  const { userID, auth, loading, setLoading } = useContext(AuthContext);

  const db = getDatabase();
  const reference = ref(db, "profiles/" + userID);

  //retrieves data from database
  useEffect(() => {
    onValue(reference, (snapshot) => {
      if (snapshot.val() !== null) {
        setFirstName(snapshot.val().firstName);
        setBio(snapshot.val().bio);
      } else {
        setFirstName("");
        setBio("");
      }
    });
    return () => {};
  }, []);

  //checks on userID and executes when it changes
  useEffect(() => {
    if (userID === "") {
      props.navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    }
    return () => {};
  }, [userID]);

  const submitInfo = (firstName, bio) => {
    setLoading(true);
    update(reference, {
      firstName: firstName,
      bio: bio,
    })
      .then((res) => {
        setTextChange(false);
        setLoading(false);
      })
      .catch((err) => {
        setTextChange(false);
        setLoading(false);
        console.log(err);
      });
  };

  const signOut = () => {
    setLoading(true);
    auth
      .signOut()
      .then((res) => setLoading(false))
      .catch((err) => setLoading(false));
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
      {isTextChange ? (
        <TextInput onChangeText={setFirstName} value={firstName}></TextInput>
      ) : (
        <Text>{firstName}</Text>
      )}
      {isTextChange ? (
        <TextInput onChangeText={setBio} value={bio}></TextInput>
      ) : (
        <Text>{bio}</Text>
      )}
      <View style={styles.gameChoiceContainer}>
        <Pressable
          style={styles.gameChoiceButton}
          onPress={
            isTextChange
              ? () => submitInfo(firstName, bio)
              : () => setTextChange(true)
          }
        >
          {isTextChange ? (
            <Ionicons name="enter" size={24} color="white" />
          ) : (
            <FontAwesome name="edit" size={24} color="white" />
          )}
        </Pressable>
        <Pressable style={styles.gameChoiceButton} onPress={() => signOut()}>
          <FontAwesome name="sign-out" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

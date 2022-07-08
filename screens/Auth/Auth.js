import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import styles from "./styles";

import { AuthContext } from "../../context/AuthContext";

const Auth = (props) => {
  const [authScreen, setAuthScreen] = useState("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //conditional states for registering
  const [firstName, setFirstName] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const { userID, dispatchUserEvent, loading } = useContext(AuthContext);

  useEffect(() => {
    if (userID !== "") {
      props.navigation.replace("Home");
    }
    return () => {};
  }, [userID]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator animating={true} size="large" color="#FFF" />
        </View>
      ) : (
        <></>
      )}
      {authScreen === "Register" ? (
        <TextInput
          placeholder="First Name"
          onChangeText={setFirstName}
          value={firstName}
          style={styles.input}
        />
      ) : (
        <></>
      )}
      {authScreen === "Login" ? (
        <Image
          resizeMode={"contain"}
          source={require("../../assets/logo.png")}
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <></>
      )}
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        style={styles.input}
      />
      {authScreen === "Register" ? (
        <TextInput
          placeholder="Re-Type Password"
          onChangeText={setPasswordCheck}
          value={passwordCheck}
          style={styles.input}
        />
      ) : (
        <></>
      )}
      <View style={styles.buttonGroup}>
        <Pressable
          onPress={() => {
            setAuthScreen(authScreen === "Register" ? "Login" : "Register");
          }}
        >
          <Text style={{ color: "white" }}>
            or{" "}
            <Text style={{ color: "#dce9be" }}>
              {authScreen === "Register" ? "Login" : "Register"}
            </Text>
          </Text>
        </Pressable>
        <Pressable
          disabled={
            (authScreen === "Register" &&
              password === "" &&
              passwordCheck === "") ||
            (authScreen === "Login" && email === "" && password === "")
              ? true
              : false
          }
          onPress={
            authScreen === "Register"
              ? () => {
                  if (passwordCheck === password) {
                    dispatchUserEvent("REGISTER", {
                      firstName: firstName,
                      email: email,
                      password: password,
                    });
                  } else {
                    Alert.alert("Error", "Passwords do not match.", [
                      { text: "OK" },
                    ]);
                  }
                }
              : () => {
                  if (email !== "" && password !== "") {
                    dispatchUserEvent("LOGIN", {
                      email: email,
                      password: password,
                    });
                  } else {
                    Alert.alert("Error", "Please input your information.", [
                      { text: "OK" },
                    ]);
                  }
                }
          }
          style={styles.submitButton}
        >
          <Text style={styles.submitButtonText}>
            {authScreen === "Register" ? "Register" : "Login"}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Auth;

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  signOutButton: {
    width: 100,
    height: 100,
    backgroundColor: "#ef5350",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  gameChoiceContainer: {
    width: 400,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 40,
  },

  gameChoiceButton: {
    width: 75,
    height: 75,
    backgroundColor: "#5c6bc0",
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 30,
  },

  outcomeText: {
    fontSize: 20,
  },

  loading: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
    backgroundColor: "black",
    width: width,
  },
});

export default styles;

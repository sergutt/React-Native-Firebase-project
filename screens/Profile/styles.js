import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efffcd",
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
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },

  gameChoiceButton: {
    width: 100,
    height: 50,
    backgroundColor: "#99173c",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  buttonText: {
    color: "white",
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

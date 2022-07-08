import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2e2633",
  },

  input: {
    width: 300,
    borderWidth: 1,
    margin: 12,
    padding: 5,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: "white",
  },

  buttonGroup: {
    height: 50,
    width: 300,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  submitButton: {
    width: 100,
    height: 50,
    backgroundColor: "#dce9be",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },

  submitButtonText: {
    color: "black",
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

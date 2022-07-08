import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efffcd",
  },

  input: {
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    margin: 12,
    padding: 10,
    backgroundColor: "white",
    width: width * 0.8,
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

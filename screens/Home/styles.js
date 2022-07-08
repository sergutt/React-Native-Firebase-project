import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#efffcd",
  },

  postItem: {
    backgroundColor: "white",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },

  postListContainer: {
    width: width * 0.8,
  },

  gameChoiceContainer: {
    width: 400,
    alignItems: "center",
    marginBottom: 40,
  },

  gameChoiceButton: {
    width: 100,
    height: 50,
    backgroundColor: "#5c6bc0",
    borderRadius: 50,
    display: "flex",
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

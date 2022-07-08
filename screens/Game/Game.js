import React, { useEffect, useState } from "react";
import { Text, View, Pressable } from "react-native";
import { getDatabase, ref, onValue, set } from "firebase/database";
import styles from "./styles";

const Game = () => {
  const [currScore, setCurrScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [outcome, setOutcome] = useState("");

  const db = getDatabase();
  const reference = ref(db);

  useEffect(() => {
    onValue(reference, (snapshot) => {
      if (snapshot.val() !== null) {
        setHighScore(snapshot.val().high);
        setCurrScore(snapshot.val().current);
      } else {
        setHighScore(0);
        setCurrScore(0);
      }
    });
  }, []);

  const storeData = (highScore, currScore) => {
    set(reference, {
      high: highScore,
      current: currScore,
    });
  };

  const playGame = (choice) => {
    let choiceArr = ["rock", "paper", "scissors"];

    const comChoice = choiceArr[Math.floor(Math.random() * 3)];

    if (
      (choice === "paper" && comChoice === "rock") ||
      (choice === "rock" && comChoice === "scissors") ||
      (choice === "scissors" && comChoice === "paper")
    ) {
      setOutcome("You Won!");
      if (currScore + 1 > highScore) {
        storeData(currScore + 1, currScore + 1);
      } else {
        storeData(highScore, currScore + 1);
      }
    } else if (
      (choice === "rock" && comChoice === "paper") ||
      (choice === "scissors" && comChoice === "rock") ||
      (choice === "paper" && comChoice === "scissors")
    ) {
      setOutcome("You Lose!");
      storeData(highScore, 0);
    } else {
      setOutcome("You Tied!");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50, marginTop: 50 }}>
        High score: {highScore}
      </Text>
      <View style={styles.gameChoiceContainer}>
        <Pressable
          style={styles.gameChoiceButton}
          onPress={() => playGame("rock")}
        >
          <Text style={styles.buttonText}>⚪</Text>
        </Pressable>
        <Pressable
          style={styles.gameChoiceButton}
          onPress={() => playGame("paper")}
        >
          <Text style={styles.buttonText}>📜</Text>
        </Pressable>
        <Pressable
          style={styles.gameChoiceButton}
          onPress={() => playGame("scissors")}
        >
          <Text style={styles.buttonText}>✂️</Text>
        </Pressable>
      </View>

      <Text style={{ fontSize: 50 }}>Current score: {currScore}</Text>

      <Text style={{ fontSize: 25 }}>{outcome}</Text>
    </View>
  );
};

export default Game;

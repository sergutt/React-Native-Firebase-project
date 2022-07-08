import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import styles from "./styles";

const Home = () => {
  const [posts, setPosts] = useState(null);

  const db = getDatabase();
  const postListRef = ref(db, "posts/");

  useEffect(() => {
    onValue(postListRef, (snapshot) => {
      if (snapshot.val() !== null) {
        const data = snapshot.val();
        let result = Object.keys(data).map((key) => data[key]);

        setPosts(result);
      } else {
        setPosts([]);
      }
    });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.postItem}>
        <Text>{item.name}</Text>
        <Text style={{ padding: 10 }}>{item.message}</Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.postListContainer}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => posts.indexOf(item)}
        />
      </View>
    </View>
  );
};

export default Home;

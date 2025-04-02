import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

export default function ForumContent() {
  const posts = [
    {
      id: 1,
      author: "Bhavsagar",
      time: "2 days ago, 4:32 PM",
      content: "It's High Time that This course needs an UPDATE!!",
      codeSnippet: true,
    },
    {
      id: 2,
      author: "Mitul Sharma",
      time: "5 days ago, 6:30 AM",
      content: "npx create-react-app web-app failed with node 18",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Q&A</Text>
      </View>
      {posts.map((post) => (
        <View key={post.id} style={styles.post}>
          <View style={styles.postHeader}>
            <View style={styles.authorInfo}>
              <View style={styles?.avatar} />
              <View>
                <Text style={styles.authorName}>{post.author}</Text>
                <Text style={styles.postTime}>{post.time}</Text>
              </View>
            </View>
          </View>
          <Text style={styles.postContent}>{post.content}</Text>
          {post.codeSnippet && (
            <View style={styles.codeBlock}>
              <Text style={styles.codeText}></Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    backgroundColor: "#1C1C1E",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  post: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2C2C2E",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2C2C2E",
    marginRight: 12,
  },
  authorName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  postTime: {
    color: "#FFFFFF",
    opacity: 0.6,
    fontSize: 14,
  },
  postContent: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 12,
  },
  codeBlock: {
    backgroundColor: "#2C2C2E",
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    color: "#FFFFFF",
    fontFamily: "monospace",
    fontSize: 14,
  },
});

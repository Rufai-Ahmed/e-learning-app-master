"use client";

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { Lesson } from "@/lib/interfaces/course";

const { width } = Dimensions.get("window");

export default function LessonVideoScreen() {
  const params = useLocalSearchParams();
  const lesson = params.lesson
    ? (JSON.parse(decodeURIComponent(params.lesson as string)) as Lesson)
    : null;
  const [loading, setLoading] = useState(true);
  const player = useVideoPlayer(lesson?.video_link || "", (player) => {
    player.loop = false;
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  useEffect(() => {
    if (lesson) {
      setLoading(false);
    }
  }, [lesson]);

  if (loading || !lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4169E1" />
          <Text style={styles.loadingText}>Loading lesson...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {lesson.title}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.videoContainer}>
          {lesson?.video_link ? (
            <VideoView
              style={styles.video}
              player={player}
              allowsFullscreen
              allowsPictureInPicture
            />
          ) : (
            <View style={styles.noVideoContainer}>
              <Text style={styles.noVideoText}>
                No video available for this lesson
              </Text>
            </View>
          )}
        </View>

        <View style={styles.lessonInfo}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonDuration}>
            Duration: {lesson.duration || "0"} minutes
          </Text>
          <Text style={styles.lessonDescription}>{lesson.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  content: {
    flex: 1,
  },
  videoContainer: {
    width: width,
    height: width * (9 / 16), // 16:9 aspect ratio
    backgroundColor: "#000",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  noVideoContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  noVideoText: {
    fontSize: 16,
    color: "#666",
  },
  lessonInfo: {
    padding: 16,
  },
  lessonTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  lessonDuration: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  lessonDescription: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },
});

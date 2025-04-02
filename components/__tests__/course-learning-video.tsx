// "use client";

// import { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   Animated,
//   Pressable,
//   Modal,
//   BackHandler,
// } from "react-native";
// import { Video } from "expo-av";
// import { ResizeMode } from "expo-av";
// import { StatusBar } from "expo-status-bar";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import Slider from "@react-native-community/slider";
// import Voice from "@react-native-voice/voice"; // For speech recognition
// import { SafeAreaView } from "react-native-safe-area-context";
// import * as ScreenOrientation from "expo-screen-orientation";
// import { router } from "expo-router";

// const resolutions = [
//   { label: "Auto", value: undefined },
//   { label: "1080p", value: { width: 1920, height: 1080 } },
//   { label: "720p", value: { width: 1280, height: 720 } },
//   { label: "480p", value: { width: 854, height: 480 } },
//   { label: "360p", value: { width: 640, height: 360 } },
// ];

// export default function VideoPlayer() {
//   const videoRef = useRef<Video>(null);
//   const [status, setStatus] = useState<any>({});
//   const [showControls, setShowControls] = useState(true);
//   const fadeAnim = useRef(new Animated.Value(1)).current;
//   const controlsTimeout = useRef<NodeJS.Timeout | null>(null);
//   const [transcript, setTranscript] = useState<{ time: string; text: string }[]>([]);
//   const [isTranscribing, setIsTranscribing] = useState(false);
//   const [showSettings, setShowSettings] = useState(false);
//   const [selectedResolution, setSelectedResolution] = useState(resolutions[0]);
//   const [showCaptions, setShowCaptions] = useState(false);
//   const [captions, setCaptions] = useState([
//     { start: 0, end: 5000, text: "Welcome to our video!" },
//     { start: 5000, end: 10000, text: "This is a sample caption." },
//     // Add more dummy captions as needed
//   ]);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   // Load video and add BackHandler
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.loadAsync({
//         uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//       });
//     }

//     const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);

//     return () => {
//       if (videoRef.current) {
//         videoRef.current.unloadAsync();
//       }
//       backHandler.remove();
//     };
//   }, []);

//   // Set up Voice event listeners for speech recognition
//   useEffect(() => {
//     Voice.onSpeechResults = onSpeechResultsHandler;
//     Voice.onSpeechError = onSpeechErrorHandler;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, [status]);

//   const onSpeechResultsHandler = (e: any) => {
//     // When speech results come in, update the transcript state.
//     // Use the current video position for a timestamp.
//     if (e.value && e.value?.length > 0) {
//       setTranscript((prev) => [
//         ...prev,
//         { time: formatTime(status.positionMillis), text: e.value[0] },
//       ]);
//     }
//   };

//   const onSpeechErrorHandler = (e: any) => {
//     console.error("Speech recognition error:", e);
//   };

//   const handleBackPress = async () => {
//     // If in custom fullscreen, exit fullscreen on back press.
//     if (isFullscreen) {
//       await toggleFullscreen();
//       return true;
//     }
//     else {
//     // router.back()
//     return false;
//     }
//   };

//   const toggleControls = () => {
//     setShowControls(true);
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();

//     if (controlsTimeout.current) {
//       clearTimeout(controlsTimeout.current);
//     }

//     controlsTimeout.current = setTimeout(() => {
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start(() => setShowControls(false));
//     }, 3000);
//   };

//   const togglePlayPause = async () => {
//     if (videoRef.current) {
//       if (status.isPlaying) {
//         await videoRef.current.pauseAsync();
//       } else {
//         await videoRef.current.playAsync();
//       }
//     }
//     toggleControls();
//   };

//   const seek = async (value: number) => {
//     if (videoRef.current && status.durationMillis) {
//       await videoRef.current.setPositionAsync(value * status.durationMillis);
//     }
//   };

//   const formatTime = (milliseconds: number | undefined): string => {
//     if (!milliseconds) return "00:00";
//     const totalSeconds = Math.floor(milliseconds / 1000);
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
//   };

//   const onBack10 = async () => {
//     if (videoRef.current && status.positionMillis) {
//       await videoRef.current.setPositionAsync(Math.max(0, status.positionMillis - 10000));
//     }
//     toggleControls();
//   };

//   const onForward10 = async () => {
//     if (videoRef.current && status.positionMillis && status.durationMillis) {
//       await videoRef.current.setPositionAsync(
//         Math.min(status.durationMillis, status.positionMillis + 10000)
//       );
//     }
//     toggleControls();
//   };

//   // Toggle transcription using react-native-voice
//   const toggleTranscription = async () => {
//     if (!isTranscribing) {
//       setIsTranscribing(true);
//       try {
//         await Voice.start("en-US");
//       } catch (error) {
//         console.error("Error starting transcription:", error);
//       }
//     } else {
//       try {
//         await Voice.stop();
//         setIsTranscribing(false);
//       } catch (error) {
//         console.error("Error stopping transcription:", error);
//       }
//     }
//   };

//   const changeResolution = (resolution: typeof resolutions[number]) => {
//     setSelectedResolution(resolution);
//     setShowSettings(false);
//     // Typically, you would change the video source here based on the selected resolution.
//   };

//   // Custom fullscreen toggle (no native fullscreen)
//   const toggleFullscreen = async () => {
//     if (!isFullscreen) {
//       // Enter fullscreen: lock landscape and update state
//       await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
//       setIsFullscreen(true);
//     } else {
//       // Exit fullscreen: lock portrait and update state
//       await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
//       setIsFullscreen(false);
//     }
//   };

//   const onBackPress = () => {
//     // For example, use navigation.goBack() if using React Navigation:
//     router.back();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar style="dark" />

//       <View style={styles.headerContainer}>
//       <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
//         <Ionicons name="arrow-back" size={24} color="#fff" />
//       </TouchableOpacity>
//       <Text style={styles.headerTitle}>{'Video Header'}</Text>
//     </View>
//       <Pressable
//         style={[
//           styles.videoContainer,
//           isFullscreen && styles.fullscreenContainer, // Apply custom fullscreen style
//         ]}
//         onPress={toggleControls}
//       >
//         <Video
//           ref={videoRef}
//           style={styles.video}
//           source={{
//             uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//           }}
//           useNativeControls={false}
//           resizeMode={ResizeMode.CONTAIN}
//           onPlaybackStatusUpdate={(status) => setStatus(() => status)}
//           isLooping
//         />

//         {showCaptions && (
//           <View style={styles.captionContainer}>
//             {captions.map(
//               (caption, index) =>
//                 status.positionMillis >= caption.start &&
//                 status.positionMillis < caption.end && (
//                   <Text key={index} style={styles.captionText}>
//                     {caption.text}
//                   </Text>
//                 )
//             )}
//           </View>
//         )}

//         {showControls && (
//           <Animated.View style={[styles.controlsOverlay, { opacity: fadeAnim }]}>
//             {/* Top Controls */}
//             <View style={styles.topControls}>
//             {isFullscreen && (
//     <TouchableOpacity style={styles.backButton} onPress={toggleFullscreen}>
//       <Ionicons name="arrow-back" size={24} color="white" />
//     </TouchableOpacity>
//   )}
//               <View style={styles.topRightControls}>
//                 {/*
//                 Uncomment below if you wish to enable captions or transcription icons:
//                 <TouchableOpacity style={styles.iconButton} onPress={() => setShowCaptions(!showCaptions)}>
//                   <MaterialIcons
//                     name="closed-caption"
//                     size={24}
//                     color={showCaptions ? "#4a9eff" : "white"}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.iconButton} onPress={toggleTranscription}>
//                   <MaterialIcons
//                     name="mic"
//                     size={24}
//                     color={isTranscribing ? "#4a9eff" : "white"}
//                   />
//                 </TouchableOpacity>
//                 */}

//                 <TouchableOpacity style={styles.iconButton} onPress={() => setShowSettings(true)}>
//                   <MaterialIcons name="settings" size={24} color="white" />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Center Controls */}
//             <View style={styles.centerControls}>
//               <TouchableOpacity onPress={onBack10}>
//                 <MaterialIcons name="replay-10" size={40} color="white" />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={togglePlayPause}>
//                 <MaterialIcons
//                   name={status.isPlaying ? "pause" : "play-arrow"}
//                   size={60}
//                   color="white"
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity onPress={onForward10}>
//                 <MaterialIcons name="forward-10" size={40} color="white" />
//               </TouchableOpacity>
//             </View>

//             {/* Bottom Controls */}
//             <View style={styles.bottomControls}>
//               <Text style={styles.timeText}>{formatTime(status.positionMillis)}</Text>
//               <Slider
//                 style={styles.progressBar}
//                 minimumValue={0}
//                 maximumValue={1}
//                 value={
//                   status.positionMillis && status.durationMillis
//                     ? status.positionMillis / status.durationMillis
//                     : 0
//                 }
//                 onValueChange={seek}
//                 minimumTrackTintColor="#FFFFFF"
//                 maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
//                 thumbTintColor="#FFFFFF"
//               />
//               <Text style={styles.timeText}>{formatTime(status.durationMillis)}</Text>
//               <TouchableOpacity style={styles.fullscreenButton} onPress={toggleFullscreen}>
//                 <MaterialIcons
//                   name={isFullscreen ? "fullscreen-exit" : "fullscreen"}
//                   size={24}
//                   color="white"
//                 />
//               </TouchableOpacity>
//             </View>
//           </Animated.View>
//         )}
//       </Pressable>

//       {/* Title Section */}
//       <View style={styles.titleSection}>
//         <Text style={styles.title}>2.1 - Programmatic Advertising</Text>
//         <Text style={styles.subtitle}>Introduction to Digital Advertising</Text>
//       </View>

//       {/* Summary Section */}
//       <View style={styles.summarySection}>
//         <Text style={styles.summaryText}>
//           This video explains programmatic advertising and provides an overview of digital advertising strategies. Learn key insights, best practices, and techniques to drive successful digital campaigns.
//         </Text>
//       </View>

//       {/* Transcript Section */}
//       <ScrollView style={styles.transcriptContainer} horizontal={false}>
//         <ScrollView horizontal style={styles.transcriptInnerContainer}>
//           {transcript.map((item, index) => (
//             <View key={index} style={styles.transcriptItem}>
//               <Text style={styles.timestamp}>{item.time}</Text>
//               <Text style={styles.transcriptText}>{item.text}</Text>
//             </View>
//           ))}
//         </ScrollView>
//       </ScrollView>

//       {/* Settings Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showSettings}
//         onRequestClose={() => setShowSettings(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Video Quality</Text>
//             {resolutions.map((resolution, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.resolutionOption}
//                 onPress={() => changeResolution(resolution)}
//               >
//                 <Text
//                   style={[
//                     styles.resolutionText,
//                     selectedResolution === resolution && styles.selectedResolutionText,
//                   ]}
//                 >
//                   {resolution.label}
//                 </Text>
//                 {selectedResolution === resolution && (
//                   <MaterialIcons name="check" size={24} color="#4a9eff" />
//                 )}
//               </TouchableOpacity>
//             ))}
//             <TouchableOpacity style={styles.closeButton} onPress={() => setShowSettings(false)}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" }, // White background
//   videoContainer: { width: "100%", aspectRatio: 16 / 9, backgroundColor: "#000" },
//   fullscreenContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 999,
//   },
//   video: { width: "100%", height: "100%" },
//   controlsOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: "rgba(0, 0, 0, 0.4)",
//     justifyContent: "space-between",
//   },
//   topControls: { flexDirection: "row", justifyContent: "space-between", padding: 16 },
//   topRightControls: { flexDirection: "row", gap: 20,  },
//   centerControls: { flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 40 },
//   bottomControls: {
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 16,
//     paddingBottom: 20,
//   },
//   progressBar: { flex: 1, marginHorizontal: 10 },
//   timeText: { color: "white", fontSize: 12 },
//   fullscreenButton: { marginLeft: 10 },
//   titleSection: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#ccc" },
//   title: { fontSize: 18, fontWeight: "bold", color: "#000" },
//   subtitle: { fontSize: 14, color: "#555", marginTop: 4 },
//   summarySection: {
//     padding: 16,
//     backgroundColor: "#f9f9f9",
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   summaryText: {
//     fontSize: 16,
//     color: "#333",
//     lineHeight: 22,
//   },
//   transcriptContainer: { flex: 1, padding: 16 },
//   transcriptInnerContainer: { flexDirection: "row" },
//   transcriptItem: { flexDirection: "column", marginRight: 16, width: 200 },
//   timestamp: { color: "#666", marginBottom: 4 },
//   transcriptText: { color: "#000" },
//   iconButton: { padding: 8 },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     backgroundColor: "#2a2a2a",
//     borderRadius: 10,
//     padding: 20,
//     width: "80%",
//   },
//   modalTitle: { fontSize: 18, fontWeight: "bold", color: "white", marginBottom: 15 },
//   resolutionOption: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     paddingVertical: 10,
//   },
//   resolutionText: { color: "white", fontSize: 16 },
//   selectedResolutionText: { color: "#4a9eff" },
//   closeButton: {
//     marginTop: 20,
//     padding: 10,
//     backgroundColor: "#4a9eff",
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   closeButtonText: { color: "white", fontSize: 16 },
//   captionContainer: { position: "absolute", bottom: 60, left: 0, right: 0, alignItems: "center" },
//   captionText: {
//     color: "white",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     padding: 5,
//     fontSize: 16,
//   },  headerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#1a1a1a", // Dark background color; adjust as needed
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#333",
//   },
//   backButton: {
//     marginRight: 16,
//     padding: 4, // Optional: adds extra touch area around the icon
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#fff",
//   },
// });

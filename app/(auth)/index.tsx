import React, { useRef, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Animated, type ViewToken } from "react-native"
import { Book, Video, BookDashed } from "lucide-react-native"
import { router } from "expo-router"

const { width } = Dimensions.get("window")
const ITEM_WIDTH = width

const WelcomeScreenl = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
    minimumViewTime: 300,
  }).current

  const slideRef = useRef<FlatList<{ id: string; title: string; subtitle: string; icon: JSX.Element }> | null>(null)
  const scrollX = useRef(new Animated.Value(0)).current

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index || 0)
    }
  }).current

  const slides = [
    {
      id: "1",
      title: "Learn Anywhere",
      subtitle: "Access courses on the go",
      icon: <Video size={80} color="#4169E1" />,
    },
    {
      id: "2",
      title: "Expert Instructors",
      subtitle: "Learn from industry professionals",
      icon: <Book size={80} color="#4169E1" />,
    },
    {
      id: "3",
      title: "Get Certified",
      subtitle: "Earn recognized certificates",
      icon: <BookDashed size={80} color="#4169E1" />,
    },
  ]

  const renderItem = ({ item }: { item: { id: string; title: string; subtitle: string; icon: JSX.Element } }) => {
    return (
      <View style={[styles.slideContainer, { width: ITEM_WIDTH }]}>
        <View style={styles.iconContainer}>{item.icon}</View>
        <Text style={styles.slideTitle}>{item.title}</Text>
        <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
      </View>
    )
  }

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width]

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 16, 8],
            extrapolate: "clamp",
          })

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          })

          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                  opacity,
                },
              ]}
            />
          )
        })}
      </View>
    )
  }

  // Auto scroll functionality
  React.useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < slides.length - 1) {
        slideRef.current?.scrollToIndex({
          index: currentIndex + 1,
          animated: true,
        })
      } else {
        slideRef.current?.scrollToIndex({
          index: 0,
          animated: true,
        })
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [currentIndex])

  return (
    <View style={styles.container}>
      <FlatList
        ref={slideRef}
        data={slides}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {renderPagination()}

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.navigate("/(auth)/role-selection")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.navigate("/(auth)/role-selection")}>
          <Text style={styles.secondaryButtonText}>I already have an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  slideContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#F0F0F0",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4169E1",
    marginBottom: 8,
    textAlign: "center",
  },
  slideSubtitle: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4169E1",
    marginHorizontal: 4,
  },
  bottomContainer: {
    padding: 20,
  },
  button: {
    backgroundColor: "#4169E1",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    padding: 16,
  },
  secondaryButtonText: {
    color: "#4169E1",
    textAlign: "center",
    fontSize: 16,
  },
})

export default WelcomeScreenl


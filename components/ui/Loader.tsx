import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import DarkBg from './DarkBg';

const Loader = () => {
  return (
    <>
    <DarkBg/>
    <View style={styles.container}>
      <LottieView
        source={require('@/assets/animations/loader.json')} // Replace with your downloaded JSON file
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex:1000,
    inset:0

  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default Loader;

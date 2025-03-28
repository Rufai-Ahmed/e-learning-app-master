import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const DarkBg = () => {
  return (
    <View style={styles.container}>
    </View>
  )
}

export default DarkBg

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.7)',
        position:'absolute',
        zIndex:900,
        inset:0
    }
})
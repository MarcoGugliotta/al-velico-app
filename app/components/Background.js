import React from 'react'
import { ImageBackground, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native'
import { theme } from '../core/theme'

export default function Background({ children }) {
  return (
    <ImageBackground
      resizeMode="repeat"
      style={styles.background}
    >
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  )
}

const { width: screenWidth } = Dimensions.get('window');
const maxWidthPercentage = 80; // Imposta la larghezza massima in percentuale



const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    maxWidth: (screenWidth * maxWidthPercentage) / 100,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

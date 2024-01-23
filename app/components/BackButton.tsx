import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { theme } from '../core/theme';

const { height: screenHeight } = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight();
const topPercentage = 8; // Imposta il valore percentuale desiderato

export default function BackButton({ goBack }) {
  const topValue = (screenHeight * topPercentage) / 100 + statusBarHeight;

  return (
    <TouchableOpacity onPress={goBack} style={[styles.container, { top: topValue }]}>
      <Image
        style={styles.image}
        source={require('../assets/arrow_back.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 5,
  },
  image: {
    width: 24,
    height: 24,
  },
});

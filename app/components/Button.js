import React from 'react';
import { StyleSheet } from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';

export default function Button({ mode, style, buttonColor, textColor, ...props }) {
  return (
    <PaperButton
      children={''}
      style={[
        styles.button,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
        buttonColor && { backgroundColor: buttonColor }, // Imposta il colore di sfondo se è stato fornito
        style,
      ]}
      labelStyle={[
        styles.text,
        textColor && { color: textColor }, // Imposta il colore del testo se è stato fornito
      ]}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

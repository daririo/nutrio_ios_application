import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

type Props = {
  label: string
  onPress: () => void
}

export default function Button({ label: title, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 87,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4379A6'
  },

  text: {
    color: '#fff',
    fontWeight: '600'
  }
})
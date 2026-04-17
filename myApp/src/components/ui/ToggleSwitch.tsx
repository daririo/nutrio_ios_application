import React, { useRef, useEffect } from 'react'
import { Pressable, Animated, StyleSheet } from 'react-native'

type Props = {
  active: boolean
  onPress: (value: boolean) => void
}

export default function ToggleSwitch({ active, onPress }: Props) {
  const animation = useRef(new Animated.Value(active ? 1 : 0)).current

  const handlePress = () => {
    onPress(!active)
  }

  useEffect(() => {
    Animated.timing(animation, {
      toValue: active ? 1 : 0,
      duration: 160,
      useNativeDriver: false
    }).start()
  }, [active, animation])

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15]
  })

  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#4379A6']
  })

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View
          style={[
            styles.thumb,
            { transform: [{ translateX }] }
          ]}
        />
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  track: {
    width: 39,
    height: 24,
    borderRadius: 32,
    justifyContent: 'center'
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#BDBDBD'
  }
})
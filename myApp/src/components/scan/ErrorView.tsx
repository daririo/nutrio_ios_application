import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import RegularButton from '../ui/RegularButton';

type Props = {
  onRescan: () => void;
};

export default function ErrorView({ onRescan }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/png/page_not_found.png')}
        style={{ width: 140, height: 140 }}
        resizeMode='contain'
      />

      <Text style={styles.text}>Product not found</Text>

      <RegularButton label='Scan again' onPress={onRescan} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#333',
    marginVertical: 10,
  },
});

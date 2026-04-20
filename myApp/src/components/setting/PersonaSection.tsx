import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import AppText from '../ui/AppText';
import ToggleButton from '../ui/ToggleButton';

export default function PersonaSection({ persona, onChange, genders }: any) {
  const inputs = [
    { key: 'height', label: 'Height', placeholder: 'Height' },
    { key: 'weight', label: 'Weight', placeholder: 'Weight' },
    { key: 'age', label: 'Age', placeholder: 'Age' },
  ] as const;

  return (
    <>
      {inputs.map((field) => (
        <React.Fragment key={field.key}>
          <AppText style={styles.text}>{field.label}</AppText>

          <TextInput
            placeholder={field.placeholder}
            style={styles.input}
            value={persona[field.key]}
            onChangeText={(t) => onChange(field.key, t)}
          />
        </React.Fragment>
      ))}

      <View style={styles.genderContainer}>
        {genders.map((g: string) => (
          <ToggleButton
            key={g}
            label={g}
            active={persona.gender === g}
            onPress={() => onChange('gender', g)}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#323232',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: '#fff',
  },
  text: {
    paddingLeft: 5,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 10,
    paddingTop: 10,
  },
});

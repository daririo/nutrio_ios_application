import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import ToggleButton from '../components/ui/ToggleButton';
import Button from '../components/ui/RegularButton';

export default function SettingScreen() {
  const [form, setForm] = useState({
    goal: '',
    height: '',
    weight: '',
    age: '',
    gender: '',
  });

  const [diet, setDiet] = useState({
    vegan: false,
    vegetarian: false,
    lactoseFree: false,
    glutenFree: false,
  });

  const [nutrients, setNutrients] = useState<string[]>([]);

  const goalOptions = ['Lose weight', 'Maintain weight', 'Gain weight'];
  const nutrientOptions = [
    'Protein',
    'Vitamin C',
    'Magnesium',
    'Omega 3',
    'Zinc',
  ];
  const genders = ['male', 'female'];

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleDiet = (key: keyof typeof diet) => {
    setDiet((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleNutrient = (item: string) => {
    setNutrients((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = () => {
    Alert.alert('Form', JSON.stringify({ form, diet, nutrients }, null, 2));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>What is your goal?</Text>

      <View style={styles.segmentContainer}>
        {goalOptions.map((option) => (
          <ToggleButton
            key={option}
            label={option}
            active={form.goal === option}
            onPress={() => handleChange('goal', option)}
          />
        ))}
      </View>

      <Text style={styles.title}>Tell us about you</Text>

      <TextInput
        placeholder='Height'
        style={styles.input}
        value={form.height}
        onChangeText={(text) => handleChange('height', text)}
        keyboardType='numeric'
      />

      <TextInput
        placeholder='Weight'
        style={styles.input}
        value={form.weight}
        onChangeText={(text) => handleChange('weight', text)}
        keyboardType='numeric'
      />

      <TextInput
        placeholder='Age'
        style={styles.input}
        value={form.age}
        onChangeText={(text) => handleChange('age', text)}
        keyboardType='numeric'
      />
      <View style={styles.segmentContainer}>
        {genders.map((option) => (
          <ToggleButton
            key={option}
            label={option}
            active={form.goal === option}
            onPress={() => handleChange('gender', option)}
          />
        ))}
      </View>

      <Text style={styles.title}>Diet</Text>

      <View style={styles.row}>
        <Text style={styles.text}>Vegan</Text>
        <ToggleSwitch active={diet.vegan} onPress={() => toggleDiet('vegan')} />
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>Vegetarian</Text>
        <ToggleSwitch
          active={diet.vegetarian}
          onPress={() => toggleDiet('vegetarian')}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>Lactose Free</Text>
        <ToggleSwitch
          active={diet.lactoseFree}
          onPress={() => toggleDiet('lactoseFree')}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.text}>Gluten Free</Text>
        <ToggleSwitch
          active={diet.glutenFree}
          onPress={() => toggleDiet('glutenFree')}
        />
      </View>

      <Text style={styles.title}>Nutrition</Text>

      <View style={styles.grid}>
        {nutrientOptions.map((item) => (
          <ToggleButton
            key={item}
            label={item}
            active={nutrients.includes(item)}
            onPress={() => toggleNutrient(item)}
          />
        ))}
      </View>

      <Button label='Save' onPress={handleSubmit}></Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
    color: '#fff',
  },

  text: {
    color: '#fff',
  },

  input: {
    borderWidth: 1,
    borderColor: '#444',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    color: '#fff',
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  segmentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});

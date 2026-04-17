import React from 'react';
import { ScrollView, View, Text, StyleSheet, Dimensions, Alert } from 'react-native';

import Button from '../components/ui/RegularButton';
import { useSettings } from '../hooks/useSettings';

import GoalSection from '../components/setting/GoalSection';
import PersonaSection from '../components/setting/PersonaSection';
import DietSection from '../components/setting/DietSection';
import NutritionSection from '../components/setting/NutritionSection';
import AppTitle from '../components/ui/AppTitle';

const { width } = Dimensions.get('window');

export default function SettingScreen() {
  const { state, actions, submit } = useSettings();

  const [index, setIndex] = React.useState(0);

  const titles = [
    'Your Goal',
    'About You',
    'Diet Preferences',
    'Nutrition',
  ];

  const handleScroll = (e: any) => {
    const newIndex = Math.round(
      e.nativeEvent.contentOffset.x / width
    );
    setIndex(newIndex);
  };

  const handleSave = async () => {
    try {
      await submit();
      Alert.alert('Success', 'Settings saved');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <AppTitle>{titles[index]}</AppTitle>
      </View>

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
      >
        <View style={styles.page}>
          <GoalSection
            goal={state.goal}
            onChange={actions.setGoal}
            options={['Lose weight', 'Maintain weight', 'Gain weight']}
          />
        </View>

        <View style={styles.page}>
          <PersonaSection
            persona={state.persona}
            onChange={actions.setPersonaField}
            genders={['male', 'female']}
          />
        </View>

        <View style={styles.page}>
          <DietSection
            diet={state.diet}
            onToggle={actions.toggleDiet}
            options={[
              { key: 'vegan', label: 'Vegan' },
              { key: 'vegetarian', label: 'Vegetarian' },
              { key: 'lactoseFree', label: 'Lactose Free' },
              { key: 'glutenFree', label: 'Gluten Free' },
            ]}
          />
        </View>

        <View style={styles.page}>
          <NutritionSection
            nutrients={state.nutrients}
            onToggle={actions.toggleNutrient}
            options={[
              'iron','zinc','calcium','phosphorus',
              'selenium','a','e','c','d',
              'b1','b6','b12',
            ]}
          />

          <Button label="Save" onPress={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    height: 100,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  page: {
    width,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
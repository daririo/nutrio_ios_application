import React from 'react';
import { View, StyleSheet, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSettings } from '../hooks/useSettings';

import GoalSection from '../components/setting/GoalSection';
import PersonaSection from '../components/setting/PersonaSection';
import DietSection from '../components/setting/DietSection';
import NutritionSection from '../components/setting/NutritionSection';
import RegularButton from '../components/ui/RegularButton';
import AppTitle from '../components/ui/AppTitle';
import AppText from '../components/ui/AppText';
import { useNavigation } from '@react-navigation/native';



export default function SettingScreen() {
  const { state, actions, submit } = useSettings();

  const [step, setStep] = React.useState(0);

  const navigation = useNavigation()
  
    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setStep(0)
      })
  
      return unsubscribe
    }, [navigation])

  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const steps = ['goal', 'persona', 'diet', 'nutrition'];
  const stepTitles = [
    'What`s your Goal?',
    'Tell us About you!',
    'Your Diet Preferences',
    'Your Nutritional Focus',
  ];
  const title = stepTitles[step];
  const isLastStep = step === steps.length - 1;

  const handleSave = async () => {
    try {
      await submit();
      Alert.alert('Success', 'Settings saved');
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  const animateStepChange = (callback: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => {
      callback();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
    });
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      animateStepChange(() => setStep((prev) => prev + 1));
    } else {
      handleSave();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      animateStepChange(() => setStep((prev) => prev - 1));
    }
  };

  const progress = (step + 1) / steps.length;

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <GoalSection
            goal={state.goal}
            onChange={actions.setGoal}
            options={['Lose weight', 'Maintain weight', 'Gain weight']}
          />
        );

      case 1:
        return (
          <PersonaSection
            persona={state.persona}
            onChange={actions.setPersonaField}
            genders={['male', 'female']}
          />
        );

      case 2:
        return (
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
        );

      case 3:
        return (
          <NutritionSection
            nutrients={state.nutrients}
            onToggle={actions.toggleNutrient}
            options={[
              'iron',
              'zinc',
              'calcium',
              'phosphorus',
              'selenium',
              'a',
              'e',
              'c',
              'd',
              'b1',
              'b6',
              'b12',
            ]}
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <AppText style={{ textAlign: 'center' }}>{step + 1}/4</AppText>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>
      </View>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <AppTitle>{title}</AppTitle>
        {renderStep()}
      </Animated.View>

      <View style={styles.bottom}>
        <View style={styles.buttonRow}>
          <RegularButton label='Back' onPress={prevStep} />

          <RegularButton
            label={isLastStep ? 'Save' : 'Next'}
            onPress={nextStep}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },

  top: {
    paddingHorizontal: 20,
    paddingVertical: 0,
  },

  progressBar: {
    height: 6,
    backgroundColor: '#1c1c1e',
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: '#323232',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 60,
  },

  bottom: {
    padding: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
    paddingBottom: 100,
  },
});

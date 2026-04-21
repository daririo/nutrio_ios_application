import { useEffect, useState } from 'react';

import {
  getSettings,
  postSettings,
  patchSettings,
} from '../api/backend-client';

import { mapToApi } from '../mappers/setting.mapper';

export function useSettings() {
  const [settingsId, setSettingsId] = useState<number | null>(null);

  const [goal, setGoal] = useState<string>('');

  const [persona, setPersona] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
  });

  const [diet, setDiet] = useState({
    vegan: false,
    vegetarian: false,
    lactoseFree: false,
    glutenFree: false,
  });

  const [nutrients, setNutrients] = useState<string[]>([]);

  // LOAD
  useEffect(() => {
    const load = async () => {
      const data = await getSettings();
      if (!data) return;

      setSettingsId(data.id);

      setGoal(data.goal ?? '');

      setPersona({
        gender: data.persona.gender ?? '',
        age: String(data.persona.age ?? ''),
        height: String(data.persona.height ?? ''),
        weight: String(data.persona.weight ?? ''),
      });

      const dietMap = {
        vegan: false,
        vegetarian: false,
        lactoseFree: false,
        glutenFree: false,
      };

      const nutrientsList: string[] = [];

      data.nutrition.forEach((n: any) => {
        if (n.category === 'diet') {
          dietMap[n.name as keyof typeof dietMap] = n.is_selected;
        }

        if (n.category === 'nutrient' && n.is_selected) {
          nutrientsList.push(n.name);
        }
      });

      setDiet(dietMap);
      setNutrients(nutrientsList);
    };

    load();
  }, []);

  // ACTIONS
  const setGoalHandler = (value: string) => setGoal(value);

  const setPersonaField = (key: keyof typeof persona, value: string) => {
    setPersona((p) => ({ ...p, [key]: value }));
  };

  const toggleDiet = (key: keyof typeof diet) => {
    setDiet((d) => ({ ...d, [key]: !d[key] }));
  };

  const toggleNutrient = (name: string) => {
    setNutrients((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  // SUBMIT
  const submit = async () => {
    const payload = mapToApi({
      goal,
      persona,
      diet,
      nutrients,
    });

    if (settingsId) {
      await patchSettings(settingsId, payload);
    } else {
      const res = await postSettings(payload);
      setSettingsId(res?.data?.id);
    }
  };

  return {
    state: {
      goal,
      persona,
      diet,
      nutrients,
    },
    actions: {
      setGoal: setGoalHandler,
      setPersonaField,
      toggleDiet,
      toggleNutrient,
    },
    submit,
  };
}

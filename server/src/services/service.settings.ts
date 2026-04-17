import { AppDataSource } from '../data-source';
import { Settings } from '../entities/settings/Settings';
import { Nutrition } from '../entities/settings/Nutrition';
import { Persona } from '../entities/settings/Persona';

const settingsRepo = AppDataSource.getRepository(Settings);
const personaRepo = AppDataSource.getRepository(Persona);
const nutritionRepo = AppDataSource.getRepository(Nutrition);

export const createSetting = async (settingData: {
  goal: string;
  persona: Persona;
  nutrition: Nutrition[];
}) => {
  const setting = settingsRepo.create(settingData);
  return await settingsRepo.save(setting);
};

export const getSettings = async () => {
  return settingsRepo.findOne({
    where: {},
    relations: ['persona', 'nutrition'],
  });
};

export const patchSettings = async (
  id: number,
  patchData: Partial<{
    goal: string;
    persona: Persona;
    nutrition: Nutrition[];
  }>
) => {
  const setting = await settingsRepo.findOne({
    where: { id },
    relations: ['persona', 'nutrition'],
  });

  if (!setting) {
    throw new Error('Setting not found');
  }

  if (patchData.goal !== undefined) {
    await settingsRepo.update(id, { goal: patchData.goal });
  }

  if (patchData.persona) {
    const personaId = setting.persona?.id;

    if (personaId) {
      await personaRepo.update(personaId, patchData.persona);
    } else {
      const newPersona = personaRepo.create(patchData.persona);
      const saved = await personaRepo.save(newPersona);

      setting.persona = saved;
      await settingsRepo.save(setting);
    }
  }

  if (patchData.nutrition) {
    const existing = setting.nutrition;

    const key = (n: any) => `${n.category}-${n.name}`;

    const existingMap = new Map(existing.map((n) => [key(n), n]));

    for (const item of patchData.nutrition) {
      const k = key(item);
      const match = existingMap.get(k);

      if (match) {
        await nutritionRepo.update(match.id, {
          category: item.category,
          name: item.name,
          is_selected: item.is_selected,
        });

        existingMap.delete(k);
      } else {
        const newNutrition = nutritionRepo.create({
          ...item,
          settings: setting,
        });

        await nutritionRepo.save(newNutrition);
      }
    }
  }

  return await settingsRepo.findOne({
    where: { id },
    relations: ['persona', 'nutrition'],
  });
};

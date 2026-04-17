import { AppDataSource } from '../data-source';
import { Settings } from '../entities/settings/Settings';
import { Nutrition } from '../entities/settings/Nutrition';
import { Persona } from '../entities/settings/Persona';

const settingRepository = AppDataSource.getRepository(Settings);

export const createSetting = async (settingData: {
  goal: string;
  persona: Persona;
  nutrition: Nutrition[];
}) => {
  const setting = settingRepository.create({
    goal: settingData.goal,
    persona: settingData.persona,
    nutrition: settingData.nutrition,
  });

  return await settingRepository.save(setting);
};

export const getSettings = async () => {
  return settingRepository.findOne({
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
  const setting = await settingRepository.findOne({
    where: { id },
    relations: ['persona', 'nutrition'],
  });

  if (!setting) {
    throw new Error('Setting not found');
  }

  if (patchData.goal !== undefined) {
    setting.goal = patchData.goal;
  }

  if (patchData.persona !== undefined) {
  if (setting.persona?.id) {
    await AppDataSource.getRepository(Persona).update(
      setting.persona.id,
      patchData.persona
    );
  } else {
    setting.persona = patchData.persona;
  }
}

  if (patchData.nutrition !== undefined) {
    setting.nutrition = patchData.nutrition;
  }

  return await settingRepository.save(setting);
};
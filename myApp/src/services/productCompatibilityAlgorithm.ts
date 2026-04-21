import { Products } from '../types/Products';
import { Nutrition, Settings } from '../types/Settings';

type NutrientKey = keyof Products['micros'] | keyof Products['vitamins'];

export function checkCompability(
  product: Products,
  settings: Settings
): boolean {

  const kcalOk = calorieFits(settings.goal, product.macros.kcal);

  const selected = getSelectedNutrients(settings.nutrition);
  const matchCount = countMatches(product, selected);

  const nutrientOk = matchCount >= 4;


  return kcalOk || nutrientOk ? true : false;
}

function calorieFits(goal: string, kcal: number) {
  if (goal === 'Gain weight') return kcal >= 150;
  if (goal === 'Lose weight') return kcal <= 100;
  if (goal === 'Maintain weight') return kcal >= 100 && kcal <= 200;

  return false;
}

function getSelectedNutrients(nutrition: Nutrition[]): NutrientKey[] {
  return nutrition
    .filter((n) => n.is_selected && n.category === 'nutrient')
    .map((n) => n.name as NutrientKey);
}

function countMatches(product: Products, selected: NutrientKey[]) {
  const all = {
    ...product.micros,
    ...product.vitamins,
  };

  let count = 0;

  for (const name of selected) {
    if (all[name] !== undefined && all[name] > 0) {
      count++;
    }
  }

  return count;
}
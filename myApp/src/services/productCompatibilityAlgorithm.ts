import { Products } from '../types/Products';
import { Nutrition, Settings } from '../types/Settings';

type NutrientKey = keyof Products['micros'] | keyof Products['vitamins'];

export function checkCompability(
  product: Products,
  settings: Settings
): boolean {
  const needs = getUserNeeds(settings);

  const kcal = product.macros.kcal;
  const protein = product.macros.protein;
  const sugar = product.macros?.sugar ?? 0;
  const fiber = product.macros?.fiber ?? 0;

  const kcalOk = calorieFits(kcal, needs.kcal, settings.goal);
  const proteinOk = proteinFits(protein, needs.protein);

  const selected = getSelectedNutrients(settings.nutrition);
  const matches = countMatches(product, selected);
  const nutrientOk = matches >= 3;

  const blockA = (kcalOk && sugar < 10) || fiber > 2;
  const blockB = nutrientOk;
  const blockC = (proteinOk && sugar < 10) || fiber > 2;

  const result = blockA || blockB || blockC;

  return result;
}

function getUserNeeds(settings: Settings) {
  const { weight, height, age, gender } = settings.persona;

  const base =
    gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

  const kcal =
    settings.goal === 'Lose weight'
      ? base - 300
      : settings.goal === 'Gain weight'
      ? base + 300
      : base;

  const proteinMultiplier =
    settings.goal === 'Lose weight'
      ? 1.6
      : settings.goal === 'Maintain weight'
      ? 1.9
      : 2.2;

  return {
    kcal,
    protein: weight * proteinMultiplier,
  };
}

function calorieFits(kcal: number, kcalNeeds: number, goal: string): boolean {
  if (goal === 'Lose weight') return kcal < kcalNeeds * 0.1;

  if (goal === 'Maintain weight')
    return kcal > kcalNeeds * 0.1 && kcal < kcalNeeds * 0.2;

  if (goal === 'Gain weight') return kcal > kcalNeeds * 0.15;

  return false;
}

function proteinFits(protein: number, proteinNeeds: number): boolean {
  const lower = proteinNeeds * 0.05;
  return protein >= lower;
}

function getSelectedNutrients(nutrition: Nutrition[]): NutrientKey[] {
  return nutrition
    .filter((n) => n.is_selected && n.category === 'nutrient')
    .map((n) => n.name as NutrientKey);
}

function countMatches(product: Products, selected: NutrientKey[]) {
  const all = { ...product.micros, ...product.vitamins };
  let count = 0;

  for (const name of selected) {
    if (all[name] !== undefined && all[name] > 0) {
      count++;
    }
  }

  return count;
}

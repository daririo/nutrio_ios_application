export function mapToApi({
  goal,
  persona,
  diet,
  nutrients,
}: {
  goal: string;
  persona: {
    gender: string;
    age: string;
    height: string;
    weight: string;
  };
  diet: Record<string, boolean>;
  nutrients: string[];
}) {
  return {
    goal,
    persona: {
      gender: persona.gender,
      age: Number(persona.age),
      height: Number(persona.height),
      weight: Number(persona.weight),
    },
    nutrition: [
      ...Object.entries(diet).map(([key, value]) => ({
        category: 'diet',
        name: key,
        is_selected: value,
      })),

      ...[
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
      ].map((n) => ({
        category: 'nutrient',
        name: n,
        is_selected: nutrients.includes(n),
      })),
    ],
  };
}
export function mapOpenFoodProduct(response: any) {
  const p = response.product ?? {};

  const nutriments = p.nutriments ?? {};
  const estimated = p.nutriments_estimated ?? null;

  if (!p.product_name_de && !p.product_name_de || !p.image_front_url) throw new Error

  return {
    id: Number(response.code),
    name: p.product_name_de ?? p.product_name_en,
    image_url: p.image_front_url,

    macros: {
      kcal: nutriments['energy-kcal_100g'],
      fat: nutriments.fat_100g,
      protein: nutriments.proteins_100g,
      sugar: nutriments.sugars_100g,
      fiber: nutriments.fiber_100g,
    },

    micros:
      estimated !== null
        ? {
            iron: estimated.iron_100g,
            zinc: estimated.zinc_100g,
            magnesium: estimated.magnesium_100g,
            calcium: estimated.calcium_100g,
            phosphor: estimated.phosphorus_100g,
            selenium: estimated.selenium_100g,
          }
        : {},

    vitamins:
      estimated !== null
        ? {
            a: estimated['vitamin-a_100g'],
            e: estimated['vitamin-e_100g'],
            c: estimated['vitamin-c_100g'],
            d: estimated['vitamin-d_100g'],
            b1: estimated['vitamin-b1_100g'],
            b6: estimated['vitamin-b6_100g'],
            b12: estimated['vitamin-b12_100g'],
          }
        : {},
  };
}

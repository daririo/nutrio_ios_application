import { Request, Response } from 'express';
import model from '../geminiConfig';
import * as settingService from '../services/service.settings';

export async function productRecommendation(req: Request, res: Response) {
  try {
    const { product } = req.body;
    const settings = await settingService.getSettings();

    if (!settings || !product) return res.status(400);

    const prompt = `You are a nutrition assistant.

Your task is to decide whether a food product should be recommended to a user based on their dietary preferences and nutritional goals.

You will receive:
1. A product object (with name, macros, micros, vitamins)
2. A user object (with goal, diet preferences, and nutrient focus)

Instructions:
- Respond in English.
- Output ONLY 1–2 short sentences.
- Clearly state whether the product is recommended or not.
- Justify your answer briefly based on:
  - Diet compatibility (e.g. vegan, lactose-free, gluten-free)
  - User goal (e.g. gain weight, lose weight)
  - Key nutrients the user selected
- Use both the provided data AND general knowledge inferred from the product name (e.g. "peas and carrots" are typically vegan).
- If information is missing, make a reasonable assumption based on the product name, but stay cautious.
- Keep the explanation concise and practical (no generic health advice).

Product:
${product}

User:
${settings.persona}
Goal:
${settings.goal}
Nutrition & Diet:
${settings.nutrition}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    res.status(201);
    res.json(JSON.parse(responseText));
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).send('AI generation failed.');
  }
}

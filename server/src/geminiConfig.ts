import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import "dotenv/config";


const genAI = new GoogleGenerativeAI(process.env.GEMENI_API_KEY as string);

const schema: any = {
  description: "Product evaluation and recommendation",
  type: SchemaType.OBJECT,
  properties: {
    recommendation: { 
      type: SchemaType.STRING, 
      description: "A one-sentence explanation of why the product is or isn't recommended."
    },
    is_recommended: { 
      type: SchemaType.BOOLEAN, 
      description: "True if the product matches the user's settings, false otherwise."
    },
  },
  required: ["recommendation", "is_recommended"],
};

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: schema,
  },
});

export default model



import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const summarizeText = async (text: string): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("API Key for Gemini not configured. Please set the API_KEY environment variable.");
  }
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Você é um assistente de estudos especialista em resumos.
        Resuma o seguinte texto em pontos-chave, de forma clara e concisa para um estudante.
        O resumo deve ser em português.

        Texto original:
        ---
        ${text}
        ---
        `,
        config: {
            temperature: 0.5,
            topP: 0.95,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error summarizing text with Gemini:", error);
    return "Ocorreu um erro ao tentar resumir o texto. Por favor, tente novamente.";
  }
};

export const generateMeme = async (): Promise<string> => {
    if (!API_KEY) {
        // Fallback to a static image if API key is not available
        return "https://picsum.photos/seed/studymeme/400/250";
    }
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
                parts: [
                    {
                        text: 'Gere um meme visualmente engraçado e com texto curto sobre a vida de um estudante brasileiro se preparando para o vestibular ou concurso. O humor deve ser leve e relacionável, sobre procrastinação ou a quantidade de matéria para estudar.',
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:image/png;base64,${base64ImageBytes}`;
            }
        }
        throw new Error("Nenhuma imagem foi gerada.");

    } catch (error) {
        console.error("Error generating meme with Gemini:", error);
        return "https://picsum.photos/seed/studymeme/400/250";
    }
};

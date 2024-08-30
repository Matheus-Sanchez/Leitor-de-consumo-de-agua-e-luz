import axios from 'axios';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const getMeasureFromImage = async (imageBase64: string): Promise<number> => {
  const response = await axios.post('https://ai.google.dev/gemini-api/vision', {
    image: imageBase64,
  }, {
    headers: {
      'Authorization': `Bearer ${GEMINI_API_KEY}`,
    },
  });

  // Parseie a resposta para extrair o valor da medida
  const measureValue = response.data.value; // Isso vai depender da resposta da API

  return measureValue;
};

export default { getMeasureFromImage };

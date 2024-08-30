import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import geminiService from '../services/geminiService';

const uploadController = async (req: Request, res: Response) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    // Validação básica
    if (!image || !customer_code || !measure_datetime || !measure_type) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Missing required fields',
      });
    }

    // Verifique se já existe uma leitura para o mês atual aqui (você precisará de uma função de verificação)

    // Integração com a API do Gemini
    const measure_value = await geminiService.getMeasureFromImage(image);

    // Retornar a resposta
    res.status(200).json({
      image_url: 'temporary_url_for_image', // Substitua com a URL correta se houver
      measure_value,
      measure_uuid: uuidv4(),
    });
  } catch (error) {
    res.status(500).json({
      error_code: 'INTERNAL_ERROR',
      error_description: 'An error occurred while processing the request',
    });
  }
};

export default uploadController;

import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import geminiService from '../services/geminiService';
import MeasureModel from '../models/measureModel';

const uploadController = async (req: Request, res: Response) => {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    if (!image || !customer_code || !measure_datetime || !measure_type) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Missing required fields',
      });
    }

    // Verificar se já existe uma leitura no mês atual
    const existingMeasure = await MeasureModel.findOne({
      customer_code,
      measure_type,
      measure_datetime: {
        $gte: new Date(new Date(measure_datetime).getFullYear(), new Date(measure_datetime).getMonth(), 1),
        $lt: new Date(new Date(measure_datetime).getFullYear(), new Date(measure_datetime).getMonth() + 1, 1),
      },
    });

    if (existingMeasure) {
      return res.status(409).json({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      });
    }

    // Integrar com a API do Gemini
    const measure_value = await geminiService.getMeasureFromImage(image);

    // Salvar no banco de dados
    const newMeasure = new MeasureModel({
      measure_uuid: uuidv4(),
      customer_code,
      measure_datetime,
      measure_type,
      has_confirmed: false,
      image_url: 'temporary_url_for_image', // Substitua com a URL correta
    });

    await newMeasure.save();

    res.status(200).json({
      image_url: newMeasure.image_url,
      measure_value,
      measure_uuid: newMeasure.measure_uuid,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 'INTERNAL_ERROR',
      error_description: 'An error occurred while processing the request',
    });
  }
};

export default uploadController;

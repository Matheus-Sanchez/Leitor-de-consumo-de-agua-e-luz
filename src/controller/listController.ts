import { Request, Response } from 'express';

const listController = async (req: Request, res: Response) => {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    // Validação básica
    if (!customer_code) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Missing customer code',
      });
    }

    // Valide o measure_type se for informado
    if (measure_type && !['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
      return res.status(400).json({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      });
    }

    // Consulte o banco de dados para obter as medidas do cliente
    const measures = []; // Substitua com a consulta real ao banco

    if (measures.length === 0) {
      return res.status(404).json({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      });
    }

    res.status(200).json({
      customer_code,
      measures,
    });
  } catch (error) {
    res.status(500).json({
      error_code: 'INTERNAL_ERROR',
      error_description: 'An error occurred while processing the request',
    });
  }
};

export default listController;

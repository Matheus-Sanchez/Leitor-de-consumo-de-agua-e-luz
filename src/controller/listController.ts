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

    // Valide o measure_type se for informado e se é uma string
    if (measure_type && typeof measure_type === 'string' && !['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
      return res.status(400).json({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      });
    }

    // Exemplo de como você pode preencher essa variável com dados do banco
    // Aqui, substitua com uma consulta real ao banco de dados
    const measures = [
      {
        measure_uuid: "uuid1",
        measure_datetime: "2024-08-29T12:34:56Z",
        measure_type: "WATER",
        has_confirmed: true,
        image_url: "http://example.com/image1.jpg",
      },
      {
        measure_uuid: "uuid2",
        measure_datetime: "2024-08-30T12:34:56Z",
        measure_type: "GAS",
        has_confirmed: false,
        image_url: "http://example.com/image2.jpg",
      }
    ]; // Este array deveria vir do banco de dados

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

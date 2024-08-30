import { Request, Response } from 'express';
import { findMeasures } from '../services/measureService';

export const getMeasures = async (req: Request, res: Response) => {
    const { customer_code } = req.params;
    let { measure_type } = req.query;

    if (measure_type) {
        measure_type = (measure_type as string).toUpperCase();
        if (measure_type !== 'WATER' && measure_type !== 'GAS') {
            return res.status(400).json({
                error_code: 'INVALID_TYPE',
                error_description: 'Tipo de medição não permitida',
            });
        }
    }

    const measures = await findMeasures(customer_code, measure_type);

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
};

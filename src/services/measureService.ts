export const findMeasures = async (customer_code: string, measure_type?: string) => {
    // Simulação de busca no banco de dados
    const mockData = [
        {
            customer_code: customer_code,
            measure_uuid: '1234',
            measure_datetime: new Date(),
            measure_type: 'WATER',
            has_confirmed: true,
            image_url: 'http://example.com/image1.jpg',
        },
        {
            customer_code: customer_code,
            measure_uuid: '5678',
            measure_datetime: new Date(),
            measure_type: 'GAS',
            has_confirmed: false,
            image_url: 'http://example.com/image2.jpg',
        },
    ];

    return mockData.filter(measure => 
        (!measure_type || measure.measure_type === measure_type)
    );
};

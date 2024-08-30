import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';


const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Rotas
app.use('/api', routes);

export default app;

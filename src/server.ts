import app from './app';
import connectDB from './database';

const PORT = process.env.PORT || 3000;

// Conectar ao MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

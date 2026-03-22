import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import statsRouter from './routes/stats'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/stats', statsRouter)

app.get('/ping', (req, res) => {
  res.json({ message: 'backend is alive' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
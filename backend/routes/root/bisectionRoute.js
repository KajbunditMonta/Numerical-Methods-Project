import express from 'express';
import Bisection from '../../models/root/BisectionModels.js';

const router = express.Router();

router.post('/save', async (req, res) => {
  try {
    const data = new Bisection(req.body);
    await data.save();
    res.json({ message: 'Save Done!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving data', error: err.message });
  }
});

router.get('/history', async (req, res) => {
  try {
    const all = await Bisection.find().sort({ createdAt: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching history', error: err.message });
  }
});

export default router;
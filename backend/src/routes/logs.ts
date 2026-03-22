import { Router } from "express";
import fs from 'fs/promises'

const router = Router();

router.get('/:name', async (req, res) => {
    try {


    const data = await fs.readFile(`/home/fin/.pm2/logs/${req.params.name}-out.log`, 'utf-8' as const);
    const lines = data.split('\n');
    const slicedLines = lines.slice(-50);
    res.json(slicedLines)


    } catch (err) {console.error("Error", err)}
})

export default router
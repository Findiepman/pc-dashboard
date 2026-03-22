import { Router } from "express";
import si from 'systeminformation'

const router = Router();
router.get('/', async (req, res) => {
    const [cpu, mem, disk] = await Promise.all([
        si.currentLoad(),
        si.mem(),
        si.fsSize()
    ]);

    res.json({
        cpu: parseFloat(cpu.currentLoad.toFixed(1)),
        memUsed: parseFloat((mem.used / 1024 / 1024 / 1024).toFixed(2)),
        memTotal: parseFloat((mem.total / 1024 / 1024 / 1024).toFixed(2)),
        diskUsed: parseFloat((disk[0].used / 1024 / 1024 / 1024).toFixed(2)),
        diskTotal: parseFloat((disk[0].size / 1024 / 1024 / 1024).toFixed(2)),
    });
});

export default router
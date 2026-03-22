import { Router } from 'express';
import { exec } from 'child_process';

const router = Router();

router.get('/', (req, res) => {
  exec('pm2 jlist', (err, stdout) => {
    if (err) return res.status(500).json({ error: 'PM2 not available' });
    
    try {
      const processes = JSON.parse(stdout);
      const services = processes.map((p: any) => ({
        name: p.name,
        status: p.pm2_env?.status,
        uptime: p.pm2_env?.pm_uptime,
        restarts: p.pm2_env?.restart_time,
        memory: parseFloat((p.monit?.memory / 1024 / 1024).toFixed(1)),
        cpu: p.monit?.cpu,
      }));
      res.json(services);
    } catch {
      res.status(500).json({ error: 'Failed to parse PM2 output' });
    }
  });
});

router.post('/:name/restart', (req, res) => {
  exec(`pm2 restart ${req.params.name}`, (err) => {
    if (err) return res.status(500).json({ error: 'Failed to restart' });
    res.json({ success: true });
  });
});

export default router;
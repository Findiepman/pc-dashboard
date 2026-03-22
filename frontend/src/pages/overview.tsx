import { useState, useEffect } from "react";
import type { Stats } from "../types/types";
import "./Overview.css";

const API_URL = import.meta.env.VITE_API_URL;

export function Overview() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/stats`)
        .then((res) => res.json())
        .then((data) => setStats(data));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const memPct = stats
    ? Math.round((stats.memUsed / stats.memTotal) * 100)
    : 0;
  const diskPct = stats
    ? Math.round((stats.diskUsed / stats.diskTotal) * 100)
    : 0;

  return (
    <div className="overview">
      <header className="overview-header">
        <div className="header-left">
          <span className="status-dot" />
          <span className="status-label">ONLINE</span>
        </div>
        <h1 className="overview-title">SYS<span>MONITOR</span></h1>
        <div className="header-right">
          <span className="refresh-label">LIVE · 3s</span>
        </div>
      </header>

      <div className="cards">
        <div className="card">
          <div className="card-label">CPU LOAD</div>
          <div className="card-value">
            {stats ? stats.cpu : "—"}<span className="card-unit">%</span>
          </div>
          <div className="bar-track">
            <div
              className="bar-fill bar-cpu"
              style={{ width: stats ? `${stats.cpu}%` : "0%" }}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-label">MEMORY</div>
          <div className="card-value">
            {stats ? stats.memUsed : "—"}<span className="card-unit">GB</span>
          </div>
          <div className="bar-track">
            <div
              className="bar-fill bar-mem"
              style={{ width: `${memPct}%` }}
            />
          </div>
          <div className="card-sub">
            {stats ? `${memPct}% of ${stats.memTotal}GB` : "—"}
          </div>
        </div>

        <div className="card">
          <div className="card-label">DISK</div>
          <div className="card-value">
            {stats ? stats.diskUsed : "—"}<span className="card-unit">GB</span>
          </div>
          <div className="bar-track">
            <div
              className="bar-fill bar-disk"
              style={{ width: `${diskPct}%` }}
            />
          </div>
          <div className="card-sub">
            {stats ? `${diskPct}% of ${stats.diskTotal}GB` : "—"}
          </div>
        </div>
      </div>
    </div>
  );
}
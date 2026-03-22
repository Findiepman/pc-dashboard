import { useState, useEffect } from "react";
import type { Service } from "../types/types";
import "./Services.css";

const API_URL = import.meta.env.VITE_API_URL;

export function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/services`)
        .then((res) => res.json())
        .then((data) => setServices(data));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRestart = (name: string) => {
    fetch(`${API_URL}/services/${name}/restart`, { method: "POST" });
  };

  const formatUptime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);
    if (d > 0) return `${d}d ${h % 24}h`;
    if (h > 0) return `${h}h ${m % 60}m`;
    return `${m}m`;
  };

  return (
    <div className="services">
      <div className="services-header">
        <span className="services-title-label">PROCESSES</span>
        <span className="services-count">{services.length} running</span>
      </div>

      <div className="service-list">
        {services.map((service) => (
          <div className="service-row" key={service.name}>
            <div className="service-left">
              <span className={`service-dot ${service.status === "online" ? "dot-online" : "dot-offline"}`} />
              <div>
                <div className="service-name">{service.name}</div>
                <div className="service-meta">
                  up {formatUptime(service.uptime)} · {service.restarts} restarts
                </div>
              </div>
            </div>

            <div className="service-stats">
              <div className="service-stat">
                <span className="stat-label">CPU</span>
                <span className="stat-value">{service.cpu}<span className="stat-unit">%</span></span>
              </div>
              <div className="service-stat">
                <span className="stat-label">MEM</span>
                <span className="stat-value">{service.memory}<span className="stat-unit">MB</span></span>
              </div>
            </div>

            <button
              className="restart-btn"
              onClick={() => handleRestart(service.name)}
            >
              RESTART
            </button>
          </div>
        ))}

        {services.length === 0 && (
          <div className="services-empty">No processes found</div>
        )}
      </div>
    </div>
  );
}
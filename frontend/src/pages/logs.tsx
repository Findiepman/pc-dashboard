import { useState, useEffect, useRef } from "react";
import "./Logs.css";

const API_URL = import.meta.env.VITE_API_URL;

export function Logs() {
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/logs/my-bot`)
        .then((res) => res.json())
        .then((data) => setLogs(data));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="logs">
      <div className="logs-header">
        <span className="logs-title-label">LOGS</span>
        <span className="logs-meta">my-bot · last 50 lines</span>
      </div>

      <div className="logs-window">
        {logs.map((line, index) => (
          <div className="log-line" key={index}>
            <span className="log-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="log-text">{line}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
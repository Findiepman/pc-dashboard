export interface Stats {
  cpu: number;
  memUsed: number;
  memTotal: number;
  diskUsed: number;
  diskTotal: number;
}
export interface Service {
    name: string,
    status: string,
    uptime: number,
    restarts: number,
    memory: number
    cpu: number
}

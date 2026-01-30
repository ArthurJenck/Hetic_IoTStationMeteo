export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

export type SensorData = {
  temperature: number;
  humidity: number;
  timestamp: number;
};

export type WSMessage = {
  type: 'sensor_data' | 'ping' | 'pong' | 'error';
  payload: SensorData | null;
};

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

export type SensorValue = {
  unit: string;
  value: number;
};

export type WeatherInfo = {
  deviceId: string;
  ts: number;
  humidity: SensorValue;
  temperature: SensorValue;
};

export type DeviceStatus = {
  deviceId: string;
  ts: number;
  status: string;
};

export type WeatherData = {
  weather: WeatherInfo;
  status: DeviceStatus;
};

export type WSMessage = {
  topic: string;
  data: WeatherData;
  timestamp: number;
};

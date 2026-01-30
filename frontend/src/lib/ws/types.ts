export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';

// Format envoyé par le bridge
export type WeatherData = {
  temp: number;
  unite: string;
  humidity: number;
};

export type WSMessage = {
  topic: string;
  data: WeatherData;
  timestamp: number;
};

'use client';

import { useEffect, useRef, useState } from 'react';
import type {
  ConnectionStatus,
  RawSensorData,
  TestModeData,
  WeatherData,
  WSMessage,
} from './types';
import { env } from '@/lib/config/env';

const WS_URL = env.NEXT_PUBLIC_WS_URL;

function isRawSensorData(data: RawSensorData | TestModeData): data is RawSensorData {
  return 'device_id' in data;
}

function normalizeWeatherData(data: RawSensorData | TestModeData): WeatherData {
  if (isRawSensorData(data)) {
    return {
      weather: {
        deviceId: data.device_id,
        ts: data.ts,
        humidity: data.humidity,
        temperature: data.temperature,
      },
      status: null,
    };
  }
  return data;
}

export function useWebSocket() {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [isTestMode, setIsTestMode] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  function handleMessage(event: MessageEvent) {
    try {
      const message: WSMessage = JSON.parse(event.data);
      console.log('Message reçu:', message);

      if (message.data) {
        const normalized = normalizeWeatherData(message.data);
        setWeatherData(normalized);
        setTimestamp(message.timestamp);
      }
    } catch (error) {
      console.error('Erreur parsing message:', error);
    }
  }

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connecté');
      setStatus('connected');
    };

    ws.onclose = () => {
      console.log('WebSocket déconnecté');
      setStatus('disconnected');
    };

    ws.onerror = (error) => {
      console.error('Erreur WebSocket:', error);
    };

    ws.onmessage = handleMessage;

    return () => {
      ws.close();
    };
  }, []);

  function reconnect() {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => setStatus('connected');
    ws.onclose = () => setStatus('disconnected');
    ws.onerror = (error) => console.error('Erreur WebSocket:', error);
    ws.onmessage = handleMessage;
  }

  function disconnect() {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }

  function setTemperatureUnit(celsius: boolean) {
    setIsCelsius(celsius);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          topic: 'weather/unit',
          data: { unit: celsius },
        })
      );
    }
  }

  function setMode(mode: boolean) {
    setIsTestMode(mode);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          topic: 'weather/mode',
          data: { mode },
        })
      );
    }
  }

  return {
    status,
    weatherData,
    timestamp,
    isCelsius,
    isTestMode,
    connect: reconnect,
    disconnect,
    setTemperatureUnit,
    setMode,
  };
}

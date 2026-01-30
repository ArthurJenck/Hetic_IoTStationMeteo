'use client';

import { useEffect, useRef, useState } from 'react';

import type { ConnectionStatus, WeatherData, WSMessage } from './types';

const WS_URL = 'ws://localhost:8080';

export function useWebSocket() {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

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

    ws.onmessage = (event) => {
      try {
        const message: WSMessage = JSON.parse(event.data);
        console.log('Message reçu:', message);

        if (message.data) {
          setWeatherData(message.data);
          setTimestamp(message.timestamp);
        }
      } catch (error) {
        console.error('Erreur parsing message:', error);
      }
    };

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

    ws.onmessage = (event) => {
      try {
        const message: WSMessage = JSON.parse(event.data);
        if (message.data) {
          setWeatherData(message.data);
          setTimestamp(message.timestamp);
        }
      } catch (error) {
        console.error('Erreur parsing message:', error);
      }
    };
  }

  function disconnect() {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }

  return {
    status,
    weatherData,
    timestamp,
    connect: reconnect,
    disconnect,
  };
}

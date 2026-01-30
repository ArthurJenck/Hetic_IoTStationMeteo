'use client';

import { useEffect, useRef, useState } from 'react';

import type { ConnectionStatus, SensorData, WSMessage } from './types';

const WS_URL = 'ws://localhost:3001';

export function useWebSocket() {
  const [status, setStatus] = useState<ConnectionStatus>('connecting');
  const [sensorData, setSensorData] = useState<SensorData | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Créer la connexion WebSocket
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

        if (message.type === 'sensor_data' && message.payload) {
          setSensorData(message.payload);
        }

        if (message.type === 'ping') {
          ws.send(JSON.stringify({ type: 'pong', payload: null }));
        }
      } catch (error) {
        console.error('Erreur parsing message:', error);
      }
    };

    // Nettoyage
    return () => {
      ws.close();
    };
  }, []);

  // Reconnecter manuellement
  function reconnect() {
    if (wsRef.current) {
      wsRef.current.close();
    }

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;
    setStatus('connecting');

    ws.onopen = () => {
      setStatus('connected');
    };

    ws.onclose = () => {
      setStatus('disconnected');
    };

    ws.onerror = (error) => {
      console.error('Erreur WebSocket:', error);
    };

    ws.onmessage = (event) => {
      try {
        const message: WSMessage = JSON.parse(event.data);
        if (message.type === 'sensor_data' && message.payload) {
          setSensorData(message.payload);
        }
      } catch (error) {
        console.error('Erreur parsing message:', error);
      }
    };
  }

  // Déconnecter
  function disconnect() {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }

  return {
    status,
    sensorData,
    connect: reconnect,
    disconnect,
  };
}

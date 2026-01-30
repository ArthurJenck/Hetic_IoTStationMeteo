"use client"

import { Switch } from '@/components/shadcn-ui/switch';
import { formatTime } from '@/lib/utils/date';
import { useWebSocket } from '@/lib/ws';

import {
  ConnectionHeader,
  DeviceInfo,
  HumidityCard,
  TemperatureCard,
} from './_components';

export default function HomePage() {
  const {
    status,
    weatherData,
    timestamp,
    isCelsius,
    isTestMode,
    connect,
    disconnect,
    setTemperatureUnit,
    setMode,
  } = useWebSocket();

  const isConnected = status === 'connected';

  const weather = weatherData?.weather;
  const deviceStatus = weatherData?.status;

  return (
    <>
      <ConnectionHeader
        status={status}
        onConnect={connect}
        onDisconnect={disconnect}
      />

      {deviceStatus && <DeviceInfo deviceStatus={deviceStatus} />}

      <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
        <span>Vrai data</span>
        <Switch
          checked={isTestMode}
          onCheckedChange={setMode}
          disabled={!isConnected}
          size="sm"
        />
        <span>Fake data</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TemperatureCard
          temperature={weather?.temperature ?? null}
          isCelsius={isCelsius}
          onUnitChange={setTemperatureUnit}
          disabled={!isConnected}
        />
        <HumidityCard humidity={weather?.humidity ?? null} />
      </div>

      {timestamp && (
        <p className="text-center text-sm text-slate-500">
          Dernière mise à jour : {formatTime(timestamp)}
        </p>
      )}
    </>
  );
}

'use client';

import { Activity, Cpu, Droplets, Plug, Power, Thermometer, Wifi, WifiOff } from 'lucide-react';

import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { Switch } from '@/components/shadcn-ui/switch';
import { cn } from '@/lib/utils/cn';
import { formatTime } from '@/lib/utils/date';
import { useWebSocket } from '@/lib/ws';

export default function HomePage() {
  const { status, weatherData, timestamp, connect, disconnect, setTemperatureUnit } = useWebSocket();

  const isConnected = status === 'connected';
  const isLoading = status === 'connecting';

  const weather = weatherData?.weather;
  const deviceStatus = weatherData?.status;

  const isCelsius = weather?.temperature.unit === 'C';

  function handleUnitChange() {
    setTemperatureUnit(!isCelsius);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Station Météo</h1>
        <div className="flex items-center gap-2">
          <Badge variant={isConnected ? 'default' : 'destructive'} className="gap-1">
            {isConnected ? <Wifi /> : <WifiOff />}
            {isLoading ? 'Connexion...' : isConnected ? 'Connecté' : 'Déconnecté'}
          </Badge>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={isConnected ? disconnect : connect}
            disabled={isLoading}
            title={isConnected ? 'Déconnecter' : 'Connecter'}
          >
            {isConnected ? <Power /> : <Plug className={cn(isLoading && 'animate-pulse')} />}
          </Button>
        </div>
      </div>

      {deviceStatus && (
        <div className="flex items-center justify-center gap-4 text-sm text-slate-400">
          <span className="flex items-center gap-1">
            <Cpu className="size-3" />
            {deviceStatus.deviceId}
          </span>
          <span className="flex items-center gap-1">
            <Activity className="size-3" />
            {deviceStatus.status}
          </span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="border-slate-700 bg-slate-800/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-400">
              <Thermometer className="size-4 text-orange-500" />
              Température
            </CardTitle>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>°F</span>
              <Switch checked={isCelsius} onCheckedChange={handleUnitChange} />
              <span>°C</span>
            </div>
          </CardHeader>
          <CardContent>
            {weather ? (
              <p className="text-4xl font-bold text-white">
                {weather.temperature.value}°{weather.temperature.unit}
              </p>
            ) : (
              <Skeleton className="h-10 w-24 bg-slate-700" />
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-700 bg-slate-800/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-400">
              <Droplets className="size-4 text-blue-500" />
              Humidité
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weather ? (
              <p className="text-4xl font-bold text-white">
                {weather.humidity.value}
                {weather.humidity.unit}
              </p>
            ) : (
              <Skeleton className="h-10 w-24 bg-slate-700" />
            )}
          </CardContent>
        </Card>
      </div>

      {timestamp && (
        <p className="text-center text-sm text-slate-500">
          Dernière mise à jour : {formatTime(timestamp)}
        </p>
      )}
    </>
  );
}

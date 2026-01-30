'use client';

import { Droplets, RefreshCw, Thermometer, Wifi, WifiOff } from 'lucide-react';

import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { cn } from '@/lib/utils/cn';
import { formatTime } from '@/lib/utils/date';
import { useWebSocket } from '@/lib/ws';

export default function HomePage() {
  const { status, sensorData, connect, disconnect } = useWebSocket();

  const isConnected = status === 'connected';
  const isLoading = status === 'connecting';

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Station Météo</h1>
        <div className="flex items-center gap-3">
          <Badge variant={isConnected ? 'default' : 'destructive'} className="gap-1">
            {isConnected ? <Wifi /> : <WifiOff />}
            {status === 'connecting' ? 'Connexion...' : isConnected ? 'Connecté' : 'Déconnecté'}
          </Badge>
          <Button
            variant="outline"
            size="icon-sm"
            onClick={isConnected ? disconnect : connect}
            disabled={isLoading}
            className="cursor-pointer"
          >
            <RefreshCw className={cn(isLoading && 'animate-spin')} />
          </Button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Température */}
        <Card className="border-slate-700 bg-slate-800/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-400">Température</CardTitle>
            <Thermometer className="size-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            {sensorData ? (
              <p className="text-4xl font-bold text-white">{sensorData.temperature}°C</p>
            ) : (
              <Skeleton className="h-10 w-24 bg-slate-700" />
            )}
          </CardContent>
        </Card>

        {/* Humidité */}
        <Card className="border-slate-700 bg-slate-800/50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium text-slate-400">Humidité</CardTitle>
            <Droplets className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            {sensorData ? (
              <p className="text-4xl font-bold text-white">{sensorData.humidity}%</p>
            ) : (
              <Skeleton className="h-10 w-24 bg-slate-700" />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dernière mise à jour */}
      {sensorData && (
        <p className="text-center text-sm text-slate-500">
          Dernière mise à jour : {formatTime(sensorData.timestamp)}
        </p>
      )}
    </>
  );
}

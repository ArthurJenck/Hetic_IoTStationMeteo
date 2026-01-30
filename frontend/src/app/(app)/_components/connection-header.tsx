'use client';

import { Plug, Power, Wifi, WifiOff } from 'lucide-react';

import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/lib/utils/cn';
import type { ConnectionStatus } from '@/lib/ws';

type ConnectionHeaderProps = {
  status: ConnectionStatus;
  onConnect: () => void;
  onDisconnect: () => void;
};

export function ConnectionHeader({ status, onConnect, onDisconnect }: ConnectionHeaderProps) {
  const isConnected = status === 'connected';
  const isLoading = status === 'connecting';

  return (
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
          onClick={isConnected ? onDisconnect : onConnect}
          disabled={isLoading}
          title={isConnected ? 'Déconnecter' : 'Connecter'}
        >
          {isConnected ? <Power /> : <Plug className={cn(isLoading && 'animate-pulse')} />}
        </Button>
      </div>
    </div>
  );
}

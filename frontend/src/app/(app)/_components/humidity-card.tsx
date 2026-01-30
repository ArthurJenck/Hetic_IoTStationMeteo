'use client';

import { Droplets } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import type { SensorValue } from '@/lib/ws';

type HumidityCardProps = {
  humidity: SensorValue | null;
};

export function HumidityCard({ humidity }: HumidityCardProps) {
  return (
    <Card className="border-slate-700 bg-slate-800/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-400">
          <Droplets className="size-4 text-blue-500" />
          Humidité
        </CardTitle>
      </CardHeader>
      <CardContent>
        {humidity ? (
          <p className="text-4xl font-bold text-white">
            {humidity.value}
            {humidity.unit}
          </p>
        ) : (
          <Skeleton className="h-10 w-24 bg-slate-700" />
        )}
      </CardContent>
    </Card>
  );
}

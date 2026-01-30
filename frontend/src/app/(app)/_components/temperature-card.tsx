'use client';

import { Thermometer } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { Skeleton } from '@/components/shadcn-ui/skeleton';
import { Switch } from '@/components/shadcn-ui/switch';
import type { SensorValue } from '@/lib/ws';

type TemperatureCardProps = {
  temperature: SensorValue | null;
  isCelsius: boolean;
  onUnitChange: (celsius: boolean) => void;
  disabled?: boolean;
};

export function TemperatureCard({
  temperature,
  isCelsius,
  onUnitChange,
  disabled = false,
}: TemperatureCardProps) {
  return (
    <Card className="border-slate-700 bg-slate-800/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-400">
          <Thermometer className="size-4 text-orange-500" />
          Température
        </CardTitle>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <span>°F</span>
          <Switch
            checked={isCelsius}
            onCheckedChange={onUnitChange}
            disabled={disabled}
            size="sm"
          />
          <span>°C</span>
        </div>
      </CardHeader>
      <CardContent>
        {temperature ? (
          <p className="text-4xl font-bold text-white">
            {temperature.value}°{temperature.unit}
          </p>
        ) : (
          <Skeleton className="h-10 w-24 bg-slate-700" />
        )}
      </CardContent>
    </Card>
  );
}

'use client';

import { Activity, Cpu } from 'lucide-react';

import type { DeviceStatus } from '@/lib/ws';

type DeviceInfoProps = {
  deviceStatus: DeviceStatus;
};

export function DeviceInfo({ deviceStatus }: DeviceInfoProps) {
  return (
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
  );
}

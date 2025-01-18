import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield, ShieldAlert, ShieldCheck, Clock, Link } from 'lucide-react';
import { ScanResult } from '@/types/scanner';

interface ScanResultsProps {
  results: ScanResult[];
  isScanning: boolean;
  scanLogs: string[];
}

const SeverityIcon = ({ severity }: { severity: string }) => {
  switch (severity) {
    case 'critical':
      return <ShieldAlert className="h-4 w-4 text-red-500" />;
    case 'high':
      return <ShieldAlert className="h-4 w-4 text-orange-500" />;
    case 'medium':
      return <Shield className="h-4 w-4 text-yellow-500" />;
    default:
      return <ShieldCheck className="h-4 w-4 text-blue-500" />;
  }
};

const ScanResults: React.FC<ScanResultsProps> = ({ results, isScanning, scanLogs }) => {
  return (
    <Card className="p-6 mt-4">
      <ScrollArea className="h-[400px] rounded-md border bg-black p-4 font-mono text-sm">
        <div className="space-y-1">
          {scanLogs.map((log, index) => (
            <div key={index} className="flex">
              <span className="text-[#00ff00] mr-2">[scanner@threatfinder]$</span>
              <span className="text-green-400">{log}</span>
            </div>
          ))}
          {isScanning && (
            <div className="flex">
              <span className="text-[#00ff00] mr-2">[scanner@threatfinder]$</span>
              <span className="text-green-400">
                Scanning in progress
                <span className="animate-blink ml-1">█</span>
              </span>
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ScanResults;

import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { ScanResult } from '@/types/scanner';

interface ScanResultsProps {
  results: ScanResult[];
  isScanning: boolean;
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

const ScanResults: React.FC<ScanResultsProps> = ({ results, isScanning }) => {
  if (isScanning) {
    return (
      <Card className="p-6 mt-4">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  if (!results.length) {
    return null;
  }

  return (
    <Card className="p-6 mt-4">
      <h3 className="text-lg font-semibold mb-4">Scan Results</h3>
      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="space-y-4">
          {results.map((result, index) => (
            <Alert key={index} variant={result.severity === 'critical' ? 'destructive' : 'default'}>
              <SeverityIcon severity={result.severity} />
              <AlertTitle className={`severity-${result.severity}`}>
                {result.title}
              </AlertTitle>
              <AlertDescription className="mt-2 text-sm">
                {result.description}
                {result.payload && (
                  <pre className="mt-2 p-2 bg-secondary rounded text-xs overflow-x-auto">
                    {result.payload}
                  </pre>
                )}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default ScanResults;
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
      <ScrollArea className="h-[400px] rounded-md border bg-black p-4 font-mono text-sm text-green-400">
        {scanLogs.map((log, index) => (
          <div key={index} className="mb-1">
            <span className="text-[#800020] mr-2">$</span>
            {log}
          </div>
        ))}
        {isScanning && (
          <div className="animate-pulse">
            <span className="text-[#800020] mr-2">$</span>
            <span className="animate-blink">_</span>
          </div>
        )}
      </ScrollArea>

      {results.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Vulnerabilities Found</h3>
            <span className="text-sm text-muted-foreground">
              Found {results.length} vulnerabilities
            </span>
          </div>
          
          <ScrollArea className="h-[300px] rounded-md border p-4">
            <div className="space-y-4">
              {results.map((result, index) => (
                <Alert key={index} variant={result.severity === 'critical' ? 'destructive' : 'default'}>
                  <div className="flex items-start space-x-2">
                    <SeverityIcon severity={result.severity} />
                    <div className="flex-1">
                      <AlertTitle className={`severity-${result.severity}`}>
                        {result.title}
                      </AlertTitle>
                      <AlertDescription className="mt-2 space-y-2">
                        <p>{result.description}</p>
                        
                        {result.path && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Link className="h-4 w-4 mr-1" />
                            Path: {result.path}
                          </div>
                        )}
                        
                        {result.timestamp && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            Detected: {new Date(result.timestamp).toLocaleString()}
                          </div>
                        )}
                        
                        {result.payload && (
                          <pre className="mt-2 p-2 bg-secondary rounded text-xs overflow-x-auto">
                            {result.payload}
                          </pre>
                        )}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </Card>
  );
};

export default ScanResults;
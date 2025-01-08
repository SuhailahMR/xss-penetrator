import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield, ShieldAlert, ShieldCheck, Clock, Link } from 'lucide-react';
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
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Scan Results</h3>
        <span className="text-sm text-muted-foreground">
          Found {results.length} vulnerabilities
        </span>
      </div>
      
      <ScrollArea className="h-[400px] rounded-md border p-4">
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
    </Card>
  );
};

export default ScanResults;
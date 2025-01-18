import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import type { ScanResult } from '@/types/scanner';

const Results = () => {
  const location = useLocation();
  const results = location.state?.results || [];

  const getSeverityIcon = (severity: string) => {
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

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Scan Results</h1>
        <p className="text-muted-foreground">
          Found {results.length} potential vulnerabilities
        </p>
      </div>

      <div className="grid gap-4">
        {results.map((result: ScanResult, index: number) => (
          <Card key={index} className="p-4">
            <Alert variant={result.severity === 'critical' ? 'destructive' : 'default'}>
              <div className="flex items-center gap-2">
                {getSeverityIcon(result.severity)}
                <AlertTitle className="font-semibold">
                  {result.title}
                </AlertTitle>
              </div>
              <AlertDescription className="mt-2">
                <div className="space-y-2">
                  <p>{result.description}</p>
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    Location: {result.location}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Results;
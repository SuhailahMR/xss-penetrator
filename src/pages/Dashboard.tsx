import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useScanner } from '@/hooks/useScanner';

const Dashboard = () => {
  const { scanHistory } = useScanner();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Scan Results</h2>
        <p className="text-muted-foreground">
          View all vulnerability scan results and their details.
        </p>
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {scanHistory.map((scan, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{scan.target}</h3>
                  <span className="text-sm text-muted-foreground">
                    {new Date(scan.timestamp).toLocaleString()}
                  </span>
                </div>
                
                <div className="grid gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Scan Details</h4>
                    <div className="text-sm text-muted-foreground">
                      <p>Duration: {scan.duration.toFixed(2)}s</p>
                      <p>Vulnerabilities Found: {scan.vulnerabilitiesCount}</p>
                      <p>Status: {scan.status}</p>
                    </div>
                  </div>

                  {scan.results.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Vulnerabilities</h4>
                      <div className="space-y-2">
                        {scan.results.map((result, idx) => (
                          <div key={idx} className="border rounded p-3">
                            <p className={`severity-${result.severity} mb-1`}>
                              {result.title}
                            </p>
                            <p className="text-sm">{result.description}</p>
                            {result.path && (
                              <p className="text-sm mt-1">Path: {result.path}</p>
                            )}
                            {result.payload && (
                              <pre className="text-xs bg-secondary p-2 rounded mt-2 overflow-x-auto">
                                {result.payload}
                              </pre>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Dashboard;
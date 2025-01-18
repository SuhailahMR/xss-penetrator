import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScanResult } from '@/types/scanner';

interface ScanResultsProps {
  results: ScanResult[];
  isScanning: boolean;
  scanLogs: string[];
}

const ScanResults: React.FC<ScanResultsProps> = ({ results, isScanning, scanLogs }) => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Reflected XSS</CardTitle>
          <CardDescription>
            Occurs when malicious scripts are reflected off a web server to the victim's browser. 
            The data provided by a user is included in the page content immediately and without proper sanitization.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stored XSS</CardTitle>
          <CardDescription>
            Also known as persistent XSS, occurs when malicious scripts are saved on the target servers 
            and then later displayed to users who access the affected page. Common in comment systems, forums, and user profiles.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>DOM-based XSS</CardTitle>
          <CardDescription>
            Occurs when the vulnerability is in the client-side code rather than the server-side code. 
            The attack payload is executed as a result of modifying the DOM environment in the victim's browser.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ScanResults;
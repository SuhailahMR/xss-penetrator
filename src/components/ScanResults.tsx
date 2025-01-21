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
    <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[80vh]">
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl">
        <Card className="backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Reflected XSS
            </CardTitle>
            <CardDescription className="text-foreground/80 leading-relaxed">
              Occurs when malicious scripts are reflected off a web server to the victim's browser. 
              The data provided by a user is included in the page content immediately and without proper sanitization.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-600 bg-clip-text text-transparent">
              Stored XSS
            </CardTitle>
            <CardDescription className="text-foreground/80 leading-relaxed">
              Also known as persistent XSS, occurs when malicious scripts are saved on the target servers 
              and then later displayed to users who access the affected page. Common in comment systems, forums, and user profiles.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
              DOM-based XSS
            </CardTitle>
            <CardDescription className="text-foreground/80 leading-relaxed">
              Occurs when the vulnerability is in the client-side code rather than the server-side code. 
              The attack payload is executed as a result of modifying the DOM environment in the victim's browser.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ScanResults;
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
        <Card className={`backdrop-blur-lg dark:bg-[#4d0013]/10 bg-[#800020]/10 dark:border-white/20 border-[#800020]/20 hover:bg-[#800020]/20 dark:hover:bg-[#4d0013]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${isScanning ? 'animate-pulse' : ''}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#800020] to-[#4d0013] bg-clip-text text-transparent flex items-center justify-center gap-2">
              Reflected XSS
              {isScanning && <span className="inline-block w-2 h-2 bg-[#800020] rounded-full animate-blink"></span>}
            </CardTitle>
            <CardDescription className="text-foreground/80 leading-relaxed">
              Occurs when malicious scripts are reflected off a web server to the victim's browser. 
              The data provided by a user is included in the page content immediately and without proper sanitization.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className={`backdrop-blur-lg dark:bg-[#4d0013]/10 bg-[#800020]/10 dark:border-white/20 border-[#800020]/20 hover:bg-[#800020]/20 dark:hover:bg-[#4d0013]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${isScanning ? 'animate-pulse' : ''}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#800020] to-[#4d0013] bg-clip-text text-transparent flex items-center justify-center gap-2">
              Stored XSS
              {isScanning && <span className="inline-block w-2 h-2 bg-[#800020] rounded-full animate-blink"></span>}
            </CardTitle>
            <CardDescription className="text-foreground/80 leading-relaxed">
              Also known as persistent XSS, occurs when malicious scripts are saved on the target servers 
              and then later displayed to users who access the affected page. Common in comment systems, forums, and user profiles.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className={`backdrop-blur-lg dark:bg-[#4d0013]/10 bg-[#800020]/10 dark:border-white/20 border-[#800020]/20 hover:bg-[#800020]/20 dark:hover:bg-[#4d0013]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${isScanning ? 'animate-pulse' : ''}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#800020] to-[#4d0013] bg-clip-text text-transparent flex items-center justify-center gap-2">
              DOM-based XSS
              {isScanning && <span className="inline-block w-2 h-2 bg-[#800020] rounded-full animate-blink"></span>}
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
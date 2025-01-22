import React from 'react';
import ScannerForm from '@/components/ScannerForm';
import ScanResults from '@/components/ScanResults';
import { useScanner } from '@/hooks/useScanner';

const Index = () => {
  const { results, isScanning, scanLogs } = useScanner();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">XSS Vulnerability Scanner</h1>
          <p className="text-muted-foreground">
            Cross Site Scripting Security Assessment Tool for Web Applications
          </p>
        </div>
        
        <ScannerForm />
        <ScanResults 
          results={results} 
          isScanning={isScanning} 
          scanLogs={scanLogs} 
        />
      </div>
    </div>
  );
};

export default Index;
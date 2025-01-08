import React from 'react';
import ScannerForm from '@/components/ScannerForm';
import ScanResults from '@/components/ScanResults';
import { useScanner } from '@/hooks/useScanner';

const Index = () => {
  const { results, isScanning } = useScanner();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">XSS Vulnerability Scanner</h1>
          <p className="text-muted-foreground">
            Military-grade security assessment tool for Cross-Site Scripting vulnerabilities
          </p>
        </div>
        
        <ScannerForm />
        <ScanResults results={results} isScanning={isScanning} />
      </div>
    </div>
  );
};

export default Index;
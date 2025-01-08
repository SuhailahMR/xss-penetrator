import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import type { ScanResult } from '@/types/scanner';

export const useScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const { toast } = useToast();

  const testXSSVectors = [
    {
      payload: '<script>alert("XSS")</script>',
      type: 'Reflected XSS'
    },
    {
      payload: '"><script>alert("XSS")</script>',
      type: 'DOM XSS'
    },
    {
      payload: 'javascript:alert("XSS")//',
      type: 'URL-based XSS'
    },
    {
      payload: '<img src="x" onerror="alert(\'XSS\')">',
      type: 'HTML Injection'
    },
    {
      payload: '<svg/onload=alert("XSS")>',
      type: 'SVG-based XSS'
    },
    {
      payload: '?param=<script>alert("XSS")</script>',
      type: 'Parameter-based XSS'
    }
  ];

  const scan = async (target: string) => {
    setIsScanning(true);
    setResults([]);
    
    // Simulate scanning process
    await new Promise(resolve => setTimeout(resolve, 2000));

    const scanResults: ScanResult[] = [];

    // Add URL-specific vectors if the target includes parameters
    const hasParameters = target.includes('?');
    
    // Simulate vulnerability detection
    testXSSVectors.forEach((vector, index) => {
      // For URLs with parameters, include parameter-based tests
      if (hasParameters && vector.type === 'Parameter-based XSS') {
        scanResults.push({
          title: `${vector.type} Vulnerability Detected`,
          description: `A potential ${vector.type} vulnerability was found in URL parameters that could allow attackers to inject malicious scripts.`,
          severity: 'critical',
          payload: vector.payload
        });
      }
      
      // Regular vulnerability checks
      if (index % 2 === 0) {
        scanResults.push({
          title: `${vector.type} Vulnerability Detected`,
          description: `A potential ${vector.type} vulnerability was found that could allow attackers to inject malicious scripts.`,
          severity: index === 0 ? 'critical' : index === 2 ? 'high' : 'medium',
          payload: vector.payload
        });
      }
    });

    setResults(scanResults);
    setIsScanning(false);

    toast({
      title: "Scan Complete",
      description: `Found ${scanResults.length} potential vulnerabilities`,
    });
  };

  return {
    scan,
    results,
    isScanning
  };
};
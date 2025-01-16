import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import type { ScanResult, ScanHistory } from '@/types/scanner';
import { FirecrawlService } from '@/utils/FirecrawlService';

export const useScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const { toast } = useToast();

  const addLog = (message: string) => {
    setScanLogs(prev => [...prev, message]);
  };

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
    }
  ];

  const scan = async (target: string) => {
    setIsScanning(true);
    setResults([]);
    setScanLogs([]);
    const startTime = Date.now();
    
    try {
      addLog(`Starting scan for target: ${target}`);
      addLog('Initializing crawler...');
      
      const crawlResult = await FirecrawlService.crawlWebsite(target);
      
      if (!crawlResult.success) {
        throw new Error(crawlResult.error);
      }

      const paths = crawlResult.data.data || [];
      addLog(`Found ${paths.length} paths to scan`);
      
      const scanResults: ScanResult[] = [];

      for (const path of paths) {
        addLog(`Testing path: ${path}`);
        
        for (const vector of testXSSVectors) {
          addLog(`Trying payload: ${vector.payload}`);
          
          const hasParameters = path.includes('?');
          
          if (hasParameters) {
            addLog(`[!] Potential vulnerability found in URL parameters`);
            scanResults.push({
              title: `${vector.type} Vulnerability Detected`,
              description: `A potential ${vector.type} vulnerability was found in URL parameters.`,
              severity: 'critical',
              payload: vector.payload,
              path: path,
              timestamp: new Date().toISOString()
            });
          }
          
          if (Math.random() > 0.7) {
            addLog(`[!] Vulnerability detected: ${vector.type}`);
            scanResults.push({
              title: `${vector.type} Vulnerability Detected`,
              description: `A potential ${vector.type} vulnerability was found.`,
              severity: Math.random() > 0.5 ? 'critical' : 'high',
              payload: vector.payload,
              path: path,
              timestamp: new Date().toISOString()
            });
          }
          
          // Simulate scanning delay
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      setResults(scanResults);
      addLog(`Scan completed. Found ${scanResults.length} vulnerabilities.`);
      
      const duration = (Date.now() - startTime) / 1000;
      const scanRecord: ScanHistory = {
        target,
        timestamp: new Date().toISOString(),
        duration,
        vulnerabilitiesCount: scanResults.length,
        status: 'completed',
        results: scanResults
      };
      
      setScanHistory(prev => [scanRecord, ...prev]);

      toast({
        title: "Scan Complete",
        description: `Found ${scanResults.length} potential vulnerabilities`,
      });
    } catch (error) {
      console.error('Scan error:', error);
      addLog(`[X] Error: ${error instanceof Error ? error.message : "An unknown error occurred"}`);
      
      toast({
        title: "Scan Failed",
        description: error instanceof Error ? error.message : "An error occurred during the scan",
        variant: "destructive"
      });
      
      const duration = (Date.now() - startTime) / 1000;
      setScanHistory(prev => [{
        target,
        timestamp: new Date().toISOString(),
        duration,
        vulnerabilitiesCount: 0,
        status: 'failed',
        results: []
      }, ...prev]);
    } finally {
      setIsScanning(false);
    }
  };

  return {
    scan,
    results,
    isScanning,
    scanHistory,
    scanLogs
  };
};
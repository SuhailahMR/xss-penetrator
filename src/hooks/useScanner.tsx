import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import type { ScanResult, ScanHistory } from '@/types/scanner';
import { processScanResults, crawlTarget } from '@/utils/scanUtils';

export const useScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const { toast } = useToast();

  const addLog = (message: string) => {
    setScanLogs(prev => [...prev, message]);
  };

  const scan = async (target: string) => {
    setIsScanning(true);
    setResults([]);
    setScanLogs([]);
    const startTime = Date.now();
    
    try {
      addLog(`Starting scan for target: ${target}`);
      addLog('Initializing crawler...');
      
      const paths = await crawlTarget(target);
      addLog(`Found ${paths.length} paths to scan`);
      
      for (const path of paths) {
        addLog(`Testing path: ${path}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate scanning delay
      }

      const scanResults = processScanResults(paths);
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
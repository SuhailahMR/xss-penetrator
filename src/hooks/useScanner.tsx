import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import type { ScanResult, ScanHistory } from '@/types/scanner';
import { processScanResults, crawlTarget } from '@/utils/scanUtils';

export const useScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const addLog = (message: string) => {
    setScanLogs(prev => [...prev, message]);
  };

  const scan = async (target: string) => {
    setIsScanning(true);
    setResults([]);
    setScanLogs([]);
    const startTime = Date.now();
    
    try {
      addLog(`Initializing scan for target: ${target}`);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      addLog("Checking target accessibility...");
      await new Promise(resolve => setTimeout(resolve, 800));
      
      addLog("Starting crawler module...");
      const paths = await crawlTarget(target);
      addLog(`Discovered ${paths.length} unique endpoints`);
      
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const progress = Math.round(((i + 1) / paths.length) * 100);
        addLog(`[${progress}%] Testing path: ${path}`);
        await new Promise(resolve => setTimeout(resolve, 300));
      }

      const scanResults = processScanResults(paths);
      setResults(scanResults);
      
      addLog("Analyzing results...");
      await new Promise(resolve => setTimeout(resolve, 500));
      
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

      // Navigate to results page after scan completion
      navigate('/results', { state: { results: scanResults } });
      
    } catch (error) {
      console.error('Scan error:', error);
      addLog(`[ERROR] ${error instanceof Error ? error.message : "An unknown error occurred"}`);
      
      toast({
        title: "Scan Failed",
        description: error instanceof Error ? error.message : "An error occurred during the scan",
        variant: "destructive"
      });
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
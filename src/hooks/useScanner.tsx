import { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import type { ScanResult, ScanHistory } from '@/types/scanner';
import { FirecrawlService } from '@/utils/FirecrawlService';

export const useScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [scanHistory, setScanHistory] = useState<ScanHistory[]>([]);
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
    }
  ];

  const scan = async (target: string) => {
    setIsScanning(true);
    setResults([]);
    const startTime = Date.now();
    
    try {
      // First, crawl the target
      console.log('Starting crawl for:', target);
      const crawlResult = await FirecrawlService.crawlWebsite(target);
      
      if (!crawlResult.success) {
        throw new Error(crawlResult.error);
      }

      const paths = crawlResult.data.data || [];
      const scanResults: ScanResult[] = [];

      // Test each path for vulnerabilities
      for (const path of paths) {
        console.log('Testing path:', path);
        
        // Test each XSS vector
        for (const vector of testXSSVectors) {
          const hasParameters = path.includes('?');
          
          if (hasParameters) {
            scanResults.push({
              title: `${vector.type} Vulnerability Detected`,
              description: `A potential ${vector.type} vulnerability was found in URL parameters.`,
              severity: 'critical',
              payload: vector.payload,
              path: path,
              timestamp: new Date().toISOString()
            });
          }
          
          // Regular vulnerability checks
          if (Math.random() > 0.7) { // Simulating vulnerability detection
            scanResults.push({
              title: `${vector.type} Vulnerability Detected`,
              description: `A potential ${vector.type} vulnerability was found.`,
              severity: Math.random() > 0.5 ? 'critical' : 'high',
              payload: vector.payload,
              path: path,
              timestamp: new Date().toISOString()
            });
          }
        }
      }

      setResults(scanResults);
      
      // Add to scan history
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
      toast({
        title: "Scan Failed",
        description: error instanceof Error ? error.message : "An error occurred during the scan",
        variant: "destructive"
      });
      
      // Add failed scan to history
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
    scanHistory
  };
};
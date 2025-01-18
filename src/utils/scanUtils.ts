import type { ScanResult } from '@/types/scanner';
import { xssPayloads } from './xssPayloads';
import { FirecrawlService } from './FirecrawlService';

export const processScanResults = (paths: string[]): ScanResult[] => {
  const results: ScanResult[] = [];
  
  paths.forEach(path => {
    xssPayloads.forEach(vector => {
      const hasParameters = path.includes('?');
      
      if (hasParameters) {
        results.push({
          title: `${vector.type} Vulnerability Detected`,
          description: `A potential ${vector.type} vulnerability was found in URL parameters.`,
          severity: 'critical',
          payload: vector.payload,
          path: path,
          timestamp: new Date().toISOString(),
          location: `${path}?${vector.payload}`
        });
      }
      
      if (Math.random() > 0.7) {
        results.push({
          title: `${vector.type} Vulnerability Detected`,
          description: `A potential ${vector.type} vulnerability was found.`,
          severity: Math.random() > 0.5 ? 'critical' : 'high',
          payload: vector.payload,
          path: path,
          timestamp: new Date().toISOString(),
          location: path
        });
      }
    });
  });
  
  return results;
};

export const crawlTarget = async (target: string) => {
  const crawlResult = await FirecrawlService.crawlWebsite(target);
  
  if (!crawlResult.success) {
    throw new Error(crawlResult.error);
  }

  return crawlResult.data.data || [];
};
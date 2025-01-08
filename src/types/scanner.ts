export interface ScanResult {
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  payload?: string;
  path?: string;
  timestamp?: string;
}

export interface ScannerState {
  results: ScanResult[];
  isScanning: boolean;
}

export interface ScanHistory {
  target: string;
  timestamp: string;
  duration: number;
  vulnerabilitiesCount: number;
  status: 'completed' | 'failed';
  results: ScanResult[];
}

export interface CrawlResult {
  url: string;
  paths: string[];
}
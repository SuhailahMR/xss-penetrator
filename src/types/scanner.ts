export interface ScanResult {
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  payload?: string;
}

export interface ScannerState {
  results: ScanResult[];
  isScanning: boolean;
}
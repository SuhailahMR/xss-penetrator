import React from 'react';
import { Card } from "@/components/ui/card";
import { useScanner } from '@/hooks/useScanner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Dashboard = () => {
  const { scanHistory } = useScanner();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Scan History</h1>
          <p className="text-muted-foreground">
            Historical record of all vulnerability scans
          </p>
        </div>
        
        <Card className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Target</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Vulnerabilities Found</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scanHistory.map((scan, index) => (
                <TableRow key={index}>
                  <TableCell>{scan.target}</TableCell>
                  <TableCell>{new Date(scan.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{scan.duration}s</TableCell>
                  <TableCell>{scan.vulnerabilitiesCount}</TableCell>
                  <TableCell>{scan.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
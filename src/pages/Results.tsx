import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Shield, ShieldAlert, ShieldCheck, Clock, Globe, Download } from 'lucide-react';
import type { ScanResult } from '@/types/scanner';
import jsPDF from 'jspdf';

const Results = () => {
  const location = useLocation();
  const results = location.state?.results || [];
  const scanTime = new Date().toLocaleString();

  // Calculate statistics based on results
  const totalSubdomains = results.length;
  const safeSubdomains = results.filter((r: ScanResult) => r.severity === 'low' || r.severity === 'medium').length;
  const maliciousSubdomains = results.filter((r: ScanResult) => r.severity === 'high' || r.severity === 'critical').length;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <ShieldAlert className="h-4 w-4 text-red-500" />;
      case 'high':
        return <ShieldAlert className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <Shield className="h-4 w-4 text-yellow-500" />;
      default:
        return <ShieldCheck className="h-4 w-4 text-blue-500" />;
    }
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    let yPos = 20;

    // Add title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("XSS Vulnerability Scan Report", 20, yPos);
    yPos += 20;

    // Add scan information
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Scan Time: ${scanTime}`, 20, yPos);
    yPos += 10;
    pdf.text(`Total Subdomains: ${totalSubdomains}`, 20, yPos);
    yPos += 10;
    pdf.text(`Safe Subdomains: ${safeSubdomains}`, 20, yPos);
    yPos += 10;
    pdf.text(`Malicious Subdomains: ${maliciousSubdomains}`, 20, yPos);
    yPos += 20;

    // Add scan results
    pdf.setFont("helvetica", "bold");
    pdf.text("Detailed Results:", 20, yPos);
    yPos += 10;

    pdf.setFont("helvetica", "normal");
    results.forEach((result: ScanResult) => {
      pdf.text(`• ${result.title} (${result.severity})`, 30, yPos);
      yPos += 7;
      pdf.text(`  Location: ${result.location}`, 35, yPos);
      yPos += 10;
    });

    // Save the PDF
    pdf.save("xss-scan-results.pdf");
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Scan Results Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive overview of the vulnerability scan
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="backdrop-blur-lg dark:bg-[#4d0013]/10 bg-[#800020]/10 dark:border-white/20 border-[#800020]/20">
          <CardHeader className="text-center">
            <CardTitle className="text-sm font-mono flex items-center justify-center gap-2">
              <Clock className="w-4 h-4" />
              Scan Time
            </CardTitle>
            <CardDescription className="font-mono text-foreground/80">
              {scanTime}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="backdrop-blur-lg dark:bg-[#4d0013]/10 bg-[#800020]/10 dark:border-white/20 border-[#800020]/20">
          <CardHeader className="text-center">
            <CardTitle className="text-sm font-mono flex items-center justify-center gap-2">
              <Globe className="w-4 h-4" />
              Total Subdomains
            </CardTitle>
            <CardDescription className="font-mono text-foreground/80">
              {totalSubdomains}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="backdrop-blur-lg dark:bg-[#4d0013]/10 bg-[#800020]/10 dark:border-white/20 border-[#800020]/20">
          <CardHeader className="text-center">
            <CardTitle className="text-sm font-mono flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Safe Subdomains
            </CardTitle>
            <CardDescription className="font-mono text-foreground/80">
              {safeSubdomains}
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="backdrop-blur-lg dark:bg-[#4d0013]/10 bg-[#800020]/10 dark:border-white/20 border-[#800020]/20">
          <CardHeader className="text-center">
            <CardTitle className="text-sm font-mono flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Malicious Subdomains
            </CardTitle>
            <CardDescription className="font-mono text-foreground/80">
              {maliciousSubdomains}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Download Button */}
      <div className="flex justify-end mb-8">
        <Button
          onClick={downloadPDF}
          className="bg-[#800020] hover:bg-[#4d0013] text-white font-mono flex items-center gap-2"
          disabled={results.length === 0}
        >
          <Download className="w-4 h-4" />
          Download Report
        </Button>
      </div>

      {/* Detailed Results */}
      <div className="grid gap-4">
        {results.map((result: ScanResult, index: number) => (
          <Card key={index} className="p-4">
            <Alert variant={result.severity === 'critical' ? 'destructive' : 'default'}>
              <div className="flex items-center gap-2">
                {getSeverityIcon(result.severity)}
                <AlertTitle className="font-semibold">
                  {result.title}
                </AlertTitle>
              </div>
              <AlertDescription className="mt-2">
                <div className="space-y-2">
                  <p>{result.description}</p>
                  <p className="text-sm font-mono bg-muted p-2 rounded">
                    Location: {result.location}
                  </p>
                </div>
              </AlertDescription>
            </Alert>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Results;
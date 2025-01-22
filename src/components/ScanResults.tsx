import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Clock, Globe, ShieldCheck, ShieldAlert } from 'lucide-react';
import { ScanResult } from '@/types/scanner';
import jsPDF from 'jspdf';

interface ScanResultsProps {
  results: ScanResult[];
  isScanning: boolean;
  scanLogs: string[];
}

const ScanResults: React.FC<ScanResultsProps> = ({ results, isScanning, scanLogs }) => {
  const scanTime = new Date().toLocaleString();
  
  // Calculate statistics based on real-time results
  const totalSubdomains = results.length;
  const safeSubdomains = results.filter(r => r.severity === 'low' || r.severity === 'medium').length;
  const maliciousSubdomains = results.filter(r => r.severity === 'high' || r.severity === 'critical').length;

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
    results.forEach(result => {
      pdf.text(`• ${result.title} (${result.severity})`, 30, yPos);
      yPos += 7;
      pdf.text(`  Location: ${result.location}`, 35, yPos);
      yPos += 10;
    });

    // Save the PDF
    pdf.save("xss-scan-results.pdf");
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Scan Statistics */}
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

      {/* Existing Vulnerability Cards */}
      <div className="grid gap-6 md:grid-cols-3 max-w-6xl">
        <Card className={`backdrop-blur-lg dark:bg-[#4d0013]/10 bg-[#800020]/10 dark:border-white/20 border-[#800020]/20 hover:bg-[#800020]/20 dark:hover:bg-[#4d0013]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${isScanning ? 'animate-pulse' : ''}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold font-mono bg-gradient-to-r from-[#800020] to-[#4d0013] bg-clip-text text-transparent flex items-center justify-center gap-2">
              Reflected XSS
              {isScanning && <span className="inline-block w-2 h-2 bg-[#800020] rounded-full animate-blink"></span>}
            </CardTitle>
            <CardDescription className="font-mono text-foreground/80 leading-relaxed">
              Occurs when malicious scripts are reflected off a web server to the victim's browser. 
              The data provided by a user is included in the page content immediately and without proper sanitization.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className={`backdrop-blur-lg dark:bg-[#4d0013]/10 bg-[#800020]/10 dark:border-white/20 border-[#800020]/20 hover:bg-[#800020]/20 dark:hover:bg-[#4d0013]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${isScanning ? 'animate-pulse' : ''}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold font-mono bg-gradient-to-r from-[#800020] to-[#4d0013] bg-clip-text text-transparent flex items-center justify-center gap-2">
              Stored XSS
              {isScanning && <span className="inline-block w-2 h-2 bg-[#800020] rounded-full animate-blink"></span>}
            </CardTitle>
            <CardDescription className="font-mono text-foreground/80 leading-relaxed">
              Also known as persistent XSS, occurs when malicious scripts are saved on the target servers 
              and then later displayed to users who access the affected page. Common in comment systems, forums, and user profiles.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className={`backdrop-blur-lg dark:bg-[#4d0013]/10 bg-[#800020]/10 dark:border-white/20 border-[#800020]/20 hover:bg-[#800020]/20 dark:hover:bg-[#4d0013]/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${isScanning ? 'animate-pulse' : ''}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold font-mono bg-gradient-to-r from-[#800020] to-[#4d0013] bg-clip-text text-transparent flex items-center justify-center gap-2">
              DOM-based XSS
              {isScanning && <span className="inline-block w-2 h-2 bg-[#800020] rounded-full animate-blink"></span>}
            </CardTitle>
            <CardDescription className="font-mono text-foreground/80 leading-relaxed">
              Occurs when the vulnerability is in the client-side code rather than the server-side code. 
              The attack payload is executed as a result of modifying the DOM environment in the victim's browser.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default ScanResults;
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Shield, ShieldAlert, ShieldCheck, Clock, Globe, Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  const getMitigationTechnique = (severity: string) => {
    switch (severity) {
      case 'critical':
        return [
          "Implement immediate input validation and sanitization",
          "Use Content Security Policy (CSP) headers",
          "Apply WAF rules to block malicious payloads",
          "Regular security audits and penetration testing",
          "Update all dependencies and frameworks to latest secure versions"
        ];
      case 'high':
        return [
          "Implement proper input validation",
          "Use HTML encoding for user inputs",
          "Implement XSS filters",
          "Regular code reviews",
          "Security awareness training for developers"
        ];
      default:
        return [
          "Follow secure coding practices",
          "Keep systems and dependencies updated",
          "Regular security assessments",
          "Document security requirements",
          "Monitor for suspicious activities"
        ];
    }
  };

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
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;

    const addNewPage = () => {
      pdf.addPage();
      yPos = 20;
    };

    const checkPageBreak = (increment: number) => {
      if (yPos + increment >= pageHeight - margin) {
        addNewPage();
      }
    };

    // Add title
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(20);
    pdf.text("XSS Vulnerability Scan Report", margin, yPos);
    yPos += 20;

    // Add scan information
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Scan Time: ${scanTime}`, margin, yPos);
    yPos += 10;
    pdf.text(`Total Subdomains: ${totalSubdomains}`, margin, yPos);
    yPos += 10;
    pdf.text(`Safe Subdomains: ${safeSubdomains}`, margin, yPos);
    yPos += 10;
    pdf.text(`Malicious Subdomains: ${maliciousSubdomains}`, margin, yPos);
    yPos += 20;

    checkPageBreak(40);

    // Add mitigation techniques section
    pdf.setFont("helvetica", "bold");
    pdf.text("Mitigation Techniques by Severity", margin, yPos);
    yPos += 15;

    // Critical severity mitigations
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(11);
    checkPageBreak(60);
    pdf.text("Critical Severity:", margin, yPos);
    yPos += 10;
    pdf.setFont("helvetica", "normal");
    getMitigationTechnique('critical').forEach(technique => {
      checkPageBreak(10);
      pdf.text(`• ${technique}`, 25, yPos);
      yPos += 7;
    });
    yPos += 5;

    // High severity mitigations
    checkPageBreak(60);
    pdf.setFont("helvetica", "bold");
    pdf.text("High Severity:", margin, yPos);
    yPos += 10;
    pdf.setFont("helvetica", "normal");
    getMitigationTechnique('high').forEach(technique => {
      checkPageBreak(10);
      pdf.text(`• ${technique}`, 25, yPos);
      yPos += 7;
    });
    yPos += 5;

    // Medium/Low severity mitigations
    checkPageBreak(60);
    pdf.setFont("helvetica", "bold");
    pdf.text("Medium/Low Severity:", margin, yPos);
    yPos += 10;
    pdf.setFont("helvetica", "normal");
    getMitigationTechnique('medium').forEach(technique => {
      checkPageBreak(10);
      pdf.text(`• ${technique}`, 25, yPos);
      yPos += 7;
    });
    yPos += 15;

    // Add scan results
    checkPageBreak(40);
    pdf.setFont("helvetica", "bold");
    pdf.text("Detailed Results:", margin, yPos);
    yPos += 10;

    pdf.setFont("helvetica", "normal");
    results.forEach((result: ScanResult) => {
      checkPageBreak(25);
      pdf.text(`• ${result.title} (${result.severity})`, 30, yPos);
      yPos += 7;
      
      // Split long location strings into multiple lines if needed
      const locationText = `Location: ${result.location}`;
      const textWidth = pdf.getStringUnitWidth(locationText) * 11; // 11 is the font size
      const maxWidth = pdf.internal.pageSize.width - 40; // 40 is twice the margin
      
      if (textWidth > maxWidth) {
        const splitLocation = pdf.splitTextToSize(locationText, maxWidth - 35);
        splitLocation.forEach((line: string) => {
          checkPageBreak(10);
          pdf.text(line, 35, yPos);
          yPos += 7;
        });
      } else {
        pdf.text(locationText, 35, yPos);
        yPos += 7;
      }
      yPos += 10;
    });

    // Add footer with page numbers
    const pageCount = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.setFontSize(10);
      pdf.text(`Page ${i} of ${pageCount}`, pdf.internal.pageSize.width / 2, pageHeight - 10, { align: 'center' });
    }

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

      {/* Mitigation Techniques Table */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mitigation Techniques</CardTitle>
          <CardDescription>Recommended actions based on vulnerability severity</CardDescription>
        </CardHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Severity</TableHead>
              <TableHead>Recommended Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-red-500">Critical</TableCell>
              <TableCell>
                <ul className="list-disc pl-4">
                  {getMitigationTechnique('critical').map((technique, index) => (
                    <li key={index}>{technique}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-orange-500">High</TableCell>
              <TableCell>
                <ul className="list-disc pl-4">
                  {getMitigationTechnique('high').map((technique, index) => (
                    <li key={index}>{technique}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-yellow-500">Medium/Low</TableCell>
              <TableCell>
                <ul className="list-disc pl-4">
                  {getMitigationTechnique('medium').map((technique, index) => (
                    <li key={index}>{technique}</li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

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

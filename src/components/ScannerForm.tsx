import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useScanner } from '@/hooks/useScanner';

const ScannerForm = () => {
  const { toast } = useToast();
  const { scan, isScanning } = useScanner();
  const [domain, setDomain] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!domain) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a domain to scan",
      });
      return;
    }

    if (!domain.match(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/)) {
      toast({
        variant: "destructive",
        title: "Invalid Domain",
        description: "Please enter a valid domain name",
      });
      return;
    }

    scan(domain);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">XSS Vulnerability Scanner</h2>
          <p className="text-sm text-muted-foreground">
            Enter a domain to scan for potential XSS vulnerabilities
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="example.com"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={isScanning}>
            {isScanning ? "Scanning..." : "Scan"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ScannerForm;
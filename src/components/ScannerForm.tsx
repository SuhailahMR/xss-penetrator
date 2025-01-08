import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useScanner } from '@/hooks/useScanner';

const ScannerForm = () => {
  const { toast } = useToast();
  const { scan, isScanning } = useScanner();
  const [target, setTarget] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!target) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a domain or URL to scan",
      });
      return;
    }

    // URL validation regex that accepts domains and full URLs
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\da-z\.-]+\.[a-z\.]{2,6}[\/\w \.-]*)*\/?(\?[\/\w \.-]*)?$/;

    if (!target.match(urlPattern)) {
      toast({
        variant: "destructive",
        title: "Invalid Input",
        description: "Please enter a valid domain or URL",
      });
      return;
    }

    scan(target);
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">XSS Vulnerability Scanner</h2>
          <p className="text-sm text-muted-foreground">
            Enter a domain or URL to scan for potential XSS vulnerabilities
          </p>
        </div>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="example.com or https://example.com/page?param=value"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
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
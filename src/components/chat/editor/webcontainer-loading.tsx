"use client";

import { Loader2, Container } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WebContainerLoadingProps {
  message?: string;
}

const WebContainerLoading = ({
  message = "Building the Web Container...",
}: WebContainerLoadingProps) => {
  return (
    <div className="flex items-center justify-center w-full h-full p-6">
      <Card className="max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-6">
          {/* Container Icon with spinning loader */}
          <div className="relative">
            <Container className="h-16 w-16 text-muted-foreground" />
            <div className="absolute -top-2 -right-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{message}</h3>
            <p className="text-sm text-muted-foreground">
              Setting up your development environment...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-xs">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary animate-pulse rounded-full w-full" />
            </div>
          </div>

          <p className="text-xs text-muted-foreground font-mono">
            Initializing environment...
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebContainerLoading;

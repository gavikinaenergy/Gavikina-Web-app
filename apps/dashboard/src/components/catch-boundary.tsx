import { type ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export default function DashboardCatchBoundary({
  error,
  reset,
}: ErrorComponentProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center space-y-6">
      <div className="p-4 rounded-full bg-destructive/10">
        <AlertCircle className="size-12 text-destructive" />
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">
          Unable to load Dashboard
        </h2>
        <p className="text-muted-foreground max-w-sm mx-auto text-sm">
          {(error as any).message ||
            "We encountered an error while loading your session."}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </Button>

        <Button onClick={() => router.navigate({ to: "/login" })}>
          Back to Login
        </Button>
      </div>
    </div>
  );
}

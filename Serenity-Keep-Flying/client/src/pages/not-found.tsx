import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0908] text-[#c8b88a] font-mono">
      <Card className="w-full max-w-md bg-[#12110e] border-[#c44]">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-[#c44]" />
            <h1 className="text-2xl font-bold text-[#c44]">404 Signal Lost</h1>
          </div>

          <p className="mt-4 text-[#706848]">
            The requested cortex node does not exist. You've drifted too far into the black, Captain.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

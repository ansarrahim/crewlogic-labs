import { PlugZap } from "lucide-react";

export default function NotConnected({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-6 text-center">
      <PlugZap className="h-5 w-5 text-slate-600" />
      <p className="text-xs text-slate-500">{message}</p>
    </div>
  );
}

import { Card } from '@/components/ui/Card';

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Card className="w-full max-w-md mx-4 p-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <span className="material-symbols-outlined text-[48px] text-rose-500">error</span>
          <h1 className="text-2xl font-semibold">404 Page Not Found</h1>
          <p className="text-sm text-slate-400 font-medium">The requested page could not be found.</p>
        </div>
      </Card>
    </div>
  );
}

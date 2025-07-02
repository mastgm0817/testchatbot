import { HardHat, Shield, AlertTriangle } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white shadow-md border-b-4 border-brand">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-brand p-3 rounded-full">
              <HardHat className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                SafetyBot Pro
              </h1>
              <p className="text-slate-600">건설안전 전문가</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-green-600">
              <Shield className="h-5 w-5" />
              <span className="font-medium">24/7 상담 가능</span>
            </div>
            <div className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">긴급 상담</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

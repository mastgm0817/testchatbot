
import { SafetyFeatures } from "@/components/SafetyFeatures";
import { Header } from "@/components/Header";
import { FloatingChatBot } from "@/components/FloatingChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            건설안전 전문가 챗봇
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            건설 현장의 안전을 책임지는 AI 전문가입니다. 
            안전 관리, 법규 준수, 사고 예방에 대한 전문적인 조언을 받아보세요.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md inline-block">
            <p className="text-lg font-semibold text-orange-600 mb-2">
              💬 우측 하단 챗봇 아이콘을 클릭하세요!
            </p>
            <p className="text-slate-600">
              건설안전 전문가와 실시간 상담을 시작할 수 있습니다.
            </p>
          </div>
        </div>
        
        <SafetyFeatures />
      </main>

      <FloatingChatBot />
    </div>
  );
};

export default Index;

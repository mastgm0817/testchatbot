
import { CheckCircle, FileText, Users, BookOpen, AlertCircle, Wrench } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "안전 점검 체크리스트",
    description: "현장별 맞춤형 안전 점검 항목과 체크리스트를 제공합니다.",
    color: "bg-green-500"
  },
  {
    icon: FileText,
    title: "법규 및 규정 안내",
    description: "최신 건설안전 관련 법규와 규정을 실시간으로 안내해드립니다.",
    color: "bg-blue-500"
  },
  {
    icon: Users,
    title: "안전 교육 자료",
    description: "작업자 교육을 위한 체계적인 안전 교육 자료를 제공합니다.",
    color: "bg-purple-500"
  },
  {
    icon: BookOpen,
    title: "사고 사례 분석",
    description: "과거 사고 사례를 분석하여 예방 방안을 제시합니다.",
    color: "bg-orange-500"
  },
  {
    icon: AlertCircle,
    title: "위험 요소 진단",
    description: "현장의 잠재적 위험 요소를 진단하고 개선 방안을 제안합니다.",
    color: "bg-red-500"
  },
  {
    icon: Wrench,
    title: "장비 안전 관리",
    description: "건설 장비의 안전한 사용법과 점검 방법을 안내합니다.",
    color: "bg-yellow-500"
  }
];

export const SafetyFeatures = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => {
        const IconComponent = feature.icon;
        return (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-orange-300 transform hover:-translate-y-2"
          >
            <div className={`${feature.color} p-3 rounded-full w-fit mb-4`}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">
              {feature.title}
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

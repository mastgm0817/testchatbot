import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";

// Message 타입 ChatInterface에서 가져와야 함
interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  // 대화 상태를 이곳에서 관리
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "안녕하세요! 건설안전 전문가 챗봇입니다.\n\n오늘 작업할 작업공종을 알려주시면 위험성평가를 분석해 드립니다.\n\n어떤 도움이 필요하신가요?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<number | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [micDisabled, setMicDisabled] = useState(false);

  return (
    <>
      {/* 플로팅 챗봇 아이콘 */}
      {(!isOpen || isMinimized) && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => { setIsOpen(true); setIsMinimized(false); }}
            className="bg-brand hover:bg-brand-dark text-white rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            size="icon"
            aria-label="챗봇 열기"
          >
            <MessageCircle className="h-8 w-8" />
          </Button>
        </div>
      )}

      {/* 챗봇 화면 (반응형 크기) */}
      {isOpen && !isMinimized && (
        <div className="fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 transition-all duration-300 chatbot-widget">
          <ChatInterface
            onClose={() => setIsOpen(false)}
            messages={messages}
            setMessages={setMessages}
            inputText={inputText}
            setInputText={setInputText}
            isTyping={isTyping}
            setIsTyping={setIsTyping}
            copiedMessageId={copiedMessageId}
            setCopiedMessageId={setCopiedMessageId}
            isListening={isListening}
            setIsListening={setIsListening}
            micDisabled={micDisabled}
            setMicDisabled={setMicDisabled}
            onMinimize={() => setIsMinimized(true)}
            onResetAndClose={() => {
              setMessages([
                {
                  id: 1,
                  text: "안녕하세요! 건설안전 전문가 챗봇입니다. 건설 현장의 안전 관리, 법규, 사고 예방 등에 대해 궁금한 것이 있으시면 언제든 물어보세요. 어떤 도움이 필요하신가요?",
                  isBot: true,
                  timestamp: new Date()
                }
              ]);
              setInputText("");
              setIsTyping(false);
              setCopiedMessageId(null);
              setIsListening(false);
              setMicDisabled(false);
              setIsOpen(false);
            }}
          />
        </div>
      )}

      {/* 반응형 스타일 */}
      <style>{`
        .chatbot-widget {
          width: min(900px, calc(100vw - 48px));
          height: min(660px, calc(100vh - 48px));
        }
        @media (max-width: 1024px) {
          .chatbot-widget {
            width: min(98vw, 100vw - 24px) !important;
            height: min(90vh, 100vh - 24px) !important;
            bottom: 12px !important;
            right: 12px !important;
            left: 12px !important;
            max-width: none !important;
            max-height: none !important;
          }
        }
        @media (max-width: 600px) {
          .chatbot-widget {
            width: calc(100vw - 8px) !important;
            height: calc(100vh - 8px) !important;
            bottom: 4px !important;
            right: 4px !important;
            left: 4px !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </>
  );
};

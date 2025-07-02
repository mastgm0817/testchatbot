import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, HardHat, Copy, Check, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';

// Speech Recognition 타입 정의
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onClose: () => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  isTyping: boolean;
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>;
  copiedMessageId: number | null;
  setCopiedMessageId: React.Dispatch<React.SetStateAction<number | null>>;
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  micDisabled: boolean;
  setMicDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  onMinimize?: () => void;
  onResetAndClose?: () => void;
}

export const ChatInterface = ({
  onClose,
  messages,
  setMessages,
  inputText,
  setInputText,
  isTyping,
  setIsTyping,
  copiedMessageId,
  setCopiedMessageId,
  isListening,
  setIsListening,
  micDisabled,
  setMicDisabled,
  onMinimize,
  onResetAndClose
}: ChatInterfaceProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  // 사용자 ID 생성
  const userId = `user_${Math.random().toString(36).substr(2, 9)}`;

  // 메시지가 변경될 때마다 스크롤을 맨 아래로 이동
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 음성 인식 초기화
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'ko-KR';

        recognitionRef.current.onstart = () => {
          console.log('음성 인식이 시작되었습니다.');
          setIsListening(true);
          setMicDisabled(true);
          
          // 5초 타이머 시작
          speechTimeoutRef.current = setTimeout(() => {
            console.log('5초간 음성이 없어 자동으로 마이크를 끕니다.');
            
            if (recognitionRef.current && isListening) {
              recognitionRef.current.stop();
              setIsListening(false);
            }
            
            // 타이머 클리어
            if (speechTimeoutRef.current) {
              clearTimeout(speechTimeoutRef.current);
              speechTimeoutRef.current = null;
            }
            setMicDisabled(false);
          }, 5000);
        };

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          console.log('음성 인식 결과:', event);
          
          // 타이머 클리어
          if (speechTimeoutRef.current) {
            clearTimeout(speechTimeoutRef.current);
            speechTimeoutRef.current = null;
          }
          
          if (event.results && event.results.length > 0) {
            const transcript = event.results[0][0].transcript;
            console.log('인식된 텍스트:', transcript);
            setInputText(prev => prev + transcript);
          }
          setIsListening(false);
          setMicDisabled(false);
          inputRef.current?.focus();
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('음성 인식 오류:', event.error);
          setIsListening(false);
          
          // 타이머 클리어
          if (speechTimeoutRef.current) {
            clearTimeout(speechTimeoutRef.current);
            speechTimeoutRef.current = null;
          }
          
          // 모든 오류에 대해 토스트 표시하지 않음
          console.log('음성 인식이 중단되었습니다.');
        };

        recognitionRef.current.onend = () => {
          console.log('음성 인식이 종료되었습니다.');
          setIsListening(false);
          
          // 타이머 클리어
          if (speechTimeoutRef.current) {
            clearTimeout(speechTimeoutRef.current);
            speechTimeoutRef.current = null;
          }
          setMicDisabled(false);
          inputRef.current?.focus();
        };
      } else {
        console.warn('이 브라우저는 음성 인식을 지원하지 않습니다.');
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
    };
  }, [toast]);

  const startListening = () => {
    if (!recognitionRef.current) {
      console.warn('음성 인식을 지원하지 않는 브라우저입니다.');
      return;
    }

    if (!isListening) {
      try {
        recognitionRef.current.start();
        console.log('음성 인식을 시작합니다.');
      } catch (error) {
        console.error('음성 인식 시작 오류:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    
    if (speechTimeoutRef.current) {
      clearTimeout(speechTimeoutRef.current);
      speechTimeoutRef.current = null;
    }
  };

  const sendMessageToWebhook = async (message: string): Promise<string> => {
    try {
      const webhookBody = {
        message: message,
        userid: userId,
        timestamp: new Date().toISOString(),
        type: "user_message"
      };

      console.log('Sending webhook request:', webhookBody);

      const response = await fetch('https://cloulalb.app.n8n.cloud/webhook/260cc272-639a-4149-bdf5-2dde7e0b87a6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Webhook response:', data);
      
      // output 값을 우선적으로 사용하고, 없으면 다른 필드들을 확인
      return data.output || data.reply || data.message || "죄송합니다. 응답을 받지 못했습니다.";
    } catch (error) {
      console.error('Webhook error:', error);
      return "죄송합니다. 현재 서버와 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.";
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputText;
    setInputText("");
    setIsTyping(true);

    try {
      const botResponse = await sendMessageToWebhook(currentMessage);
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  // 메시지 복사 (화면에 보이는 그대로)
  const copyToClipboard = async (messageId: number) => {
    try {
      const el = document.getElementById(`chat-message-${messageId}`);
      if (el) {
        const html = el.innerHTML;
        const text = el.innerText;
        if (navigator.clipboard && (window as any).ClipboardItem) {
          // HTML + 텍스트 동시 복사
          const item = new (window as any).ClipboardItem({
            "text/html": new Blob([html], { type: "text/html" }),
            "text/plain": new Blob([text], { type: "text/plain" }),
          });
          await navigator.clipboard.write([item]);
        } else {
          // fallback: 텍스트만 복사
          await navigator.clipboard.writeText(text);
        }
        setCopiedMessageId(messageId);
        toast({
          title: "복사 완료",
          description: "메시지가 클립보드에 복사되었습니다.",
        });
        setTimeout(() => setCopiedMessageId(null), 2000);
      } else {
        throw new Error('메시지 DOM을 찾을 수 없습니다.');
      }
    } catch (err) {
      toast({
        title: "복사 실패",
        description: "클립보드 복사에 실패했습니다.",
        variant: "destructive"
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('Enter 키 눌림 - 입력 텍스트:', inputText);
      
      // 1. 마이크가 켜져있으면 즉시 끄기
      if (isListening) {
        console.log('마이크 종료');
        stopListening();
      }
      
      // 2. 텍스트가 있으면 메시지 전송
      if (inputText.trim()) {
        console.log('메시지 전송:', inputText);
        handleSendMessage();
      }
      
      console.log('Enter 키 처리 완료');
    }
  };

  return (
    <div className="h-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col font-malgun">
      {/* 헤더 */}
      <div className="bg-brand p-4 text-white flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-full">
            <HardHat className="h-6 w-6 text-brand" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">건설안전 전문가</h2>
            <p className="text-brand-pale text-sm">온라인 상담 중</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {onMinimize && (
            <Button
              onClick={onMinimize}
              variant="ghost"
              className="text-white hover:bg-brand-dark"
              size="icon"
              aria-label="최소화"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="4" y1="19" x2="20" y2="19" /></svg>
            </Button>
          )}
          {onResetAndClose ? (
            <Button
              onClick={onResetAndClose}
              variant="ghost"
              className="text-white hover:bg-brand-dark"
              size="icon"
              aria-label="종료"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </Button>
          ) : (
            <Button
              onClick={onClose}
              variant="ghost"
              className="text-white hover:bg-brand-dark"
              size="icon"
              aria-label="종료"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </Button>
          )}
        </div>
      </div>

      {/* 채팅 영역 */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[90%] ${
                  message.isBot ? 'flex-row' : 'flex-row-reverse space-x-reverse'
                }`}
              >
                <div
                  className={`p-2 rounded-full bg-brand text-white`}
                >
                  {message.isBot ? (
                    <Bot className="h-4 w-4" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={`relative p-4 rounded-lg ${
                    message.isBot
                      ? 'bg-brand-light text-brand border border-brand'
                      : 'bg-brand text-white'
                  }`}
                  id={`chat-message-${message.id}`}
                >
                  {message.isBot && (
                    <Button
                      onClick={() => copyToClipboard(message.id)}
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-brand-pale"
                    >
                      {copiedMessageId === message.id ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-brand" />
                      )}
                    </Button>
                  )}
                  <div className="text-sm leading-relaxed pr-8">
                    <ReactMarkdown
                      components={{
                        ul: ({node, ...props}) => <ul className="pl-4 list-disc" {...props} />,
                        ol: ({node, ...props}) => <ol className="pl-4 list-decimal" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        br: () => <br />,
                      }}
                      skipHtml={false}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                  <p
                    className={`text-xs mt-3 ${
                      message.isBot ? 'text-brand/70' : 'text-brand-pale'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="p-2 rounded-full bg-brand text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-brand-light border border-brand p-4 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 스크롤 위치 참조용 요소 */}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* 입력 영역 */}
      <div className="p-4 border-t border-brand bg-brand-light">
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="건설안전, 건설공법 등 건설과 관련된 궁금한 것을 물어보세요..."
              className="font-malgun pr-12 bg-white border border-brand-light focus:border-brand rounded-lg"
              disabled={isTyping}
            />
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={isTyping || micDisabled}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 ${
                isListening 
                  ? 'bg-brand hover:bg-brand-dark text-white' 
                  : 'bg-brand/70 hover:bg-brand text-white'
              }`}
              size="sm"
            >
              {isListening ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-brand hover:bg-brand-dark text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

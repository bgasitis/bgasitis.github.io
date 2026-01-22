import React, { useState, useRef, useEffect } from 'react';
import { startGitaChat } from '../services/geminiService';
import { ChatMessage, Language } from '../types';

interface Props {
  language: Language;
  onClose: () => void;
  onNavigateToVerse: (chapter: number, verse: number) => void;
}

const ChatBot: React.FC<Props> = ({ language, onClose, onNavigateToVerse }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: language === Language.NEPALI 
        ? "हरे कृष्ण! म तपाईंलाई भगवद-गीताका श्लोकहरू खोज्न र बुझ्न मद्दत गर्न सक्छु। आज तपाईं के जान्न चाहनुहुन्छ?"
        : "Hare Krishna! I can help you find and understand verses from the Bhagavad-gita. What would you like to explore today?",
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    chatRef.current = startGitaChat(language);
  }, [language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatRef.current.sendMessage({ message: input });
      const modelMsg: ChatMessage = { 
        role: 'model', 
        text: result.text || "I'm sorry, I couldn't process that.", 
        timestamp: Date.now() 
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "Error connecting to the spiritual network. Please try again.", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageText = (text: string) => {
    const verseRegex = /(\d+)\.(\d+)/g;
    const parts = text.split(verseRegex);
    
    if (parts.length === 1) return <span>{text}</span>;

    const result = [];
    let lastIdx = 0;
    let match;
    
    verseRegex.lastIndex = 0;
    
    while ((match = verseRegex.exec(text)) !== null) {
      const ch = parseInt(match[1]);
      const vs = parseInt(match[2]);
      
      result.push(<span key={`text-${match.index}`}>{text.substring(lastIdx, match.index)}</span>);
      
      result.push(
        <button
          key={`verse-${match.index}`}
          onClick={() => onNavigateToVerse(ch, vs)}
          className="bg-yellow-100 text-brown-800 px-2 py-0.5 rounded font-bold hover:bg-yellow-200 transition-colors mx-1 border border-yellow-300"
        >
          BG {ch}.{vs} ↗
        </button>
      );
      
      lastIdx = verseRegex.lastIndex;
    }
    
    result.push(<span key="text-end">{text.substring(lastIdx)}</span>);
    return result;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex flex-col justify-end">
      <div className="bg-[#FDF6E3] w-full max-w-2xl mx-auto h-[85vh] rounded-t-3xl shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        <div className="p-4 border-b border-brown-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-gray-800">Gita Assistant</h2>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span> Online
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-teal-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none border border-brown-50'
              }`}>
                <div className="text-sm md:text-base leading-relaxed">
                  {msg.role === 'model' ? renderMessageText(msg.text) : msg.text}
                </div>
                <div className={`text-[10px] mt-1 opacity-50 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-brown-50 shadow-sm flex gap-1">
                <div className="w-2 h-2 bg-brown-200 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-brown-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-brown-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-brown-50">
          <div className="flex gap-2 bg-gray-50 p-2 rounded-2xl border border-gray-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={language === Language.NEPALI ? "जिज्ञासा यहाँ लेख्नुहोस्..." : "Ask a question..."}
              className="flex-1 bg-transparent px-4 py-2 outline-none text-gray-700"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:grayscale"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;

